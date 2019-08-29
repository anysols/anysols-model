const {AnysolsODM} = require('../');

module.exports = (cb) => {

    const anysolsODM = new AnysolsODM();

    const config = {
        "host": "localhost",
        "port": "27017",
        "database": "anysols-collection-service",
        "dialect": "mongodb",
    };

    anysolsODM.connect(config).then(() => {
        console.log('connection success');
        anysolsODM.databaseExists().then(() => {
            console.log('db exists');
            cb(anysolsODM);
        }, () => {
            console.log("db does not exists");
            cb(anysolsODM);
        });
    }, (err) => {
        console.log('connection failed');
    });

};