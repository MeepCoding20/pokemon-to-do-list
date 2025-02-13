//trigger loadItems on page launch
document.addEventListener('DOMContentLoaded', loadItems);
window.onload = pikachuPic();



const inputBox = document.getElementById('input-box'); //input box
const addButton = document.getElementById('add'); // add button
const list = document.getElementById('item-list'); // ul

function addItem(){
    const inputContents = document.getElementById('input-box').value; 
    if(inputContents === ""){
        alert('input field cannot be empty');
    }
    else {
        //alert('this would do something else if your code worked');
        //changePokemon(); //in future will make a random pokemon sit next to each task
        const ul = document.getElementById('item-list');
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(inputContents));
        ul.appendChild(li);
        inputBox.value = ""; //clears input

        //add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Remove";
        li.appendChild(deleteButton);

        //delete button works?
        deleteButton.onclick = function(){
        ul.removeChild(li);
        };

        saveItems(); // save items to local storage on creation
        
    }
    
}

function saveItems(){
    const items = []; //item array  
    list.querySelectorAll('li').forEach(li =>{ //for each 'li' item in list
        items.push(li.firstChild.textContent) //push text content of list item onto the item array
    });
    localStorage.setItem('stored-list', JSON.stringify(items)); //add array to local storage (have to stringify content)
}

function loadItems(){
    const savedList = JSON.parse(localStorage.getItem('stored-list')) || []; //fetch stored data from local storage, || [] fixes null erro apparently, empty string issue I think
    savedList.forEach(item => {
        const li = document.createElement('li'); // create new list element
        li.appendChild(document.createTextNode(item)); //create text with content: current item
        list.appendChild(li);

        //readd the delete button from before
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Remove";
        li.appendChild(deleteButton);
        deleteButton.onclick = function(){
        list.removeChild(li);
        saveItems();

    };
    });
}





//pokemon api call
async function pikachuPic() {

    try {
        const currentPokemon = "Pikachu".trim(); //sets pikachu as initial pokemon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`); //fetching pokemon data

        //very basic error handling
        if (!response.ok){
            throw new Error('couldnt find pokemon');
        }

        const data  = await response.json(); //turning all response json data into a variable
        //console.log(data);

        const pokemonSprite = data.sprites.front_default;
        const  pikaElement = document.getElementById("pokemon-image");
        pikaElement.src=pokemonSprite; //setting image to sprite
        pikaElement.style.display = "block";


    }
    catch(error){
        console.error(error);
    }
    
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function changePokemon(){
    let randomPokedex = getRandomNumber(1,1025); //get random pokedex number from 1-1025 (current max)

    try {
        const changeresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokedex}`); //fetching pokemon data

        //very basic error handling
        if (!changeresponse.ok){
            throw new Error('could not locate pokemon');
        }

        const data  = await changeresponse.json(); //turning all response json data into a variable
        //console.log(data);

        const pokemonSprite = data.sprites.front_default;
        const  pikaElement = document.getElementById("pokemon-image");
        pikaElement.src=pokemonSprite; //setting image to sprite
        pikaElement.style.display = "block";


    }
    catch(error){
        console.error(error);
    }
}


