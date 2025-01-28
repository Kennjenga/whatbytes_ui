import { z } from "zod";

// Define your form schema
export const formSchema = z.object({
  rank: z.number().min(1, "Rank must be at least 1"),
  percentile: z
    .number()
    .min(0, "required! Percentile 0-100")
    .max(100, "required! Percentile 0-100"),
  score: z
    .number()
    .min(0, "Score must be at least 0")
    .max(15, "Score cannot exceed 15"),
});

export type FormSchema = z.infer<typeof formSchema>;