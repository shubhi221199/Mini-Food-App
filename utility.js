function navbar() {
  return `
  <div id="navbar">
  <img id="logo" src="https://cdn.worldvectorlogo.com/logos/swiggy-1.svg" />
  <div><h2 id="username"></h2></div>
    <div id="searchbar">
        <input type="text" placeholder="Type your Food" id="search">
        <button id="btn">Search</button>
    </div>
    <div><a href="day.html">Recipe of Day</a></div>
    <div><a href="random.html">Random Recipe</a></div>
    <div>
      <button id="login" onclick='window.location.href="login.html"'>Login</button>
      <button id="signup" onclick='window.location.href="signup.html"'>SignUp</button>
    </div>
  </div>`;
}

let foodlistConatiner = document.getElementById("foodlist-container");

function getFood() {
  // console.log("hello");
  return food();
}

async function food() {
  try {
    let searchQuery = document.getElementById("search").value;
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
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

function displayFood(data) {
  foodlistConatiner.innerHTML = "";
  data.map(({ idMeal, strArea, strCategory, strMeal, strMealThumb }) => {
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
    category.textContent = " ( "+strCategory+" ) ";

    let desc = document.createElement("p");
    desc.textContent = strArea;
    descriptionDiv.append(name,category,desc);

    cont.append(imgDiv, descriptionDiv)

    foodlistConatiner.append(cont);

  });
}



export default navbar;

export { getFood };
