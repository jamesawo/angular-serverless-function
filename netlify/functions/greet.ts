import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // your server-side functionality
  console.log('in serverless');
  console.log(event.httpMethod);
  return {
    statusCode: 200,
    body: JSON.stringify({ id: 2, method: event.httpMethod })
  }
};

export { handler };
