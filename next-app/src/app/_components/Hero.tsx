import { ButtonLink } from '@/components/ButtonLink'
import { MaskedText } from './MaskedText'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow reveal-copy">Residential · Mobile · ISP · Datacenter</p>
        <h1>
          <MaskedText text="Proxy infrastructure with ice-cold routing." />
        </h1>
        <p className="hero-lede reveal-copy">
          Kream Proxies gives operators one clean control plane for rotating residential IPs,
          carrier-grade mobile routes, static ISP endpoints, and high-throughput datacenter pools.
        </p>
        <div className="hero-actions reveal-copy">
          <ButtonLink variant="primary" href="#pricing">
            View flavors
          </ButtonLink>
          <ButtonLink variant="ghost" href="#products">
            Compare products
          </ButtonLink>
        </div>
      </div>

      <div className="hero-visual" aria-label="Kream Proxies network dashboard illustration">
        <div className="dashboard-card live-card">
          <div className="card-topline">
            <span>Live mix</span>
            <span className="status-dot">Operational</span>
          </div>
          <strong>4.7M</strong>
          <p>fresh endpoints generated this week</p>
          <div className="chart" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => (
              <span className="chart-bar" key={index} style={{ height: `${32 + (index % 6) * 9}%` }} />
            ))}
          </div>
        </div>

        <div className="dashboard-card session-card">
          <div>
            <span className="card-label">Sticky session</span>
            <strong>120m</strong>
          </div>
          <p>Hold the same route while accounts warm, carts queue, or QA sessions stay alive.</p>
        </div>
      </div>
    </section>
  )
}
