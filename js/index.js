const logo = document.getElementById('logo')
const test = document.getElementById('leaf-button')
console.log(test)

let srcs = {
  "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/green-leaf.png": "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/orange-leaf.png",
  "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/orange-leaf.png": "file://wsl%24/Ubuntu/home/spenser6131/development/flatiron/phase-4/projects/greenhouse-frontend/images/green-leaf.png"
}
test.addEventListener('click', function(event) {
  test.src = srcs[test.src]
})