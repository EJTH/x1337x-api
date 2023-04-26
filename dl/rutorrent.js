const https = require('https');

const config = require('./config.js').rutorrent;

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
 

module.exports = addTorrent;