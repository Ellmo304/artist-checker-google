'use strict';

process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiAssistant;

const artists = require('./data/artists.js');

const ARTIST_CHECK = 'artist-check';
const ARTIST_ARGUMENT = 'artist';

// [START artistChecker]
exports.artistChecker = (req, res) => {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  // Make a silly name
  function checkArtist (assistant) {
    const requestArtist = assistant.getArgument(ARTIST_ARGUMENT);
    let artist = false;
    for (let i = 0; i < artists.length; i ++) {
      if (artists[i].toLowerCase() === requestArtist.toLowerCase()) {
        artist = artists[i];
      }
    }
    if (artist) {
      assistant.tell(`${artist.name} ${artist.alive} ${artist.nationality} and some of ${artist.gender} famous works include: ${artist.famous_works}.`);
    } else {
      assistant.tell('Sorry, I don\'t know that artist, try asking me about someone else!');
    }
  }

  let actionMap = new Map();
  actionMap.set(ARTIST_CHECK, checkArtist);

  assistant.handleRequest(actionMap);
};
