import { PolicyPage, policyMetadata } from "@/components/policies/policy-page";

const SLUG = "payment-policy";

export async function generateMetadata() {
  return policyMetadata(SLUG);
}

export default function PaymentPolicyPage() {
  return <PolicyPage slug={SLUG} />;
}
