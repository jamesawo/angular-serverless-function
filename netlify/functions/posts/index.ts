import { Handler } from '@netlify/functions';

import { create } from '../posts/create';
import { all } from '../posts/all'


const handler: Handler = async (event, context) => {

	let body;
	try {
		switch (event.httpMethod) {
			case 'GET':
				body = await all(event);
				break;

			case 'POST':
				create(event);
				break;

			case 'PUT':
				break;

			case 'DELETE':
				break;

			default:
				return {
					statusCode: 405,
					body: JSON.stringify({ message: 'Method not supported' })
				}
		}

		return {
			statusCode: 200,
			body: JSON.stringify({ data: body })
		};

	} catch (err: any) {

		return {
			statusCode: 500,
			body: JSON.stringify({ message: err.toString() })
		}
	}

}

export { handler };
