class Plant{

  static all = []

  constructor({id, species, light_req, humidity_req, water_freq, last_water, last_fert, comments, space_id}){
    this.id = id
    this.species = species
    this.light_req = light_req
    this.humidity_req = humidity_req
    this.water_freq = water_freq
    this.last_water = last_water
    this.last_fert = last_fert
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

    let light_req = document.createElement('li')
    light_req.innerText = `Optimal Light: ${this.light_req}`
    
    let humidity_req = document.createElement('li')
    humidity_req.innerText = `Optimal Humidity: ${this.humidity_req}`
    
    let water_freq = document.createElement('li')
    water_freq.innerText = `Water Every ${this.water_freq} Days`
    
    let last_water = document.createElement('li')
    last_water.innerText = `Last Watered: ${this.last_water}`
    
    let last_fert = document.createElement('li')
    last_fert.innerText = `Last Fertilized: ${this.last_fert}`
    
    let comments = document.createElement('li')
    if (!this.comments){
      comments.innerText = "(No comments to display)"
    } else {  
      comments.innerText = `Comments: ${this.comments}`
    }

    let elArr = [light_req, humidity_req, water_freq, last_water, last_fert, comments, this.editSpacePlantButton]
    elArr.forEach(element => element.classList += ' hidden')

    this.spacePlant.append(light_req, humidity_req, water_freq, last_water, last_fert, comments, this.editSpacePlantButton)
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
      <input type="text" name="humidity_req" value="${this.humidity_req}">
      <br/>
      <label>Optimal Light:</label>
      <input type="text" name="light_req" value="${this.light_req}">
      <br/>
      <label>Water Every "X" Days:</label>
      <input type="text" name="water_freq" value="${this.water_freq}">
      <br/>
      <label>Last Watered:</label>
      <input type="date" name="last_water" value="${this.last_water}">
      <br/>
      <label>Last Fertilized:</label>
      <input type="date" name="last_fert" value="${this.last_fert}">
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
