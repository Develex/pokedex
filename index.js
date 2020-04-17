// Navigation buttons
pageSlider = document.getElementById('page-slider');
document.getElementById('link-pokemon').addEventListener("click", function () {
    UIkit.slider(pageSlider).show(0);
});
document.getElementById('link-types').addEventListener("click", function () {
    UIkit.slider(pageSlider).show(1);
});
document.getElementById('link-moves').addEventListener("click", function () {
    UIkit.slider(pageSlider).show(3);

});

//pokeAPI Wrapper
// const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

// Get Pokemon Table.
const pokemonTable = document.getElementById('pokemon-table');

//Pokemon Navigation Buttons
const spriteCheckbox = document.getElementById('sprites');
const type1Select = document.getElementById('type1');
spriteCheckbox.addEventListener("change", request);
type1Select.addEventListener("change", request);

function request() {

    getPokemonList()
        .then(function (response) {
            // Get existing table rows and delete them.
            pokemonTable.innerHTML = "";
            for (let element of response.pokemon) {
                getPokemon(element.pokemon.name)
                    .then(function (response) {

                        let types = [];
                        if (response.types.length === 2) {
                            types[0] = response.types[0].type.name;
                            types[1] = response.types[1].type.name;
                        } else {
                            types[0] = response.types[0].type.name;
                            types[1] = null;
                        }
                        createPokemonRow(response.id, response.name, types[0], types[1], response.sprites.front_default);
                    });
            }
        });
}

async function getPokemonList() {
    return P.getTypeByName(type1Select.value);
}

async function getPokemon(name) {
    return P.getPokemonByName(name);
}

function createPokemonRow(id, name, type1, type2, spriteUrl) {
    let tr = document.createElement('tr');
    let td = [];
    td[0] = document.createElement('td');
    td[1] = document.createElement('td');
    td[2] = document.createElement('td');
    td[3] = document.createElement('td');
    td[4] = document.createElement('td');

    if (spriteCheckbox.checked === true) {
        td[1].innerHTML = "<img src='" + spriteUrl + "' alt='Sprite " + name + "'>";
    } else {
        td[1].innerHTML = "";
    }
    td[0].innerHTML = id;
    td[2].innerHTML = name;
    td[3].innerHTML = type1;
    td[4].innerHTML = type2;

    if (type1 !== '') {
        td[3].classList.add("type-base", "type-" + type1);
    }
    if (type2 !== '') {
        td[4].classList.add("type-base", "type-" + type2);
    }

    tr.append(td[0]);
    tr.append(td[1]);
    tr.append(td[2]);
    tr.append(td[3]);
    tr.append(td[4]);

    pokemonTable.append(tr);
}












