import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export default class Head {
  constructor(errcode: number, errmessage: string, errorDetail: string) {
    this.errcode = errcode
    this.errmessage = errmessage
    this.errorDetail = errorDetail
  }

  @Field({ description: '错误编码' })
  public errcode!: number

  @Field({ description: '错误信息' })
  public errmessage!: string

  @Field({ description: '错误详细描述' })
  public errorDetail!: string
}
