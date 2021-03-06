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
      msgListElement.appendChild(
        createListElement(comments[idx].commentText));
    }
  });
}


/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}
