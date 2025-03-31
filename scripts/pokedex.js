const commonPokemonNames = ['Pikachu ', 'Charizard', 'Bulbasaur', 'Squirtle', 'Jigglypuff', 'Gengar', 'Eevee', 'Snorlax', 'Lucario', 'Mewtwo']
let commonPokemons = []

const pokemonListWrapper = document.getElementById('pokemon-list-wrapper')






const getPokemonFromAPI = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();

      return json

    } catch (error) {
      console.error(error.message);
    }
}
const carousel = document.querySelector(".carousel");
let items = null;
const prevBtn = document.querySelector(".btn-left");
const nextBtn = document.querySelector(".btn-right");
let currentIndex = 1; // Środkowy element na początku

const createPokemonInfoDiv = (p) => {
    const div = document.createElement('div')
    div.classList.add("pokemon-card-carousel")

    const img = document.createElement('img')
    img.classList.add('pokemon-card-carousel-img')
    
    const divInfo = document.createElement('div')
    divInfo.classList.add("pokemon-card-carousel-info")

    const h2 = document.createElement('h2')
    const heightInfo = document.createElement('span')
    const weightInfo = document.createElement('span')

    if (["name", "sprites", "height", "weight"].every(key => key in p)){
        img.src = p.sprites.other.showdown.front_default
        h2.textContent = p.name.toUpperCase()
        heightInfo.textContent = `Height: ${p.height}`
        weightInfo.textContent = `Weight: ${p.weight}`
    }

    divInfo.appendChild(h2)
    divInfo.appendChild(heightInfo)
    divInfo.appendChild(weightInfo)

    div.appendChild(img)
    div.appendChild(divInfo)

    return div
}

const initCarousel = (items) => {
    for (let index = 0; index < items.length; index++) {
        const pokemonInfo = createPokemonInfoDiv(items[index])
        pokemonInfo.classList.add('carousel-item')

        if(index == (items.length / 2)){
            pokemonInfo.classList.add('middle')
        }
        
        carousel.appendChild(pokemonInfo)
    }
}



function updateCarousel() {
    
    carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
    
    console.log(items);
    
    items.forEach(item => item.classList.remove("middle"));
    items[currentIndex].classList.add("middle");
}

nextBtn.addEventListener("click", () => {
    if (currentIndex < items.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = items.length - 1;
    }
    updateCarousel();
});


// updateCarousel(); // Ustawienie pierwszego środkowego elementu

// CAROUSEL STUFF DOWN HERE
// const carouselItems = [
//     {
//         name: 'Charizard',
//         age: 20
//     },
//     {
//         name: 'Blizzard',
//         age: 20
//     },
//     {
//         name: 'Mewtrwo',
//         age: 20
//     },
//     {
//         name: 'sasas',
//         age: 20
//     }
// ]

// const middlePokemon = commonPokemons[Math.floor(commonPokemons.length / 2)]

// const prevButton = document.getElementById('prevButton')
// const nextButton = document.getElementById('prevButton')


// const updateCarousel = (side) => {
//     const carouselItemLeft = createPokemonCard(pokemons[middlePokemonIndex - 1])
//     carouselItemLeft.classList.add('carousel-item')

//     const carouselItemRight = createPokemonCard(pokemons[middlePokemonIndex + 1])
//     carouselItemRight.classList.add('carousel-item')

//     const carouselItemMain = createPokemonCard(middlePokemon)
//     carouselItemMain.classList.add('carousel-main-item')
//     if(side == 'prev'){

//     }

//     if(side == 'next'){

//     }
// }

// const createPokemonCard = (pokemon) => {
//     const wrapper = document.createElement('div')
//     const h2 = document.createElement('h2')
//     const img = document.createElement('img')

//     wrapper.className = 'pokemon-card-slide'

//     if("name" in pokemon && "sprites" in pokemon){
//         h2.textContent = pokemon.name
//         img.src = pokemon.sprites.front_default
//     }

//     wrapper.appendChild(h2)
//     wrapper.appendChild(img)

//     return wrapper
// }

// const initCarousel = (pokemons) => {
//     const carouselWrapper = document.querySelector('.carousel-wrapper')

//     const middlePokemon = pokemons[Math.floor(pokemons.length / 2)]
//     const middlePokemonIndex = pokemons.indexOf(middlePokemon)


//     const carouselItemLeft = createPokemonCard(pokemons[middlePokemonIndex - 1])
//     carouselItemLeft.classList.add('carousel-item')

//     const carouselItemRight = createPokemonCard(pokemons[middlePokemonIndex + 1])
//     carouselItemRight.classList.add('carousel-item')

//     const carouselItemMain = createPokemonCard(middlePokemon)
//     carouselItemMain.classList.add('carousel-main-item')


    
//     carouselItemMain.id = `item-${middlePokemonIndex}`
//     carouselItemLeft.id = `item-${middlePokemonIndex - 1}`
//     carouselItemRight.id = `item-${middlePokemonIndex + 1}`

   
    
    
    
//     carouselWrapper.appendChild(carouselItemLeft)
//     carouselWrapper.appendChild(carouselItemMain)
//     carouselWrapper.appendChild(carouselItemRight)
// }


// prevButton.onclick = updateCarousel('prev')
// nextButton.onclick = updateCarousel('next')




// odpala sie przy 1 renderze strony wyswietla przykladowe pokemony
document.addEventListener('DOMContentLoaded', async () => {
    
    for (let index = 0; index < commonPokemonNames.length; index++) {
        var pokemon = await getPokemonFromAPI(commonPokemonNames[index])
        commonPokemons.push(pokemon)
    }

    console.log(commonPokemons);
    

    commonPokemons.forEach(pokemon => {
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const img = document.createElement('img')

        div.className = "pokemon-card"

        h2.textContent = pokemon.name

        img.src = pokemon.sprites.front_default
        img.alt = `Cover photo of ${pokemon.name}`

        div.appendChild(h2)
        div.appendChild(img)

        pokemonListWrapper.appendChild(div)
    })

    initCarousel(commonPokemons);
    items = document.querySelectorAll(".carousel-item")
 
})







