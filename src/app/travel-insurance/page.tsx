import { PolicyPage, policyMetadata } from "@/components/policies/policy-page";

const SLUG = "travel-insurance";

export async function generateMetadata() {
  return policyMetadata(SLUG);
}

export default function TravelInsurancePage() {
  return <PolicyPage slug={SLUG} />;
}
