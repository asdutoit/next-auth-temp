import { connectToDatabase } from '../../../utils/mongodb';
import { getSession } from 'next-auth/client';

export default async function handle(req, res) {
    const { client } = await connectToDatabase();
    const db = await client.db(process.env.PROPERTY_DB);

    const filter = {
        coordinates: {
            $geoWithin: {
                $geometry: {
                    type: 'Polygon',
                    coordinates: [req.body.polygon],
                },
            },
        },
    };

    let projection;
    let limit;

    if (req.body.list) {
        projection = {
            _id: 1,
            'address.lat': 1,
            'address.lon': 1,
            'community.price_max': 1,
            photos: 1,
            'community.beds_max': 1,
            'community.baths_max': 1,
            'community.sqft_max': 1,
            'address.line': 1,
            'address.neighborhood_name': 1,
            'address.city': 1,
            'address.postal_code': 1,
            coordinates: 1,
        };
        limit = 10;
    } else {
        projection = {
            _id: 1,
            'address.lat': 1,
            'address.lon': 1,
            // coordinates: 1,
            'community.price_max': 1,
        };
        limit = 200;
    }

    const properties = await db
        .collection('newyorksampleproperties2')
        .find(filter, { projection: projection })
        .limit(limit)
        .sort({ metacritic: -1 })
        .toArray();

    res.status(200).send({ properties });
}
