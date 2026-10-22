/**
 * The Decision Guide asks the map's own questions, in order:
 * intent, then content or relationship, then whether the moment and the channel can carry it.
 * Phrases come from the map. This is not a second process.
 */

import { PURPOSE_LINE, ROUND_NOTICE } from "./communication-map";

export type ChannelName = "In person" | "Phone" | "Written message";

export type Answer = {
  id: string;
  label: string;
  intent?: "clear" | "open";
  concern?: "content" | "relationship";
  moment?: "now" | "later" | "not";
  channel?: ChannelName;
};

export type GuideQuestion = {
  prompt: string;
  answers: readonly Answer[];
};

export type Matter = {
  id: string;
  title: string;
  description: string;
  questions: readonly [GuideQuestion, GuideQuestion, GuideQuestion];
};

export type FrameLine = {
  title: string;
  line: string;
};

export type Recommendation = {
  move: string;
  say: string;
  channel: ChannelName;
  channelReason: string;
  watch: string;
  recover: string;
};

export const OPENING_EYEBROW = "DECISION GUIDE";

export const OPENING_HEADLINE = "Before you respond.";

export const OPENING_SUPPORT =
  "Choose what needs to happen next. The guide will help you decide what to say, how to say it, and whether now is the right moment.";

export const MATTERS: readonly Matter[] = [
  {
    id: "request",
    title: "Make a request",
    description: "Ask for one thing, in words that match the size of the ask.",
    questions: [
      {
        prompt: "What do you want them to do?",
        answers: [
          { id: "step", label: "Take one clear next step.", intent: "clear" },
          { id: "decision", label: "Make a decision only they can make.", intent: "clear" },
          { id: "room", label: "Help, and leave them free to refuse.", intent: "clear" },
        ],
      },
      {
        prompt: "What is in front?",
        answers: [
          { id: "thing", label: "The thing you need.", concern: "content" },
          { id: "landing", label: "How the ask will land between you.", concern: "relationship" },
        ],
      },
      {
        prompt: "When can this be heard?",
        answers: [
          { id: "room-now", label: "They have time, and you can say it in the room.", moment: "now", channel: "In person" },
          { id: "voice", label: "You cannot be there. Voice is possible.", moment: "now", channel: "Phone" },
          { id: "wait", label: "They are rushing, or the words should wait.", moment: "later", channel: "Written message" },
        ],
      },
    ],
  },
  {
    id: "clarify",
    title: "Clarify what they mean",
    description: "Hear the point they made before you answer a different one.",
    questions: [
      {
        prompt: "What are you unsure of?",
        answers: [
          { id: "meant", label: "What they meant.", intent: "open" },
          { id: "want", label: "What they want from you.", intent: "open" },
          { id: "feeling", label: "Whether this is a fact or a feeling.", intent: "open" },
        ],
      },
      {
        prompt: "What is in front?",
        answers: [
          { id: "content", label: "Getting the content right.", concern: "content" },
          { id: "with", label: "Showing that you are with them.", concern: "relationship" },
        ],
      },
      {
        prompt: "How should you ask?",
        answers: [
          { id: "room-now", label: "In the room, while it is still open.", moment: "now", channel: "In person" },
          { id: "voice", label: "By phone, so tone can travel.", moment: "now", channel: "Phone" },
          { id: "writing", label: "In writing, so they can answer with care.", moment: "now", channel: "Written message" },
        ],
      },
    ],
  },
  {
    id: "feedback",
    title: "Give feedback",
    description: "Say what you saw, and what you want to be different.",
    questions: [
      {
        prompt: "What do you want to change?",
        answers: [
          { id: "behavior", label: "One behavior, named plainly.", intent: "clear" },
          { id: "effect", label: "Their sense of its effect.", intent: "clear" },
          { id: "again", label: "Whether it happens again.", intent: "clear" },
        ],
      },
      {
        prompt: "What is in front?",
        answers: [
          { id: "observation", label: "The observation.", concern: "content" },
          { id: "carry", label: "The relationship that has to carry it.", concern: "relationship" },
        ],
      },
      {
        prompt: "Where should it be said?",
        answers: [
          { id: "private", label: "In private, face to face.", moment: "now", channel: "In person" },
          { id: "phone", label: "By phone, if you cannot meet.", moment: "now", channel: "Phone" },
          { id: "exact", label: "In writing, because the facts must stay exact.", moment: "later", channel: "Written message" },
        ],
      },
    ],
  },
  {
    id: "repair",
    title: "Repair tension",
    description: "Restore the ground between you before you return to the point.",
    questions: [
      {
        prompt: "What needs to change first?",
        answers: [
          { id: "heard", label: "That they feel heard.", intent: "clear" },
          { id: "record", label: "That the record is accurate.", intent: "clear" },
          { id: "stop", label: "That the exchange stops for now.", intent: "open" },
        ],
      },
      {
        prompt: "What is in front?",
        answers: [
          { id: "hurt", label: "The hurt between you.", concern: "relationship" },
          { id: "point", label: "The original point.", concern: "content" },
        ],
      },
      {
        prompt: "Is this the moment?",
        answers: [
          { id: "stay", label: "You are both still able to stay.", moment: "now", channel: "In person" },
          { id: "flooded", label: "One of you is leaving, or flooded.", moment: "later", channel: "Phone" },
          { id: "note", label: "A note can reopen it when there is room.", moment: "later", channel: "Written message" },
        ],
      },
    ],
  },
  {
    id: "boundary",
    title: "Set a boundary",
    description: "Name what you will and will not do, and leave the person intact.",
    questions: [
      {
        prompt: "What are you protecting?",
        answers: [
          { id: "time", label: "Your time.", intent: "clear" },
          { id: "stated", label: "A limit you have already stated.", intent: "clear" },
          { id: "both", label: "Both of you.", intent: "clear" },
        ],
      },
      {
        prompt: "What is in front?",
        answers: [
          { id: "limit", label: "The limit itself.", concern: "content" },
          { id: "around", label: "The relationship around the limit.", concern: "relationship" },
        ],
      },
      {
        prompt: "How should it travel?",
        answers: [
          { id: "once", label: "Once, in person.", moment: "now", channel: "In person" },
          { id: "phone", label: "By phone, if the room is not possible.", moment: "now", channel: "Phone" },
          { id: "exact", label: "In writing, so the limit stays exact.", moment: "now", channel: "Written message" },
        ],
      },
    ],
  },
  {
    id: "respond",
    title: "Decide whether to respond",
    description: "Choose a reply, a shorter one, or silence, and the moment for it.",
    questions: [
      {
        prompt: "What would a response change?",
        answers: [
          { id: "misread", label: "A real misunderstanding.", intent: "clear" },
          { id: "little", label: "Little that matters.", intent: "open" },
          { id: "heat", label: "The heat between you.", intent: "open" },
        ],
      },
      {
        prompt: "What is being asked of you?",
        answers: [
          { id: "fact", label: "A fact.", concern: "content" },
          { id: "reassurance", label: "Reassurance.", concern: "relationship" },
          { id: "fight", label: "A fight.", concern: "relationship" },
        ],
      },
      {
        prompt: "What is the right moment?",
        answers: [
          { id: "open", label: "Now, while it is still open.", moment: "now", channel: "In person" },
          { id: "exact", label: "Later, when you can be exact.", moment: "later", channel: "Written message" },
          { id: "round", label: "Not this round.", moment: "not", channel: "Phone" },
        ],
      },
    ],
  },
];

