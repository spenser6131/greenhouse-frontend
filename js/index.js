PlantAdapter.fetchAndMakePlants()
  .then(SpaceAdapter.fetchAndMakeSpaces)
  .then(Space.renderAllSpaces)
  .then(PlantAdapter.fetchAndMakeUnassignedPlants)
  .then(Plant.renderUnassignedPlants)
