const userModule = require('../../../user');

function routes (fastify, opts, done) {
    fastify.route({
        method: 'POST',
        url: '/register',
        schema: {
            body: {
                type: 'object',
                required: ['google_token'],
                properties: {
                    google_token: { type: 'string' }
                }
            }
        },
        handler: function(request, reply) {
            const um = userModule({ mongo: fastify.mongo });

            um.createUser(request.body, function (err, res, data) {
                if (err || (res.statusCode !== 200) || !data.email) {
                    console.log(data);
                    reply.status(res.statusCode);
                    reply.send(err);
                    return
                }

                // make a new account
                const newUser = um.User.newUser(data.email);

                // test toJSON
                console.log(newUser.toJson());

                // store to database
                newUser.create();

                // done
                reply.status(200);
                reply.send();
            });
        }
    });

    fastify.route({
        method: 'GET',
        url: '/retrieve',
        schema: {
            querystring: {
                userId: { type: 'string' }
            },
        },
        handler: function(request, reply) {
            const um = userModule({ mongo: fastify.mongo });
            console.log(request.query);

            um.User.retrieve(request.query.userId, function (err, data) {
                if (err || data === null) {
                    reply.status(401);
                    reply.send(err);
                    return
                }
                // done
                reply.status(200);
                reply.send(data);
            });
        }
    });

    done();
}

module.exports = routes;
