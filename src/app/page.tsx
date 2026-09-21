import { BrandIntro } from "@/components/home/brand-intro";
import { Hero } from "@/components/home/hero";
import { SignatureExperiences } from "@/components/home/signature-experiences";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <SignatureExperiences />
    </>
  );
}
