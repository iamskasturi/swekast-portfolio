import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

const cards = [
  {
    title: "Poker, Product & Psychology",
    content:
      "At A23 Games, I engineered real-money poker and rummy systems where milliseconds mattered. From adaptive lobbies to live leaderboards, I designed around speed, fairness, and trust—shaping gameplay that mirrors how people think under pressure.",
    link: "https://www.a23.com/poker/poker-for-pc.html",
    color: "text-[#21808D]",
    type: "link",
  },
  {
    title: "Chess Bounty",
    content:
      "In Chess Bounty, a game I pitched to our CEO, each piece holds a randomized cash value—turning strategy on its head. Suddenly, the bishop may be worth more than the king. With leadership buy-in, it’s on a path toward early development—driven by the belief that bold thinking moves products forward.",
    link: "https://www.youtube.com/watch?v=P102VW7ydus",
    color: "text-[#F4A261]",
    type: "video",
  },
  {
    title: "Built on Trust: Zync",
    action: "Click to know more",
    content:
      "I founded Zync, a trust-first network for students, alumni, and parents making critical academic or career decisions. It connects people with those who’ve walked the path—offering timely, peer-based guidance that builds confidence and clarity.",
    link: "https://www.youtube.com/watch?v=YLslsZuEaNE",
    color: "text-[#21808D]",
    type: "video",
  },
  {
    title: "Helping Destiny Find Its Path",
    content:
      "I help Destiny, a hyperlocal social app, navigate architectural and technical challenges—driven by the belief that some ideas deserve momentum, even if they’re not mine. The right help at the right time isn’t just support—it’s product thinking in action",
    color: "text-[#F4A261]",
    link: "https://dms.licdn.com/playlist/vid/v2/D5605AQE9awszIO-tgg/mp4-720p-30fp-crf28/B56ZYL_UWDHEBg-/0/1743957894590?e=1755118800&v=beta&t=8BPCLqeNcudrSYtR0iRLZ6IGOOOVs_Y9NyJ3ed6-bSg",
    type: "video",
  },
  {
    title: "What I Bring to the Table",
    content:
      "This card isn’t play—it’s perspective.I’ve worked across industries from connecting blue-collar workers, to empowering B2B marketers, to designing high-stakes gaming products always with the same mindset: build with clarity, lead with humility, and focus on what truly matters.",
    color: "text-[#21808D]",
    type: "popup",

    popupImage: "${process.env.PUBLIC_URL}/images/values.png",
  },
];

