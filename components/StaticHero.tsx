import Link from 'next/link'

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
        <p className="hero__eyebrow">
          Designer & Developer
        </p>

        <h1 className="hero__title">
          <span className="hero__title-line hero__title-line--white">
            Brand systems + motion
          </span>
          <span className="hero__title-line hero__title-line--yellow">
            that convert.
          </span>
        </h1>

        <p className="hero__lede">
          Identity, web, and UX that ship fast and move metrics.
        </p>

        <div className="hero__actions">
          <Link
            href="/work"
            className="btn btn--primary"
            aria-label="View my work"
          >
            <span className="btn__text">View work</span>
          </Link>
          <Link
            href="/contact"
            className="btn btn--secondary"
            aria-label="Let's collaborate"
          >
            <span className="btn__text">Let's collaborate</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
