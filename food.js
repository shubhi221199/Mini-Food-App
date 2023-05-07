import navbar from "./utility.js";

import { getFood } from "./utility.js";

let container = document.getElementById("navbar-container");
container.innerHTML = navbar();

let btn = document.getElementById("btn").addEventListener("click", getFood);

let foodlistConatiner = document.getElementById("foodlist-container");

// document.getElementById("username").textContent = localStorage.getItem("username");

let name = localStorage.getItem("username") || "";

document.getElementById("username").innerHTML = name;