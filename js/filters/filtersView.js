const filtersContainer = document.getElementById("filtersContainer")

// <div id="burger-btn" onclick=toggleBurger(this)>
//   <div id="burger-top"></div>
//   <div id="burger-mid"></div>
//   <div id="burger-bot"></div>
// </div>
/* <div id="filter-filtersToggle" onclick=toggleBurger(this)>
    <button class="btn-filter">Filters</button>
    </div> */
const filtersHTML = /*html*/ `

<div id="filter-nav">
<div id="burger-btn" onclick=toggleBurger(this)>
  <div id="burger-top"></div>
  <div id="burger-mid"></div>
  <div id="burger-bot"></div>
</div>
  <div id="filter-viewToggle">
    <button class="btn-filter">List</button>
    <button class="btn-filter">Map</button>
  </div>
</div> 

<div class="filters-list">
<div class="filter-animal">
<label class="filter-label"for="select-type">Type</label>
<select id="select-type" class="demo-default" multiple>
  <option value="">Select an animal type...</option>
  <option value="dog">Dogs</option>
  <option value="cat">Cats</option>
</select>
</div>

<div class="filter-breed">
<label class="filter-label"for="select-breed">Breed</label>
<select id="select-breed" class="demo-default" multiple>
  <option value="">Select a breed...</option>
  <option value="a">Pit Bull</option>
  <option value="b">Boxer</option>
  <option value="c">Huskey</option>
</select>
</div>

<div class="filter-size">
<label class="filter-label"for="select-size">Size</label>
<select id="select-size" class="demo-default" multiple>
  <option value="">Size</option>
  <option value="small">Small</option>
  <option value="medium">Medium</option>
  <option value="large">Large</option>
  <option value="extraLarge">Extra Lage</option>
</select>
</div>

<div class="filter-age">
  <label class="filter-label"for="select-age">Age</label>
  <select id="select-age" class="demo-default" multiple>
    <option value="">Age<option>
    <option value="Baby">Baby</option>
    <option value="Young">Young</option>
    <option value="Adult">Adult</option>
    <option value="Senior">Senior</option>
  </select>
</div>

<div class="filter-sex">
<label class="filter-label" for="select-sex">Sex</label>
<select id="select-sex" class="demo-default" multiple>
  <option value="">Sex<option>
  <option value="female">Female</option>
  <option value="male">Male</option>
</select>
</div>

<div id="filter-location">
  <label class="filter-label"for="textbox-location">ZipCode</label>
  <input type="text" name="textbox-location" id="textbox-location">
</div>
</div>
    `

filtersContainer.innerHTML = filtersHTML
