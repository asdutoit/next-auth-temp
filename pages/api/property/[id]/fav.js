import { connectToDatabase } from '../../../../utils/mongodb';
import { getSession } from 'next-auth/client';
const { ObjectId } = require('mongodb');

export default async function handle(req, res) {
    const session = await getSession({ req });

    if (req.method !== 'POST') {
        res.status(400).send({ message: 'Only post requests allowed' });
    } else if (session) {
        //signed in
        const { id } = req.query;
        const { client } = await connectToDatabase();
        const db = await client.db(process.env.USERS_DB);

        const agg = [
            {
                $match: {
                    _id: new ObjectId(session.user.sub),
                },
            },
            {
                $project: {
                    favouriteProperties: 1,
                },
            },
        ];

        let favExist;

        const favs = await db.collection('users').aggregate(agg).toArray();
        if (favs.length > 0) {
            if (favs[0].favouriteProperties?.length > 0) {
                favExist = favs[0].favouriteProperties.some(
                    (fav) => fav === id
                );
            }
        }
        if (favExist) {
            // remove from DB
            const updatedUser = await db
                .collection('users')
                .findOneAndUpdate(
                    { _id: ObjectId(session.user.sub) },
                    { $pull: { favouriteProperties: id } },
                    { returnOriginal: false }
                );
            res.status(200).send(updatedUser.value);
        } else {
            // add to db
            const updatedUser = await db
                .collection('users')
                .findOneAndUpdate(
                    { _id: ObjectId(session.user.sub) },
                    { $addToSet: { favouriteProperties: id } },
                    { returnOriginal: false }
                );

            res.status(200).send(updatedUser.value);
        }

        // res.status(200).send({ Property: property });
        // console.log('Session', JSON.stringify(session.user.sub, null, 2));
    } else {
        res.status(401).send({
            message: 'You are not authorised to access this resource',
        });
    }
    res.end();
}
