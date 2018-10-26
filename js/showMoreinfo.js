

function closemyfunction(infoPet){
  infoPet.parentElement.parentElement.removeChild(infoPet.parentElement)

}








function showmoreinfo(petID){
    /** stuff that gets pet using petID */

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
    `
  $("#section1").append(infoLiteral)


}
