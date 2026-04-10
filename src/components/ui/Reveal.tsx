import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
}

const Reveal = ({ delay = 0, y = 20, transition, ...props }: RevealProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay,
              ...(transition ?? {}),
            }
      }
      {...props}
    />
  );
};

export default Reveal;

