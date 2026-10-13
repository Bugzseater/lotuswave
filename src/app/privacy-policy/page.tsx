import { PolicyPage, policyMetadata } from "@/components/policies/policy-page";

const SLUG = "privacy-policy";

export async function generateMetadata() {
  return policyMetadata(SLUG);
}

export default function PrivacyPolicyPage() {
  return <PolicyPage slug={SLUG} />;
}
