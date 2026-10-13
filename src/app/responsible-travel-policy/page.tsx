import { PolicyPage, policyMetadata } from "@/components/policies/policy-page";

const SLUG = "responsible-travel-policy";

export async function generateMetadata() {
  return policyMetadata(SLUG);
}

export default function ResponsibleTravelPolicyPage() {
  return <PolicyPage slug={SLUG} />;
}
