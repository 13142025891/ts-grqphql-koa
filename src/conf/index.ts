export const KOA_PORT = 8088
export const EXPRESS_PORT = 8089

export const RestBaseUrl = () => {
  const env = process.env.r_env || ''
  return `https://m${env + '.'}wingontravel.com/api/`
}
