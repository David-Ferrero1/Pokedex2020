//On va récupérer les données brut pour les transformer en français.
let allPokemon = [];
let tableauFin = [];


//On va selectionner notre input pour faire disparaitre le texte au moment de la recherche

const searchInput = document.querySelector('.recherche-poke input');
const listePoke = document.querySelector('.liste-poke');


// les couleurs de bcg

const types = {
    grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};

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
};
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

                    //on va créer le tableauFin avec toute les carte triées 
                    createCard(tableauFin);
                }
            })
        })
}

//Création des cartes

function createCard(arr) {
    for(let i = 0; i < arr.length; i++) {

        const carte = document.createElement('li');
        let couleur = types[arr[i].type];
        carte.style.background = couleur;
        const txtCarte = document.createElement('h5');
        txtCarte.innerText = arr[i].name;
        const idCarte = document.createElement('p');
        idCarte.innerText = `ID# ${arr[i].id}`;
        const imgCarte = document.createElement('img');
        imgCarte.src = arr[i].pic;

        carte.appendChild(imgCarte);
        carte.appendChild(txtCarte);
        carte.appendChild(idCarte);

        listePoke.appendChild(carte);
    }
}

//Scroll infini
//on est à l'écoute d'un événement sur notre page
window.addEventListener('scroll', () => {

const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    //dans document et documentElement, on a les trois éléments
        // ScrollTop    : se qu'on a scrollé depuis le TOP
        // ScrollHeight : c'est la hauteur totale du site
        // clientHeight : hauteur du site que l'on voit, partie visible
    //console.log(scrollTop, scrollHeight, clientHeight);
    
    if(clientHeight + scrollTop >= scrollHeight - 20 ) {  //si la partie visble + la partie scrollé depuis le top >= au scroll total - 20, on appliquera la méthode addPoke 
        addPoke(6);
    }

})

let index = 21;

function addPoke(nb) {

    if ( index > 151) {
        return;
    } 
    const arrToAdd = allPokemon.slice(index, index + nb); //ici on appel 6 pokemon de plus après 21, 6 vu plus haut
    createCard(arrToAdd);  // ici on rappel la fonction de création de carte avec les pokemon à la suite
    index += nb;  // pour bien les prendres à la suite on actualise index
}


// Recherche
    //Ici on va être à l'écoute d'un événement l'orsqu'une touche se relève: KeyUp sur searchInput

//searchInput.addEventListener('keyup', recherche)

// activation du btn rechercher
const formRecherche = document.querySelector('form')
formRecherche.addEventListener('submit', (e) => {
    e.preventDefault();  // on empèche le refresh par defaut
    recherche();

})

function recherche() {   // On veut que tous s'affiche lors d'une recherche
    if(index < 151) {
        addPoke(130)
    }

    let filter, allLi, titleValue, AllTitles;

    filter = searchInput.value.toUpperCase();
    allLi = document.querySelectorAll('li');
    AllTitles = document.querySelectorAll('li > h5');  // Tous les h5 qui sont dans les li

    // On va gérer le système de recherche
    for (i = 0; i < allLi.length; i++) {
        titleValue = AllTitles[i].innerText

        //on va comparer le nom du pokemon avec notre recherche
        if(titleValue.toUpperCase().indexOf(filter) > -1) {
            allLi[i].style.display = "flex";  // pas indispensable car déjà flex
        } else {
            allLi[i].style.display = "none";
        }
    }


}

//Animation input, ie dès qu'on va entrer dans l'input

searchInput.addEventListener('input', function(e) {
    if(e.target.value !=="")   {//S'il y a une lettre dans l'input. e contient les propriétés de l'événement. Target: notre input, et value: ce qu'il y a à l'intérieure
        e.target.parentNode.classList.add('active-input'); // si input !== de vide on lui rajoute une class avec la methode .add
    } else if (e.target.value === "" ) {
        e.target.parentNode.classList.remove('active-input'); // GO to the CSS
    }
    
})