const pokemonsAmount: number = 500;

const randomizePokemon = (min: number, max: number) => {  
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const fetchPokemon = async () => {
  try {
    const id: number = randomizePokemon(1, pokemonsAmount);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      const json = await response.json();
      const url = json.sprites.front_default;
      const name = json.name;;
      return {
        url, name, success: true
      };
    } else {
      return { success: false };
    };
  } catch(e) {
    return {
      success: false
    };
  };
};





