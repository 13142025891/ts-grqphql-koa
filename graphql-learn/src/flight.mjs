import graphql from 'graphql/index.js'

class Flight {
  constructor(name, code) {
    this.code = code;
    this.name = name
  }

  getFlight() {
    return new Flight('', "abc")
  }
}


// 定义  类型
var flightType = new graphql.GraphQLObjectType({
  name: 'Flight',
  fields: () => ({
    code: {
      type: graphql.GraphQLString
    },
    name: {
      type: graphql.GraphQLString
    },
    getFlight: {
      type: flightType
    }
  })
})



export default {
  type: flightType,
  resolve: (_) => {
    return new Flight("flight", "ERG")
  }
}