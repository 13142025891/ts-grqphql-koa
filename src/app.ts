import koa from './koaApp'
import express from './expressApp'
import { KOA_PORT, EXPRESS_PORT } from './conf'

const start = async () => {
  await koa.start(KOA_PORT)
  await express.start(EXPRESS_PORT)
}

start()
