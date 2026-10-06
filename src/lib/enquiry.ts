import { z } from "zod";
import { enquirySubjects } from "@/content/programmes";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  company: z.string().trim().min(2, "Please enter your company or organisation.").max(160),
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  phone: z.string().trim().max(40).refine(v => !v || (/^[+\d\s().-]+$/.test(v) && v.replace(/\D/g, "").length >= 7 && v.replace(/\D/g, "").length <= 15), "Please check the phone number, or leave it blank."),
  subject: z.string().refine(v => enquirySubjects.some(s => s.value === v), "Please choose a programme or service."),
  participants: z.string().trim().refine(v => !v || (/^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 10000), "Enter a whole number between 1 and 10,000."),
  timing: z.string().trim().max(120),
  message: z.string().trim().min(20, "Please describe your needs (at least 20 characters).").max(5000),
});
export type EnquiryValues = z.infer<typeof enquirySchema>;
