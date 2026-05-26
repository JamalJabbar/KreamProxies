type MaskedTextProps = {
  text: string
  className?: string
}

const splitWords = (text: string) => text.split(' ').filter(Boolean)

export function MaskedText({ text, className = '' }: MaskedTextProps) {
  return (
    <span className={`masked-text ${className}`} aria-label={text}>
      {splitWords(text).map((word, index) => (
        <span className="mask-word" aria-hidden="true" key={`${text}-${word}-${index}`}>
          <span>{word}</span>
        </span>
      ))}
    </span>
  )
}
