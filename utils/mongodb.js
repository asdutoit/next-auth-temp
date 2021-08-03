import { MongoClient } from 'mongodb';
import COLOR from './colors';

const { DATABASE_URI, MONGODB_DB } = process.env;

if (!DATABASE_URI) {
    throw new Error(
        'Please define the DATABASE_URI environment variable inside .env.local'
    );
}

if (!MONGODB_DB) {
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env.local'
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
    cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = MongoClient.connect(DATABASE_URI, opts).then(
            (client) => {
                return {
                    client,
                    db: client.db(MONGODB_DB),
                    // db2: client.db(db2)
                };
            }
        );
        console.log(`${COLOR.fgGreen}Database - CONNECTED${COLOR.reset}`);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
