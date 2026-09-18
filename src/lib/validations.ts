import { z } from "zod";

/** Shared field rules so the two forms stay consistent. */
const name = z.string().trim().min(2, "Please enter your name").max(80);
const email = z.string().trim().email("Please enter a valid email address");
const phone = z
  .string()
  .trim()
  .max(30)
  .regex(/^[+0-9 ()-]*$/, "Please enter a valid phone number")
  .optional()
  .or(z.literal(""));

export const planTripSchema = z.object({
  name,
  email,
  phone,
  country: z.string().trim().min(2, "Please tell us where you are travelling from").max(60),
  theme: z.enum(["agro", "wellness", "both"]),
  travellers: z.coerce.number().int().min(1, "At least one traveller").max(40),
  /** ISO date; blank means "not decided yet". */
  startDate: z.string().trim().optional().or(z.literal("")),
  nights: z.coerce.number().int().min(1).max(60).optional(),
  budgetPerPerson: z.coerce.number().int().min(0).max(100000).optional(),
  interests: z.array(z.string().trim()).max(12).default([]),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about the trip you have in mind")
    .max(2000),
  consent: z.literal(true, {
    message: "Please accept the privacy policy to continue",
  }),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type PlanTripInput = z.infer<typeof planTripSchema>;

export const contactSchema = z.object({
  name,
  email,
  phone,
  subject: z.string().trim().min(3, "Please add a subject").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us how we can help")
    .max(2000),
  consent: z.literal(true, {
    message: "Please accept the privacy policy to continue",
  }),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
