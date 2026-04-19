import createMiddleware from 'next-intl/middleware'
import { routing } from './routing'

export default createMiddleware(routing)

export const config = {
  // Esclude gestione-menu-ds95 dal routing multilingua
  matcher: ['/((?!api|_next|_vercel|gestione-menu-ds95|.*\\..*).*)'],
}