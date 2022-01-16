const mealsContainer = document.querySelector(".meals-container");
const chickenBtn = document.querySelector("#chicken");
const beefBtn = document.querySelector("#beef");
const salmonBtn = document.querySelector("#salmon");
const form = document.querySelector("#meal-form");
const searchItemEl = document.querySelector(".searched-meal");

async function getRandomMeal(){
    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    
    const resData = await response.json();
    const randomMeal = resData.meals[0];

    return randomMeal;
}

async function getAllMealCategories(){
    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    
    const resData = await response.json();
    const allCategories = resData.categories;

    console.log(allCategories);
}

async function getMealsByCatergory(category){
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );

    const restData = await response.json();
    const meals = await restData.meals;
}

async function getMealsByMainIngredient(ingrediant){
    const response = await fetch(
        `www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediant}`
    );

    const restData = await response.json();
    const meals = await restData.meals;
}
 
async function getNRandomMeal(n){
    for(let i = 0; i < n; i++){
        const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        
        const resData = await response.json();
        const randomMeal = resData.meals[0];

        renderMealCard(randomMeal)
    }
}

function renderMealCard(mealObj){
    let mealCard = document.createElement("div");
    mealCard.className = "meal-card";
    
    let mealImg = document.createElement("img");
    mealImg.className = "meal-card-img";
    mealImg.setAttribute("src", mealObj.strMealThumb);

    let mealTitle = document.createElement("a");
    mealTitle.className = "meal-card-name";
    mealTitle.setAttribute("href", mealObj.strSource);
    mealTitle.innerText = mealObj.strMeal;

    mealCard.appendChild(mealImg);
    mealCard.appendChild(mealTitle);

    mealsContainer.appendChild(mealCard);
}

async function getAllMealsForCategory(category){
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${category}`
    )

    const resData = await response.json();
    const meals = resData.meals;

    renderMealCardCategory(meals);
}

async function getMealsById(id, mealTitle){
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const restData = await response.json();
    const meal = await restData.meals[0];

    console.log(meal.strSource)

    mealTitle.setAttribute("href", meal.strSource);
}

function renderMealCardCategory(meals){
    let mealsContainer = document.createElement("div");
    mealsContainer.className = "meals-container my-2";
    mealsContainer.id = "ingre-recipe";

    meals.forEach(mealObj => {
        //console.log(mealObj)

        let mealCard = document.createElement("div");
        mealCard.className = "meal-card";
        
        let mealImg = document.createElement("img");
        mealImg.className = "meal-card-img";
        mealImg.setAttribute("src", mealObj.strMealThumb);
    
        let mealTitle = document.createElement("a");
        mealTitle.className = "meal-card-name";
        mealTitle.innerText = mealObj.strMeal;
        mealTitle.setAttribute("target", "_blank");

        getMealsById(mealObj.idMeal, mealTitle)
    
        mealCard.appendChild(mealImg);
        mealCard.appendChild(mealTitle);
    
        mealsContainer.appendChild(mealCard);
    })

    document.querySelector("main").appendChild(mealsContainer);
}

function deleteIngredientRecipeContainer(){
    let recipeIngredientCon = document.querySelector("#ingre-recipe");

    if(recipeIngredientCon !== null){
        recipeIngredientCon.remove();
    }
}
chickenBtn.addEventListener("click", (event) => {
    deleteIngredientRecipeContainer()
    getAllMealsForCategory("chicken")
});

beefBtn.addEventListener("click", (event) => {
    deleteIngredientRecipeContainer()
    getAllMealsForCategory("beef")
});

salmonBtn.addEventListener("click", (event) => {
    deleteIngredientRecipeContainer()
    getAllMealsForCategory("salmon")
});

async function getMealByName(mealName){
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );

    const restData = await response.json();
    const meal = await restData.meal;
}   

async function getMealsByMainIngredient(ingrediant){
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediant}`
    );

    const restData = await response.json();
    const meals = await restData.meals;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let searched = form["search"].value;
    console.log(searched)

    try{
        const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searched
        );

        let mealCardInSearchEl = searchItemEl.querySelector(".meal-card");

        if(mealCardInSearchEl !== null) mealCardInSearchEl.remove();
    
        const restData = await response.json();
        const mealObj = await restData.meals[0];

        let mealCard = document.createElement("div");
        mealCard.className = "meal-card";
        
        let mealImg = document.createElement("img");
        mealImg.className = "meal-card-img";
        mealImg.setAttribute("src", mealObj.strMealThumb);
    
        let mealTitle = document.createElement("a");
        mealTitle.className = "meal-card-name";
        mealTitle.setAttribute("href", mealObj.strSource);
        mealTitle.innerText = mealObj.strMeal;
    
        mealCard.appendChild(mealImg);
        mealCard.appendChild(mealTitle);

        searchItemEl.appendChild(mealCard);

    }catch(error){
        console.log(error);
    }


    form.reset();
});

getNRandomMeal(6)


//https://themealdb.com/images/ingredients/Beef.png
//https://themealdb.com/images/ingredients/Salmon.png
//https://themealdb.com/images/ingredients/Chicken.png
