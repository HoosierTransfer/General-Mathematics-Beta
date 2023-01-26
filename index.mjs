import Server from 'bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';

const PORT = process.env.PORT || 8080;
const bare = new Server('/bare/', '');
const serve404 = new nodeStatic.Server('static/404');

const serve = new nodeStatic.Server('static/');
const fakeServe = new nodeStatic.Server('BlacklistServe/');
const server = http.createServer();
console.log("working");

server.on('request', (request, response) => {
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    // Code from NebulaServices
    var isLS = ip.startsWith('34.216.110') || ip.startsWith('54.244.51') || ip.startsWith('54.172.60') || ip.startsWith('34.203.250') || ip.startsWith('34.203.254');
    if (isLS)
        fakeServe.serve(request, response);
    else {
        
        if (bare.route_request(request, response))
            return true;
        try {
            serve.serve(request, response);
        } catch {
            serve404.serve(request, response);
        }
    }
});

server.listen(process.env.PORT || 8080);
