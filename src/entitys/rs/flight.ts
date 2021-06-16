import { GraphQLString } from 'graphql/type/scalars'
//import graphql from 'graphql'
import { GraphQLObjectType } from 'graphql'

class Flight {
  constructor(name: string, code: string) {
    this.code = code
    this.name = name
  }

  public code!: string
  public name!: string

  getFlight() {
    return new Flight('', 'abc')
  }
}

// 定义  类型
const flightType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Flight',
  fields: () => ({
    code: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    getFlight: {
      type: flightType
    }
  })
})

export default {
  type: flightType,
  resolve: () => {
    return new Flight('flight', 'ERG')
  }
}
