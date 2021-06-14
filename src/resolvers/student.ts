import { Resolver, Query, Ctx } from 'type-graphql';
import { RS, Head, Student } from '../entitys/students';

//import Koa from 'koa';

@Resolver(RS)
export class StudentResolver {
  @Query(() => RS, { nullable: true, description: '查询学生列表' })
  async students(@Ctx() ctx: any) {
    console.log('1111', ctx.sss);


    return new RS(new Student('wp', 'nan', 26), new Head('123', 'sss', 123))



  }
}
