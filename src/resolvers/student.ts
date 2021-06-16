import { Resolver, Query, Ctx } from 'type-graphql'
import { Student } from '../entitys/rs/students'

@Resolver(Student)
export class StudentResolver {
  @Query(() => Student, { nullable: true, description: '查询学生' })
  async students(@Ctx() ctx: any) {
    //console.log('**', ctx)
    return new Student('wp', 'nan', 26)
  }
}
