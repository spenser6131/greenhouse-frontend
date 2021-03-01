class PlantAdapter{
  static baseURL = "http://localhost:3001/plants/"

  static fetchAndMakePlants(){
    return fetch(PlantAdapter.baseURL)
      .then(obj => obj.json())
      .then(plantsArray => {
        return plantsArray.data.forEach(function(plant) {
          if (plant.attributes.spaceId){
            return new Plant(plant.attributes)
          }
        })
      })
  }

  static fetchAndMakeUnassignedPlants(){
    return fetch(`${PlantAdapter.baseURL}unassigned`)
    .then(obj => obj.json())
    .then(function(plantsArray){
      return plantsArray.data.forEach(function(plant) {
        return new Plant(plant.attributes)
      })
    })
  }

  static createPlant({species, humidityReq, lightReq, waterFreq, lastWater, lastFert, comments}){
    return fetch(`${PlantAdapter.baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        plant: {
          species,
          humidityReq: parseInt(humidityReq),
          lightReq: parseInt(lightReq),
          waterFreq: parseInt(waterFreq),
          lastWater,
          lastFert,
          comments
        }
      })
    })
    .then((obj) => obj.json())
  }
  
  static editPlant({id, species, humidityReq, lightReq, waterFreq, lastWater, lastFert, comments, spaceId}){
    return fetch(`${PlantAdapter.baseURL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        plant: {
          species,
          humidityReq,
          lightReq,
          waterFreq,
          lastWater,
          lastFert,
          comments,
          spaceId
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
