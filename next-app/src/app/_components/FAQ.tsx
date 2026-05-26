import { MaskedText } from './MaskedText'
import { faqs } from './content'

export function FAQ() {
  return (
    <section className="faq section-pad">
      <div className="section-heading scroll-reveal" id="faq">
        <p className="eyebrow">FAQ</p>
        <h2 className="masked-scroll">
          <MaskedText text="Common questions before the first scoop." />
        </h2>
      </div>
      <div className="faq-grid">
        {faqs.map((faq) => (
          <article className="faq-card" key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
