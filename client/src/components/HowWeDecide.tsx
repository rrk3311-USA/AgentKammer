const howWeDecide = [
  {
    step: "01",
    title: "What's changing?",
    text: "Name the life event, pressure, or uncertainty. Neighborhoods and inventory come later.",
  },
  {
    step: "02",
    title: "Should anything change?",
    text: "Sometimes the highest-value recommendation is to do nothing.",
  },
  {
    step: "03",
    title: "Where do you belong?",
    text: "Even if you stay, is the environment still serving the life you want?",
  },
] as const;

/** Homepage How We Decide on Platinum Paper. Copy is locked. */
export function HowWeDecide() {
  return (
    <section data-ak-how-we-decide className="ak-pp-page ak-hwd">
      <div className="ak-pp-frame" aria-hidden="true">
        <i className="rule-out" />
        <i className="rule-in" />
      </div>
      <div className="ak-hwd-inner">
        <p className="ak-pp-kicker">How We Decide</p>
        <h2 className="ak-hwd-title">Three questions. Then judgment.</h2>
        <div className="ak-hwd-steps">
          {howWeDecide.map((item, index) => (
            <article key={item.step} className="ak-hwd-step">
              {index > 0 ? <hr className="ak-pp-hairline" /> : null}
              <div className="ak-hwd-row">
                <span className="ak-pp-num">{item.step}</span>
                <div>
                  <p className="ak-pp-sec-label">{item.title}</p>
                  <p className="ak-pp-copy">{item.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