export const CONTENT_LINES: readonly FrameLine[] = [
  { title: "Content", line: "The words, the form, the modifiers." },
  { title: "Message", line: "The move takes a shape." },
  { title: "Outcome", line: "Say the point early. The response completes it." },
];

export const RELATIONSHIP_LINES: readonly FrameLine[] = [
  { title: "Intent", line: "What do I want to change? Listen before you aim." },
  { title: "Channel", line: "Voice, text, face, body, silence." },
  { title: "Receiver", line: "Meaning is finished by the listener." },
];

export function matterById(id: string | null): Matter | null {
  if (!id) return null;
  return MATTERS.find((matter) => matter.id === id) ?? null;
}

export function progressLabel(step: number): string {
  return `${step + 1} of 3`;
}

function sayFor(matterId: string, answers: readonly Answer[]): string {
  const [intent, concern, timing] = answers;
  if (matterId === "request") {
    if (timing.moment === "later") return "I'll ask when there is time. The request is the Friday draft.";
    if (intent.id === "room") return "Could you send me the Friday draft? If that timing is wrong, tell me what works.";
    if (intent.id === "decision") return "I need your decision on the Friday draft. A yes or a no is enough.";
    if (concern.concern === "relationship") return "I want to ask this cleanly. Could you take the Friday draft?";
    return "Could you send me the Friday draft? That is the whole ask.";
  }
  if (matterId === "clarify") {
    if (intent.id === "feeling") return "Am I reading it right — is this about the fact, or about us?";
    if (intent.id === "want") return "Before I answer, what do you want to be different when we are done?";
    return "I want to be sure I heard you. What did you mean by that?";
  }
  if (matterId === "feedback") {
    if (timing.moment === "later") return "I want to say one thing about the draft, when we both have time.";
    if (concern.concern === "relationship") return "I care how this lands. The draft came Thursday. I need it Wednesday.";
    if (intent.id === "effect") return "When the draft arrives late, I lose the evening. I need you to know that.";
    return "The draft came Thursday. I need it Wednesday. That is the change.";
  }
  if (matterId === "repair") {
    if (intent.id === "stop" || timing.moment !== "now") return "I am going to stop here. I want to come back when we can both stay.";
    if (intent.id === "record") return "Let me try that again. I meant the point, not a verdict on you.";
    return "I spoke to the point and missed you. I want to try that again.";
  }
  if (matterId === "boundary") {
    if (concern.concern === "relationship" || intent.id === "both") return "The limit is the hour, not you. I won't take this up after dinner.";
    return "I won't take this up after dinner. I can talk tomorrow morning.";
  }
  if (timing.moment === "not" || intent.id === "little") return "I am going to leave this. A reply now would only open another round.";
  if (timing.moment === "later") return "I will answer when I can stay with the actual point.";
  if (concern.id === "fight") return "I am not going to answer the heat. If there is a point under it, I will hear that.";
  if (concern.id === "reassurance") return "You waited up. Were you worried?";
  return "Here is the fact, and only the fact. I can walk you through it when we have the room.";
}

