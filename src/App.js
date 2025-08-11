import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import { useRef, useEffect, useState } from "react";

const cards = [
  {
    title: "Poker, Product & Psychology",
    content:
      "At A23 Games, I engineered real-money poker and rummy systems where milliseconds mattered. From adaptive lobbies to live leaderboards, I designed for speed, fairness, and trust—principles I’d bring to building AI products that need to earn user confidence and scale globally.",
    link: "https://www.a23.com/poker/poker-for-pc.html",
    color: "text-[#21808D]",
    type: "link",
  },
  {
    title: "Chess Bounty",
    content:
      "In Chess Bounty, a game I pitched to our CEO, each piece holds a randomized cash value—turning strategy on its head. Suddenly, the bishop may be worth more than the king. With leadership buy-in, it’s on a path toward early development—reminding me that fresh perspectives and calculated risks can redefine user experience, a mindset I’d apply at Perplexity.",
    link: "https://www.youtube.com/watch?v=HDP2StWYRfk",
    color: "text-[#F4A261]",
    type: "video",
  },
  {
    title: "Built on Trust: Zync",
    action: "Click to know more",
    content:
      "I founded Zync, a trust-first network for students, alumni, and parents making critical academic or career decisions. It connects people with those who’ve walked the path—offering timely, peer-based guidance that builds confidence and clarity—similar to how Perplexity empowers users with trusted, concise answers.",
    link: "https://www.youtube.com/watch?v=BOSkUm1JSek",
    color: "text-[#21808D]",
    type: "video",
  },
  {
    title: "Helping Destiny Find Its Path",
    content:
      "I help Destiny, a hyperlocal social app, navigate architectural and technical challenges—driven by the belief that some ideas deserve momentum, even if they’re not mine. the right help at the right time isn’t just support—it’s product thinking in action—something I see in Perplexity’s vision and want to help amplify.",
    color: "text-[#F4A261]",
    link: "https://dms.licdn.com/playlist/vid/v2/D5605AQE9awszIO-tgg/mp4-720p-30fp-crf28/B56ZYL_UWDHEBg-/0/1743957894590?e=1755118800&v=beta&t=8BPCLqeNcudrSYtR0iRLZ6IGOOOVs_Y9NyJ3ed6-bSg",
    type: "video",
  },
  {
    title: "What I Bring to the Table",
    content:
      "This card isn’t play—it’s perspective.I’ve worked across industries from connecting blue-collar workers, to empowering B2B marketers, to designing high-stakes gaming products always with the same mindset: build with clarity, lead with humility, and focus on what truly matters - qualities I see reflected in your team’s DNA.",
    color: "text-[#21808D]",
    type: "popup",
    popupImage: `${process.env.PUBLIC_URL}/images/values.png`,
  },
];

