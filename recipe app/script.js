const mealsContainer = document.querySelector(".random-meals-container");

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

async function getMealsById(id){
    const response = await fetch(
        `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const restData = await response.json();
    const meal = await restData.meal;
}

async function getMealByName(mealName){
    const response = await fetch(
        `www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );

    const restData = await response.json();
    const meal = await restData.meal;
}   
 
async function getNRandomMeal(n){
    for(let i = 0; i < n; i++){
        const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        
        const resData = await response.json();
        const randomMeal = resData.meals[0];

        console.log(randomMeal);
    }
}

function renderMealCard(mealObj){
    let mealCard = document.createElement("div");
    mealCard.className = "meal-card";
}

getNRandomMeal(6)

