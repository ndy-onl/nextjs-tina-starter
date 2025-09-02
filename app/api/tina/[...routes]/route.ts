import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/backend-node'
import { TinaAuthJSOptions, TinaAuthJSProvider } from 'tinacms-authjs'

import databaseClient from '../../../../tina/database'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : TinaAuthJSProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET,
        }),
      }),
  databaseClient,
})

export const GET = (req) => {
  return handler(req)
}

export const POST = (req) => {
  return handler(req)
}
