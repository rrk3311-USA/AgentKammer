import React from "react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import {
  BOARD_FOOTER_DISCLAIMER,
  boardData,
  computeBoardTally,
  isSampleBoard,
  listingIsPlaceholder,
  minuteData,
  titleCall,
  type BoardCall,
  type BoardListing,
  type BoardStatusCode,
  type BoardStatusKey,
} from "@/data/board";
import "./board.css";

function statusMeta(code: BoardStatusCode, keys: BoardStatusKey[] = boardData.statusKey): BoardStatusKey {
  const found = keys.find((item) => item.code === code);
  if (!found) {
    throw new Error(`Unknown board status: ${code}`);
  }
  return found;
}

function StatusChip({ code }: { code: BoardStatusCode }) {
  const meta = statusMeta(code);
  return <span className={`st st-${meta.cls}`}>{code}</span>;
}

function CallMark({
  call,
  callClass,
  qualifier,
  small,
}: {
  call: BoardCall | string;
  callClass: string;
  qualifier?: string;
  small?: boolean;
}) {
  return (
    <span className={small ? "callwrap sm" : "callwrap"}>
      <span className={`mark ${callClass}`}>{titleCall(call)}</span>
      {qualifier ? <small>{qualifier}</small> : null}
    </span>
  );
}

