import { PolicyPage, policyMetadata } from "@/components/policies/policy-page";

const SLUG = "terms-and-conditions";

export async function generateMetadata() {
  return policyMetadata(SLUG);
}

export default function TermsAndConditionsPage() {
  return <PolicyPage slug={SLUG} />;
}
