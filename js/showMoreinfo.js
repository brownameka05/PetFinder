

function closemyfunction(infoPet){
  infoPet.parentElement.parentElement.removeChild(infoPet.parentElement)
  console.log(infoPet)
}







function showMoreInfo(petID){
  getPet(petID).then(function(pet){
    console.log(pet)
    return thisPet = flattenPet(pet)
  }).then(function(newPet){
    console.log(newPet)
    petLiteral = `
    <div id = "learnMore">
      <button onclick="closemyfunction(this)" id="btnInfo" > X </button>
      <img src = \"${newPet.images[0].$t}\" />
      <h3>Name: ${newPet.name}</h3>
      <p>Breed: ${newPet.breed}</p>
      <p>Sex: ${newPet.sex}</p>
      <p>Size: ${newPet.size}</p>
      <p>${newPet.description}</p>
      <div id = "shelterInfo">
        <h5>Shelter Info</h5>
        <h6>Name: ${newPet.shelterInfo.name}</h6>
    `
    if(!jQuery.isEmptyObject(newPet.shelterInfo.phone)){
      petLiteral += `     <p>Phone: ${newPet.shelterInfo.phone}</p>`
    }


    if(!jQuery.isEmptyObject(newPet.shelterInfo.email)){
      petLiteral += `      <p>Email: ${newPet.shelterInfo.email}</p>`
    }
    petLiteral +=`
      </div>
    </div>
    `
    console.log(petLiteral)
    $("#section1").append(petLiteral)

  })

}

function flattenPet(pet){
    let flatPet = {}
    flatPet['name'] = pet.name
    flatPet['images'] = pet.media.photos.photo
    flatPet['breed'] = pet.breeds.breed.$t
    flatPet['sex'] = pet.sex
    flatPet['size'] = pet.size
    flatPet['description'] = pet.description
    return getShelter(pet.shelterId).then(function(response){
      flatPet['shelterInfo'] = flattenShelterResponse(response)
    })
    .then(function(){
      return flatPet
    })
}

function flattenShelterResponse(apiResponse){
  let shelter = apiResponse.petfinder.shelter
  let newShelter = {}
  newShelter['name'] = shelter.name.$t
  if(!jQuery.isEmptyObject(shelter.phone)){
    newShelter['phone'] = shelter.phone
  }
  if(!jQuery.isEmptyObject(shelter.email)){
    newShelter['email'] = shelter.email.$t
  }
  if(!jQuery.isEmptyObject(shelter.latitude) && !jQuery.isEmptyObject(shelter.longitude)){
    newShelter['geoLocation'] = {'latitude' : shelter.latitude.$t, 'longitude' : shelter.longitude.$t}
  }
  return newShelter
}
