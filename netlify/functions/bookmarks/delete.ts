import { MongoClient, ObjectId } from 'mongodb'

const remove = async (bookarmkId: string) => {

	if (!bookarmkId) throw new Error('Please provide a book to remove');

	const client = new MongoClient(process.env['MONGODB_URL']);

	try {
		const database = client.db(process.env['MONGODB_NAME']);

		const result = await database.collection("bookmarks")
			.deleteOne({ "_id": new ObjectId(bookarmkId) });

		return result;

	} catch (error) {
		console.log(error);
		throw new Error(error.message);
	}
	finally {
		await client.close();
	}
}


export { remove };
