document.getElementById('fetchDataBtn').addEventListener('click', fetchData);
document.getElementById('clearBtn').addEventListener('click', clearResults);
document.getElementById('filterInput').addEventListener('input', filterResults);

const API_URL = 'https://hp-api.onrender.com/api/characters';
let characters = [];

async function fetchData() {
    const quantity = document.getElementById('quantity').value || 10;
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        const limitedCharacters = data.slice(0, quantity);
        characters = limitedCharacters;
        displayResults(characters);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

function displayResults(characters) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    characters.forEach(character => {
        const characterCard = `
            <div class="card">
                <img src="${character.image}" alt="${character.name}">
                <h2>${character.name}</h2>
                <p>Casa: ${character.house || 'Desconocida'}</p>
                <p>Especie: ${character.species}</p>
            </div>
        `;
        resultsContainer.innerHTML += characterCard;
    });
}

function clearResults() {
    document.getElementById('resultsContainer').innerHTML = '';
    document.getElementById('quantity').value = '';
    document.getElementById('filterInput').value = '';
}

function filterResults() {
    const filterText = document.getElementById('filterInput').value.toLowerCase();
    const filteredCharacters = characters.filter(character => 
        character.name.toLowerCase().includes(filterText)
    );
    displayResults(filteredCharacters);
}
