import { connectToDatabase } from '../../../utils/mongodb';
import { getSession } from 'next-auth/client';
const { ObjectId } = require('mongodb');
import COLOR from '../../../utils/colors';

export default async function handle(req, res) {
    try {
        const session = await getSession({ req });
        if (
            !session ||
            !session.user ||
            session === undefined ||
            session === null
        ) {
            res.send({ message: 'Unauthorized.  Please log in' });
            return;
        } else {
            const { client } = await connectToDatabase();
            const db = await client.db(process.env.USERS_DB);

            const agg = [
                {
                    $match: {
                        email: session.user.email,
                    },
                },
                {
                    $project: {
                        favouriteProperties: 1,
                    },
                },
            ];

            const favs = await db.collection('users').aggregate(agg).toArray();
            if (favs.length > 0) {
                if (favs[0].favouriteProperties) {
                    res.status(200).send({
                        favourites: favs[0].favouriteProperties,
                    });
                }
            } else {
                res.status(404).send({ message: 'Not Found' });
            }
        }
    } catch (error) {
        console.log('Errorrrrrr', error);
    }
}
