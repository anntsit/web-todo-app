const auth = require('@feathersjs/authentication-client');
const rest = require('@feathersjs/rest-client');
const feathers = require('@feathersjs/feathers');

export const feathersApp = feathers();
const restClient = rest('http://localhost:3030');
feathersApp.configure(restClient.fetch(window.fetch));

feathersApp.configure(auth({
    storageKey: 'auth'
}));
