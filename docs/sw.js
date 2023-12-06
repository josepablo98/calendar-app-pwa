importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute( [{"revision":"a4bcd540f299e548ced7a6b3b1d1267e","url":"asset-manifest.json"},{"revision":"6e1267d9d946b0236cdf6ffd02890894","url":"favicon.ico"},{"revision":"e068b32274d3a0077db58f9c37512a39","url":"index.html"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"logo192.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"logo512.png"},{"revision":"12cccbf33b373417f7f7733451787dda","url":"manifest.json"},{"revision":"61c27d2cd39a713f7829422c3d9edcc7","url":"robots.txt"},{"revision":"3ad5f4a0bd4ec88ac3d86d7c313a9ac2","url":"static/css/2.bf12cbd8.chunk.css"},{"revision":"a0819237236a18b1fbfef215edc6fec0","url":"static/css/main.7eefda23.chunk.css"},{"revision":"e1135a4bd28cc8610afcb231d2a87be5","url":"static/js/2.c4462d84.chunk.js"},{"revision":"2783cb611cfe78d22f7194d9d4695716","url":"static/js/2.c4462d84.chunk.js.LICENSE.txt"},{"revision":"89f2d3480cb990c1ef0c9bfb2ebe629b","url":"static/js/main.181348ef.chunk.js"},{"revision":"83017fb57da75be76182ba28f232a3ac","url":"static/js/runtime-main.b56c39d1.js"}] );

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;


const cacheNetworkFirst = [
    '/api/auth/renew',
    '/api/events',
]

registerRoute(
    ({ request, url }) => {

        // console.log({request, url})
        if ( cacheNetworkFirst.includes( url.pathname ) ) return true
        
        return false;
    },
    new NetworkFirst()
)

// Referencia
// registerRoute(
//     new RegExp('http://localhost:4000/api/auth/renew'),
//     new NetworkFirst()
// )


const cacheFirstNetwork = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
];

registerRoute(
    ({ request, url }) => {
        console.log({url})

        if ( cacheFirstNetwork.includes( url.href ) ) return true        

        return false;
    },
    new CacheFirst()
)



// Posteos Offline 
const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
    new RegExp('https://calendar-backend-u2kt.vercel.app/api/events'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'POST'
)

registerRoute(
    new RegExp('https://calendar-backend-u2kt.vercel.app/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'DELETE'
)

registerRoute(
    new RegExp('https://calendar-backend-u2kt.vercel.app/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'PUT'
)