function ListingRow({ listing, lastWeekLabel }: { listing: BoardListing; lastWeekLabel: string }) {
  const last = listing.last;
  return (
    <div className="row" role="row">
      <div className="c-band" role="cell">
        <span className="band">{listing.band}</span>
        {listing.bandCall ? (
          <span className="bandcall">
            <span className="k">Band call</span>
            <StatusChip code={listing.bandCall} />
          </span>
        ) : null}
      </div>
      <div className={`c-list${listingIsPlaceholder(listing) ? " ph" : ""}`} role="cell">
        <h3 className="addr">{listing.address}</h3>
        <p className="akb-meta">
          <span>{listing.neighborhood}</span>
          <span className="sep" aria-hidden="true">
            ·
          </span>
          <b>{listing.price}</b>
        </p>
        <p className="who">
          <span className="k">Who it&rsquo;s for</span>
          {listing.who}
        </p>
      </div>
      <div className="c-move" role="cell">
        <div className="now">
          <StatusChip code={listing.status} />
          <span className="mv">{listing.moveNote}</span>
        </div>
        <div className="was">
          <span className="k">Last week · {lastWeekLabel}</span>
          {last.same ? (
            <>
              <span className="same">Same #1</span>
              <span className="wasp">{last.price}</span>
            </>
          ) : (
            <>
              <span className="wasaddr">{last.address}</span>
              <span className="wasp">
                {last.price}{" "}
                <span className="sep" aria-hidden="true">
                  ·
                </span>{" "}
                {titleCall(last.call)}
                {last.callQualifier ? ` ${last.callQualifier}` : ""}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="c-call" role="cell">
        <CallMark call={listing.call} callClass={listing.callClass} qualifier={listing.callQualifier} />
      </div>
    </div>
  );
}

export default function Board() {
  const sample = isSampleBoard(boardData);
  const tally = computeBoardTally(boardData);
  const pageTitle = `${boardData.headingPre} ${boardData.headingEm}`;

  usePageMetadata({
    title: pageTitle,
    description: `${boardData.lede} ${boardData.universe}. ${BOARD_FOOTER_DISCLAIMER}`,
    path: "/board",
  });

  return (
    <main className="ak-board" data-testid="page-board">
      {sample ? (
        <div className="akb-samplebar" role="note">
          {boardData.sample.bar}
        </div>
      ) : null}

      <div className="akb-page">
        <div className="akb-wrap">
          <header className="akb-mast">
            <span className="kick">{boardData.kicker}</span>
            <i className="hair" aria-hidden="true" />
            <h1>
              {boardData.headingPre} <em>{boardData.headingEm}</em>
            </h1>
            <p className="dek">
              <span>{boardData.week}</span>
              <span className="dsep" aria-hidden="true">
                {" "}
                ·{" "}
              </span>
              <span>{boardData.universe}</span>
            </p>
            <p className="lede">{boardData.lede}</p>
          </header>

          <section className="minute" aria-label="Today's Minute" data-testid="todays-minute">
            <p className="eyebrow">
              <i aria-hidden="true" />
              {minuteData.kicker}
            </p>
            <div className="minute-card">
              <div className="minute-top">
                <span className="k">{minuteData.source}</span>
                <time className="minute-date" dateTime={minuteData.dateISO}>
                  {minuteData.date}
                </time>
              </div>
              <h2 className="minute-addr">{minuteData.address}</h2>
              <p className="minute-meta">
                <span>{minuteData.neighborhood}</span>
                <span className="sep" aria-hidden="true">
                  ·
                </span>
                <b>{minuteData.price}</b>
                <span className="sep" aria-hidden="true">
                  ·
                </span>
                <span>{minuteData.band}</span>
              </p>
              <div className="minute-call">
                <CallMark
                  call={minuteData.call}
                  callClass={minuteData.callClass}
                  qualifier={minuteData.callQualifier}
                />
                {minuteData.sample ? <span className="stag">Sample</span> : null}
              </div>
              <p className="minute-aside">{minuteData.aside}</p>
            </div>
          </section>

          <section className="tally" aria-label="Movement since last week">
            <p className="eyebrow">
              <i aria-hidden="true" />
              Since last week
            </p>
            <ul>
              {boardData.statusKey.map((status) => {
                const count = tally[status.code];
                return (
                  <li key={status.code} className={`${count ? "on" : "z"} t-${status.cls}`}>
                    <b>{count}</b>
                    <span>{status.tally}</span>
                  </li>
                );
              })}
            </ul>
            {sample ? (
              <p className="samplenote">
                <span className="stag">Sample</span>
                {boardData.sample.note}
              </p>
            ) : null}
          </section>

          <section className="panel" role="table" aria-label={`The board, ${boardData.week}`}>
            <div className="bar">
              <div className="dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <div className="t">
                <b>{boardData.barTitle}</b>
                <span className="sep">·</span>
                {boardData.week}
              </div>
            </div>
            <div className="thead" role="row">
              <span role="columnheader">Band</span>
              <span role="columnheader">#1 in band</span>
              <span role="columnheader">Movement</span>
              <span role="columnheader">Call</span>
            </div>
            {boardData.listings.map((listing) => (
              <ListingRow key={listing.band} listing={listing} lastWeekLabel={boardData.lastWeekLabel} />
            ))}
          </section>

          <div className="pnote">
            <p className="line">{boardData.panelNote}</p>
            <p className="method">{boardData.method}</p>
          </div>

          <div className="after">
            <section className="brief" aria-label="This week">
              <p className="eyebrow">
                <i aria-hidden="true" />
                This week
              </p>
              <dl>
                {boardData.brief.map((item) => (
                  <div className="bi" key={item.k}>
                    <dt>{item.k}</dt>
                    <dd>
                      {item.em ? <em>{item.em} </em> : null}
                      {item.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="checks" aria-label={boardData.checks.title}>
              <p className="eyebrow">
                <i aria-hidden="true" />
                {boardData.checks.title}
              </p>
              <p className="intro">{boardData.checks.intro}</p>
              <ol>
                {boardData.checks.items.map((item) => (
                  <li key={item.band + item.address}>
                    <div className="ck-top">
                      <span className="ck-band">{item.band}</span>
                      <span className={`res res-${item.resultClass}`}>{item.result}</span>
                    </div>
                    <p className="ck-addr">
                      {item.address}{" "}
                      <CallMark call={item.call} callClass={item.callClass} qualifier={item.qualifier} small />
                    </p>
                    <p className="ck-note">{item.resultNote}</p>
                    <p className="ck-test">
                      <span className="k">Wrong if</span>
                      {item.test}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <section className="key" aria-label="How the board moves">
            <p className="eyebrow">
              <i aria-hidden="true" />
              How the board moves
            </p>
            <div className="keygrid">
              {boardData.statusKey.map((status) => (
                <div className="ki" key={status.code}>
                  <StatusChip code={status.code} />
                  <p>{status.meaning}</p>
                </div>
              ))}
            </div>
            <p className="vline">{boardData.verdictLine}</p>
          </section>

          <footer className="akb-colophon">
            <img className="mono" src="/board/ak-deep.png" alt="AK monogram" />
            <div className="divider">
              <span className="stripe" aria-hidden="true" />
              <span className="site">{boardData.footer.site}</span>
              <span className="stripe" aria-hidden="true" />
            </div>
            <p className="fine">{boardData.footer.fine}</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
