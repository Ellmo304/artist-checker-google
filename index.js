'use strict';

process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiAssistant;

const artists = require('./data/artists.js');

const ARTIST_CHECK = 'artist-check';
const ARTIST_ARGUMENT = 'Artist';

// [START artistChecker]
exports.artistChecker = (req, res) => {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  // Make a silly name
  function checkArtist (assistant) {
    var requestArtist = assistant.getArgument(ARTIST_ARGUMENT);
    console.log('REQUESTARTIST', requestArtist);
    // assistant.ask('Hello!');
    let chosenArtist = '';
    for (var i = 0; i < artists.length; i ++) {
      if (artists[i].name.toLowerCase() === requestArtist.toLowerCase()) {
        chosenArtist = artists[i];
      }
    }
    if (chosenArtist) {
      assistant.tell(`${chosenArtist.name} ${chosenArtist.alive} ${chosenArtist.nationality} and some of ${chosenArtist.gender} famous works include: ${chosenArtist.famous_works}.`);
    } else {
      assistant.tell('Sorry, I don\'t know that artist, try asking me about someone else!');
    }
  }

  let actionMap = new Map();
  actionMap.set(ARTIST_CHECK, checkArtist);

  assistant.handleRequest(actionMap);
};
