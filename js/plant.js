class Plant{

  static all = []

  constructor({id, species, light_needs, humidity_needs, water_frequency, last_watering, last_fertilization, comments, space_id}){
    this.id = id
    this.species = species
    this.light_needs = light_needs
    this.humidity_needs = humidity_needs
    this.water_frequency = water_frequency
    this.last_watering = last_watering
    this.last_fertilization = last_fertilization
    this.comments = comments
    this.spaceId = space_id

    Plant.all.push(this)
  }

  renderLI(){
    return `<li>${this.species}</li>`
  }
}