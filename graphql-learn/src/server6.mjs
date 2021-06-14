import graphql from 'graphql/index.js'
import express from 'express'
import graphqlHTTP
from 'express-graphql'
import
flight
from './flight'

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
    flight
  }
});

var schema = new graphql.GraphQLSchema({
  query: queryType
});

var app = express();
app.use('/graphql', graphqlHTTP.graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.get('/test', (req, res) => {

  graphql.graphql(schema, `{
  flight {
    name,
    code
    getFlight {
      code
      name
    }
  }
}`).then((response) => {
    console.log(response);
    if (response.Object.hasOwnProperty(error)) {
      res.send({
        error: "出错了"
      })
    }
    res.send(response)
  }, (e) => {
    res.send({
      error: "出错了"
    })
  }).catch(e => {
    res.send({
      error: "出错了"
    })
  });
});

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');