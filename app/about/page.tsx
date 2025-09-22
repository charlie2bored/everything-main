export const dynamic = "force-static";
import AboutClient from "@/components/AboutClient";

export default function AboutPage() {
  return (
    <AboutClient>
      <section className="about-page section" style={{padding: "64px 0"}}>
        <div className="about-page__container" style={{maxWidth: "800px", margin: "0 auto", padding: "0 20px"}}>
          <h1 className="about-page__title" style={{marginBottom: "16px"}}>About</h1>
          <p className="about-page__subtitle" style={{marginBottom: "32px"}}>
            NYC-based designer & front-end dev focused on intentional, conversion-aware brand and product experiences.
          </p>
          <div className="bio__description">
            <p>I use research, systems thinking, and motion to make interfaces feel effortless and premium.</p>
            <p>Currently crafting portfolio case studies; using the city as inspiration for human interaction.</p>
          </div>
        </div>
      </section>
    </AboutClient>
  );
}
