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

    this.editSpacePlantButton = document.createElement('button')
    this.editSpacePlantButton.innerText = "Edit Plant"
    this.editSpacePlantButton.classList = "btn "
    this.editSpacePlantButton.addEventListener("click", this.renderSpacePlantEditForm)

    this.form = document.createElement('form')
    this.form.addEventListener('submit', this.submitEditSpacePlantForm)

    Plant.all.push(this)
  }

  renderLI = () => {
    this.spacePlant = document.createElement('ul')
    this.spacePlant.innerHTML = `<span>${this.species}</span>`
    this.spacePlant.classList = 'spacePlant'
    this.spacePlant.addEventListener('click', Plant.displaySpacePlantInfo)
    
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
    if (this.comments == null){
      comments.innerText = "(No comments to display)"
    } else {  
      comments.innerText = `Comments: ${this.comments}`
    }
    
    this.deleteSpacePlantButton = document.createElement('button')
    this.deleteSpacePlantButton.innerText = "Delete Plant"
    this.deleteSpacePlantButton.classList = "btn "
    this.deleteSpacePlantButton.addEventListener("click", this.deleteSpacePlant)

    let elArr = [light_requirement, humidity_requirement, water_frequency, last_watering, last_fertilization, comments, this.editSpacePlantButton, this.deleteSpacePlantButton]
    elArr.forEach(element => element.classList += 'hidden')

    this.spacePlant.append(light_requirement, humidity_requirement, water_frequency, last_watering, last_fertilization, comments, this.editSpacePlantButton, this.deleteSpacePlantButton)
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
    this.deleteSpacePlantButton.innerText = "Delete Plant"
    this.deleteSpacePlantButton.classList = "btn"
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
      <textarea name="comments" value="${this.comments == null ? '' : this.comments}"></textarea>
      <br/>
      <label>Move To New Space:</label>
      <select id="plantSpaceSelect" name="space_id"></select>
      <br/><br/>
      <input class="btn" type="submit" value="Submit">
    `
    let dropdown = document.getElementById('plantSpaceSelect')
    Space.all.forEach(space =>{
      let spaceOption = `<option ${this.space_id == space.id ? "selected" : ""} value="${space.id}">${space.name}</option>`
      dropdown.innerHTML += spaceOption
    })
    this.form.appendChild(this.deleteSpacePlantButton)
    this.form.innerHTML += '<br/><br/>'
  }

  submitEditSpacePlantForm = (e) => {
    e.preventDefault()
    this.form.querySelectorAll('input, textarea, select').forEach(input => {
      input.name !== "submit" && (this[`${input.name}`] = input.value)
    })
    this.editSpacePlantButton.disabled = false
    PlantAdapter.editPlant(this)
    run()
  }
}