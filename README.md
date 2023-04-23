# X1337X API

X1337X API is a simple cheerio scraper API for the 1337x site.

## Usage

```
const x1337 = require('x1337xapi');

// List of mirrors.
console.log(x1337.mirrors)

// Perform a search.
x1337.api().search('search terms').then(results => console.log(results));

// Perform a search and console.log magnet url of the first result.
x1337.api().search('search terms').then(results => {
    results[0].info().then(info => {
        console.log(info.magnet);
    })
});

// Get all info for a torrent.
x1337.api().search('search terms').then(results => {
    results[0].info().then(info => {
        console.log(info);
    })
});

// Use specific mirror.
let mirror = x1337.mirrors[2];
x1337.api(mirror).search(...);
```
