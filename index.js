const cheerio = require('cheerio');
const https = require('https');

/**
 * Available categories on 1337x.
 */
const categories = [
    'movies',
    'tv',
    'documentaries',
    'anime',
    'music',
    'other',
    'apps',
    'games',
    'xxx'
];

const mirrors = [
  'https://1337x.to',
  'https://1337x.gd',
  'https://www.1377x.to',
  'https://www.1337xx.to',
];

function api(mirrorUrl) {
  mirrorUrl = mirrorUrl || mirrors[0];

  /**
   * Used to get pages and scrape info from them.
   * @param {string} url 
   * @param {function} callback 
   */
  function cheerioGet(url, callback){
    https.get(`${mirrorUrl}${url}`, res => {
      let data = [];

      res.on('data', chunk => {
        data.push(chunk);
      });
      
      res.on('end', () => {
        const source = Buffer.concat(data).toString();
        const $ = cheerio.load(source);
        callback($);
      }).on('error', err => {
        console.log('Error: ', err.message);
      });
    });
  }

  /**
   * Used to get the result table from a page as an array of scraped info.
   * @param {string} url 
   * @returns {Promise<Array>} A promise with an array.
   */
  function getTableResults(url){
    return new Promise(resolve => {
      cheerioGet(url, $ => {
        const results = [];
        $('.table-list tbody tr').each(function(row, item){
          const $item = $(item);
          const pageUrl = $item.find('.name a:last-of-type').attr('href');
          const info = {
            name: cleanText($item.find('.name').text()),
            seeds: parseInt(cleanText($item.find('.seeds').text())),
            leeches: parseInt(cleanText($item.find('.leeches').text())),
            size: cleanText($item.find('.leeches').text()),
            uploader: cleanText($item.find('.uploader').text()),
            pageUrl: pageUrl
          };
          info.info = function () {
            return getTorrentInfo(pageUrl, info);
          }
          results.push(info);
        });
        resolve(results);
      });
    });
  }

  /**
   * Returns clean column string.
   * @param {string} string 
   * @returns {string}
   */
  function cleanText(string){
    return string.replace(/\n|\t/gi,'').trim();
  }

  /**
   * Returns torrent info from pageUrl.
   * @param {string} pageUrl 
   * @param {object} info 
   * @returns {Promise<Object>}
   */
  function getTorrentInfo(pageUrl, info){
    return new Promise(resolve => {
      cheerioGet(pageUrl, $ => {
        // Get torrent links.
        const torrentLinks = {};
        $('.dropdown-menu li a').each(function(i, item){
          const $item = $(item);
          let text = $item.text();
          let url = $item.attr('href');
          if(text.includes('Magnet')){
            text = 'magnet';
          }
          text = text.toLowerCase().split(' ')[0];
          torrentLinks[cleanText(text)] = url;
        });

        const torrent = { ...info, 
            name: cleanText($('.box-info-heading').text()),
            description: $('.mCSB_container p').text(),
            hash: cleanText($('.infohash-box span').text()),
            magnet: torrentLinks.magnet,
            torrentLinks: torrentLinks
          };
        delete torrent.info;
        resolve(torrent);
      });
    });
  }

  function getTorrent(url){
    return url;
  }

  /**
   * Perform a torrent search.
   * @param {string} searchString 
   * @param {number} page 
   * @returns {Array} Result array.
   */
  function search(searchString, page) {
    page = page || 1;
    return getTableResults(`/search/${encodeURIComponent(searchString)}/${page}/`);
  }

  /**
   * Get popular torrents by category.
   * @param {string} category 
   * @returns {Array}
   */
  function popular(category){
    category = category || 'movies';
    return getTableResults(`/popular-${category}`);
  }

  /**
   * Get TOP100 torrents by category.
   * @param {string} category 
   * @returns {Array}
   */
  function top100(category){
    category = category || 'movies';
    return getTableResults(`/top-100-${category}`);
  }

  return {
    search: search,
    popular: popular,
    top100: top100
  }
}

module.exports.api = api;
module.exports.mirrors = mirrors;
module.exports.cateogries = categories;