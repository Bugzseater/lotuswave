import { BrandIntro } from "@/components/home/brand-intro";
import { FeaturedJourneys } from "@/components/home/featured-journeys";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { SignatureAgro } from "@/components/home/signature-agro";
import { SignatureExperiences } from "@/components/home/signature-experiences";
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
      <HowItWorks />
      <WhyTravelWithUs />
    </>
  );
}
