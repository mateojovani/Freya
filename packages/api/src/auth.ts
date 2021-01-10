import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
})

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (error, key) {
    callback(null, key.getPublicKey())
  })
}

export async function isTokenValid(token: string): Promise<any> {
  if (token) {
    const bearerToken = token.split(' ')

    return new Promise((resolve, reject) => {
      jwt.verify(
        bearerToken[1],
        getKey,
        {
          audience: process.env.API_AUDIENCE,
          issuer: `https://${process.env.AUTH0_DOMAIN}/`,
          algorithms: ['RS256'],
        },
        (error, decoded) => {
          if (error) {
            resolve({ error })
          }
          if (decoded) {
            resolve({ decoded })
          }
        }
      )
    })
  }

  return { error: 'No token provided' }
}
