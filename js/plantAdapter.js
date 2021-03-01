class PlantAdapter{
  static baseURL = "http://localhost:3001/plants/"

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

  static createPlant({species, humidity_req, light_req, water_freq, last_water, last_fert, comments}){
    return fetch(`${PlantAdapter.baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        plant: {
          species,
          humidity_req: parseInt(humidity_req),
          light_req: parseInt(light_req),
          water_freq: parseInt(water_freq),
          last_water,
          last_fert,
          comments
        }
      })
    })
    .then((obj) => obj.json())
  }
  
  static editPlant({id, species, humidity_req, light_req, water_freq, last_water, last_fert, comments, space_id}){
    return fetch(`${PlantAdapter.baseURL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        plant: {
          species,
          humidity_req,
          light_req,
          water_freq,
          last_water,
          last_fert,
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
