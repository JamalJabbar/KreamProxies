import { flavorTags } from './content'

export function FlavorMarquee() {
  return (
    <section className="flavor-marquee" aria-label="Supported proxy flavors and workflows">
      <div className="marquee-track">
        {[...flavorTags, ...flavorTags].map((tag, index) => (
          <span key={`${tag}-${index}`}>{tag}</span>
        ))}
      </div>
    </section>
  )
}
