module.exports = {
  // Helper to use when executing x1337-dl.
  helper: 'custom',

  // Mirror to use when using x1337-dl.
  //mirror: 'https://www.1377x.to',

  defaultLabel: 'movies',

  // Config for ru torrent dl helper.
  rutorrent: {
    user: "user",
    pass: "p4ssw0rd",
    client_url: "https://rutorrent.local",
  },

  // Custom dl command config.
  custom: {
    // Uncomment one of the below commands or add your own custom dl command.
    cmd: 'echo ERROR: No custom dl command defined. See dl/config.js. && err0r-see-config'

    // qBitTorrent
    // cmd: 'qbittorrent --category="${label}" "${magnet}"'

    // Transmission
    // cmd: 'transmission-remote -a "${magnet}" --add-when-ready --no-progress --move "${label}"'

    // uTorrent
    // cmd: 'utorrent.exe /ADD "${magnet}" /LABEL "${label}"'

    // deluge
    // cmd: 'deluge-console "add -m ${magnet} -c ${label}"'

    // vuze
    // cmd: 'vuzecli --add "${magnet}" --category "${label}"'

    // Custom curl
    // cmd: 'curl http://localhost:3333/rpc/add?magnet=${magnet}&label=${label}'
  }
}