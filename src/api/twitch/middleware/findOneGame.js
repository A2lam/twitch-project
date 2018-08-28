const https = require('https');

export default function (req, res, next) {
  https.request(`https://api.twitch.tv/helix/streams?game_id=${req.params.game_id}`, { headers: { 'Client-ID': 'ohwk67zppalbhicuf3yvaule4j0fwu' } }, (res1) => {
    res1.on('data', (chunk) => {
      res.send(JSON.parse(chunk));
    });
  }).on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    next(e);
  }).end();
}
