import { ObjectType, Field } from 'type-graphql'

@ObjectType()
class LabelModel {
  constructor({
    id,
    name,
    smallImgUrl,
    bigImgUrl,
    category,
    rank,
    resourceType,
    type
  }: LabelModel) {
    this.id = id
    this.name = name
    this.smallImgUrl = smallImgUrl
    this.bigImgUrl = bigImgUrl
    this.category = category
    this.rank = rank
    this.resourceType = resourceType
    this.type = type
  }

  @Field({ description: '标签编号', nullable: true })
  public id: number = 0

  @Field({ description: '标签名称', nullable: true })
  public name: string

  @Field({ description: '标签小图地址', nullable: true })
  public smallImgUrl: string = ''

  @Field({ description: '标签大图地址', nullable: true })
  public bigImgUrl: string = ''

  @Field({ description: '标签种类', nullable: true })
  public category: string = ''

  @Field({ description: '标签排序' })
  public rank!: number

  @Field({ description: '标签资源类型', nullable: true })
  public resourceType: string = ''

  @Field({ description: '标签类型', nullable: true })
  public type: string = ''
}

export default LabelModel
