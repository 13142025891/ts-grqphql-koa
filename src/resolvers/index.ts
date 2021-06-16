import { buildSchema } from 'type-graphql'
import { StudentResolver } from './student'
import { LabelModelResolver } from './fpbs/labelResolver'

export async function getSchema() {
  return await buildSchema({
    resolvers: [StudentResolver, LabelModelResolver]
  })
}
