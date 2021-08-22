import { MongoClient } from 'mongodb';

const DATABASE_URL =
    'mongodb+srv://asdutoit:P%40ssword1@cluster0.1ht2j.mongodb.net/testdb?authSource=admin&replicaSet=atlas-9w3y3q-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

let cached = global.mongo;
if (!cached) {
    cached = global.mongo = { conn: null, promise: null };
}

async function connectToDatabase() {
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    MongoClient.connect(DATABASE_URL, opts).then((client) => {
        console.log(client);
        return {
            client,
        };
    });
    console.log(`Database - CONNECTED`);
}

const { client } = await connectToDatabase();
const db = await client.db('testdb');

const arr = [
    { name: 'koos', lat: 0, lng: 0 },
    { name: 'jan', lat: -12, lng: 1 },
    { name: 'karel', lat: 20, lng: 10 },
    { name: 'stef', lat: 23, lng: 12 },
    { name: 'hanli', lat: 12, lng: 13 },
    { name: 'gert', lat: 23, lng: 14 },
    { name: 'liam', lat: 35, lng: 45 },
    { name: 'piet', lat: 11, lng: -34 },
    { name: 'abel', lat: 22, lng: -22 },
    { name: 'kobus', lat: -13, lng: 12 },
    { name: 'fred', lat: 26, lng: 42 },
    { name: 'rick', lat: -73, lng: 11 },
    { name: 'sampie', lat: -92, lng: 0 },
    { name: 'blom', lat: 91, lng: 0 },
    { name: 'spanner', lat: 23, lng: 0 },
    { name: 'werp', lat: 11, lng: 0 },
    { name: 'petri', lat: 33, lng: 0 },
    { name: 'poenna', lat: 54, lng: 0 },
];

const newArray = arr.map((obj) => {
    const newobj = { ...obj, coordindates: [obj.lng, obj.lat] };
    return newobj;
});

console.log(newArray);
