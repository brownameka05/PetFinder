

function closemyfunction(infoPet){
  infoPet.parentElement.parentElement.parentElement.removeChild(infoPet.parentElement.parentElement)


}

function popUpInfo(petID) {
  let learnMoreDiv = document.getElementsByClassName("learnMore")[0]
  if (learnMoreDiv) {
    if (learnMoreDiv.id == petID) {
      return
    } else {
      learnMoreDiv.parentElement.removeChild(learnMoreDiv)
    }
  }
  showMoreInfo(petID)
}

function showMoreInfo(petID) {
  getPet(petID)
    .then(function(pet) {
      return (thisPet = flattenPet(pet))
    })
    .then(function(newPet) {
      console.log(newPet)
      petLiteral = `
    <div class = "learnMore" id = ${newPet.id}>
      <div>
        <button onclick="closemyfunction(this)" id="btnInfo" > X </button>
      </div>
      <div id="basicInfo">
        <h3>Name: ${newPet.name}</h3>
        <p>Breed: ${newPet.breed}</p>
        <p>Sex: ${newPet.sex}</p>
        <p>Size: ${newPet.size}</p>
      </div>
      <div id="imgDiv"><img id="petPic" src = \"${newPet.images[3].$t}\" />
      </div>
      <div id="description">
        <p>${newPet.description}</p>
      </div>
      <div id = "shelterInfo">
        <h5>Shelter Info</h5>
        <h6>Name: ${newPet.shelterInfo.name}</h6>
    `
      if (!jQuery.isEmptyObject(newPet.shelterInfo.phone)) {
        petLiteral += `     <p>Phone: ${newPet.shelterInfo.phone}</p>`
      }

      if (!jQuery.isEmptyObject(newPet.shelterInfo.email)) {
        petLiteral += `      <p>Email: ${newPet.shelterInfo.email}</p>`
      }
      petLiteral += `
      </div>
    </div>
    `
      $("#section1").append(petLiteral)
    })
}

function flattenPet(pet) {
  let flatPet = {}
  flatPet["name"] = pet.name
  flatPet["id"] = pet.id
  flatPet["images"] = pet.media.photos.photo
  flatPet["breed"] = pet.breeds.breed.$t
  flatPet["sex"] = pet.sex
  flatPet["size"] = pet.size
  flatPet["description"] = pet.description
  return getShelter(pet.shelterId)
    .then(function(response) {
      flatPet["shelterInfo"] = flattenShelterResponse(response)
    })
    .then(function() {
      return flatPet
    })
}

function flattenShelterResponse(apiResponse) {
  let shelter = apiResponse.petfinder.shelter
  let newShelter = {}
  newShelter["name"] = shelter.name.$t
  if (!jQuery.isEmptyObject(shelter.phone)) {
    newShelter["phone"] = shelter.phone
  }
  if (!jQuery.isEmptyObject(shelter.email)) {
    newShelter["email"] = shelter.email.$t
  }
  return newShelter
}
