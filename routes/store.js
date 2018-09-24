var express = require('express');
var router = express.Router();

var init = (cacheConnector) => {
    router.get('/resource', async function(req, res, next) {
        try {
            let resource = await cacheConnector.getEntity('resource')
            res.json(resource);
        }
        catch(e) {
            console.error(e);
            res.status(500).end();
        }
    });

    router.post('/resource', async function(req, res, next) {
        let resource = {...req.body}
        try {
            await cacheConnector.addEntity('resource', resource)
        }
        catch(e) {
            console.error(e);
            res.status(500).end();
        }

        res.end();
    });

    return router;
};

module.exports = init;
