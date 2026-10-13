import { PolicyPage, policyMetadata } from "@/components/policies/policy-page";

const SLUG = "cancellation-refund-policy";

export async function generateMetadata() {
  return policyMetadata(SLUG);
}

export default function CancellationRefundPolicyPage() {
  return <PolicyPage slug={SLUG} />;
}
