import Button from './Button'

export default function StaticHero() {
  return (
    <section 
      className="hero" 
      id="home"
    >
      {/* Simplified background for faster rendering */}
      <div className="hero__background" />

      {/* Content layer - static for instant rendering */}
      <div className="hero__container">
        <h1 className="hero__title">
          <span className="hero__title-line hero__title-line--white">
            Brand systems + motion
          </span>
          <span className="hero__title-line hero__title-line--yellow">
            that convert.
          </span>
        </h1>

        <p className="hero__lede">
          Identity, web, and UX that move metrics.
        </p>

        <div className="hero__actions">
          <Button
            href="/work"
            variant="primary"
            aria-label="See the work"
          >
            See the work
          </Button>
        </div>

        {/* Sticky scroll indicator */}
        <div className="hero__scroll">
          <span className="hero__scroll-text">Scroll for more</span>
          <div className="hero__scroll-indicator" aria-hidden="true">
            <div className="hero__scroll-line"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
