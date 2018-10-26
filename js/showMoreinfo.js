
function showmoreinfo(petID){
  getPet(petID).then(function(pet){
    return thisPet = flattenPet(pet)
  }).then(function(newPet){
    petLiteral = `
    <div id = "learnMore">
      <img src = \"${newPet.images[0]} />
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
      console.log(response)
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