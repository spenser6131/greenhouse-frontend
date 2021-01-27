const logo = document.getElementById('logo')
const leafButton = document.getElementById('leaf-button')

let srcs = {
  "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/green-leaf.png": "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/orange-leaf.png",
  "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/orange-leaf.png": "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/green-leaf.png"
}

leafButton.addEventListener('click', function(event) {
  leafButton.src = srcs[leafButton.src]
})
