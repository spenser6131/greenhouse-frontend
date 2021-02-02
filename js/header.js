// Burger Button

let burgerOptions = document.querySelector("#burger-button-options")
let burger = document.querySelector("#burger-icon")

burger.addEventListener("click", toggleHamburger)

function toggleHamburger(){
  burgerOptions.classList.toggle("showNav")
  burger.classList.toggle("green-burger")
  burger.classList.toggle("orange-burger")
  closeDoor()
  closeLeaf()
}

let burgerMenuLinks = document.querySelectorAll("#burger-button-options .menuLink")

burgerMenuLinks.forEach( 
  function(menuLink) {
    menuLink.addEventListener("click", toggleHamburger) 
  }
)


// Leaf Button

let leafOptions = document.querySelector("#leaf-button-options")
let leaf = document.querySelector("#leaf-icon")

leaf.addEventListener("click", toggleLeaf)

function toggleLeaf(){
  leafOptions.classList.toggle("showNav")
  leaf.classList.toggle("green-leaf")
  leaf.classList.toggle("orange-leaf")
  closeDoor()
  closeBurger()
}

let leafMenuLinks = document.querySelectorAll("#leaf-button-options .menuLink")

leafMenuLinks.forEach( 
  function(menuLink) { 
    menuLink.addEventListener("click", toggleLeaf) 
  }
)


// Door Button

let doorOptions = document.querySelector("#door-button-options")
let door = document.querySelector("#door-icon")

door.addEventListener("click", toggleDoor)

function toggleDoor(){
  doorOptions.classList.toggle("showNav")
  door.classList.toggle("green-door")
  door.classList.toggle("orange-door")
  closeLeaf()
  closeBurger()
}

let doorMenuLinks = document.querySelectorAll("#door-button-options .menuLink")

doorMenuLinks.forEach( 
  function(menuLink) { 
    menuLink.addEventListener("click", toggleDoor) 
  }
)
  
function closeLeaf(){
  leaf.classList.remove("orange-leaf")
  leaf.classList.add("green-leaf")
  leafOptions.classList.remove("showNav")
  newPlantForm.reset()
}
  
function closeDoor(){
  door.classList.remove("orange-door")
  door.classList.add("green-door")
  doorOptions.classList.remove("showNav")
}
  
function closeBurger(){
  burger.classList.remove("orange-burger")
  burger.classList.add("green-burger")
  burgerOptions.classList.remove("showNav")
}




// New Plant Form

let newPlantForm = document.getElementById("new-plant-form")

newPlantForm.addEventListener("submit", function(event){
  event.preventDefault()
  Plant.submitNewPlantForm()
  closeLeaf()
})

let newSpaceForm = document.getElementById('new-space-form')

newSpaceForm.addEventListener('submit', function(event){
  event.preventDefault()
  Space.submitNewSpaceForm()
  closeDoor()
})
