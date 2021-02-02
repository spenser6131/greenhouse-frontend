class Plant{

  static all = []

  constructor({id, species, light_requirement, humidity_requirement, water_frequency, last_watering, last_fertilization, comments, space_id}){
    this.id = id
    this.species = species
    this.light_requirement = light_requirement
    this.humidity_requirement = humidity_requirement
    this.water_frequency = water_frequency
    this.last_watering = last_watering
    this.last_fertilization = last_fertilization
    this.comments = comments
    this.space_id = space_id

    this.holder = document.createElement('div')
    this.holder.classList = "holder card-content"

    this.spacePlant = document.createElement('ul')
    this.spacePlant.innerHTML = `<span>${this.species}</span>`
    this.spacePlant.classList = 'spacePlant'
    this.spacePlant.addEventListener('click', Plant.displaySpacePlantInfo)

    this.editSpacePlantButton = document.createElement('button')
    this.editSpacePlantButton.innerText = `Edit ${this.species}`
    this.editSpacePlantButton.classList = "btn"
    this.editSpacePlantButton.addEventListener("click", this.renderSpacePlantEditForm)

    this.holder.append(this.spacePlant)

    this.form = document.createElement('form')
    this.form.addEventListener('submit', this.submitEditSpacePlantForm)

    Plant.all.push(this)
  }

  renderLI = () => {
    this.spacePlant.innerHTML = `<span>${this.species}</span>`

    let light_requirement = document.createElement('li')
    light_requirement.innerText = `Optimal Light: ${this.light_requirement}`
    
    let humidity_requirement = document.createElement('li')
    humidity_requirement.innerText = `Optimal Humidity: ${this.humidity_requirement}`
    
    let water_frequency = document.createElement('li')
    water_frequency.innerText = `Water Every ${this.water_frequency} Days`
    
    let last_watering = document.createElement('li')
    last_watering.innerText = `Last Watered: ${this.last_watering}`
    
    let last_fertilization = document.createElement('li')
    last_fertilization.innerText = `Last Fertilized: ${this.last_fertilization}`
    
    let comments = document.createElement('li')
    if (!this.comments){
      comments.innerText = "(No comments to display)"
    } else {  
      comments.innerText = `Comments: ${this.comments}`
    }

    let elArr = [light_requirement, humidity_requirement, water_frequency, last_watering, last_fertilization, comments, this.editSpacePlantButton]
    elArr.forEach(element => element.classList += ' hidden')

    this.spacePlant.append(light_requirement, humidity_requirement, water_frequency, last_watering, last_fertilization, comments, this.editSpacePlantButton)
    return this.spacePlant
  }

  static displaySpacePlantInfo(){
    let nodes = this.childNodes
    for(let i=0; i<nodes.length; i++) {
      if (nodes[i].nodeName == 'LI' || nodes[i].nodeName == 'BUTTON') {
           nodes[i].classList.toggle('hidden')
      }
    }
  }

  renderSpacePlantEditForm = e => {
    this.editSpacePlantButton.disabled = true
    this.spacePlant.innerHTML = ''
    this.spacePlant.appendChild(this.form)
    this.deleteSpacePlantButton = document.createElement('button')
    this.deleteSpacePlantButton.innerText = `Delete ${this.species}`
    this.deleteSpacePlantButton.classList = "btn hidden"
    this.deleteSpacePlantButton.addEventListener("click", this.deleteSpacePlant)
    this.form.innerHTML = `
      <label>Species:</label>
      <input type="text" name="species" value="${this.species}">
      <br/>
      <label>Optimal Humidity:</label>
      <input type="text" name="humidity_requirement" value="${this.humidity_requirement}">
      <br/>
      <label>Optimal Light:</label>
      <input type="text" name="light_requirement" value="${this.light_requirement}">
      <br/>
      <label>Water Every "X" Days:</label>
      <input type="text" name="water_frequency" value="${this.water_frequency}">
      <br/>
      <label>Last Watered:</label>
      <input type="date" name="last_watering" value="${this.last_watering}">
      <br/>
      <label>Last Fertilized:</label>
      <input type="date" name="last_fertilization" value="${this.last_fertilization}">
      <br/>
      <label>Comments:</label>
      <textarea name="comments">${this.comments ? this.comments : ''}</textarea>
      <br/>
      <label>Move To New Space:</label>
      <select id="plantSpaceSelect" name="space_id"></select>
      <br/>
      <input class="btn" type="submit" value="Submit">
    `
    let dropdown = document.getElementById('plantSpaceSelect')
    dropdown.innerHTML += `<option ${this.space_id == null ? "selected" : ""} value="">No Space</option>`
    Space.all.forEach(space =>{
      let spaceOption = `<option ${this.space_id == space.id ? "selected" : ""} value="${space.id}">${space.name}</option>`
      dropdown.innerHTML += spaceOption
    })
    this.spacePlant.appendChild(this.deleteSpacePlantButton)
  }

  submitEditSpacePlantForm = (e) => {
    e.preventDefault()
    this.form.querySelectorAll('input, textarea, select').forEach(input => {
      input.name !== "submit" && (this[`${input.name}`] = input.value)
    })
    this.editSpacePlantButton.disabled = false
    PlantAdapter.editPlant(this)
    this.form.remove()
    this.spacePlant.innerHTML += `<span>${this.species}</span>`
    this.renderLI()
    Plant.renderUnassignedPlants()
    Space.renderAllSpaces()
  }

  deleteSpacePlant = () => {
    this.spacePlant.remove()
    PlantAdapter.deletePlant(this)
  }

  static submitNewPlantForm = () => {
    let form = document.getElementById('new-plant-form')
    let newPlantData = {}
    form.querySelectorAll('input').forEach(function(input){
      if (input.name !== "submit")
        newPlantData[`${input.name}`] = input.value
    })
    PlantAdapter.createPlant(newPlantData)
    .then(resp => {
      new Plant(resp)
      Plant.renderUnassignedPlants()
    })
  }

  static renderUnassignedPlants = () => {
    let plantsContainer = document.getElementById('plants-container')
    plantsContainer.innerHTML = ''
    this.all.forEach(plant => {
      if (!plant.space_id){
        let newPlantCard = document.createElement('div')
        newPlantCard.classList = "plant-card"
        newPlantCard.appendChild(plant.holder)
        plant.holder.append(plant.renderLI())
        plantsContainer.appendChild(newPlantCard)
      }
    })
  }

  static renderNewPlant = (plant) => {
    console.log(Plant.all)
  }
}