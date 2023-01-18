import { BlogPost } from './../../../src/app/lib/types.interface';
import { Handler } from '@netlify/functions';


const handler: Handler = async (event, context) => {

	const blogPost: BlogPost = {
		author: 'James Aworo',
		content: `
## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....
		`,
		date: '2022-02-12',
		title: 'A Simple Dummy Post',
		_id: 'abasdbn-asdhjksd-asjdhbksj',
	}

	return {
		statusCode: 200,
		body: JSON.stringify({ data: [blogPost, blogPost] })
	};
}

export { handler };
