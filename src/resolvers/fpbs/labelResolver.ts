import { Resolver, Query, Ctx } from 'type-graphql'
import LabelModel from '../../entitys/rs/fpbs/label'
import LabelServer from '../../servers/fpbs/label'
//import Koa from 'koa';

@Resolver(LabelModel)
export class LabelModelResolver {
  @Query(() => [LabelModel], { nullable: true, description: '查询标签列表' })
  async Labels(@Ctx() ctx: any) {
    //console.log('Labels', ctx.body)

    return await LabelServer.getLabel(ctx.body.head, ctx.body.data)
  }
}
