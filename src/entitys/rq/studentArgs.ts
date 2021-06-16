import { Field, ArgsType } from 'type-graphql';



@ArgsType()
export class StudentArgs {

  @Field({ description: '姓名', nullable: true })
  public name?: string;

  @Field({ description: '性别', nullable: true })
  public sex?: string;

  @Field({ description: '年龄', nullable: true })
  public age?: number;
}