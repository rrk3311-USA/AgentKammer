export type ContactProfile = {
  email?: string;
  phone?: string;
  situation?: string;
  desire?: string;
  constraints?: string;
  tradeOff?: string;
  timeline?: string;
  budget?: string;
  financingStatus?: string;
  household?: string;
  geography?: string;
  neighborhoods?: string;
  buildingPreferences?: string;
  dealBreakers?: string;
  decisionMakers?: string;
  confidenceReadiness?: string;
};

const PROFILE_KEYS = [
  "situation",
  "desire",
  "constraints",
  "tradeOff",
  "timeline",
  "budget",
  "financingStatus",
  "household",
  "geography",
  "neighborhoods",
  "buildingPreferences",
  "dealBreakers",
  "decisionMakers",
  "confidenceReadiness",
] as const satisfies readonly (keyof ContactProfile)[];

export function hasContact(answers: Pick<ContactProfile, "email" | "phone">) {
  return Boolean(answers.email || answers.phone);
}

export function meaningfulProfileCount(answers: ContactProfile) {
  return PROFILE_KEYS.filter((key) => Boolean(answers[key])).length;
}

export function visitorAskedToSave(text: string) {
  return /(save (this|it|my)|resume (this|later|my decision)|book (a |an )?(call|session|time)|schedule (a |an )?(call|session|time)|calendar|send (me|this)|continue later|want this waiting|email me|text me|call me|keep this)/i.test(
    text,
  );
}

export function replyAsksForContact(text: string) {
  return /(what email|your email|email or mobile|phone number|mobile (number|should)|want this waiting|save a short note|send (you )?(a )?recap)/i.test(
    text,
  );
}

export function shouldOfferContact(
  answers: ContactProfile,
  score: number,
  userMessageCount = 0,
  latestUserText = "",
) {
  if (hasContact(answers)) return false;
  if (visitorAskedToSave(latestUserText)) return true;
  // Value first: never capture in turns 1-5. Turns 1-3 are strictly rapport.
  if (userMessageCount < 6) return false;
  const depth = meaningfulProfileCount(answers);
  const hasStrongIntent = score >= 4 && depth >= 4;
  return depth >= 5 || (userMessageCount >= 7 && hasStrongIntent);
}

export function buildContactOffer() {
  return "If you want this waiting for you, I can save a short note of what I would do next. Entirely optional. What email or mobile should I use?";
}
