/*const url = window.location.href
const urlObj = new URL(url)
const params = urlObj.searchParams*/

const params = new URLSearchParams(window.location.search);
nomeTime = params.get('nome');
titulo = document.querySelector('.titulo');
titulo.textContent += `- ${nomeTime} !`;
function verParametros(){
    const ids_pokemons = [];
    for(let i = 1; i <= 6; i++){
        ids_pokemons.push(params.get(`pokemon${i}`));
        fetchPokemonId(ids_pokemons[i-1]);
    }
}
async function fetchPokemonId(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    pokemon = await res.json();
    const cardsContainer = document.querySelector('.cards');
    card = criaPokemonCard(pokemon);
    cardsContainer.append(card);
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
      <div class = "card-status">
        <p>Status:</p>
        <ul>
          <li>HP: ${pokemon.stats[0].base_stat}</li>
          <li>Attack: ${pokemon.stats[1].base_stat}</li>
          <li>Defense: ${pokemon.stats[2].base_stat}</li>
        </ul>
      </div>
    `;
  
    return card;
  }
verParametros();