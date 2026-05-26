import { ButtonLink } from '@/components/ButtonLink'
import { MaskedText } from './MaskedText'

export function FinalCallToAction() {
  return (
    <section className="final-cta" id="start">
      <p className="eyebrow">Fast path</p>
      <h2 className="masked-scroll">
        <MaskedText text="Open the freezer. Ship better proxy routes today." />
      </h2>
      <p>
        Start with prepaid GB, build a custom high-volume plan, or open a Discord ticket
        for region-specific routing before a launch.
      </p>
      <div className="hero-actions">
        <ButtonLink variant="primary" href="mailto:sales@kreamproxies.com">
          Talk to sales
        </ButtonLink>
        <ButtonLink variant="ghost" href="#products">
          Review products
        </ButtonLink>
      </div>
    </section>
  )
}
