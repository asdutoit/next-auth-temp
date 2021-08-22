import { connectToDatabase } from '../../../utils/mongodb';
import { getSession } from 'next-auth/client';

export default async function handle(req, res) {
    const { client } = await connectToDatabase();
    const db = await client.db(process.env.PROPERTY_DB);

    const properties = await db
        .collection('newyorksampleproperties2')
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray();
    const count = await db.collection('newyorksampleproperties2').count();

    res.status(200).send({ properties, count });
}
