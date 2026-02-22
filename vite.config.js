import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'

function adminAPI() {
    return {
        name: 'admin-api',
        configureServer(server) {
            server.middlewares.use('/api/save', (req, res, next) => {
                if (req.method === 'POST') {
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk;
                    });
                    req.on('end', () => {
                        try {
                            const newWriteup = JSON.parse(body);
                            const dataPath = path.resolve(process.cwd(), 'src/data.js');
                            let content = fs.readFileSync(dataPath, 'utf-8');

                            const insertIdx = content.lastIndexOf('];');
                            if (insertIdx === -1) {
                                res.statusCode = 500;
                                res.end(JSON.stringify({ error: 'Could not find array in data.js' }));
                                return;
                            }

                            const arrayContent = content.slice(content.indexOf('[') + 1, insertIdx).trim();
                            const needsComma = arrayContent.length > 0 && !arrayContent.endsWith(',');

                            const newObjStr = (needsComma ? ',\n  ' : '\n  ') + JSON.stringify(newWriteup, null, 2).replace(/\n/g, '\n  ') + '\n';

                            content = content.slice(0, insertIdx) + newObjStr + '];\n';

                            fs.writeFileSync(dataPath, content);

                            exec(`git add src/data.js && git commit -m "Auto add writeup: ${newWriteup.title}" && git push`, (err, stdout, stderr) => {
                                const message = err ? 'Saved locally. Git error: ' + (stderr || err.message) : 'Saved and pushed to GitHub!';
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ success: true, message: message }));
                            });

                        } catch (e) {
                            res.statusCode = 500;
                            res.end(JSON.stringify({ error: e.message }));
                        }
                    });
                } else {
                    next();
                }
            });
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), adminAPI()],
})
