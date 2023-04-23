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
  "name": "Nineteen Eighty-Four (1984) (Orwell)...",
  "seeds": 3636,
  "leeches": 15,
  "size": "4.2 GB",
  "uploader": "michaelrizzo",
  "pageUrl": "...",
  "description": "",
  "hash": "1EAB3FFD241FF6BFD6ED579D0466FA6545DF7D33",
  "magnet": "magnet:...",
  "torrentLinks": {
    "itorrents": "http://...",
    "torrage": "http://...",
    "btcache": "http://...",
    "magnet": "magnet:?xt=urn:...."
  }
}
```
### Mirrors
You can also use specific mirrors. There is included a short mirror list in the module exports under `.mirrors`

```javascript
// List of mirrors.
console.log(x1337.mirrors)

// Use specific mirror.
let mirror = x1337.mirrors[2];
x1337.api(mirror).search("search term");

// If you have a favorite you can also define your own.
let mirror = 'http://my1337x.foobar';
x1337.api(mirror).search("search term");
```


### Top lists & Popular contents
You can retrieve lists of popular and trending content by using the `.top100(category)` and   `.popular(category)` functions.
A list of categories is provided in `x1337.categories`.
```javascript
// Get Top 100 movies.
x1337.api().top100('movies').then(movies => console.log(movies))

// Get Popular movies.
x1337.api().popular('movies').then(movies => console.log(movies))
```

## Download helpers for torrent clients.
I have included a helper for starting downloads using rutorrent:

```bash
npm run dl-rutorrent "search term" "label"
```