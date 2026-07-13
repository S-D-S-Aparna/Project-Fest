const localtunnel = require('localtunnel');
(async () => {
  const tunnel = await localtunnel({ port: 5000, subdomain: 'projectfest-backend-demo' });
  console.log('TUNNEL_URL=' + tunnel.url);
  tunnel.on('close', () => {
    console.log('Tunnel closed');
  });
})();
