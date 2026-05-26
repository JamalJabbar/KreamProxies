import { MaskedText } from './MaskedText'

export function Pricing() {
  return (
    <section className="control-plane section-pad">
      <div className="panel-copy scroll-reveal" id="pricing">
        <p className="eyebrow">Control plane</p>
        <h2 className="masked-scroll">
          <MaskedText text="Generate, paste, ship, then know exactly where every GB went." />
        </h2>
        <p>
          The design doc called for compact operational hierarchy, so Kream keeps the
          page centered on a dashboard language: live usage, route health, country mix,
          and billing clarity before decorative fluff.
        </p>
      </div>
      <div className="console-card scroll-reveal">
        <div className="console-header">
          <span>kream://generate</span>
          <span>ready</span>
        </div>
        <div className="console-row">
          <span>product</span>
          <strong>residential-swirl</strong>
        </div>
        <div className="console-row">
          <span>geo</span>
          <strong>us, ca, uk, de, jp</strong>
        </div>
        <div className="console-row">
          <span>session</span>
          <strong>sticky-90</strong>
        </div>
        <div className="console-row">
          <span>format</span>
          <strong>host:port:user:pass</strong>
        </div>
        <button type="button">Generate 25,000 endpoints</button>
      </div>
    </section>
  )
}
