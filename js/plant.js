class Plant{

  static all = []

  constructor({id, species, lightReq, humidityReq, waterFreq, lastWater, lastFert, comments, spaceId}){
    this.id = id
    this.species = species
    this.lightReq = lightReq
    this.humidityReq = humidityReq
    this.waterFreq = waterFreq
    this.lastWater = lastWater
    this.lastFert = lastFert
    this.comments = comments
    this.spaceId = spaceId

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

    let lightReq = document.createElement('li')
    lightReq.innerText = `Optimal Light: ${this.lightReq}`
    
    let humidityReq = document.createElement('li')
    humidityReq.innerText = `Optimal Humidity: ${this.humidityReq}`
    
    let waterFreq = document.createElement('li')
    waterFreq.innerText = `Water Every ${this.waterFreq} Days`
    
    let lastWater = document.createElement('li')
    lastWater.innerText = `Last Watered: ${this.lastWater}`
    
    let lastFert = document.createElement('li')
    lastFert.innerText = `Last Fertilized: ${this.lastFert}`
    
    let comments = document.createElement('li')
    if (!this.comments){
      comments.innerText = "(No comments to display)"
    } else {  
      comments.innerText = `Comments: ${this.comments}`
    }

    let elArr = [lightReq, humidityReq, waterFreq, lastWater, lastFert, comments, this.editSpacePlantButton]
    elArr.forEach(element => element.classList += ' hidden')

    this.spacePlant.append(lightReq, humidityReq, waterFreq, lastWater, lastFert, comments, this.editSpacePlantButton)
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
      <input type="text" name="humidityReq" value="${this.humidityReq}">
      <br/>
      <label>Optimal Light:</label>
      <input type="text" name="lightReq" value="${this.lightReq}">
      <br/>
      <label>Water Every "X" Days:</label>
      <input type="text" name="waterFreq" value="${this.waterFreq}">
      <br/>
      <label>Last Watered:</label>
      <input type="date" name="lastWater" value="${this.lastWater}">
      <br/>
      <label>Last Fertilized:</label>
      <input type="date" name="lastFert" value="${this.lastFert}">
      <br/>
      <label>Comments:</label>
      <textarea name="comments">${this.comments ? this.comments : ''}</textarea>
      <br/>
      <label>Move To New Space:</label>
      <select id="plantSpaceSelect" name="spaceId"></select>
      <br/>
      <input class="btn" type="submit" value="Submit">
    `
    let dropdown = document.getElementById('plantSpaceSelect')
    dropdown.innerHTML += `<option ${this.spaceId == null ? "selected" : ""} value="">No Space</option>`
    Space.all.forEach(space =>{
      let spaceOption = `<option ${this.spaceId == space.id ? "selected" : ""} value="${space.id}">${space.name}</option>`
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
      if (!plant.spaceId){
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
