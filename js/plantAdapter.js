class PlantAdapter{
  static baseURL = "http://localhost:3000/plants"

  static fetchAndMakePlants(){
    return fetch(PlantAdapter.baseURL)
      .then(obj => obj.json())
      .then(function(plantsArray){
        return plantsArray.forEach(function(plant) {
          return new Plant(plant)
        })
      })
  }

  static createPlant(body){
    return fetch(`${PlantAdapter.baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
  }
  
  static editPlant({id, species, humidity_requirement, light_requirement, water_frequency, last_watering, last_fertilization, comments}){
    return fetch(`${PlantAdapter.baseURL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        plant: {
          species,
          humidity_requirement,
          light_requirement,
          water_frequency,
          last_watering,
          last_fertilization,
          comments
        }
      })
    })
  }

}
