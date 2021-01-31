PlantAdapter.fetchAndMakePlants()
.then(SpaceAdapter.fetchAndMakeSpaces)
.then(Space.renderAllSpaces)

document.getElementById('new-space-form').addEventListener('submit', Space.submitNewSpaceForm)
