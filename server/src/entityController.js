module.exports = function configureEntityController(app, storage) {
    app.get('/entities', (request, response) => {
        response.type('application/json');
        storage.getAll().then((result) => {
            response.send(JSON.stringify(result));
        });
    });

    app.post('/entities', (request, response) => {
        const entityData = request.body;
        const id = entityData.id;
        const text = entityData.text;
        const author = entityData.author;

        response.type('application/json');

        if (!id || !text || !author) {
            response.status(400);
            response.send(JSON.stringify({}));
            return;
        }

        storage.createEntity(id, text, author).then(() => {
            response.status(200);
            response.send(JSON.stringify({}));
        });
    });

    app.delete('/entities', (request, response) => {
       const entityId = request.query.id;

        response.type('application/json');

        if (!entityId) {
           response.status(400);
           response.send(JSON.stringify({}));
       } else {
           storage.removeEntity(Number.parseInt(entityId));
           response.status(200);
           response.send(JSON.stringify({}));
        }
    });
};
