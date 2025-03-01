export const Logo = ({
  size = 'size-64',
  src = '/favicon.svg',
  alt = 'Manza Search logo',
  className = '',
}) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`${size} ${className}`} />
  )
}
