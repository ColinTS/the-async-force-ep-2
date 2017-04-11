 /*jshint esversion: 6*/

//Outgoing request function
function request(url, listener){
  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', listener);
  oReq.open('GET' , url);
  oReq.send();
}

//Button event listener
document.querySelector('#requestResourceButton').addEventListener('click', () => {

  const option = document.querySelector('#resourceType');
  const input = document.querySelector('#resourceId');

  //clears container each click
  container.innerHTML = '';

  //run request functions based on inputted id
  if(option.value === 'people'){
    request(`http://swapi.co/api/people/${input.value}/`, person);
  } else if (option.value === 'planets') {
    request(`http://swapi.co/api/planets/${input.value}/`, planet);
  } else if (option.value === 'starships') {
    request(`http://swapi.co/api/starships/${input.value}/`, starship);
  }

});

//Create person
function person(){

  //throw error if person doesn't exist
  if(this.status === 404){
    throwError();
  } else {

  //person
  const requestData = JSON.parse(this.responseText);
  let thePerson = document.createElement('h2');
  thePerson.innerHTML = requestData.name;
  container.appendChild(thePerson);

  //gender
  let theGender = document.createElement('p');
  theGender.innerHTML = requestData.gender;
  container.appendChild(theGender);

  //request species
  request(requestData.species[0], species);

  }
}

  function species(){
    const requestData = JSON.parse(this.responseText);
    let theSpecies = document.createElement('p');
    theSpecies.innerHTML = requestData.name;
    container.appendChild(theSpecies);
  }

//Create planet
function planet(){

  //throw error if planet doesn't exist
  if(this.status === 404){
    throwError();
  } else {

  //planet name
  const requestData = JSON.parse(this.responseText);
  let thePlanet = document.createElement('h2');
  thePlanet.innerHTML = requestData.name;
  container.appendChild(thePlanet);

  //terrain
  let theTerrain = document.createElement('p');
  theTerrain.innerHTML = requestData.terrain;
  container.appendChild(theTerrain);

  //population
  let thePopulation = document.createElement('p');
  thePopulation.innerHTML = requestData.population;
  container.appendChild(thePopulation);

  //request film list
  for(let i = 0; i < requestData.films.length; i++){
    request(requestData.films[i], films);
    }
  }
}

  //Shows all the films that featured the inputted planet
  function films(){
    const requestData = JSON.parse(this.responseText);
    const theFilm = document.createElement('li');
    theFilm.innerHTML = requestData.title;
    container.appendChild(theFilm);
  }


//Create starship
function starship(){

  //throw error if starship doesn't exist
  if(this.status === 404){
    throwError();
  } else {

  //starship name
  const requestData = JSON.parse(this.responseText);
  let theStarship = document.createElement('h2');
  theStarship.innerHTML = requestData.name;
  container.appendChild(theStarship);

  //manufacturer
  let theManufacturer = document.createElement('p');
  theManufacturer.innerHTML = requestData.manufacturer;
  container.appendChild(theManufacturer);

  //starship class
  let theClass = document.createElement('p');
  theClass.innerHTML = requestData.starship_class;
  container.appendChild(theClass);

  //request
  for(let i = 0; i < requestData.films.length; i++){
    request(requestData.films[i], films);
    }
  }
}

//error function
function throwError(){
    let error = document.createElement('p');
    const input = document.querySelector('#resourceId');
    error.innerHTML = `http://swapi.co/api/starships/${input.value}/ NOT FOUND`;
    error.style.backgroundColor = 'violet';
    container.appendChild(error);
}

//global container
const container = document.querySelector("#contentContainer");