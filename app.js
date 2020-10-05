//On va selectionner notre input pour faire disparaitre le texte au moment de la recherche

const searchInput = document.querySelector('.recherche-poke input');

function fetchPokemonBase(){
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(reponse => reponse.json())
        .then((allPoke) => {
            console.log(allPoke);
        });
}
fetchPokemonBase();

//Animation input, ie dès qu'on va entrer dans l'input

searchInput.addEventListener('input', function(e) {
    if(e.target.value !=="")   {//S'il y a une lettre dans l'input. e contient les propriétés de l'événement. Target: notre input, et value: ce qu'il y a à l'intérieure
        e.target.parentNode.classList.add('active-input'); // si input !== de vide on lui rajoute une class avec la methode .add
    } else if (e.target.value === "" ) {
        e.target.parentNode.classList.remove('active-input'); // GO to the CSS
    }
    
})