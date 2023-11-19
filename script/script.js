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
  