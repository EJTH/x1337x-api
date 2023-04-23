#!/usr/bin/env node
const x1337x = require('../x1337x.js');
const https = require('https');

const config = require('./config.js');

function addTorrent(magnet, label) {
  return new Promise(resolve => {
    label = label || '';

    const options = {
      method: 'POST',
      auth: `${config.user}:${config.pass}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };
    
    const postData = `label=${label}&url=${magnet}`;
    
    const req = https.request(
      `${config.client_url}/php/addtorrent.php`,
      options,
      (res) => {
        resolve(res.headers.location.includes('result[]=Success'));
      }
    );
      
    req.on('error', (error) => {
      console.error(error);
    });
      
    req.write(postData);
    req.end();
  });
}
  
let search = process.argv[2];
let label = process.argv[3] || '';

if(!search){
  console.log("Download first result from 1337x. Usage: npm run dl-rutorrent 'Search Term' 'label'.")
  console.log("Configure ruTorrent credentials in config.js");
} else {
  x1337x.api().search(search).then(results => {
    results[0].info().then(info=>{
      console.log(`Found matching torrent: "${info.name}"`);
      addTorrent(info.magnet, label).then(result => {
        if(result){
          console.log('Succesfully added torrent to rutorrent queue...');
        } else {
          console.log('Error adding torrent to rutorrent.');
        }
      });
    });
  });
}