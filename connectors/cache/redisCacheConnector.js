var cacheConnector = require('./cacheConnector');
var redis = require("redis");
var bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class redisCacheConnector extends cacheConnector{

    constructor(redisUrl){
        super();
        this.client = redis.createClient({
            url: redisUrl
        });
    }

    async addEntity(key, val) {
        if (typeof key == 'number') {
            key = JSON.stringify(key);
        }
        if (typeof key != 'string') {
            throw new Error("Invalid key type");
        }

        try {
            await this.client.setAsync(key, JSON.stringify(val));
        }
        catch (e) {
            console.error(e);
            throw Error('redis error on setAsync');
        }
    }

    async getEntity(key) {
        try {
            let val = await this.client.getAsync(key);
            return JSON.parse(val);
        }
        catch (e) {
            console.error(e);
            throw Error('redis error on getAsync');
        }
    }
}

module.exports = redisCacheConnector;