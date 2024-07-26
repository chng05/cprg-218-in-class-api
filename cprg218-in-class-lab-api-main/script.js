// Reorder of code snippets in https://learn.sait.ca/d2l/le/content/688713/viewContent/16706483/View 

// Fetch Pokémon categories
async function fetchPokemonCategories() {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    const data = await response.json();
    return data.results;
  }
  
  // Fetch details of each category
  async function fetchPokemonsByCategory(category) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${category}`);
    const data = await response.json();
    return data.pokemon.map((p) => p.pokemon);
  }
  
  // Fetch Pokémon details
  async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const pokemonResults = await response.json();
    return pokemonResults;
  }
  
  // Populate the dropdown with Pokémon categories
  function populateDropdown(dropdown, categories) {
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category.name;
      option.textContent = category.name;
      dropdown.appendChild(option);
    });
  }
  
  // Create a Pokémon card element
  function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;
  
    const name = document.createElement('h3');
    name.textContent = pokemon.name;
  
    card.appendChild(img);
    card.appendChild(name);
  
    return card;
  }
  
  // Display Pokémon cards in the container
  function displayPokemonCards(container, pokemons) {
    container.innerHTML = '';
    pokemons.forEach((pokemon) => {
      // fetch pokemon details
      fetchPokemonDetails(pokemon.url)
        .then((details) => {
          const card = createPokemonCard(details);
          container.appendChild(card);
        })
        .catch((error) =>
          console.error('Error fetching Pokémon details:', error)
        );
    });
  }
  
  // Show dropdown and display results based on selection
  function showDropdownAndDisplayResults() {
    // get the dropdown and card container
    const dropdown = document.getElementById('pokemon-categories');
    const cardsContainer = document.getElementById('pokemon-cards');
  
    // fetch and display dropdown list values
    fetchPokemonCategories()
      .then((categories) => populateDropdown(dropdown, categories))
      .catch((error) =>
        console.error('Error fetching Pokémon categories:', error)
      );
  
    // apply dropdown select value to results and display pokemon results
    dropdown.addEventListener('change', () => {
      // get dropdown value
      const category = dropdown.value;
  
      if (category) {
        // fetch pokemons based on dropdown category value
        fetchPokemonsByCategory(category)
          .then((pokemons) => displayPokemonCards(cardsContainer, pokemons))
          .catch((error) => console.error('Error fetching Pokémon:', error));
      } else {
        cardsContainer.innerHTML = '';
      }
    });
  }
  
  // Initialize dropdown and results 
  document.addEventListener('DOMContentLoaded', showDropdownAndDisplayResults);