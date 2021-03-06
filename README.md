# Backend API

## Installation

Install node.js.

Install the package:

```shell
npm install
```

On production install without the development dependencies:

```shell
npm install --production
```

## Usage

Copy `config.js.example` to `config.js` and fill in details.

Run server with:

```shell
node bin/www
```

Query the server at a given endpoint:

```shell
curl 127.0.0.1:3000/api/v1.0
```

POST json to the server:

```shell
curl -X POST \
  http://127.0.0.1:3000/api/v1.0/testdb \
  -H 'Accept: */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{"test": "JSON Data"}'
```

Now in MongoDB database:

```shell
mongo codematch -u codematch -p
```

```javascript
var collections = db.getCollectionNames();
for(var i = 0; i< collections.length; i++) {
    print('Collection: ' + collections[i]);
    db.getCollection(collections[i]).find().forEach(printjson);
}
```

## MongoDB

Install `mongodb` and start mongodb service.

Create admin:

```shell
mongo
```

```mongodb
use admin
db.createUser(
  {
    user: "admin",
    pwd: "ZFa5D4UNrHh95AbRJmHCZiyVvjaKEKHP",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
```

Enable Auth in `/etc/mongodb.conf`:

```yaml
security:
  authorization: "enabled"
setParameter:
  enableLocalhostAuthBypass: false
```

Restart MongoDB.

### Database

Create a database and user:

```mongodb
use codematch
db.createUser(
  {
    user: "codematch",
    pwd: "<PASSWORD HERE>",
    roles: [ "dbOwner" ]
  }
)
```

### Dump and Restore

Dump database:

```shell script
mongodump --db=codematch \
          --username=codematch \
          --password=<PASSWORD>
```

Restore database:

```shell script
mongorestore --db=codematch \
             --username=codematch \
             --password=<PASSWORD> dump/codematch
```

## API Keys

Create a new project [Codematch](https://console.developers.google.com/apis/library).

Setup callback URI: <https://cm.johnramsden.ca/auth/google/callback>

[Setup project](https://developers.google.com/identity/sign-in/web/sign-in)

Get Client ID and Client Secret. Place JSON in config.js

## References

*   <https://proandroiddev.com/developing-secure-android-apps-8edad978d8ba>
*   <https://jwt.io/introduction/>
*   <http://www.passportjs.org/docs/google/>
