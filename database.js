require('dotenv').config();
const { MongoClient } = require('mongodb');
const mongoUrl = String(process.env.MONGO_URL);

let database;

async function connectToDb() {
    const client = await MongoClient.connect(mongoUrl);
    database = client.db('admin_toUser_access');   
}

function getDb() {
    if(!database) {
        throw {message: 'Database not connected'}
    } 
    return database;
}

module.exports = {
    connectToDb: connectToDb,
    getDb: getDb
}


