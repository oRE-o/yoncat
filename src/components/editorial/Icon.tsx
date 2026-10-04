import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaGithub, FaXTwitter, FaEnvelope, FaSun, FaMoon, FaPlay, FaPause } from 'react-icons/fa6';

const icons = { up: FaArrowUp, down: FaArrowDown, left: FaArrowLeft, 'up-right': FaArrowUp, 'down-right': FaArrowRight, github: FaGithub, twitter: FaXTwitter, email: FaEnvelope, sun: FaSun, moon: FaMoon, play: FaPlay, pause: FaPause };
export default function Icon({ name }: { name: keyof typeof icons }) {
  const Glyph = icons[name];
  return <Glyph className="fa-icon" aria-hidden="true" focusable="false" style={name === 'up-right' || name === 'down-right' ? { transform: 'rotate(45deg)' } : undefined} />;
}
