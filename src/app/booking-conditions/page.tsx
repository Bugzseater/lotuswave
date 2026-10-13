import { PolicyPage, policyMetadata } from "@/components/policies/policy-page";

const SLUG = "booking-conditions";

export async function generateMetadata() {
  return policyMetadata(SLUG);
}

export default function BookingConditionsPage() {
  return <PolicyPage slug={SLUG} />;
}
