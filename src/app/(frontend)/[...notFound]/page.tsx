import NotFound from '../not-found'

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFoundCatchAll() {
  return NotFound()
}
