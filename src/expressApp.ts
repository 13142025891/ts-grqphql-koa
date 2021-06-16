//import graphql from 'graphql/index.js'

// import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import express, { Express } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'type-graphql'
import { StudentResolver } from './resolvers/student'
import { graphql } from 'graphql'
import bodyParser from 'body-parser'
import { getSchema } from './resolvers/index'

const _DEV_ = process.env.NODE_ENV === 'development'

class Application {
  private app: Express

  constructor() {
    this.app = express()
    this.init()
  }

  private async init() {
    if (_DEV_) {
      //this.app.use()
    }
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
    this.app.use(async (req, res, next) => {
      //console.log('express', req.body)
      res.set('X-Powered-By', 'panwu')
      await next()
    })

    this.app.use(
      '/graphql',
      // graphqlHTTP(async (request, response, graphQLParams) => ({
      //   schema: MyGraphQLSchema,
      //   rootValue: await someFunctionToGetRootValue(request),
      //   graphiql: true,
      // })),
      graphqlHTTP(async (request, response, graphQLParams) => ({
        schema: await getSchema(),
        graphiql: true,
        context: request
      }))
    )
    this.app.post('/test', async (req, res) => {
      graphql(await getSchema(), req.body.query, null, req)
        .then(
          response => {
            if (response.hasOwnProperty('errors')) {
              let { errors } = response
              console.log('errors', errors)

              if (errors && errors.length > 0) {
                let { message } = errors[0]
                res.send({ head: { message }, data: null })
              }
            } else {
              return res.send({ head: { message: '' }, data: response.data })
            }
          },
          () => {
            res.send({
              error: '出错了'
            })
          }
        )
        .catch(() => {
          res.send({
            error: '出错了'
          })
        })
    })
  }

  public start = async (port: number) => {
    await this.app.listen(port)
    console.log(
      `Running a Express GraphQL API server at http://localhost:${port}/graphql`
    )
  }
}
export default new Application()
