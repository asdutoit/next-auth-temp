import { connectToDatabase } from '../../../utils/mongodb';
import COLOR from '../../../utils/colors';

export default async function handle(req, res) {
    const { client } = await connectToDatabase();
    const db = await client.db(process.env.PROPERTY_DB);
    console.log('viewport', req.body);

    const filter = {
        coordinates: {
            $geoWithin: {
                $box: [
                    [req.body.viewport.west, req.body.viewport.south],
                    [req.body.viewport.east, req.body.viewport.north],
                ],
            },
        },
    };

    let projection;
    let limit;
    let skip;

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
        limit = req.body.limit;
        skip = req.body.skip;
    } else {
        projection = {
            _id: 1,
            'address.lat': 1,
            'address.lon': 1,
            'community.price_max': 1,
        };
        limit = 200;
        skip = 0;
    }

    const count = await db
        .collection('newyorksampleproperties2')
        .find(filter, { projection: projection })
        .count();

    let properties;
    // let t1 = performance.now();
    if (req.body.list) {
        // FIXME: The 'console.time' function measures the performance for lookup in mongodb.   This is specifically important to determine the best solution for performance when performing pagination queries.   SKIP and LIMIT is not the optimal solution.    Need to consider implementing bucket queries
        console.time(
            `${COLOR.fgCyan}${COLOR.bright}MONGODB LIST QUERY - /api/properties/viewport.js${COLOR.reset}`
        );
        properties = await db
            .collection('newyorksampleproperties2')
            .find(filter, { projection: projection })
            .limit(limit)
            .skip(skip)
            .toArray();
        // let t2 = performance.now();
        console.timeEnd(
            `${COLOR.fgCyan}${COLOR.bright}MONGODB LIST QUERY - /api/properties/viewport.js${COLOR.reset}`
        );
    } else {
        console.time(
            `${COLOR.fgMagenta}${COLOR.bright}MONGODB MAP QUERY - /api/properties/viewport.js${COLOR.reset}`
        );
        properties = await db
            .collection('newyorksampleproperties2')
            .find(filter, { projection: projection })
            .limit(limit)
            .skip(skip)
            .toArray();
        console.timeEnd(
            `${COLOR.fgMagenta}${COLOR.bright}MONGODB MAP QUERY - /api/properties/viewport.js${COLOR.reset}`
        );
    }
    // console.log('PERFORMANCE: ' + (t1 - t0) + ' milliseconds');

    res.status(200).send({ properties, count });
}
