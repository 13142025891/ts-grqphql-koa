var express = require('express');
var {
  graphqlHTTP
} = require('express-graphql');
var graphql = require('graphql');
let Flight = require('./flight')

// Maps id to User object
var fakeDatabase = {
  'a': {
    id: 'a',
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  },
};




// 定义 User 类型
var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: graphql.GraphQLString
    },
    name: {
      type: graphql.GraphQLString
    },
  }
});

// 定义 User 类型
var flightType = new graphql.GraphQLObjectType({
  name: 'Flight',
  fields: {
    code: {
      type: graphql.GraphQLString
    },
    name: {
      type: graphql.GraphQLString
    },
  }
});

// 定义 Query 类型
var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      // `args` 描述了 `user` 查询接受的参数
      args: {
        id: {
          type: graphql.GraphQLString
        }
      },
      resolve: (_, {
        id
      }) => {
        return fakeDatabase[id];
      }
    },
    flight: {
      type: flightType,
      resolve: (_) => {
        return new Flight("flight", "ERG")
      }
    },
  }
});

var schema = new graphql.GraphQLSchema({
  query: queryType
});

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');