import { HandlerEvent } from '@netlify/functions';


const create = (event: HandlerEvent) => {
	console.log('from create function');
}

export { create };
