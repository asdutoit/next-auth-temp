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
                    email: session.user.email,
                },
            },
            {
                $project: {
                    favouriteProperties: 1,
                },
            },
        ];

        let favExist = false;

        const favs = await db.collection('users').aggregate(agg).toArray();
        // if (favs[0].favouriteProperties?.length > 0) {
        //     favExist = favs[0].favouriteProperties.includes(id);
        // }
        const operator = favs[0].favouriteProperties?.includes(id)
            ? '$pull'
            : '$addToSet';

        const updatedUser = await db
            .collection('users')
            .findOneAndUpdate(
                { email: session.user.email },
                { [operator]: { favouriteProperties: id } },
                { returnOriginal: false }
            );
        res.status(200).send(updatedUser.value);

        // if (favs[0].favouriteProperties?.includes(id)) {
        //     // remove from DB
        //     const updatedUser = await db
        //         .collection('users')
        //         .findOneAndUpdate(
        //             { email: session.user.email },
        //             { $pull: { favouriteProperties: id } },
        //             { returnOriginal: false }
        //         );
        //     res.status(200).send(updatedUser.value);
        // } else {
        //     // add to db
        //     const updatedUser = await db
        //         .collection('users')
        //         .findOneAndUpdate(
        //             { email: session.user.email },
        //             { $addToSet: { favouriteProperties: id } },
        //             { returnOriginal: false }
        //         );

        //     res.status(200).send(updatedUser.value);
        // }
    } else {
        res.status(401).send({
            message: 'You are not authorised to access this resource',
        });
    }
    res.end();
}
