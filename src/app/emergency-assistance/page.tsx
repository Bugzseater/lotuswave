import { PolicyPage, policyMetadata } from "@/components/policies/policy-page";

const SLUG = "emergency-assistance";

export async function generateMetadata() {
  return policyMetadata(SLUG);
}

export default function EmergencyAssistancePage() {
  return <PolicyPage slug={SLUG} />;
}
