'use strict';

process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiAssistant;

const ARTIST_CHECK = 'artist-check';
const ARTIST_ARGUMENT = 'artist';

// [START artistChecker]
exports.artistChecker = (req, res) => {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  // Make a silly name
  function checkArtist (assistant) {
    let artist = assistant.getArgument(ARTIST_ARGUMENT);
    assistant.tell('Alright, your silly name is ' +
      color + ' ' + number +
      '! I hope you like it. See you next time.');
  }

  let actionMap = new Map();
  actionMap.set(ARTIST_CHECK, checkArtist);

  assistant.handleRequest(actionMap);
};
