class SpaceAdapter{
  static baseURL = "http://localhost:3000/spaces/"

  static fetchAndMakeSpaces(){
    return fetch(SpaceAdapter.baseURL)
      .then(obj => obj.json())
      .then(function(spacesArray){
        return spacesArray.forEach(function(space){
          return new Space(space)
        })
      })
  }

  static createSpace(body){
    return fetch(`${SpaceAdapter.baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        space: body
      })
    })
    .then((obj) => obj.json())
  }
  
  static editSpace({id, name, humidity, light}){
    return fetch(`${SpaceAdapter.baseURL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        space: {
          name,
          humidity,
          light
        }
      })
    })
  }

  static deleteSpace({id}){
    return fetch(`${SpaceAdapter.baseURL}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
  }
}