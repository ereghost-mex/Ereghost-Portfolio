// ============================
// LOADER
// ============================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.style.display = "none";

        },500);

    },900);

});


// ============================
// SCROLL TO TOP
// ============================

const topButton = document.createElement("button");

topButton.innerHTML = '<i class="fas fa-arrow-up"></i>';

topButton.id="topBtn";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        topButton.classList.add("show");

    }else{

        topButton.classList.remove("show");

    }

});

topButton.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};
window.addEventListener("scroll",()=>{

const height=document.documentElement.scrollHeight-window.innerHeight;

const scrolled=(window.scrollY/height)*100;

document.getElementById("progress-bar").style.width=scrolled+"%";

});
const glow=document.getElementById("cursorGlow");

document.addEventListener("mousemove",e=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});
const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
});