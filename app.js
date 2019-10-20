const fastify = require('fastify')({logger: true});
const config = require('./config');
const authentication = require('./authentication');

const mCfg = config.mongoDBConnection;
const mHost = config.mongoDBConnection.host || "localhost";
const mPort = config.mongoDBConnection.port || 27017;

fastify.register(
    require('fastify-mongodb'),
    {
        // force to close the mongodb connection when app stopped
        // the default value is false
        forceClose: true,
        url: `mongodb://${mCfg.user}:${mCfg.password}@${mHost}:${mPort}/${mCfg.database}`
    }
);

const routes = [
    {
        plugin: authentication.plugin,
        options: authentication.options
    },
    {
        plugin: require('./routes/api/v1.0/index'),
        options: {}
    },
    {
        plugin: require('./routes/api/v1.0/auth'),
        options: { prefix: '/auth' }
    },
    {
        plugin: require('./routes/api/v1.0/user')({ db: fastify.mongo.db }),
        options: { prefix: '/user' }
    },
    {
        plugin: require('./routes/api/v1.0/questions'),
        options: { prefix: '/questions' }
    }
];
routes.forEach((p) => fastify.register(p.plugin, p.options));

function startServer(fastify, port, callback) {
    fastify.listen(port, (err, address) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
        fastify.log.info(`server listening on ${address}`);
        callback(err, fastify);
    })
}

// Options currently unused
module.exports = {
    fastify: fastify,
    start: startServer,
};
