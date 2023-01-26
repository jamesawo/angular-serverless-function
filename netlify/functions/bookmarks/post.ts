import { HandlerEvent } from "@netlify/functions";
import { MongoClient } from 'mongodb'

const post = async (event: HandlerEvent) => {
	console.log(event.httpMethod);
	console.log('its a post reques there');
}


export { post };
