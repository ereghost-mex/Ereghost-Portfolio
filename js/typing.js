const words=[

    "Web Developer",

    "ESP32 Developer",

    "IoT Enthusiast",

    "Open Source Contributor",

    "Problem Maker, Solution Finder",

    "Developer, Designer, Dreamer",

    "Code, Coffee, Repeat",

    "Dream, Build, Inspire",

    "Code, Create, Innovate",

    "Think, Innovate, Fabricate"    
];

let wordIndex=0;

let charIndex=0;

let deleting=false;

const typing=document.getElementById("typing");

function type(){

    const current=words[wordIndex];

    if(!deleting){

        typing.textContent=current.substring(0,charIndex++);

        if(charIndex>current.length){

            deleting=true;

            setTimeout(type,1200);

            return;

        }

    }else{

        typing.textContent=current.substring(0,charIndex--);

        if(charIndex<0){

            deleting=false;

            wordIndex++;

            if(wordIndex>=words.length){

                wordIndex=0;

            }

        }

    }

    setTimeout(type,deleting?45:110);

}

type();