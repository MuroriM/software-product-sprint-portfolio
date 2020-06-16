// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * Adds a random roulette round to the page.
 */
function playRoulette() {
  const rouletteRounds =
      ['Blank!!!', 'Blank!', 'Blank!!', 'BANG...\n You died!☠☠']

  // Pick a random roulette round.
  const roulette = rouletteRounds[Math.floor(Math.random() * rouletteRounds.length)];

  // Add it to the page.
  const rouletteContainer = document.getElementById('roulette-container');
  rouletteContainer.innerText = roulette;
}


/**
 * Fetches comments from a dataservlet and adds to the page
 */
function getComments() {
  fetch('/data').then(response => response.json()).then((comments) => {

    const msgListElement = document.getElementById('msg-container');
    msgListElement.innerHTML = '';

    for (const idx in comments) {
      comment = comments[idx].commentText.concat(' by ', comments[idx].email);
      msgListElement.appendChild(
        createElement(comment, 'li', 'text'));
    }
  });
}


/** Creates an element of type 'type' containing text. */
function createElement(text, elemtype, innertype) {
  const elem = document.createElement(elemtype);

  if (innertype == 'text') {
    elem.innerText = text;
  }
  else if (innertype == 'html') {
    elem.innerHTML = text;
  }
  return elem;
}


/*
 * Fetches stats from the servers and adds them to the DOM.
 */
function checkLogin() {
  fetch('/login').then(response => response.json()).then((logged) => {
    // Add comments
    getComments();

    // Hide commenting form if not logged in
    if (logged[0] == 'true') {
        document.getElementById("comment_form").style.display = "block";
    } else {          
        document.getElementById("comment_form").style.display = "none";
    }

    // Display greeting and login information
    var greeting = createElement(logged[1], 'p', 'html');
    var loginfo = createElement(logged[2], 'p', 'html');

    const logElement = document.getElementById('login');
    logElement.append(greeting);
    logElement.append(loginfo);
  });
}
