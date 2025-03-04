export const Logo = ({
  size = 'h-64 w-auto',
  src = '/manzaSearch-logo.png',
  alt = 'Manza Search logo',
  className = '',
}) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`${size} ${className}`} />
  )
}