export default function App() {
  const [round, setRound] = useState(1);
  const [started, setStarted] = useState(false);
  const [showPopup, setShowPopup] = useState(null);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [iframeContent, setIframeContent] = useState(null);
  const [iframeCard, setIframeCard] = useState(null);
  const [showRoyalFlush, setShowRoyalFlush] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const startGame = () => {
    //    const shuffleSound = new Audio("/shuffle.mp3");
    //    shuffleSound.play();
    setStarted(true);
  };

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

    if (round >= cards.length) {
      setShowRoyalFlush(true);
    } else {
      setRound((r) => r + 1);
    }
  };

  const handlePopupClose = () => {
    handleCloseContent();
  };

  return (
    <div className="min-h-screen bg-white text-[#1f2d3d] px-6 py-10 font-sans flex flex-col items-center justify-center relative overflow-hidden">
      {!started ? (
        <div className="text-center flex flex-col items-center space-y-6 px-4">
          {/* Profile Photo */}
          <div className="relative">
            <img
              src="${process.env.PUBLIC_URL}/images/my-profile.jpeg"
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-[#21808D] shadow-lg object-cover object-top scale-[1.2]"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1f2d3d]">
            This Isn’t Just a Poker Table —{" "}
            <span className="text-[#21808D]">It’s How I Think!</span>
          </h1>
          <div className="text-base sm:text-lg text-[#4A4A4A] leading-relaxed max-w-xl">
            <p>
              I approach product the same way I approached this application —
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
            className="mt-4 px-8 py-3 bg-[#21808D] text-white text-lg font-semibold rounded-full shadow-lg hover:bg-[#1b6e78] transition-all duration-300"
          >
            I’m All In — Let’s Begin ♣️
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-bold mb-10 text-center border-b-4 border-green-600 pb-2 animate-pulse">
            ♠️ The Perplexity Table: My APM Fit, Card by Card
          </h1>

          {!showRoyalFlush && (
            <div className="relative w-full max-w-7xl h-[600px] bg-[#005a2b] border-[12px] border-black rounded-full flex items-center justify-center">
              <div className="absolute top-10 text-center">
                <div className="inline-flex items-center gap-2 bg-white border border-[#21808D] px-4 py-1 rounded-full text-sm text-[#1f2d3d] font-medium shadow-sm">
                  <img
                    src="${process.env.PUBLIC_URL}/images/perplexity.png"
                    alt="Perplexity"
                    className"w-5 h-5"
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
                    className="bg-white border border-[#DCE0E5] rounded-xl p-4 shadow-lg flex flex-col justify-between w-[180px] h-[280px]"
                  >
                    <div>
                      <h2
                        className={`text-lg font-semibold mb-1 ${card.color}`}
                      >
                        {card.title}
                      </h2>
                      <p className="text-[#4A4A4A] text-xs">{card.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {showRoyalFlush && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-white text-center z-50"
            >
              {/* Flying Chips */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(25)].map((_, i) => {
                  const left = Math.random() * 100;
                  const delay = Math.random() * 5;
                  const duration = 3 + Math.random() * 2;
                  return (
                    <img
                      key={i}
                      src="${process.env.PUBLIC_URL}/images/poker-chip.png"
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

              <h2 className="text-4xl sm:text-5xl font-bold text-[#21808D] mb-4 z-10 relative">
                Royal Flush – All In ♠️♥️♦️♣️
              </h2>
              <p className="text-[#1f2d3d] mb-6 max-w-xl z-10 relative">
                I’ve shown my hand. The rest? That’s ours to build.
                <br />
              </p>
              <button
                onClick={() => {
                  setShowRoyalFlush(false);
                  setShowContactModal(true);
                }}
                className="inline-block mt-2 px-8 py-3 bg-[#21808D] text-white hover:bg-[#1b6e78] px-6 py-3 font-semibold rounded-full hoverbg-[#1b6e78] transition z-10 relative"
              >
                Deal Me In 📨
              </button>
            </motion.div>
          )}

          {buttonsVisible &&
            !iframeContent &&
            !showPopup &&
            round <= cards.length && (
              <div className="fixed bottom-6 flex gap-6 z-50 rounded-full shadow-xl">
                <button
                  onClick={() => handleCardAction(cards[round - 1])}
                  className="bg-[#21808D] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#1b6e78] transition duration-300"
                >
                  See Your Hand ♠️
                </button>
              </div>
            )}

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
                  className="bg-white text-[#1f2d3d] p-8 rounded-xl max-w-md w-full text-center shadow-2xl border-2 border-[#21808D]"
                >
                  <h2 className="text-3xl font-bold mb-4 text-[#21808D]">
                    Let's Connect 🤝
                  </h2>

                  <p className="mb-2 text-sm sm:text-base">
                    <strong>Name:</strong>Swetha Kasturi
                  </p>
                  <p className="mb-2 text-sm sm:text-base">
                    <strong>Phone:</strong> +91-8466919092
                  </p>
                  <p className="mb-2 text-sm sm:text-base">
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
                    href="/swethakasturi.pdf"
                    download
                    className="bg-[#21808D] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#1b6e78] transition duration-300"
                  >
                    Download Resume 📄
                  </a>

                  <div className="mt-6">
                    <button
                      onClick={() => setShowContactModal(false)}
                      className="text-sm text-gray-500 hover:underline"
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