function MobileSwipePoker({
  cards,
  round,
  iframeContent,
  iframeCard,
  showPopup,
  onRaise,
  onFold,
  onCloseOverlay,
}) {
  const idx = Math.max(0, round - 1);

  const viewRef = useRef(null); // one-card viewport
  const winRef = useRef(null); // inner window (inside felt)

  // Center newest card inside the one-card viewport
  useEffect(() => {
    const view = viewRef.current;
    const item = view?.querySelector(`[data-card-idx="${idx}"]`);
    if (!view || !item) return;
    const left = item.offsetLeft + item.offsetWidth / 2 - view.clientWidth / 2;
    view.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [idx]);

  // Compute responsive card size from the inner window size (no ResizeObserver)
  const [dims, setDims] = useState({ cw: 220, ch: 340 }); // defaults
  useEffect(() => {
    const measure = () => {
      const win = winRef.current;
      if (!win) return;
      const r = win.getBoundingClientRect();
      // Felt is bigger now; keep cards smaller. Fit height first, then width.
      const maxCardW = Math.min(300, r.width * 0.7); // <= 70% of inner width
      const maxCardH = Math.min(520, r.height * 0.84); // <= 84% of inner height
      const cw = Math.max(180, Math.floor(maxCardW));
      const ch = Math.max(260, Math.floor(maxCardH));
      setDims({ cw, ch });
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    const id = setTimeout(measure, 0); // Safari layout settle
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      clearTimeout(id);
    };
  }, []);

  const showButtons = !iframeContent && !showPopup;

  // Felt sizing (bigger than before)
  const TABLE_W = "min(96vw, 440px)"; // wider on phones, capped
  const ASPECT = "1 / 1.30"; // taller oval
  const BORDER = "10px"; // slightly slimmer border

  // Keep cards away from the oval rim
  const INSET_X = "8%";
  const INSET_Y = "8%";

  // Font sizes scale with card width; small screens get slightly smaller copy
  const TITLE_FS = `clamp(14px, ${Math.round(dims.cw / 14)}px, 18px)`;
  const BODY_FS = `clamp(10.5px, ${Math.round(dims.cw / 17)}px, 14px)`;

  return (
    <div className="block md:hidden w-full px-4">
      {/* Vertical felt (true ellipse) */}
      <div className="w-full flex justify-center">
        <div
          className="relative overflow-hidden"
          style={{
            width: TABLE_W,
            aspectRatio: ASPECT,
            backgroundColor: "#075b33",
            border: `${BORDER} solid black`,
            borderRadius: "50% / 50%",
          }}
        >
          {/* Dealer chip */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: "5%" }}
          >
            <div className="inline-flex items-center gap-2 bg-white border border-[#21808D] px-3 py-0.5 rounded-full text-[12px] text-[#1f2d3d] font-medium shadow-sm">
              <img
                src={`${process.env.PUBLIC_URL}/images/perplexity.png`}
                alt="Perplexity"
                className="w-4 h-4"
              />
              Dealer
            </div>
          </div>

          {/* Usable window inside the oval */}
          <div
            ref={winRef}
            className="absolute"
            style={{
              left: INSET_X,
              right: INSET_X,
              top: INSET_Y,
              bottom: INSET_Y,
              "--card-w": `${dims.cw}px`,
              "--card-h": `${dims.ch}px`,
            }}
          >
            {/* One-card-wide viewport (neighbors never show) */}
            <div
              ref={viewRef}
              className="h-full mx-auto flex items-center no-scrollbar"
              style={{
                width: "var(--card-w)",
                overflowX: "auto",
                overflowY: "hidden",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Horizontal rail */}
              <div
                className="h-full flex items-center gap-4 snap-x snap-mandatory"
                style={{ scrollSnapStop: "always" }}
              >
                {/* left spacer so first card can center */}
                <div style={{ flex: "0 0 calc((100% - var(--card-w)) / 2)" }} />

                {cards.slice(0, round).map((c, i) => (
                  <div
                    key={i}
                    data-card-idx={i}
                    className="bg-white border border-[#DCE0E5] rounded-xl shadow-lg p-3 snap-center flex flex-col"
                    style={{
                      width: "var(--card-w)",
                      height: "var(--card-h)", // uniform height
                      flex: "0 0 var(--card-w)",
                    }}
                  >
                    <h2
                      className={`${c.color} font-semibold mb-1`}
                      style={{
                        fontSize: TITLE_FS,
                        lineHeight: 1.25,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {c.title}
                    </h2>

                    {/* Try to fit; if the very-small case still overflows, allow gentle scroll */}
                    <div
                      className="text-[#334155]"
                      style={{
                        fontSize: BODY_FS,
                        lineHeight: 1.25,
                        overflowY: "auto", // only kicks in if needed
                        overscrollBehavior: "contain",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {c.content}
                    </div>
                  </div>
                ))}

                {/* right spacer so last card can center */}
                <div style={{ flex: "0 0 calc((100% - var(--card-w)) / 2)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-3 mb-2 flex justify-center gap-3">
        {showButtons && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRaise(); // calls the safe handler above
              }}
              className="w-36 h-10 rounded-full bg-[#21808D] text-white text-[13px] font-semibold shadow-md hover:bg-[#1b6e78] transition"
            >
              Raise 🔼 (Click Me)
            </button>
            <button
              onClick={onFold}
              className="w-36 h-10 rounded-full bg-[#21808D] text-white text-[13px] font-semibold shadow-md hover:bg-gray-50 transition"
            >
              Fold 🚫
            </button>
          </>
        )}
      </div>

      {/* Existing overlays unchanged */}
      {iframeContent && iframeCard && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md flex items-center justify-center">
          <div className="relative w-[92%] max-w-3xl h-[70%] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
            <iframe
              src={
                iframeCard.type === "video" &&
                iframeCard.link.includes("youtube.com")
                  ? iframeCard.link.replace("watch?v=", "embed/")
                  : iframeCard.link
              }
              title="Card Content"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <button
              onClick={onCloseOverlay}
              className="absolute top-3 right-3 z-10 bg-[#21808D] hover:bg-[#1b6e78] text-white px-4 py-1 rounded-full text-sm shadow-lg transition"
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center px-3">
          <div className="bg-white text-[#1f2d3d] p-4 sm:p-6 rounded-xl w-full max-w-xs sm:max-w-sm shadow-2xl border-2 border-[#21808D] text-center">
            <h3 className="text-lg font-semibold mb-3">{showPopup.title}</h3>
            {showPopup.popupImage && (
              <img
                src={showPopup.popupImage}
                alt="Popup"
                className="w-full h-auto rounded-md mb-4"
              />
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCloseOverlay();
              }}
              className="bg-[#21808D] hover:bg-[#1b6e78] px-4 py-2 rounded-full text-sm text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [round, setRound] = useState(1);
  const [started, setStarted] = useState(false);
  const [showPopup, setShowPopup] = useState(null);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [iframeContent, setIframeContent] = useState(null);
  const [iframeCard, setIframeCard] = useState(null);
  const [showRoyalFlush, setShowRoyalFlush] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFoldModal, setShowFoldModal] = useState(false);

  const startGame = () => setStarted(true);

  const handleCardAction = (card) => {
    if (card.type === "link" || card.type === "video") {
      setIframeCard(card);
      setIframeContent(card.link);
      setButtonsVisible(false);
    } else if (card.type === "popup") {
      setShowPopup(card);
      setButtonsVisible(false);
    }
  };

  const handleCloseContent = () => {
    setIframeContent(null);
    setIframeCard(null);
    setShowPopup(null);
    if (round >= cards.length) setShowRoyalFlush(true);
    else setRound((r) => r + 1);
  };

  const handlePopupClose = () => {
    handleCloseContent();
  };

  return (
    <div className="h-screen bg-white text-[#1f2d3d] px-6 py-10 font-sans flex flex-col items-center justify-center relative overflow-hidden">
      {!started ? (
        <div className="text-center flex flex-col items-center space-y-6 px-4">
          <div className="relative">
            <img
              src={`${process.env.PUBLIC_URL}/images/my-profile.jpeg`}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-[#21808D] shadow-lg object-cover object-top scale-[1.2]"
            />
          </div>
          <h1 className="font-extrabold tracking-tight text-[#1f2d3d] leading-tight text-center text-[clamp(24px,8vw,40px)] md:text-5xl">
            This Isn’t Just a Poker Table —{" "}
            <span className="text-[#21808D]">It’s How I Think!</span>
          </h1>
          <div
            className="text-[#4A4A4A] leading-relaxed max-w-xl text-center
                                          text-[clamp(14px,3.9vw,18px)] md:text-lg"
          >
            <p>
              I approach product the same way I approached Perplexity’s vision —
            </p>
            <p className="mt-1 font-semibold text-[#21808D]">
              with intent, creativity, and clarity.
            </p>
            <p className="mt-2 text-sm text-[#1f2d3d] italic">
              This isn&#39;t gameplay — it&#39;s product thinking in disguise
            </p>
          </div>

          <button
            onClick={startGame}
            className="mt-4 px-7 py-3 bg-[#21808D] text-white rounded-full shadow-lg hover:bg-[#1b6e78] transition-all duration-300
                                    text-[clamp(14px,3.8vw,18px)] md:text-lg font-semibold"
          >
            I’m All In — Let’s Begin ♣️
          </button>
        </div>
      ) : (
        <>
          <div className="hidden md:block w-full text-center mt-2">
            <h1 className="text-5xl font-bold mb-6 text-center pb-2 animate-pulse">
              ♠️ The Perplexity Table: My Fit, Card by Card
            </h1>
          </div>
          {/* Mobile version */}

          <div className="block md:hidden w-full text-center mt-3">
            <h1
              className="font-bold text-5xl text-center pb-2 animate-pulse"
              style={{
                fontSize: "clamp(20px, 6vw, 28px)",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              ♠️ The Perplexity Table
              <br />
              <span className="text-sm font-normal">
                My Fit, Card by Card
              </span>
            </h1>
          </div>

          {/* WRAPPER makes it possible to hang buttons off the outside edge */}

          <div className="relative w-full max-w-7xl mx-auto hidden md:block">
            {!showRoyalFlush && (
              <div
                className="relative min-h-[600px] bg-[#005a2b] border-[12px] border-black rounded-full flex items-center justify-center overflow-hidden"
                style={{ height: "clamp(440px, calc(100vh - 220px), 640px)" }}
              >
                <div className="absolute top-8 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-2 bg-white border border-[#21808D] px-4 py-1 rounded-full text-sm text-[#1f2d3d] font-medium shadow-sm">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/perplexity.png`}
                      alt="Perplexity"
                      className="w-5 h-5"
                    />
                    Dealer
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4 z-10">
                  <AnimatePresence>
                    {iframeContent && iframeCard && (
                      <motion.div
                        key="iframe-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0.9)_100%)] flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="relative w-[90%] max-w-6xl h-[80%] rounded-xl overflow-hidden shadow-2xl border-4 border-white"
                        >
                          <iframe
                            src={
                              iframeCard.type === "video" &&
                              iframeCard.link.includes("youtube.com")
                                ? iframeCard.link.replace("watch?v=", "embed/")
                                : iframeCard.link
                            }
                            title="Card Content"
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />

                          <button
                            onClick={handleCloseContent}
                            className="absolute top-3 right-3 z-10 bg-[#21808D] hover:bg-[#1b6e78] text-white px-4 py-1 rounded-full text-sm shadow-lg transition-all duration-200"
                          >
                            ❌ Close
                          </button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {cards.slice(0, round).map((card, index) => (
                    <motion.div
                      key={index}
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      onAnimationComplete={() => {
                        if (index === round - 1) setButtonsVisible(true);
                      }}
                      className="bg-white border border-[#DCE0E5] rounded-xl p-4 shadow-lg flex flex-col gap-2 w-[200px] h-auto"
                    >
                      <div>
                        <h2
                          className={`text-lg font-semibold mb-1 ${card.color}`}
                        >
                          {card.title}
                        </h2>
                        <p
                          className="text-[#4A4A4A] text-xs"
                          style={{ overflowWrap: "anywhere" }}
                        >
                          {card.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* HANGING BUTTONS – attached to the rail (outside the felt) */}
            {buttonsVisible &&
              !iframeContent &&
              !showPopup &&
              round <= cards.length && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[1px] z-30 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleCardAction(cards[round - 1])}
                    className="w-48 h-10 rounded-full bg-[#21808D] text-white font-semibold shadow-md hover:bg-[#1b6e78] transition flex items-center justify-center"
                  >
                    Raise 🔼 (Click Me)
                  </button>
                  <button
                    onClick={() => setShowFoldModal(true)}
                    className="w-48 h-10 rounded-full bg-[#21808D] text-white font-semibold shadow-md hover:bg-[#1b6e78] transition flex items-center justify-center"
                  >
                    Fold 🚫
                  </button>
                </div>
              )}
          </div>
          {/* MOBILE (auto portrait/landscape, final) */}
          <MobileSwipePoker
            cards={cards}
            round={round}
            iframeContent={iframeContent}
            iframeCard={iframeCard}
            showPopup={showPopup}
            onRaise={(e) => {
              e?.preventDefault?.();
              e?.stopPropagation?.(); // <-- important
              handleCardAction(cards[round - 1]); // opens video/popup for current card
            }}
            onFold={() => setShowFoldModal(true)}
            onCloseOverlay={handleCloseContent}
          />

          {showRoyalFlush && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-white text-center z-50"
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(25)].map((_, i) => {
                  const left = Math.random() * 100;
                  const delay = Math.random() * 5;
                  const duration = 3 + Math.random() * 2;
                  return (
                    <img
                      key={i}
                      src={`${process.env.PUBLIC_URL}/images/poker-chip.png`}
                      alt="Chip"
                      className="flying-chip"
                      style={{
                        left: `${left}%`,
                        top: "100%",
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                      }}
                    />
                  );
                })}
              </div>

              <h2
                className="font-bold text-[#21808D] mb-4 z-10 relative text-center leading-tight
                                            text-[clamp(22px,7vw,40px)] md:text-5xl"
              >
                Royal Flush – All In ♠️♥️♦️♣️
              </h2>
              <p
                className="text-[#1f2d3d] mb-6 max-w-xl z-10 relative mx-auto text-center leading-relaxed
                                          text-[clamp(14px,3.8vw,18px)] md:text-base"
              >
                I’ve shown my hand. The rest? That’s ours to build.
              </p>
              <button
                onClick={() => {
                  setShowRoyalFlush(false);
                  setShowContactModal(true);
                }}
                className="inline-block mt-2 bg-[#21808D] text-white hover:bg-[#1b6e78] font-semibold rounded-full transition z-10 relative
                                        px-6 py-3 text-[clamp(14px,3.8vw,18px)] md:text-base"
              >
                Deal Me In 📨
              </button>
            </motion.div>
          )}

          {/* Fold modal */}
          <AnimatePresence>
            {showFoldModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                onClick={() => setShowFoldModal(false)}
                aria-modal="true"
                role="dialog"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white text-[#1f2d3d] p-6 rounded-xl max-w-sm w-[92%] shadow-2xl border-2 border-[#21808D]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-xl font-bold mb-3 text-[#21808D]">
                    Nice try. 😉
                  </h3>
                  <p className="text-sm mb-4 leading-relaxed">
                    But you don’t fold on a hand built with{" "}
                    <strong>product clarity</strong> and
                    <strong> vision</strong>. ♣️🧠
                    <br />
                    Let’s see the cards.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowFoldModal(false)}
                      className="bg-[#21808D] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#1b6e78] transition"
                    >
                      Okay, I’ll play
                    </button>
                    <button
                      onClick={() => {
                        setShowFoldModal(false);
                        handleCardAction(cards[round - 1]);
                      }}
                      className="bg-[#21808D] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#1b6e78] transition"
                    >
                      See Your Hand ♠️
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Values popup */}
          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  className="bg-white text-white p-6 rounded-xl max-w-sm w-full border border-gray-600 text-center"
                >
                  <h3 className="text-lg font-semibold mb-3">
                    {showPopup.title}
                  </h3>
                  <p className="text-sm mb-4 text-[#1f2d3d]">
                    {showPopup.popupText}
                  </p>
                  {showPopup.popupImage && (
                    <img
                      src={showPopup.popupImage}
                      alt="Popup Illustration"
                      className="w-full rounded-md mb-4"
                    />
                  )}
                  <button
                    onClick={handlePopupClose}
                    className="bg-[#21808D] hover:bg-[#1b6e78] px-4 py-2 rounded-full text-sm"
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact Modal */}
          <AnimatePresence>
            {showContactModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  className="bg-white text-[#1f2d3d] rounded-xl text-center shadow-2xl border-2 border-[#21808D]
                                         p-6 md:p-8 w-[92%] max-w-sm md:max-w-md"
                >
                  <h2
                    className="font-bold mb-4 text-[#21808D]
                                                  text-[clamp(20px,7vw,32px)] md:text-3xl"
                  >
                    Let's Connect 🤝
                  </h2>
                  <p className="mb-2 text-[clamp(13px,3.8vw,16px)] md:text-sm">
                    <strong>Name:</strong> Swetha Kasturi
                  </p>
                  <p className="mb-2 text-[clamp(13px,3.8vw,16px)] md:text-sm">
                    <strong>Phone:</strong> +91-8466919092
                  </p>
                  <p className="mb-2 text-[clamp(13px,3.8vw,16px)] md:text-sm">
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:iamskasturi@gmail.com"
                      className="underline text-[#21808D]"
                    >
                      iamskasturi@gmail.com
                    </a>
                  </p>
                  <br />
                  <a
                    href={`${process.env.PUBLIC_URL}/swethakasturi.pdf`}
                    download
                    className="bg-[#21808D] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#1b6e78] transition duration-300 text-[clamp(14px,3.8vw,18px)] md:text-base"
                  >
                    Download Resume 📄
                  </a>

                  <div className="mt-6">
                    <button
                      onClick={() => setShowContactModal(false)}
                      className="text-[clamp(12px,3.5vw,14px)] md:text-sm text-gray-500 hover:underline mt-6"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
