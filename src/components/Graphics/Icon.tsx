export const Icon = ({
  size = 'size-6',
  src = '/favicon.svg',
  alt = 'Manza Search Icon',
  className = '',
}) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`${size} dark:rounded-lg dark:bg-white ${className}`} />
  )
}
