class Space{

  static all = []
  static spacesContainer = document.getElementById('spaces-container')
  
  constructor({id, name, humidity, light}) {
    this.id = id;
    this.name = name;
    this.humidity = humidity;
    this.light = light;

    this.main = document.createElement('div')
    this.main.id = `space-${this.id}`
    this.main.classList = `space-card`

    this.holder = document.createElement('div')
    this.holder.classList = `holder card-content`

    this.details = document.createElement('div')
    this.details.id = `space-${this.id}-details`

    this.plants = document.createElement('div')
    this.plants.id = `space-${this.id}-plants`

    this.editButton = document.createElement('button')
    this.editButton.innerText = "Edit Space"

    this.holder.append(this.details, this.plants, this.editButton)
    this.main.append(this.holder)
    this.form = document.createElement('form')
    this.editButton.addEventListener('click', this.renderEditSpaceForm)
    this.form.addEventListener('submit', this.submitEditSpaceForm)

    Space.all.push(this)
  }

  renderDetails(){
    this.details.innerHTML = `
    <h2 class="card_title">${this.name}</h2>
    <p class="card_text">Light: ${this.light}</p>
    <p class="card_text">Humidity: ${this.humidity}</p>
    `
  }
  
  allPlants(){
    return Plant.all.filter(plant => plant.spaceId == this.id)
  }

  renderPlants(){
    this.plants.innerHTML = this.allPlants().map(plant => plant.renderLI()).join("")
  }

  renderEditSpaceForm = () => {
    this.editButton.disabled = true
    this.details.innerHTML = ''
    this.details.appendChild(this.form)
    this.deleteButton = document.createElement('button')
    this.deleteButton.innerText = "Delete Space"
    this.deleteButton.addEventListener("click", this.deleteSpace)
    this.form.innerHTML = `
      <label>Name:</label>
      <input type="text" name="name" value="${this.name}">
      <br/>
      <label>Humidity Level:</label>
      <input type="text" name="humidity" value="${this.humidity}">
      <br/>
      <label>Light Level:</label>
      <input type="text" name="light" value="${this.light}">
      <br/>
      <input id=edit-space type="submit" value="Submit">
    `
    this.form.appendChild(this.deleteButton)
  }

  static submitNewSpaceForm = (e) => {
    e.preventDefault()
    let form = document.getElementById('new-space-form')
    let newSpaceData = {}
    form.querySelectorAll('input').forEach(function(input){
      if (input.name !== "submit")
        newSpaceData[`${input.name}`] = input.value
    })
    SpaceAdapter.createSpace(newSpaceData)
  }

  submitEditSpaceForm = (e) => {
    e.preventDefault()
    this.form.querySelectorAll('input').forEach(function(input){
      input.name !== "submit" && (this[`${input.name}`] = input.value)
    }, this)
    this.editButton.disabled = false
    this.renderDetails()
    SpaceAdapter.editSpace(this)
  }

  deleteSpace = (e) => {
    SpaceAdapter.deleteSpace(this)
  }

  static renderAllSpaces(){
    Space.all.forEach(space => {
      space.renderDetails()
      space.renderPlants()
      Space.spacesContainer.appendChild(space.main)
    })
  }

}