import { BrandIntro } from "@/components/home/brand-intro";
// Hidden for now — components kept, re-enable by uncommenting.
// import { CustomJourneyCta } from "@/components/home/custom-journey-cta";
import { FeaturedJourneys } from "@/components/home/featured-journeys";
import { FounderStory } from "@/components/home/founder-story";
import { Hero } from "@/components/home/hero";
// import { HowItWorks } from "@/components/home/how-it-works";
// import { ResponsibleTravel } from "@/components/home/responsible-travel";
import { SignatureAgro } from "@/components/home/signature-agro";
import { SignatureExperiences } from "@/components/home/signature-experiences";
// import { Testimonials } from "@/components/home/testimonials";
import { WellnessExperience } from "@/components/home/wellness-experience";
import { WhyTravelWithUs } from "@/components/home/why-travel-with-us";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <SignatureExperiences />
      <FeaturedJourneys />
      <SignatureAgro />
      <WellnessExperience />
      {/* <HowItWorks /> */}
      <WhyTravelWithUs />
      {/* <ResponsibleTravel /> */}
      {/* <Testimonials /> */}
      <FounderStory />
      {/* <CustomJourneyCta /> */}
    </>
  );
}
