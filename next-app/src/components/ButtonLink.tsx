import type { AnchorHTMLAttributes } from 'react'

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant: 'primary' | 'ghost'
}

export function ButtonLink({ className = '', variant, ...props }: ButtonLinkProps) {
  return <a className={`button ${variant} ${className}`.trim()} {...props} />
}
