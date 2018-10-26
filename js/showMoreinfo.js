
<<<<<<< HEAD

function closemyfunction(infoPet){
  infoPet.parentElement.parentElement.removeChild(infoPet.parentElement)

}








=======
>>>>>>> d64529b94b55b289528c3ad2b3a2d4f6f5bc3b1d
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

<<<<<<< HEAD
    infoLiteral = `
    <div id="learnMore">
      <button onclick="closemyfunction(this)" id="btnInfo"> X </Button>
      <img id="petPic" src="https://media.mwstatic.com/product-images/880x660/alt1/962/962441.jpg">
      <h3>Rex</h3>
      <p>Age: 3</p>
      <p>Breed: Boxer Mix</p>
      <p>Good With: kids, cats, babies</p>
      <p>About me:  I love to play in water and cuddle at night. I don't bark much but I love to eat when you do. I don't like water but if you give me a loving bath I wont be too much trouble</p>
    <div>
=======
    if(!jQuery.isEmptyObject(newPet.shelterInfo.email)){
      petLiteral += `      <p>Email: ${newPet.shelterInfo.email}</p>`
    }
    petLiteral +=`
      </div>
    </div>
>>>>>>> d64529b94b55b289528c3ad2b3a2d4f6f5bc3b1d
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