function moveFor(matterId: string, answers: readonly Answer[]): string {
  const [intent, concern, timing] = answers;
  if (timing.moment === "not" || (matterId === "respond" && intent.id === "little")) {
    return `Leave it for this round. ${ROUND_NOTICE}`;
  }
  if (timing.moment === "later" || (matterId === "repair" && intent.id === "stop")) {
    return "Not this moment. Wait until there is a private room and time for the answer.";
  }
  if (matterId === "clarify" || intent.intent === "open") return "Clarify intent before making your point.";
  if (matterId === "repair") return "Restore the ground before you return to the point.";
  if (matterId === "boundary") return "Name the limit once, and leave the person intact.";
  if (concern.concern === "relationship") return "Name what you want between you, then make the point.";
  return "Say the point early, with only the certainty you have.";
}

function watchFor(matterId: string, answers: readonly Answer[]): string {
  const [, concern, timing] = answers;
  if (timing.moment !== "now") return "A big question asked while someone is already on the way out.";
  if (matterId === "boundary") return "A limit that picks up the sound of a punishment.";
  if (matterId === "repair") return "Returning to the point before the ground is back.";
  if (concern.concern === "relationship") return "A reply that answers the words and misses why they were said.";
  if (matterId === "feedback") return "More certainty in the sentence than you actually have.";
  return "A hedge that makes the point sound as if you have no view.";
}

function recoverFor(matterId: string): string {
  if (matterId === "request") return "Let me try that again. The ask is the Friday draft.";
  if (matterId === "clarify") return "Let me try that again. I want to understand what you meant.";
  if (matterId === "feedback") return "Let me try that again. Here is the one thing I meant.";
  if (matterId === "repair") return "Let me try that again. I want us back before we return to the point.";
  if (matterId === "boundary") return "Let me try that again. The limit is the time, not you.";
  return "Let me try that again. I am answering the point, not the heat.";
}

function channelFor(answers: readonly Answer[]): { channel: ChannelName; channelReason: string } {
  const timing = answers[2];
  const channel = timing.channel ?? "In person";
  if (timing.moment !== "now") {
    return {
      channel,
      channelReason: "Wait for privacy and time. Use a rich channel when there is room for the answer.",
    };
  }
  if (channel === "Phone") {
    return { channel, channelReason: "Voice keeps the tone that a reader would have to invent." };
  }
  if (channel === "Written message") {
    return { channel, channelReason: "Writing holds the words still when the point is exact and the moment is calm." };
  }
  return { channel, channelReason: "Anything that could be misread belongs in the room, where the tone is present." };
}

export function recommend(matterId: string, answerIds: readonly string[]): Recommendation | null {
  const matter = matterById(matterId);
  if (!matter || answerIds.length !== 3) return null;
  const answers = answerIds.map((id, index) => matter.questions[index]?.answers.find((answer) => answer.id === id));
  if (answers.some((answer) => !answer)) return null;
  const chosen = answers as Answer[];
  const channel = channelFor(chosen);
  return {
    move: moveFor(matterId, chosen),
    say: sayFor(matterId, chosen),
    channel: channel.channel,
    channelReason: channel.channelReason,
    watch: watchFor(matterId, chosen),
    recover: recoverFor(matterId),
  };
}

export function guideSurfaceCopy(): string {
  const parts = [OPENING_EYEBROW, OPENING_HEADLINE, OPENING_SUPPORT, PURPOSE_LINE, ROUND_NOTICE];
  for (const matter of MATTERS) {
    parts.push(matter.title, matter.description);
    for (const question of matter.questions) {
      parts.push(question.prompt);
      for (const answer of question.answers) parts.push(answer.label);
    }
    const sample = matter.questions.map((question) => question.answers[0]!.id);
    const result = recommend(matter.id, sample);
    if (result) parts.push(result.move, result.say, result.channel, result.channelReason, result.watch, result.recover);
  }
  for (const line of [...CONTENT_LINES, ...RELATIONSHIP_LINES]) parts.push(line.title, line.line);
  return parts.join("\n");
}
