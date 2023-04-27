let config;
try {
  config = require('./config.js');
} catch (ex){
  config = require('./example.config.js');
}

const { exec } = require('child_process');

function addTorrent(magnet, label) {
  return new Promise(resolve => {
    let cmd = config.custom.cmd
      .replace(/\$\{magnet\}/, magnet)
      .replace(/\$\{label\}/, label)
    exec(cmd, (error, stdout, stderr) => {
      if(error){
        console.log(`Error: ${stderr}`);
        resolve(false);
      }
      console.log(stdout);
      resolve(true);
    });
  });
}

module.exports = addTorrent;