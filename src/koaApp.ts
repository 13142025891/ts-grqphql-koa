import 'reflect-metadata'
import Koa from 'koa'
import KoaLogger from 'koa-logger'
import { ApolloServer } from 'apollo-server-koa'
import { getSchema } from './resolvers/index'
import bodyParser from 'koa-bodyparser'
//import { ApolloError } from 'apollo-server-errors'

const _DEV_ = process.env.NODE_ENV === 'development'

class Application {
  private app: Koa

  constructor() {
    this.app = new Koa()
    this.init()
  }

  // class MyError extends ApolloError {
  //   constructor(message: string) {
  //     super(message, 'MY_ERROR_CODE')
  //     Object.defineProperty(this, 'name', { value: 'MyError' })
  //   }
  // }

  private init() {
    if (_DEV_) {
      this.app.use(KoaLogger())
    }
    this.app.use(bodyParser())
    this.app.use(async (ctx: Koa.DefaultContext, next: () => Promise<any>) => {
      const path = ctx.request.path

      console.log('-------', ctx.request.body)

      if (path === '/') {
        ctx.body = 'Welcome graphql'
      }
      await next()
      ctx.set('X-Powered-By', 'panwu')
    })
  }

  private async integrateGraphql(
    app: Koa<Koa.DefaultState, Koa.DefaultContext>
  ) {
    const server = new ApolloServer({
      schema: await getSchema(),
      playground: {
        settings: {
          'request.credentials': 'include'
        }
      } as any,
      introspection: true,
      context: ({ ctx }: any) => ctx,
      formatError: () => {
        return new Error('Internal server error')
      },
      formatResponse: (res: any) => {
        return res
      },
      plugins: [
        {
          requestDidStart() {
            return {
              parsingDidStart() {}
            }
          }
        }
      ]
    })
    server.applyMiddleware({ app })
    return server
  }

  public start = async (port: number) => {
    await this.integrateGraphql(this.app).then(server => {
      this.app.listen(port, () => {
        console.log(
          'Running a Koa GraphQL API server',
          `http://localhost:${port}${server.graphqlPath}`
        )
      })
    })
  }
}

export default new Application()
