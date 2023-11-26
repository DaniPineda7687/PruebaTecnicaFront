const cardsContainer = document.getElementById("cards-container");
const mainContainer = document.querySelector(".main-container");
const buttonLoad = document.getElementById("load");

const alertInfo = document.getElementById("alert");
let totalCharacters = [];
let nextURL = "";
const getCharacters = async () => {
  try {
    const charactersRequest = await fetch(
      "https://rickandmortyapi.com/api/character",
      {
        method: "GET",
      }
    );
    if (!charactersRequest.ok) {
      alertInfo.style.display = "block";
      alertInfo.textContent =
        "Ha ocurrido un error mientras se cargaban los datos";
      return;
    }
    const charactersResponse = await charactersRequest.json();

    return charactersResponse;
  } catch (error) {
    alertInfo.style.display = "block";
    alertInfo.textContent =
      "Ha ocurrido un error mientras se cargaban los datos";
    console.log(error);
  }
};

const renderCharacters = (characters) => {
  characters.map((character) => {
    const card = document.createElement("div");
    const cardHeader = document.createElement("div");
    const cardHeaderImage = document.createElement("img");

    const cardBody = document.createElement("div");
    const cardBodyName = document.createElement("p");
    const cardBodyExtradata = document.createElement("div");
    const cardBodyExtradataStatus = document.createElement("p");
    const cardBodyExtradataType = document.createElement("p");

    const cardFooter = document.createElement("div");
    const cardFooterButton = document.createElement("button");

    card.classList.add("card");
    cardHeader.classList.add("card-header");
    cardFooter.classList.add("card-footer");
    cardFooterButton.id = "specific-info";

    cardBodyName.classList.add("name");
    cardBodyName.addEventListener("click", () => {
      window.location.href += `?characterid=${character.id}`;
    });
    cardBodyExtradata.classList.add("body-extradata");
    const statusForClass = character.status
      .split(" ")
      .join("")
      .trim()
      .toLowerCase();
    const speciesForClass = character.species
      .split(" ")
      .join("")
      .trim()
      .toLowerCase();
    cardBodyExtradataStatus.classList.add(statusForClass);
    cardBodyExtradataType.classList.add(speciesForClass);

    cardHeader.appendChild(cardHeaderImage);

    cardBody.appendChild(cardBodyName);
    cardBodyExtradata.appendChild(cardBodyExtradataStatus);
    cardBodyExtradata.appendChild(cardBodyExtradataType);
    cardBody.appendChild(cardBodyExtradata);

    cardFooter.appendChild(cardFooterButton);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    cardHeaderImage.src = character.image;
    cardBodyName.textContent = character.name;
    cardBodyExtradataStatus.textContent = `Status: ${character.status}`;
      cardBodyExtradataType.textContent = `Specie: ${character.species}`;
    cardFooterButton.textContent = "Ver más información";
    cardFooterButton.addEventListener("click", () => {
      window.location.href += `?characterid=${character.id}`;
    });

    cardsContainer.appendChild(card);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  console.log(window.location.href.includes);
  if (window.location.href.includes("characterid")) {
    buttonLoad.style.display = "none";

    const queryString = window.location.search;

    const params = new URLSearchParams(queryString);

    const characterId = params.get("characterid");

    try {
      const characterRequest = await fetch(
        `https://rickandmortyapi.com/api/character/${characterId}`,
        {
          method: "GET",
        }
      );
      if (!characterRequest.ok) {
        alertInfo.style.display = "block";
        alertInfo.textContent =
          "Ha ocurrido un error mientras se cargaban los datos";
        return;
      }

      const characterResponse = await characterRequest.json();
      console.log(characterResponse);

      const originContainer = document.createElement("div");
      const originTitle = document.createElement("h2");
      originTitle.textContent = "Origin";
      const origin = document.createElement("p");
      origin.textContent = "Origin: Unknown";
      const originType = document.createElement("p");
      const originDimension = document.createElement("p");

      const locationContainer = document.createElement("div");
      const locationTitle = document.createElement("h2");
      const location = document.createElement("p");
      location.textContent = "Unknown";
      const locationType = document.createElement("p");
      const locationDimension = document.createElement("p");

      if (characterResponse.origin.url !== "") {
        const characterOriginRequest = await fetch(
          characterResponse.origin.url,
          {
            method: "GET",
          }
        );

        const characterOriginResponse = await characterOriginRequest.json();

        originContainer.setAttribute("id", "originContainer");

        origin.textContent = `Origin: ${characterOriginResponse.name}`;

        originType.textContent = `Type: ${characterOriginResponse.type}`;

        originDimension.textContent = `Dimension: ${characterOriginResponse.dimension}`;
      }

      if (characterResponse.location.url !== "") {
        const characterLocationRequest = await fetch(
          characterResponse.location.url,
          {
            method: "GET",
          }
        );
        const characterLocationResponse = await characterLocationRequest.json();

        locationContainer.setAttribute("id", "originContainer");

        locationTitle.textContent = "Location";

        location.textContent = `Location: ${characterLocationResponse.name}`;

        locationType.textContent = `Type: ${characterLocationResponse.type}`;

        locationDimension.textContent = `Dimension: ${characterLocationResponse.dimension}`;
      }

      const characterContainer = document.createElement("div");
      characterContainer.setAttribute("id", "characterContainer");

      const title = document.createElement("h1");
      title.textContent = characterResponse.name;

      const image = document.createElement("img");
      image.setAttribute("src", characterResponse.image);
      image.setAttribute("alt", characterResponse.name);

      const cardBodyExtradata = document.createElement("div");
      const cardBodyExtradataStatus = document.createElement("p");
      const cardBodyExtradataType = document.createElement("p");
      const cardBodyExtradataGender = document.createElement("p");
      cardBodyExtradata.classList.add("body-extradata");
      const statusForClass = characterResponse.status
        .split(" ")
        .join("")
        .trim()
        .toLowerCase();
      const speciesForClass = characterResponse.species
        .split(" ")
        .join("")
        .trim()
        .toLowerCase();
    
        const genderForClass = characterResponse.gender
        .split(" ")
        .join("")
        .trim()
        .toLowerCase();
      cardBodyExtradataStatus.classList.add(statusForClass);
      cardBodyExtradataType.classList.add(speciesForClass);
      cardBodyExtradataGender.classList.add(genderForClass);
      cardBodyExtradata.appendChild(cardBodyExtradataStatus);
      cardBodyExtradata.appendChild(cardBodyExtradataType);
      cardBodyExtradata.appendChild(cardBodyExtradataGender);
      cardBodyExtradataStatus.textContent = `Status: ${characterResponse.status}`;
      cardBodyExtradataType.textContent = `Specie: ${characterResponse.species}`;
      cardBodyExtradataGender.textContent = `Gender: ${characterResponse.gender}`;

      

      

      const species = document.createElement("p");
      species.textContent = `Species: ${characterResponse.species}`;

      originContainer.appendChild(originTitle);
      originContainer.appendChild(origin);
      originContainer.appendChild(originType);
      originContainer.appendChild(originDimension);

      locationContainer.appendChild(locationTitle);
      locationContainer.appendChild(location);
      locationContainer.appendChild(locationType);
      locationContainer.appendChild(locationDimension);

      characterContainer.appendChild(title);
      characterContainer.appendChild(image);
      characterContainer.appendChild(cardBodyExtradata);
      characterContainer.appendChild(originContainer);
      characterContainer.appendChild(locationContainer);

      mainContainer.appendChild(characterContainer);
    } catch (error) {
      alertInfo.style.display = "block";
      alertInfo.textContent =
        "Ha ocurrido un error mientras se cargaban los datos";
      console.log(error);
    }
  } else {
    buttonLoad.style.display = "block";
    let result = await getCharacters();
    nextURL = result.info.next;
    renderCharacters(result.results);
  }
});

buttonLoad.addEventListener("click", async () => {
  const charactersRequest = await fetch(nextURL, {
    method: "GET",
  });
  const charactersResponse = await charactersRequest.json();
  nextURL = charactersResponse.info.next;
  const listCharacters = charactersResponse.results;
  renderCharacters(listCharacters);
});
