import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Student {
  constructor(name: string, sex: string, age: number) {
    this.name = name
    this.sex = sex
    this.age = age
  }

  @Field({ description: '姓名' })
  public name!: string

  @Field({ description: '性别' })
  public sex!: string

  @Field({ description: '年龄' })
  public age!: number

  @Field(() => Info, { description: 'info' })
  public ifno(): Info | null {
    return new Info(['a', 'b'], '123', 234)
  }
}

@ObjectType()
export class Info {
  constructor(hobby: string[], height: string, weight: number) {
    this.hobby = hobby
    this.height = height
    this.weight = weight
  }
  @Field(() => [String])
  public hobby!: string[]

  @Field()
  public height!: string

  @Field()
  public weight!: number
}
