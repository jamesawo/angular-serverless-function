import { Handler } from '@netlify/functions';

import { create } from '../posts/create';
import { all } from '../posts/all'


const handler: Handler = async (event, context) => {
	// console.log(event);
	let body;
	try {
		switch (event.httpMethod) {
			case 'GET':

				body = await all(event);
				break;

			case 'POST':
				console.log('in post method');
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

		console.log(body);
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
