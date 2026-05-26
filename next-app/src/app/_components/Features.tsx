import { MaskedText } from './MaskedText'
import { metrics, products, useCases, workflow } from './content'

export function Features() {
  return (
    <>
      <section className="metrics section-pad" aria-label="Kream Proxies network metrics">
        <div className="section-heading scroll-reveal">
          <p className="eyebrow">Proof wall</p>
          <h2 className="masked-scroll">
            <MaskedText text="Numbers that taste better than marketing claims." />
          </h2>
        </div>
        <div className="metric-grid">
          {metrics.map((metric) => (
            <article className="metric-tile" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="products section-pad">
        <div className="section-heading scroll-reveal" id="products">
          <p className="eyebrow">Products</p>
          <h2 className="masked-scroll">
            <MaskedText text="Five proxy flavors, one operational freezer." />
          </h2>
          <p>
            Buy by workload instead of guessing. Every plan shares the same dashboard,
            exports, usage reporting, and support pipeline.
          </p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className={`product-card tone-${product.tone}`} key={product.name}>
              <div className="product-top">
                <span>{product.eyebrow}</span>
                <span className="mini-scoop" />
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <strong>{product.price}</strong>
              <ul>
                {product.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <a href="#start">Build with {product.name.split(' ')[0]}</a>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export function UseCases() {
  return (
    <section className="use-cases section-pad">
      <div className="section-heading scroll-reveal" id="use-cases">
        <p className="eyebrow">Use cases</p>
        <h2 className="masked-scroll">
          <MaskedText text="Built for real operator workflows, not showroom demos." />
        </h2>
      </div>
      <div className="use-grid">
        {useCases.map((useCase) => (
          <article className={`use-card accent-${useCase.accent}`} key={useCase.title}>
            <span />
            <h3>{useCase.title}</h3>
            <p>{useCase.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function Workflow() {
  return (
    <section className="workflow section-pad">
      <div className="section-heading scroll-reveal">
        <p className="eyebrow">How it works</p>
        <h2 className="masked-scroll">
          <MaskedText text="Three scoops from signup to live traffic." />
        </h2>
      </div>
      <div className="workflow-grid">
        {workflow.map((step, index) => (
          <article className="workflow-step" key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{step}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
