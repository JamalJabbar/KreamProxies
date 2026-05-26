export default function Loading() {
  return (
    <main className="loading-shell" aria-busy="true" aria-label="Loading Kream Proxies">
      <span className="loading-label">Loading Kream Proxies</span>
      <div className="loading-nav">
        <span className="loading-mark" />
        <span className="loading-line loading-brand" />
        <span className="loading-pill" />
      </div>
      <div className="loading-hero">
        <div className="loading-copy">
          <span className="loading-line loading-eyebrow" />
          <span className="loading-line loading-title" />
          <span className="loading-line loading-title short" />
          <span className="loading-line loading-body" />
          <span className="loading-line loading-body short" />
          <div className="loading-actions">
            <span className="loading-button strawberry" />
            <span className="loading-button mint" />
          </div>
        </div>
        <div className="loading-dashboard">
          <span className="loading-card strawberry" />
          <span className="loading-card mint" />
        </div>
      </div>
    </main>
  )
}
