import navbar from "./utility.js";

import { getFood } from "./utility.js";

let container = document.getElementById("navbar-container");
container.innerHTML = navbar();

let btn = document.getElementById("btn").addEventListener("click", getFood);

let foodlistConatiner = document.getElementById("foodlist-container");

async function food() {
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );

    let jsonData = await data.json();
    console.log(jsonData);
    if (jsonData.categories == null) {
      foodlistConatiner.innerHTML = "";
      let h2 = document.createElement("h2");
      h2.setAttribute("class", "error-container");
      h2.textContent = "No such Food";

      foodlistConatiner.append(h2);
    } else {
      displayFood(jsonData.categories);
    }
  } catch (e) {
    console.log(e);
  }
}

food();

function displayFood(data) {
    foodlistConatiner.innerHTML = "";
  data.map(({ strCategoryThumb, strCategory, strCategoryDescription }) => {
    let div = document.createElement("div");

    let image = document.createElement("img");
    image.src = strCategoryThumb;

    let category = document.createElement("h3");
    category.textContent = strCategory;

    let desc = document.createElement("p");
    desc.textContent = strCategoryDescription;

    div.append(image, category, desc);

    foodlistConatiner.append(div);

  });
}

let name = localStorage.getItem("username") || "";

document.getElementById("username").innerHTML = name;
