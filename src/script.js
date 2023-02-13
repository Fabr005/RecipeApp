
const searchBtn = document.getElementById('search-btn'),
      mealList = document.getElementById('meal'),
      recipeCloseBtn = document.getElementById('recipe-close-btn'),
      mealsDetailsContent = document.querySelector('.meal-details-content'),
      mealDetails = document.querySelector('.meal-details');

searchBtn.addEventListener('click', getMealList);      
mealList.addEventListener('click', getMealRecipe);      


async function getMealList(){
  let searchInputTxt = document.getElementById('search-input').value.trim();
  // fetchinng meal from api
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`);
    let data =await response.json()
    createMealList(data.meals);
  } catch (error) {
    console.log(`there is an Error ${error}`);
  }
}

function createMealList(meal) {
  mealList.innerHTML = ''; // remove previous HTML elements
  if (meal) {
    for (let i = 0; i < meal.length; i++) {
      mealList.innerHTML += `
        <div class="meal-item" data-id="${meal[i].idMeal}">
          <div class="meal-img">
            <img src=${meal[i].strMealThumb} alt="food">
          </div>
          <div class="meal-name">
            <h3>${meal[i].strMeal}</h3>
            <a href="#" class="recipe-btn showRecipe">Get Recipe</a>
          </div>
        </div>
      `;
    }
    mealList.classList.add("meal");
    mealList.classList.remove("notFound");
  }else{

    mealList.innerHTML = `<p>Sorry we didn't find Your meal</p>`
    mealList.classList.remove("meal");
    mealList.classList.add("notFound");
  }

  let recipeBtns = document.querySelectorAll('.recipe-btn');
  recipeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mealDetails.classList.add("showRecipe");
    });
  });
  recipeCloseBtn.addEventListener('click', ()=>{
    mealDetails.classList.remove("showRecipe");
  })
}

//Get recipe of the meal
async function getMealRecipe(event){
  event.preventDefault();
  if (event.target.classList.contains('showRecipe')) {
    let currentMeal = event.target.parentElement.parentElement;    
      // fetchinng data from recipe api 
      const newResponse = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${currentMeal.dataset.id}`);
      let newData = await newResponse.json()
      displayMealRecipe(newData.meals[0]);
    
    
  }
}

function displayMealRecipe(displayMeal){
  mealsDetailsContent.innerHTML =`
        <h2 class = "recipe-title">${displayMeal.strMeal}</h2>
        <p class = "recipe-category">${displayMeal.strCategory}</p>
        <div class = "recipe-instruct">
          <h3>Instructions:</h3>
          <p>${displayMeal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
          <img src = "${displayMeal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
          <a href = "${displayMeal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
  `
}