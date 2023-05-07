import navbar from "./utility.js";

import { getFood } from "./utility.js";

let container = document.getElementById("navbar-container");
container.innerHTML = navbar();

let btn = document.getElementById("btn").addEventListener("click", getFood);

let foodlistConatiner = document.getElementById("foodlist-container");

async function food() {
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );

    let jsonData = await data.json();
    console.log(jsonData);
    if (jsonData.meals == null) {
      foodlistConatiner.innerHTML = "";
      let h2 = document.createElement("h2");
      h2.setAttribute("class", "error-container");
      h2.textContent = "No such Food";

      foodlistConatiner.append(h2);
    } else {
      displayFood(jsonData.meals);
    }
  } catch (e) {
    console.log(e);
  }
}

food();

function displayFood(dataa) {
  foodlistConatiner.innerHTML = "";
  dataa.map(({ idMeal, strArea, strCategory, strMeal, strMealThumb, strIngredient1, strIngredient2,
    strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strInstructions
  }) => {
    let cont = document.createElement("div");
    cont.class = "cont";

    let imgDiv = document.createElement("div");
    imgDiv.class = "imgDiv";
    let image = document.createElement("img");
    image.src = strMealThumb;
    imgDiv.append(image);

    let descriptionDiv = document.createElement("div");
    descriptionDiv.class = "descriptionDiv";
    let name = document.createElement("h2");
    name.textContent = strMeal;

    let category = document.createElement("h3");
    category.textContent = " ( " + strCategory + " ) ";

    let desc = document.createElement("p");
    desc.textContent = strArea;

    let ingredient = document.createElement("p")
    ingredient.textContent = "Ingredient : " + strIngredient1 +" , "+ strIngredient2 +" , "+
    strIngredient3 +" , "+ strIngredient4 +" , "+ strIngredient5 +" , "+ strIngredient6 +" , "+ strIngredient7 +" , "+ strIngredient8 +" , "+ strIngredient9 +" , "+ strIngredient10;

    let process = document.createElement("p");
    process.textContent = "Description : "+strInstructions;
    descriptionDiv.append(name, category, desc, ingredient, process);

    cont.append(imgDiv, descriptionDiv);

    foodlistConatiner.append(cont);
  });
}

let name = localStorage.getItem("username") || "";

document.getElementById("username").innerHTML = name;
