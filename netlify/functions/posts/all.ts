import { HandlerEvent } from '@netlify/functions';
import { MongoClient } from 'mongodb'


const all = async (event: HandlerEvent) => {
	const client = new MongoClient(process.env['MONGODB_URL']);
	try {

		await client.connect();
		const db = client.db(process.env['MONGODB_NAME']);
		return await db.collection('posts').find({}).sort({ created_at: -1 }).toArray();

	} catch (err) {
		console.log(err);
		throw new Error(`${err.message}`);
	} finally {
		await client.close();
	}
}

export { all };
