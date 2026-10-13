import { PolicyPage, policyMetadata } from "@/components/policies/policy-page";

const SLUG = "health-and-safety";

export async function generateMetadata() {
  return policyMetadata(SLUG);
}

export default function HealthAndSafetyPage() {
  return <PolicyPage slug={SLUG} />;
}
