import { motion as Motion } from 'framer-motion';
import './ScrollTriggered.css';

export default function ScrollTriggered() {
  return (
    <div className="scroll-container">
      {food.map(([emoji, hueA, hueB]) => (
        <ScrollCard key={emoji} emoji={emoji} hueA={hueA} hueB={hueB} />
      ))}
    </div>
  );
}

function ScrollCard({ emoji, hueA, hueB }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <Motion.div
      className="scroll-card-wrapper"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <div className="scroll-card-splash" style={{ background }} />
      <Motion.div className="scroll-card" variants={cardVariants}>
        {emoji}
      </Motion.div>
    </Motion.div>
  );
}

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

const food = [
  ['🍅', 340, 10],
  ['🍊', 20, 40],
  ['🍋', 60, 90],
  ['🍐', 80, 120],
  ['🍏', 100, 140],
  ['🫐', 205, 245],
  ['🍆', 260, 290],
  ['🍇', 290, 320],
];
