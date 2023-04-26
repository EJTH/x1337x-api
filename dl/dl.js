#!/usr/bin/env node
const x1337x = require('../x1337x.js');
const config = require('./config.js');

const addTorrent = require(`./${config.helper}.js`);
 
let search = process.argv[2];
let label = process.argv[3] || config.defaultLabel || '';

function dl(){
  if(!search){
    console.log("Download first result from 1337x. Usage: x1337-dl 'Search Term' 'label'");
    console.log("Configure credentials in config.js see example.config.js.");
    return;
  }

  x1337x.api(config.mirror || null).search(search).then(results => {
    if(!results || !results.length){
      console.log("Torrent not found.");
      return;
    }
    results[0].info().then(info => {
      console.log(`Found matching torrent: "${info.name}"`);
      addTorrent(info.magnet, label).then(result => {
        if(result){
          console.log('Succesfully added torrent to queue...');
        } else {
          console.log(`Error adding torrent using '${config.helper}'.`);
        }
      });
    });
  });
}
dl();