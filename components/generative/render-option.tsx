"use client";

import { motion, Variants } from "motion/react";

export type Option = {
  label: string;
  icon: string;
  desc?: string;
  badge?: string;
  value?: string;
};

type RenderOptionsProps = {
  options: Option[];
  sendMessage: (text: string) => void;
  isLoading: boolean;
  ui?: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

const iconVariants: Variants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.18,
    rotate: [0, -8, 8, -4, 4, 0],
    transition: {
      duration: 0.45,
      ease: "easeInOut",
    },
  },
};

export const RenderOptions = ({
  options,
  sendMessage,
  isLoading,
  ui,
}: RenderOptionsProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-3 mt-3 w-full sm:w-[90%] lg:w-full lg:max-w-[480px]"
    >
      {options.map((opt) => (
        <motion.button
          key={opt.label}
          variants={cardVariants}
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (ui === "groupSize") {
              sendMessage(
                opt.badge ? opt.badge : opt.label,
              );
            } else if (ui === "budget") {
              sendMessage(opt?.badge ?? opt.label);
            } else {
              sendMessage(opt.label);
            }
          }}
          disabled={isLoading}
          className="relative flex flex-col items-center justify-center gap-1.5 p-4 rounded-2xl text-left bg-white/70 dark:bg-neutral-900/75 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/60 shadow-sm hover:border-primary/40 dark:hover:border-primary/50 transition-colors duration-300 hover:shadow-md hover:shadow-primary/5 dark:hover:shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 dark:focus:ring-offset-neutral-950"
        >
          {opt.badge && (
            <span className="absolute top-2 right-2 inline-flex items-center justify-center bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground/90 text-[9px] font-semibold px-2 py-0.5 rounded-full border border-primary/10 dark:border-primary/20 select-none">
              {opt.badge}
            </span>
          )}

          <motion.span
            variants={iconVariants}
            initial="initial"
            className="text-3xl mt-1.5 mb-1 select-none"
          >
            {opt.icon}
          </motion.span>

          <span className="font-semibold text-neutral-800 dark:text-neutral-100 text-xs md:text-sm text-center leading-tight">
            {opt.label}
          </span>

          {opt.desc && (
            <span className="text-[10px] md:text-[11px] text-neutral-500 dark:text-neutral-400 font-normal text-center leading-normal max-w-[150px]">
              {opt.desc}
            </span>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};
