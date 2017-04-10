 /*jshint esversion: 6*/

//Outgoing request function
function request(listener, url){
  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', listener);
  oReq.open('GET' , url);
  oReq.send();
}
const container = document.querySelector("#contentContainer");

//Button event listener
document.querySelector('#requestResourceButton').addEventListener('click', () => {
  const option = document.querySelector('#resourceType');
  const input = document.querySelector('#resourceId');
  //clears container each click
  container.innerHTML = '';


  //If person selected run person request function
  if(option.value === 'people'){
    request(person, `http://swapi.co/api/people/${input.value}/`);
  }

  //If planet selected run planet request function

  //If starship selected run starship request function
});

//Create person
function person(){
  //person
  const requestData = JSON.parse(this.responseText);
  console.log('requestData: ', requestData);
  let thePerson = document.createElement('h2');
  thePerson.innerHTML = requestData.name;
  container.appendChild(thePerson);

  //gender
  let theGender = document.createElement('p');
  theGender.innerHTML = requestData.gender;
  container.appendChild(theGender);

  //request species
  request(species, requestData.species[0]);

}

  function species(){
    const requestData = JSON.parse(this.responseText);
    let theSpecies = document.createElement('p');
    theSpecies.innerHTML = requestData.name;
    container.appendChild(theSpecies);
  }







//Create planet

//Create starship