//On va récupérer les données brut pour les transformer en français.
let allPokemon = [];
let tableauFin = [];

//On va selectionner notre input pour faire disparaitre le texte au moment de la recherche

const searchInput = document.querySelector('.recherche-poke input');

// On va appeler l'API de Pokemon
function fetchPokemonBase(){
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(reponse => reponse.json())
        .then((allPoke) => {
            //console.log(allPoke); Ca fonctionne, on en a plus besoin
            allPoke.results.forEach((pokemon) => { // Pour chaque élément du tableau on envoi une fonction avec pokemon comme paramètre
                fetchPokemonComplet(pokemon);
            });
        });
}
fetchPokemonBase();

function fetchPokemonComplet(pokemon) {

    let objPokemonFull = {}; //Pokemon complet avec image, nom, type...
    let url = pokemon.url;
    let nameP = pokemon.name;

    fetch(url)
        .then(reponse => reponse.json())
        .then((pokeData) => {
            //console.log(pokeData); Ca fonctionne

            objPokemonFull.pic = pokeData.sprites.front_default;
            objPokemonFull.type = pokeData.types[0].type.name;
            objPokemonFull.id = pokeData.id;

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
            .then(reponse => reponse.json())
            .then((pokeData) => {
                //console.log(pokeData);

                objPokemonFull.name = pokeData.names[4].name;
                allPokemon.push(objPokemonFull);

                if(allPokemon.length === 151) {
                    //console.log(allPokemon);

                    tableauFin = allPokemon.sort((a,b) => { // .sort pour trier les id
                        return a.id - b.id;
                    }).slice(0,21); //on coupe le tableau par tranche de 21 cartes
                    //console.log(tableauFin);
                }
            })
        })
}

//Animation input, ie dès qu'on va entrer dans l'input

searchInput.addEventListener('input', function(e) {
    if(e.target.value !=="")   {//S'il y a une lettre dans l'input. e contient les propriétés de l'événement. Target: notre input, et value: ce qu'il y a à l'intérieure
        e.target.parentNode.classList.add('active-input'); // si input !== de vide on lui rajoute une class avec la methode .add
    } else if (e.target.value === "" ) {
        e.target.parentNode.classList.remove('active-input'); // GO to the CSS
    }
    
})