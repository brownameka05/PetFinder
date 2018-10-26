

function showmoreinfo(petID){
  getPet(petID).then(function(pet){
    return thisPet = flattenPet(pet)
  }).then(function(newPet){
    console.log(newPet)
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
  if(!jQuery.isEmptyObject(shelter.latitude) && !jQuery.isEmptyObject(shelter.longiture)){
    newShelter['geoLocation'] = {'latitude' : shelter.latitude, 'longitude' : shelter.longitude} 
  }
  return newShelter
}