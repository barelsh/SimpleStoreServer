var cacheConnector = require('./cacheConnector');

class inMemoryCacheConnector extends cacheConnector{

    constructor(){
        super();
        this.store = {};
    }

    async addEntity(key, val) {
        if (typeof key == 'number') {
            key = JSON.stringify(key);
        }
        if (typeof key != 'string') {
            throw new Error("Invalid key type");
        }

        this.store[key] = val;
    }

    async getEntity(key) {
        return this.store[key]
    }
}

module.exports = inMemoryCacheConnector