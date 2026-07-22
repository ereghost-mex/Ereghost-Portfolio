const projects=[

{

title:"Air Quality Index Monitor",

category:"web",

image:"assets/images/projects/aqi.webp",

description:"Personal developer portfolio.",

github:"https://github.com/",

demo:"project-showcase/aqi/aqi.ino",

tags:["Arduino","IOT","Air Quality Index"]

},

{
title:"Gesture Recognition",

category:"python, arduino",

image:"assets/images/projects/gesture-recognition.jpg",

description:"Real-time Gesture Recognition.",

github:"https://github.com/",

demo:"project-showcase/gesture-recognition",

tags:["Python","Arduino","Computer Vision"]

},

{

title:"Home Automation",

category:"iot, arduino, web",

image:"assets/images/projects/home-automation.png",

description:"Home Automation System using IoT and Arduino.",

github:"https://github.com/",

demo:"project-showcase/home-automation/home-automation.ino",

tags:["Arduino","IOT","Web Development","Home Automation"]

},
];

const container=document.getElementById("projectContainer");

function display(data){

container.innerHTML="";

data.forEach(project => {

container.innerHTML += `

<div class="col-lg-4 mb-4" data-aos="fade-up">

    <div class="project-card">

        <img src="${project.image}" class="img-fluid" alt="${project.title}">

        <div class="project-content">

            <h4>${project.title}</h4>

            <p>${project.description}</p>

            <div class="tags">

                ${project.tags.map(tag =>
                    `<span class="tag">${tag}</span>`
                ).join("")}

            </div>

            <div class="d-grid gap-2 mt-4">

                <a href="${project.demo}" class="btn btn-warning">

                    <i class="fas fa-play me-2"></i>

                    Live Demo

                </a>

                <a href="${project.github}" class="btn btn-outline-warning">

                    <i class="fab fa-github me-2"></i>

                    GitHub

                </a>

                <a href="${project.showcase}" class="btn btn-info">

                    <i class="fas fa-code me-2"></i>

                    Code Showcase

                </a>

            </div>

        </div>

    </div>

</div>

`;

});

}

display(projects);

document.getElementById("search").addEventListener("keyup",(e)=>{

const value=e.target.value.toLowerCase();

display(projects.filter(project=>

project.title.toLowerCase().includes(value)

));

});

document.querySelectorAll(".filter-btn").forEach(button=>{

button.onclick=()=>{

document.querySelectorAll(".filter-btn").forEach(btn=>{

btn.classList.remove("active");

});

button.classList.add("active");

const category=button.dataset.filter;

if(category==="all"){

display(projects);

return;

}

display(projects.filter(project=>project.category===category));

};

});