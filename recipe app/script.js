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

        console.log(randomMeal);
        renderMealCard(randomMeal)
    }
}

function renderMealCard(mealObj){
    let mealCard = document.createElement("div");
    mealCard.className = "meal-card";
    
    let mealImg = document.createElement("img");
    mealImg.className = "meal-card-img";
    mealImg.setAttribute("src", mealObj.strMealThumb);

    let mealTitle = createBtnEventListener(mealObj);
    mealTitle.innerText = mealObj.strMeal;

    let mealHeart = createFavEventLisstener(mealObj);

    mealCard.appendChild(mealImg);
    mealCard.appendChild(mealTitle);
    mealCard.appendChild(mealHeart);

    mealsContainer.appendChild(mealCard);
}

function createFavEventLisstener(mealObj){
    let mealHeart = document.createElement("img");
    mealHeart.className = "fav-icon";
    mealHeart.setAttribute("src", "images/white-heart.svg");

    mealHeart.addEventListener("click", () => {
        if(mealHeart.getAttribute("src") === "images/white-heart.svg"){
            mealHeart.setAttribute("src", "images/red-heart.svg");
            addToFavourites(mealObj.idMeal);
        }else{
            mealHeart.setAttribute("src", "images/white-heart.svg");
            removeFromFavourites(mealObj.idMeal);
            console.log("hello")
        }
    })

    return mealHeart;
}

//favourites

function addToFavourites(mealId){
    if(localStorage.favs === undefined){
        let favs = "";
        favs = favs.concat(mealId);
        localStorage.favs = favs;
    }else{
        favs = localStorage.favs;
        favs = favs.concat("," + mealId);
        localStorage.favs = favs;
    }

    console.log(localStorage.favs)
}

function removeFromFavourites(mealId){
    let favs = localStorage.favs;
    let startMealIdIndex = favs.indexOf(mealId); 
    let endMealIdIndex = favs.indexOf(",", startMealIdIndex); 

    if(startMealIdIndex === 0){
        favs = favs.substring(endMealIdIndex + 1);
    }else if(endMealIdIndex === favs.length - 1){
        favs = favs.substring(0, startMealIdIndex);
    }else {
        favs = favs.substring(0, startMealIdIndex).concat(favs.substring(endMealIdIndex + 1));
    }

    localStorage.favs = favs;

    console.log(localStorage.favs)
}

//
function createBtnEventListener(mealObj){

    let btn = document.createElement("button");
    btn.className = "meal-card-name";

    btn.addEventListener("click", (event) => {
        let overyLayCheck = document.querySelector(".over-lay");

        if(overyLayCheck !== null){
            console.log("We in !!!!!!!!!!");
            overyLayCheck.remove();
        }

        let overLay = document.createElement("div");
        overLay.className = "over-lay";

        let recipeContainer = document.createElement("div");
        recipeContainer.className = "recipe-container";

        //<button class="my-2">X</button>
        let closeBtn = document.createElement("button");
        closeBtn.innerText = "X"
        closeBtn.className = "my-2";

        closeBtn.addEventListener("click", (event) => {
            console.log(event)
            const overLay = document.querySelector(".over-lay");
            overLay.style.display = "none";
        })

        let recipeTitle = document.createElement("h2");
        recipeTitle.className = "recipe-title";
        recipeTitle.innerText = mealObj.strMeal;

        let recipeImg = document.createElement("img");
        recipeImg.className = "recipe-img";
        recipeImg.setAttribute("src", mealObj.strMealThumb);

        let recipeIngr = document.createElement("h3");
        recipeIngr.className = "left-align mx-2 recipe-ingre";
        recipeIngr.innerText = "Ingredients";

        let ul = createIngredientList(mealObj);

        let instructionsIngr = document.createElement("h3");
        instructionsIngr.className = "left-align mx-2 recipe-instr";
        instructionsIngr.innerText = "Instructions";

        let instructions = document.createElement("p");
        instructions.className = "left-align mx-2 my-1";
        instructions.innerText = mealObj.strInstructions;

        recipeContainer.appendChild(closeBtn);
        recipeContainer.appendChild(recipeTitle);
        recipeContainer.appendChild(recipeImg);
        recipeContainer.appendChild(recipeIngr);
        recipeContainer.appendChild(ul);
        recipeContainer.appendChild(instructionsIngr);
        recipeContainer.appendChild(instructions);

        overLay.appendChild(recipeContainer);

        document.querySelector("body").prepend(overLay);
    })

    return btn;
}

function createIngredientList(mealObject){
    let ul = document.createElement("ul");
    ul.className = "left-align mx-2 my-1 recipe-ingre-list";

    let keys = Object.keys(mealObject);

    console.log(keys);

    keys.forEach(key => {
        if(key.indexOf("strIngredient") !== -1 && mealObject[key] !== ""){
            let li = document.createElement("li");
            li.innerText = mealObject[key];
            ul.appendChild(li);
        }
    })

    return ul;
}

async function getAllMealsForCategory(category){
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${category}`
    )

    const resData = await response.json();
    const meals = resData.meals;

    renderMealCardCategory(meals);
}

async function getMealsById(id){
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const restData = await response.json();
    const meal = await restData.meals[0];

    let mealTitle = createBtnEventListener(meal);
    mealTitle.innerText = meal.strMeal;

    return mealTitle;
}

function renderMealCardCategory(meals){
    let mealsContainer = document.createElement("div");
    mealsContainer.className = "meals-container my-2";
    mealsContainer.id = "ingre-recipe";

    meals.forEach(async mealObj => {
        //console.log(mealObj)

        let mealCard = document.createElement("div");
        mealCard.className = "meal-card";
        
        let mealImg = document.createElement("img");
        mealImg.className = "meal-card-img";
        mealImg.setAttribute("src", mealObj.strMealThumb);
    
        let mealTitle = await getMealsById(mealObj.idMeal);
    
        console.log(mealTitle);
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
    
        let mealTitle = createBtnEventListener(mealObj);
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
