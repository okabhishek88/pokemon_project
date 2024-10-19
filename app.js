let url = "https://pokeapi.co/api/v2/pokemon/"
let btn = document.querySelector("button")
let song = document.querySelector("#ios")

const audio = document.getElementById('background-audio');

// Function to play audio on user interaction
function playAudio() {
    audio.play().catch(error => {
        console.log('Audio playback prevented: ', error);
    });
}

song.addEventListener("click", () => {
    playAudio()
});

btn.addEventListener("click", () => {
    getData();
});

async function getData() {
    let input = document.querySelector("input").value.toLowerCase()
    try {
        let response = await axios.get(url + input)
        console.log(response)
        displayData(response.data)
    } catch (error) {
        console.log("error: ", error)
    }
}

function displayData(data) {
    const dataContainer = document.querySelector(".data_pokemon")
    dataContainer.innerHTML = ""

    const imgContainer = document.querySelector(".photo")
    imgContainer.innerHTML = ""

    // for image
    const img = document.createElement("img")
    img.src = data.sprites.other.dream_world.front_default
    img.style.width = "auto"
    img.style.height = "auto"
    imgContainer.appendChild(img)

    // for name
    const name = document.createElement("h2");
    name.textContent = "Name: " + data.name
    dataContainer.appendChild(name)

    // for type
    const type = document.createElement("h2")
    type.textContent = "Type: " + data.types.map(element => element.type.name).join(", ")
    dataContainer.appendChild(type)

    // for abilites
    const abilities = document.createElement("h2")
    abilities.textContent = "Abilites: " + data.abilities.map(element => element.ability.name).join(", ")
    dataContainer.appendChild(abilities)

    // for abilites
    const moves = document.createElement("h2")
    moves.textContent = "Moves: " + data.moves.slice(0,8).map(element => element.move.name).join(", ")
    dataContainer.appendChild(moves)

    if (dataContainer.innerHTML) {
        dataContainer.style.display = 'block'
        document.querySelector('.dancing-pikachu').style.display = 'none'
    }
}
