"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import ImmersiveHero from "@/components/immersive/ImmersiveHero";
import { getTheme } from "@/lib/immersiveThemes";
import { getDeck, DECKS, shuffle } from "@/lib/flashcards";

// Flashcard / exam-practice mode. Reuses glossary + concept-check content. A
// lightweight spaced-repetition loop: cards you mark "review again" come back
// at the end of the round; "got it" cards are set aside. All client-side.

export default function FlashcardsPage() {
  const { lang } = useLang();
  const [deckKind, setDeckKind] = useState("glossary");
  const [seed, setSeed] = useState(1);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [again, setAgain] = useState([]); // indices to review again
  const [known, setKnown] = useState(0);

  const labels = {
    id: {
      title: "Flashcard & Latihan",
      sub: "Ulang istilah & konsep dengan kartu bolak-balik. Tandai 'ulangi' untuk kartu yang belum nyangkut.",
      deck: "Pilih dek", shuffle: "🎲 Acak", restart: "↺ Mulai ulang",
      tapHint: "Ketuk kartu untuk membalik", again: "🔁 Ulangi", got: "✅ Paham",
      progress: (a, b) => `Kartu ${a} / ${b}`,
      done: "Selesai! 🎉", doneSub: (k, t) => `Kamu menandai ${k} dari ${t} kartu sebagai 'paham'.`,
      reviewAgain: (n) => `Mengulang ${n} kartu yang ditandai 'ulangi'…`,
      again2: "Ulangi yang belum paham", finish: "Selesai",
    },
    en: {
      title: "Flashcards & Practice",
      sub: "Review terms & concepts with flip cards. Mark 'review again' for ones that haven't stuck.",
      deck: "Pick a deck", shuffle: "🎲 Shuffle", restart: "↺ Restart",
      tapHint: "Tap the card to flip", again: "🔁 Review again", got: "✅ Got it",
      progress: (a, b) => `Card ${a} / ${b}`,
      done: "Done! 🎉", doneSub: (k, t) => `You marked ${k} of ${t} cards as 'got it'.`,
      reviewAgain: (n) => `Reviewing ${n} cards you marked 'review again'…`,
      again2: "Review the ones you missed", finish: "Finish",
    },
  }[lang];

  const theme = getTheme("demos");

  // secondary "again" round state (declared before handlers that use it)
  const [againDeck, setAgainDeck] = useState(null);
  const [againIdx, setAgainIdx] = useState(0);

  // the working deck (shuffled by seed); changing deck/lang/seed rebuilds + resets
  const baseDeck = useMemo(() => shuffle(getDeck(deckKind, lang), seed), [deckKind, lang, seed]);

  const total = baseDeck.length;
  const finished = idx >= total;
  const card = baseDeck[idx];

  const reset = (newKind = deckKind) => {
    setDeckKind(newKind);
    setIdx(0); setFlipped(false); setAgain([]); setKnown(0);
  };

  const next = (gotIt) => {
    if (gotIt) setKnown((k) => k + 1);
    else setAgain((a) => [...a, idx]);
    setFlipped(false);
    setIdx((i) => i + 1);
  };

  const reviewAgain = () => {
    // rebuild a mini-deck from the 'again' cards for a focused second pass
    const againCards = again.map((i) => baseDeck[i]);
    setAgainDeck(againCards);
    setAgainIdx(0);
  };

  return (
    <div>
      <ImmersiveHero theme={theme} icon="🃏" title={labels.title} subtitle={labels.sub} eyebrow={theme.eyebrow[lang]} />
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* deck selector */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {DECKS[lang].map((d) => (
            <button
              key={d.key}
              onClick={() => { reset(d.key); setAgainDeck(null); }}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                deckKind === d.key ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {d.icon} {d.name}
            </button>
          ))}
          <button
            onClick={() => { setSeed((s) => s + 1); reset(); setAgainDeck(null); }}
            className="ml-auto rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {labels.shuffle}
          </button>
        </div>

        {/* AGAIN round */}
        {againDeck ? (
          <AgainRound
            cards={againDeck}
            idx={againIdx}
            setIdx={setAgainIdx}
            labels={labels}
            onFinish={() => { setAgainDeck(null); setAgainIdx(0); reset(); }}
          />
        ) : finished ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-3xl">🎉</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{labels.done}</p>
            <p className="mt-1 text-sm text-slate-500">{labels.doneSub(known, total)}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {again.length > 0 && (
                <button onClick={reviewAgain} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                  🔁 {labels.again2} ({again.length})
                </button>
              )}
              <button onClick={() => reset()} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                {labels.restart}
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-3 text-center text-sm font-semibold text-slate-500">{labels.progress(idx + 1, total)}</p>
            <button
              onClick={() => setFlipped((f) => !f)}
              className="flex min-h-[220px] w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-brand-300"
            >
              {card?.tag && <span className="mb-3 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">{card.tag}</span>}
              <p className="whitespace-pre-line text-lg font-semibold text-slate-900">
                {flipped ? card?.back : card?.front}
              </p>
              {!flipped && <p className="mt-4 text-xs text-slate-400">{labels.tapHint}</p>}
            </button>

            {flipped && (
              <div className="mt-4 flex gap-3">
                <button onClick={() => next(false)} className="flex-1 rounded-xl border border-amber-300 bg-amber-50 py-3 text-sm font-bold text-amber-800 hover:bg-amber-100">
                  {labels.again}
                </button>
                <button onClick={() => next(true)} className="flex-1 rounded-xl border border-green-300 bg-green-50 py-3 text-sm font-bold text-green-800 hover:bg-green-100">
                  {labels.got}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// A simpler second pass over the "review again" cards.
function AgainRound({ cards, idx, setIdx, labels, onFinish }) {
  const [flipped, setFlipped] = useState(false);
  const done = idx >= cards.length;
  const card = cards[idx];

  if (done) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-2xl">✅</p>
        <p className="mt-2 text-lg font-bold text-slate-900">{labels.done}</p>
        <button onClick={onFinish} className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          {labels.finish}
        </button>
      </div>
    );
  }

  return (
    <>
      <p className="mb-3 text-center text-sm font-semibold text-amber-600">{labels.reviewAgain(cards.length)}</p>
      <p className="mb-3 text-center text-sm font-semibold text-slate-500">{labels.progress(idx + 1, cards.length)}</p>
      <button
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[220px] w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-brand-300"
      >
        {card?.tag && <span className="mb-3 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">{card.tag}</span>}
        <p className="whitespace-pre-line text-lg font-semibold text-slate-900">{flipped ? card?.back : card?.front}</p>
        {!flipped && <p className="mt-4 text-xs text-slate-400">{labels.tapHint}</p>}
      </button>
      {flipped && (
        <div className="mt-4">
          <button onClick={() => { setFlipped(false); setIdx((i) => i + 1); }} className="w-full rounded-xl border border-green-300 bg-green-50 py-3 text-sm font-bold text-green-800 hover:bg-green-100">
            {labels.got}
          </button>
        </div>
      )}
    </>
  );
}
