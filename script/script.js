const pokemons = [];
const pokemonsClicados = [];

async function fetchPokemonData() {
    for (let i = 1; i <= 151; i++) {
      //recebe o dado e não a promessa
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const pokemonData = await res.json();
      pokemons.push(pokemonData);
    }
  
    console.log(pokemons);
  
    const cardsContainer = document.querySelector('.cards');
  
    pokemons.forEach(pokemon => {
      const card = criaPokemonCard(pokemon);
      card.addEventListener('click', () => cardClick(card, pokemon));
      cardsContainer.appendChild(card);
    });
  }
  
  function criaPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" class="card-img-pokemon" alt="${pokemon.name}">
      <div class="card-body">
        <h5 class="card-title">${pokemon.name}</h5>
        <p class="card-text">ID: ${pokemon.id}</p>
        <p class="card-text">Type: ${pokemon.types[0].type.name}</p>
      </div>
      <div class="card-back">
      <p>Status:</p>
      <ul>
        <li>HP: ${pokemon.stats[0].base_stat}</li>
        <li>Attack: ${pokemon.stats[1].base_stat}</li>
        <li>Defense: ${pokemon.stats[2].base_stat}</li>
        <!-- Adicione mais status conforme necessário -->
      </ul>
    </div>
    `;
  
    return card;
  }
  