import { useState } from "react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { GUIDE_NAME, PURPOSE_LINE } from "@/data/communication-map";
import {
  CONTENT_LINES,
  MATTERS,
  OPENING_EYEBROW,
  OPENING_HEADLINE,
  OPENING_SUPPORT,
  RELATIONSHIP_LINES,
  matterById,
  progressLabel,
  recommend,
  type Recommendation,
} from "@/data/decision-guide";

const ink = "text-[#1A1814]";
const muted = "text-[#5C564E]";
const line = "border-[#D9D3C9]";
const paper = "bg-[#F7F4EE]";
const accent = "text-[#6E2E38]";

function Arrow() {
  return (
    <svg viewBox="0 0 36 12" className={`h-3 w-9 ${accent}`} aria-hidden="true">
      <path d="M0.5 6h30M24.5 1.5 31 6l-6.5 4.5" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function BackControl({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`text-base ${ink} underline-offset-4 hover:underline`}>
      Back
    </button>
  );
}

export default function CommunicationMap() {
  usePageMetadata({
    title: GUIDE_NAME,
    description: OPENING_SUPPORT,
    path: "/tools/communication-map",
  });

  const [matterId, setMatterId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const [whyOpen, setWhyOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const matter = matterById(matterId);
  const question = matter && step < 3 ? matter.questions[step] : null;
  const result: Recommendation | null = matter && step === 3 ? recommend(matter.id, picks) : null;

  function openMatter(id: string) {
    setMatterId(id);
    setStep(0);
    setPicks([]);
    setWhyOpen(false);
    setDraft("");
  }

  function chooseAnswer(id: string) {
    if (!matter) return;
    const next = [...picks.slice(0, step), id];
    setPicks(next);
    setWhyOpen(false);
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    const advice = recommend(matter.id, next);
    setDraft(advice?.say ?? "");
    setStep(3);
  }

  function goBack() {
    setWhyOpen(false);
    if (step === 0) {
      setMatterId(null);
      setPicks([]);
      return;
    }
    setStep(step - 1);
  }

  return (
    <main data-testid="communication-map" className={`min-h-[70vh] bg-[#F3EFE6] ${ink}`}>
      <div className="mx-auto w-full max-w-[46rem] px-5 pb-16 pt-6 sm:px-8 sm:pt-8">
        {matter && question ? (
          <GuideQuestion
            title={matter.title}
            prompt={question.prompt}
            answers={question.answers}
            progress={progressLabel(step)}
            onBack={goBack}
            onChoose={chooseAnswer}
          />
        ) : null}

        {matter && result ? (
          <GuideRecommendation
            advice={result}
            draft={draft}
            whyOpen={whyOpen}
            onDraft={setDraft}
            onToggleWhy={() => setWhyOpen((open) => !open)}
            onBack={goBack}
          />
        ) : null}

        {!matter ? <GuideOpening onOpen={openMatter} /> : null}
      </div>
    </main>
  );
}

function GuideOpening({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div data-testid="decision-cards">
      <p className={`text-[0.72rem] tracking-[0.22em] ${accent}`}>{OPENING_EYEBROW}</p>
      <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(2.8rem,5.4vw,3.9rem)] leading-[0.92] tracking-[-0.03em]">
        {OPENING_HEADLINE}
      </h1>
      <p className={`mt-4 max-w-[36rem] text-lg leading-relaxed ${muted}`}>{OPENING_SUPPORT}</p>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3">
        {MATTERS.map((matter) => (
          <button
            key={matter.id}
            type="button"
            onClick={() => onOpen(matter.id)}
            className={`flex min-h-[8.25rem] flex-col border ${line} ${paper} px-5 py-4 text-left sm:px-5 sm:py-4`}
          >
            <span className="font-display text-[1.7rem] leading-none sm:text-[1.85rem]">{matter.title}</span>
            <span className={`mt-2 flex-1 text-base leading-snug ${muted}`}>{matter.description}</span>
            <span className="mt-3 flex justify-end">
              <Arrow />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function GuideQuestion({
  title,
  prompt,
  answers,
  progress,
  onBack,
  onChoose,
}: {
  title: string;
  prompt: string;
  answers: readonly { id: string; label: string }[];
  progress: string;
  onBack: () => void;
  onChoose: (id: string) => void;
}) {
  return (
    <div data-testid="decision-question" className="pb-24 md:pb-0">
      <div className="hidden items-center justify-between md:flex">
        <BackControl onClick={onBack} />
        <p className={`text-sm tracking-[0.08em] ${muted}`}>{progress}</p>
      </div>
      <p className={`mt-0 text-[0.72rem] tracking-[0.18em] md:mt-12 ${accent}`}>{title}</p>
      <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.5rem,6vw,3.7rem)] leading-[1.02] tracking-[-0.03em]">
        {prompt}
      </h1>
      <div className="mt-10 grid gap-3">
        {answers.map((answer) => (
          <button
            key={answer.id}
            type="button"
            onClick={() => onChoose(answer.id)}
            className={`min-h-[5.25rem] border ${line} ${paper} px-5 py-4 text-left font-display text-[1.65rem] leading-snug sm:min-h-[6rem] sm:px-6 sm:text-[1.85rem]`}
          >
            {answer.label}
          </button>
        ))}
      </div>
      <div className={`sticky bottom-0 z-30 -mx-5 mt-8 flex items-center justify-between border-t ${line} bg-[#F3EFE6] px-5 py-4 md:hidden`}>
        <BackControl onClick={onBack} />
        <p className={`text-sm tracking-[0.08em] ${muted}`}>{progress}</p>
      </div>
    </div>
  );
}

function GuideRecommendation({
  advice,
  draft,
  whyOpen,
  onDraft,
  onToggleWhy,
  onBack,
}: {
  advice: Recommendation;
  draft: string;
  whyOpen: boolean;
  onDraft: (value: string) => void;
  onToggleWhy: () => void;
  onBack: () => void;
}) {
  return (
    <div data-testid="decision-recommendation" className="pb-20 md:pb-0">
      <div className="hidden md:block">
        <BackControl onClick={onBack} />
      </div>
      <div className={`mt-0 h-px w-10 bg-[#6E2E38] md:mt-12`} />
      <p className={`mt-5 text-[0.72rem] tracking-[0.18em] ${accent}`}>Recommended next move</p>
      <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.6rem,6vw,3.8rem)] leading-[1.02] tracking-[-0.03em]">
        {advice.move}
      </h1>

      <section className={`mt-12 border-t ${line} pt-6`}>
        <h2 className="text-base">Say this</h2>
        <label className="mt-4 block">
          <span className="sr-only">Opening sentence</span>
          <textarea
            value={draft}
            onChange={(event) => onDraft(event.target.value)}
            rows={3}
            className={`w-full resize-none bg-transparent font-display text-[1.7rem] leading-snug outline-none ${ink}`}
          />
        </label>
      </section>

      <section className={`mt-8 border-t ${line} pt-6`}>
        <h2 className="text-base">Use this channel</h2>
        <p className="mt-3 font-display text-[1.85rem] leading-none">{advice.channel}</p>
        <p className={`mt-3 max-w-[36rem] text-lg leading-relaxed ${muted}`}>{advice.channelReason}</p>
      </section>

      <section className={`mt-8 border-t ${line} pt-6`}>
        <h2 className="text-base">Watch for this</h2>
        <p className="mt-3 max-w-[36rem] font-display text-[1.7rem] leading-snug">{advice.watch}</p>
      </section>

      <section className={`mt-8 border-t ${line} pt-6`}>
        <h2 className="text-base">If it goes badly</h2>
        <p className="mt-3 max-w-[36rem] font-display text-[1.7rem] leading-snug">{advice.recover}</p>
      </section>

      <div className="mt-12">
        <button type="button" onClick={onToggleWhy} className={`text-base ${accent} underline-offset-4 hover:underline`} aria-expanded={whyOpen}>
          See why this works
        </button>
        {whyOpen ? (
          <div className={`mt-6 border-t ${line} pt-6`}>
            <p className={`max-w-[36rem] text-base leading-relaxed ${muted}`}>{PURPOSE_LINE}</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <FrameColumn heading="Content" lines={CONTENT_LINES} />
              <FrameColumn heading="Relationship" lines={RELATIONSHIP_LINES} />
            </div>
          </div>
        ) : null}
      </div>

      <div className={`sticky bottom-0 z-30 -mx-5 mt-10 border-t ${line} bg-[#F3EFE6] px-5 py-4 md:hidden`}>
        <BackControl onClick={onBack} />
      </div>
    </div>
  );
}

function FrameColumn({ heading, lines }: { heading: string; lines: readonly { title: string; line: string }[] }) {
  return (
    <div>
      <h3 className={`text-[0.72rem] tracking-[0.16em] ${muted}`}>{heading}</h3>
      <ul className="mt-4 space-y-5">
        {lines.map((item) => (
          <li key={item.title}>
            <p className="font-display text-[1.45rem] leading-none">{item.title}</p>
            <p className={`mt-1.5 text-base leading-snug ${muted}`}>{item.line}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
