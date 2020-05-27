const Datastore = require('nedb');

module.exports = class EntityStorage {
    constructor(filename) {
        this.filename = filename;
    }

    configure() {
        this.db = new Datastore({ filename: this.filename });
        this.db.loadDatabase();
    }

    createEntity(entityId, entityText, entityAuthor) {
        return new Promise((resolve, reject) => {
            this.db.insert({id: entityId, text: entityText, author: entityAuthor}, (err, newDoc) => {
               resolve({err: err, doc: newDoc});
            });
        });
    }

    removeEntity(entityId) {
        return this.db.remove({id: entityId});
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, docs) => {
                resolve({
                    'error': err,
                    'items': docs,
                })
            });
        });
    }
}