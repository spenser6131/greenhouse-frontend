class PlantAdapter{
  static baseURL = "http://localhost:3000/plants/"

  static fetchAndMakePlants(){
    return fetch(PlantAdapter.baseURL)
      .then(obj => obj.json())
      .then(function(plantsArray){
        return plantsArray.forEach(function(plant) {
          if (plant.space_id){
            return new Plant(plant)
          }
        })
      })
  }

  static fetchAndMakeUnassignedPlants(){
    return fetch(`${PlantAdapter.baseURL}unassigned`)
    .then(obj => obj.json())
    .then(function(plantsArray){
      return plantsArray.forEach(function(plant) {
        return new Plant(plant)
      })
    })
  }

  static createPlant({species, humidity_requirement, light_requirement, water_frequency, last_watering, last_fertilization, comments}){
    return fetch(`${PlantAdapter.baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        plant: {
          species,
          humidity_requirement: parseInt(humidity_requirement),
          light_requirement: parseInt(light_requirement),
          water_frequency: parseInt(water_frequency),
          last_watering,
          last_fertilization,
          comments
        }
      })
    })
    .then((obj) => obj.json())
  }
  
  static editPlant({id, species, humidity_requirement, light_requirement, water_frequency, last_watering, last_fertilization, comments, space_id}){
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
          comments,
          space_id
        }
      })
    })
  }

  static deletePlant({id}){
    return fetch(`${PlantAdapter.baseURL}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
  }
}
