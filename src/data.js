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
        password: "NH2SXQwcBdpmTEzi3bvIHzn6xsqJzOxx"
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
        password: "rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi"
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
        password: "aBZ0W5EmUfAf75d46Bds2PPeJvdCEsF"
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
        password: "2EW7BBsr6aMMoJ2HjW067lcgVkTXjM01"
    }
,
  {
    "id": 5,
    "title": "Git Test",
    "description": "desc",
    "commands": [
      "test"
    ],
    "explanation": "ex",
    "password": "pass"
  }
];
