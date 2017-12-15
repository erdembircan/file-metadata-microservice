const App = require('./app');
const config = require('./config');

const host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
const port = process.env.OPENSHIFT_NODEJS_PORT || config.serverPort;

const app = new App({ host, port, publicDirectory: 'public' });

app.listen();
