const logo = document.getElementById('logo')
const leafButton = document.getElementById('leaf-button')

let srcs = {
  "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/green-leaf.png": "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/orange-leaf.png",
  "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/orange-leaf.png": "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/green-leaf.png"
}

leafButton.addEventListener('click', function(event) {
  leafButton.src = srcs[leafButton.src]
})


var navbar = document.querySelector(".navbar")
var ham = document.getElementById('burger')
let burgs = {
  "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/green-burger.png": "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/orange-burger.png",
  "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/orange-burger.png": "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/green-burger.png"
}
ham.addEventListener("click", toggleHamburger)

function toggleHamburger(){
  navbar.classList.toggle("showNav")
  ham.src = burgs[ham.src]
}

var menuLinks = document.querySelectorAll(".menuLink")

menuLinks.forEach( 
  function(menuLink) { 
    menuLink.addEventListener("click", toggleHamburger) 
  }
)