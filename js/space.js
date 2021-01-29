class Space{

  static all = []
  static spaceContainer = document.getElementById('space-container')

  constructor({id, name, light, water}){
    this.id = id
    this.name = name
    this.light = light
    this.water = water

    this.main = document.createElement('div')
    this.main.id = `space-${this.id}`
    this.details = document.createElement('div')
    this.details.id = `space-${this.id}-details`
    this.cities = document.createElement('div')
    this.cities.id = `space-${this.id}-cities`
    this.editButton = document.createElement('button')
    this.editButton.innerText = "Edit Space"
    let space = document.createElement('p')
    space.innerText = "=================="
    this.main.append(this.details, this.cities, this.editButton, space)

    this.form = document.createElement('form')

    this.editButton.addEventListener('click', this.renderEditSpaceForm)
    this.form.addEventListener('submit', this.submitEditSpaceFrom)
    Space.all.push(this)
  }

  renderDetails(){
    this.details.innerHTML = `
      <p>Name: <span>${this.name}</span></p>
      <p>light: <span>${this.light}</span></p>
      <p>National water: <span>${this.water}</span></p>
    `
  }

  allCities(){
    return City.all.filter(city => city.spaceId == this.id)
  }

  renderCities(){
    this.cities.innerHTML = this.allCities().map(city => city.renderLI()).join("")
  }

  renderEditSpaceForm = () => {
    this.editButton.disabled = true
    console.log(this);
    this.details.innerHTML = ''
    this.details.appendChild(this.form)
    this.form.innerHTML = `
      <label>Name:</label>
      <input type="text" name="name" value="${this.name}">
      <br/>
      <label>light:</label>
      <input type="text" name="light" value="${this.light}">
      <br/>
      <label>National water:</label>
      <input type="text" name="water" value="${this.water}">
      <br/>
      <input id=edit-space type="submit" value="Submit">
    `
  }

  submitEditSpaceFrom = (e) => {
    e.preventDefault()
    this.form.querySelectorAll('input').forEach(function(input){
      input.name !== "submit" && (this[`${input.name}`] = input.value)
    }, this)
    this.editButton.disabled = false
    this.renderDetails()
    SpaceAdapter.editSpace(this)
  }

  static renderAllCountries(){
    Space.all.forEach((space) => {
      space.renderDetails()
      space.renderCities()
      Space.spaceContainer.appendChild(space.main)
    })
  }
}