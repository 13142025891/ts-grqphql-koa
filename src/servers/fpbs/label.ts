import { RESTDataSource } from 'apollo-datasource-rest'
import { RestBaseUrl } from '../../conf/index'
import LabelModel from '../../entitys/rs/fpbs/label'

class LabelServer extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `https://m.wingontravel.com/api/`
    this.initialize({} as any)
    //this.fetch = this.fetch.bind(this)
  }

  async getLabel(head: any, data: any): Promise<LabelModel[]> {
    //console.log('getLabel', head, data)
    console.log(new Date())

    const rs = await this.post(`fpbs/label/hot`, { head, data })
    //console.log(rs.data)
    console.log(new Date())
    return rs.data
  }
}

export default new LabelServer()
