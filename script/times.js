document.addEventListener('DOMContentLoaded', () => {
  const storedData = localStorage.getItem('pokemonTeam');
  if (storedData) {
    const teamData = JSON.parse(storedData);
    const nomeTime = teamData.nome;
    const pokemonIds = teamData.pokemons;

    const titulo = document.querySelector('.titulo');
    titulo.textContent += `- ${nomeTime} !`;

    pokemonIds.forEach(id => fetchPokemonId(id));
  } else {
    console.error('No team data found in localStorage');
  }
});

async function fetchPokemonId(id) {
  if (id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await res.json();
    const cardsContainer = document.querySelector('.cards');
    const card = criaPokemonCard(pokemon);
    cardsContainer.append(card);
  }
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
    <div class="card-status">
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
