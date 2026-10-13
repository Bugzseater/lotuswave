import { PolicyPage, policyMetadata } from "@/components/policies/policy-page";

const SLUG = "cookie-policy";

export async function generateMetadata() {
  return policyMetadata(SLUG);
}

export default function CookiePolicyPage() {
  return <PolicyPage slug={SLUG} />;
}
