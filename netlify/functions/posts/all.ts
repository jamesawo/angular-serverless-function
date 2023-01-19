import { HandlerEvent } from '@netlify/functions';
import { MongoClient } from 'mongodb'

const mongoUrl = process.env['MONGODB_URL'];
const dbName = process.env['MONGODB_NAME'];

const all = async (event: HandlerEvent) => {

	const client = new MongoClient(mongoUrl);

	try {
		await client.connect();
		const db = client.db(dbName);
		return await db.collection('posts').find({}).sort({ created_at: -1 }).toArray();
	} catch (err) {
		console.log(err);
		throw new Error(`${err.message}`);
	} finally {
		await client.close();
	}
}

export { all };
