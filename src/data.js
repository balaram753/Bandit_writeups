export const writeups = [
    {
        id: 0,
        title: "Level 0 -> 0",
        description: "The goal of this level is for you to log into the game using SSH.",
        commands: [
            "ssh bandit0@bandit.labs.overthewire.org -p 2220",
            "bandit0"
        ],
        explanation: "You use the `ssh` command to securely connect to the remote server. The username is `bandit0`, the host is `bandit.labs.overthewire.org`, and `-p 2220` specifies the custom port 2220. The password is the same as the username.",
        password: "bandit0"
    },
    {
        id: 1,
        title: "Level 0 -> 1",
        description: "The password for the next level is stored in a file called readme located in the home directory.",
        commands: [
            "ls",
            "cat readme"
        ],
        explanation: "`ls` lists the files in the current directory. You will see a file named `readme`. To view its contents, use the `cat` command followed by the filename.",
        password: "FindThePasswordNow"
    },
    {
        id: 2,
        title: "Level 1 -> 2",
        description: "The password for the next level is stored in a file called - located in the home directory.",
        commands: [
            "ls",
            "cat ./-"
        ],
        explanation: "If you simply run `cat -`, the shell behaves unexpectedly because `-` typically implies standard input. We must specify the path implicitly using `./-` to tell `cat` to read the file literally named `-` in the current directory.",
        password: "LookAtTheFile"
    },
    {
        id: 3,
        title: "Level 2 -> 3",
        description: "The password for the next level is stored in a file called spaces in this filename located in the home directory.",
        commands: [
            "ls",
            "cat \"spaces in this filename\"",
            "cat spaces\\ in\\ this\\ filename"
        ],
        explanation: "Since the filename has spaces, we can't refer to it simply as `cat spaces in this filename` because `cat` would look for 4 separate files! You can either encase it in quotes, or escape the spaces using backslashes (`\\`). Tab completion is your best friend here.",
        password: "SpacesAreFun"
    },
    {
        id: 4,
        title: "Level 3 -> 4",
        description: "The password for the next level is stored in a hidden file in the inhere directory.",
        commands: [
            "ls",
            "cd inhere",
            "ls -la",
            "cat .hidden"
        ],
        explanation: "Standard `ls` does not show hidden files (files beginning with a dot). Passing the `-a` flag (or `-la` for a long detailed list including hidden files) will reveal the `.hidden` file. Then, use `cat` to read it.",
        password: "HiddenFilesAreFun"
    }
    ,
    {
        "id": 5,
        "title": "Level 4 -> 5",
        "description": "The password for the next level is stored in the only human-readable file in the inhere directory. Tip: if your terminal is messed up, try the “reset” command.",
        "commands": [
            "ls",
            "cd inhere",
            "file ./-file*",
            "cat ./-fileXX"
        ],
        "explanation": "There are many files, and we don’t know what’s inside them. We use file ./-file* to check the type of all files at once. The * is a wildcard that matches everything starting with -file, so the command applies to all files with that prefix. This helps us identify the one that is different from the others, and then we can use cat to read its contents.",
        "password": "FileAllFiles"
    }
];

export const DEVELOPER = {
    name: 'Chillagundla Balaram',
    role: 'Event Manager & IoT Penetration Tester',
    image: '/mem_pic/balaram.jpg',
    github: 'https://github.com/balaram753',
    linkedin: 'https://linkedin.com/in/chbalaram',
    instagram: 'https://instagram.com/_.roc_ram._',
    bio: 'Passionate about securing the physical and digital world. Specializing in IoT Penetration Testing and Security.',
    interests: ['IoT Penetration Testing', 'IoT Security', 'Penetration Testing', 'Embedded Systems'],
    skills: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
        { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
        { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
        { name: 'Arduino', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg' }
    ],
    websites: [
        { title: 'Srivastra Embroidery', url: 'https://srivastraembroidery.netlify.app/' },
        { title: 'CyberSec Learn', url: 'https://cybersec-learrn.netlify.app/' },
        { title: 'Portfolio', url: 'https://balaram753-portfolio.netlify.app/' }
    ],
    githubProjects: [
        { title: 'RamGuard', url: 'https://github.com/balaram753/RamGuard', description: 'GitHub Repository' },
        { title: 'Credential Audit Tool', url: 'https://github.com/balaram753/Credential-Audit-Tool', description: 'GitHub Repository' },
        { title: 'Docker-Container-Security-Assessment', url: 'https://github.com/balaram753/Docker-Container-Security-Assessment', description: 'GitHub Repository' }
    ]
};
