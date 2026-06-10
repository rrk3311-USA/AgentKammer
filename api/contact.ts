import { z } from "zod";
import { notifyContactSubmission } from "../server/contact-notify";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
});

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => { json: (body: unknown) => void };
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const validated = contactSchema.parse({
      name: body.name?.trim(),
      email: body.email?.trim(),
      phone: body.phone?.trim() || undefined,
      message: body.message?.trim(),
    });

    await notifyContactSubmission(validated);

    return res.status(200).json({
      ok: true,
      message: "Thank you! We'll be in touch within 24 hours.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid form data", details: error.errors });
    }
    console.error("Contact submission error:", error);
    return res.status(500).json({ error: "Failed to submit contact form" });
  }
}
