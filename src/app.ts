
import "reflect-metadata";
import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';
import { StudentResolver } from './resolvers/student';
import bodyParser from 'koa-bodyparser';
//import { GraphQLResponse, GraphQLRequestContext } from 'apollo-server-types';

import { ApolloError } from 'apollo-server-errors';

export class MyError extends ApolloError {
  constructor(message: string) {
    super(message, 'MY_ERROR_CODE');

    Object.defineProperty(this, 'name', { value: 'MyError' });
  }

  //errcode: 0
  //errmessage: ""
  //errorDetail: ""
}

async function getSchema() {
  return buildSchema({
    resolvers: [StudentResolver]
  });
}



async function integrateGraphql(app: Koa<Koa.DefaultState, Koa.DefaultContext>) {
  const server = new ApolloServer({
    schema: await getSchema(),
    playground: {
      settings: {
        'request.credentials': 'include'
      }
    } as any,
    introspection: true,
    context: ({ ctx }) => ctx,
    // formatResponse: (response: GraphQLResponse | null, requestContext: GraphQLRequestContext<any>) => {


    //   if (requestContext.response && requestContext.response.http) {
    //     requestContext.response.http.headers.set('custom-key', 'custom-value');
    //   }

    //   response?.data={
    //     a:1
    //   }
    //   return response as GraphQLResponse;
    // },
    formatError: () => {
      // Don't give the specific errors to the client.

      return new Error('Internal server error');

      // Otherwise return the original error. The error can also
      // be manipulated in other ways, as long as it's returned.
      //return err;
    },
    formatResponse: (res: any) => {

      //let { context } = ctx as Koa.DefaultContext
      //console.log('aaaa', res.data, context.request.body.key);
      //console.log('12344');

      //let data = res.data?.[context.request.body.key]
      //console.log(res.data?.__schema)

      if (!res.data?.__schema) {
        Object.defineProperty(res, 'head', { value: 'MyError' });
        res.data = res.data
      }

      // data?: Record<string, any> | null;
      // errors?: ReadonlyArray<GraphQLFormattedError>;
      // extensions?: Record<string, any>;
      // http?: Pick<Response, 'headers'> & Partial<Pick<Mutable<Response>, 'status'>>;


      let a = {
        http: res.http,
        head: { a: 1 }
      }

      // Object.defineProperty(res, 'head', { value: 'MyError' });
      //console.log('---', res);
      return a
    },
    plugins: [
      {
        requestDidStart() {
          return {
            parsingDidStart() {
            },
          }
        }
      }
    ],

  });
  server.applyMiddleware({ app });



  return server;
}

const app = new Koa();

app.use(bodyParser())


integrateGraphql(app).then(server => {
  app.listen(8088, () => {
    console.log(`server running success at ${server.graphqlPath}`);
  });
});