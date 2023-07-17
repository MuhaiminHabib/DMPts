import { NextRequest, NextResponse } from 'next/server'

export const APP_ID = '618435810352216'
const APP_SECRET = '76d6e335146405a8500f8d9fd9d999d3'

// interface ExtendedNextRequest extends NextRequest {
//   query: {
//     token: string
//   }
// }

// export default async function handle(req: ExtendedNextRequest, res: NextResponse) {
//   const appAccessToken = await getAppAccessToken()

//   console.log('appAccessToken is:', appAccessToken)

//   const scopes = await debugToken(appAccessToken, req.query.token)

//   console.log('scopes', scopes)

//   res.status(200)
//   res.json(scopes.data.scopes)
// }

// const debugToken = async (appAccessToken: string, token: string) => {
//   const res = await fetch(
//     `https://graph.facebook.com/v17.0/debug_token?input_token=${token}&access_token=${appAccessToken}`
//   )
//   const data: { data: { scopes: string[] } } = await res.json()

//   return data
// }

// const getAppAccessToken = async () => {
//   const res = await fetch(
//     `https://graph.facebook.com/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&grant_type=client_credentials`
//   )

//   const data: { access_token: string } = await res.json()

//   if (!res.ok) {
//     throw new Error('App access token failed')
//   }

//   return data.access_token
// }
