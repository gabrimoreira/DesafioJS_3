const pokemons = [];
const pokemonsClicados = [];
//Troquei a lógica de fazer várias requisições para fazer apenas uma

async function fetchPokemonData() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const data = await res.json();
  const pokemonList = data.results;
  console.log(pokemonList)
  const pokemonPromises = pokemonList.map(async (pokemon) => {
    const res = await fetch(pokemon.url);
    return res.json();
  });

  const pokemonsData = await Promise.all(pokemonPromises);

  console.log(pokemonsData);

  const cardsContainer = document.querySelector('.cards');

  pokemonsData.forEach((pokemon) => {
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

function cardClick(card, pokemon) {
  card.classList.toggle('clicado');
  const isClicado = card.classList.contains('clicado');

  if (isClicado) {
    if (pokemonsClicados.length < 6) {
      pokemonsClicados.push(pokemon);
    } else {
      const resposta = confirm('Você atingiu o limite de 6 Pokémons. Deseja criar o seu time?');
      if (resposta) {
        const btnFormulario = document.getElementById('btn-formulario');
        btnFormulario.scrollIntoView({ behavior: 'smooth' });
        card.classList.toggle('clicado');
      }
      else{
        card.classList.toggle('clicado');
      }
    }
  } else {
    const index = pokemonsClicados.indexOf(pokemon);
    if (index !== -1) {
      pokemonsClicados.splice(index, 1);
    }
  }

  console.log('Pokémons Clicados:', pokemonsClicados);
}


function salvarTime() {
  if (pokemonsClicados.length >= 1 && pokemonsClicados.length <= 6) {
    const nomeTime = document.getElementById('time_input').value;

    const timeData = {
      nome: nomeTime,
      pokemons: pokemonsClicados.map(pokemon => pokemon.id)
    };

    localStorage.setItem('pokemonTeam', JSON.stringify(timeData));

    window.location.href = 'times.html';
  } else {
    alert('Selecione entre 1 e 6 Pokémon para salvar o time.');
  }
}


// Chamada da função para carregar os dados dos Pokémon
fetchPokemonData();
