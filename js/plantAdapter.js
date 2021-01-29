class PlantAdapter{

  static baseURL = "http://localhost:3000/plants"

  static fetchAndMakePlants(){
    return fetch(PlantAdapter.baseURL)
      .then(res => res.json())
      .then(function(cityArray){
        return cityArray.forEach(function(city) {
          return new Plant(city)
        })
      })
  }
}