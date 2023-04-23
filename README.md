# X1337X API

X1337X API is a simple cheerio scraper API for the 1337x site.

## Usage

```javascript
const x1337 = require('x1337xapi');

// Perform a search.
x1337.api().search('search terms').then(results => console.log(results));

// Perform a search and console.log magnet url of the first result.
x1337.api().search('search terms').then(results => {
    results[0].info().then(info => {
        console.log(info.magnet);
    })
});
```

Here is an example on retrieving all info for a torrent.
```javascript
// Get all info for a torrent.
x1337.api().search('search terms').then(results => {
    results[0].info().then(info => {
        console.log(info);
    })
});
```
Which should give you something like:
```JSON
{
  name: "Nineteen Eighty-Four (1984) (Orwell) Richard Burton, John Hurt 10...",
  seeds: 3636,
  leeches: 15,
  size: "15",
  uploader: "michaelrizzo",
  pageUrl: "...",
  description: "",
  hash: "1EAB3FFD241FF6BFD6ED579D0466FA6545DF7D33",
  magnet: "magnet:...",
  torrentLinks: {
    itorrents: "http://...",
    torrage: "http://...",
    btcache: "http://...",
    magnet: "magnet:?xt=urn:...."
  }
}
```
You can also use specific mirrors. There is included a short mirror list in the module exports under `.mirrors`

```javascript
// List of mirrors.
console.log(x1337.mirrors)

// Use specific mirror.
let mirror = x1337.mirrors[2];
x1337.api(mirror).search("search term");

// If you have a favorite you can also define your own:
let mirror = 'http://my1337x.foobar';
x1337.api(mirror).search("search term");
```

## Download helpers for torrent clients.
I have included a helper for starting downloads using rutorrent:

```bash
npm run dl-rutorrent "search term" "label"
```