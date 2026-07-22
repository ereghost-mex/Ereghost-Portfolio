const terminal=document.querySelector(".terminal-body");

const commands=[

"> whoami",

"Ghost Developer",

"> npm run portfolio",

"✔ Portfolio Started",

"> git status",

"Working Tree Clean",

"> ls projects",

"ESP32 Dashboard",

"Weather App",

"Portfolio",

"Chat Application",

"> _"

];

let i=0;

terminal.innerHTML="";

function printCommand(){

    if(i>=commands.length){

        i=0;

        terminal.innerHTML="";

    }

    const line=document.createElement("p");

    line.textContent=commands[i];

    terminal.appendChild(line);

    terminal.scrollTop=terminal.scrollHeight;

    i++;

    setTimeout(printCommand,900);

}

printCommand();