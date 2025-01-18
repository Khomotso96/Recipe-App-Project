const apiKey = "23f079c5277f4240a1e45b94dcf69ab3";
const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=${23f079c5277f4240a1e45b94dcf69ab3}&query=';

// Select form elements
const form = document.getElementById("recipe-form");
const queryInput = document.getElementById("query");
const recipesContainer = document.getElementById("recipes");

// Function to fetch recipes from Spoonacular
async function fetchRecipes(query) {
  try {
    const response = await fetch($(apiUrl)(query));
    const data = await response.json();
    displayRecipes(data.results);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipesContainer.innerHTML = "<p>Unable to fetch recipes. Please try again later.</p>";
  }
}

// Function to display recipes
function displayRecipes(recipes) {
  recipesContainer.innerHTML = "";
  if (recipes && recipes.length > 0) {
    recipes.forEach((recipe) => {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe");
      recipeCard.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, "-").toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a>
      `;
      recipesContainer.appendChild(recipeCard);
    });
  } else {
    recipesContainer.innerHTML = "<p>No recipes found. Please try another search.</p>";
  }
}

// Event listener for form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = queryInput.value.trim();
  if (query) {
    fetchRecipes(query);
  }
});