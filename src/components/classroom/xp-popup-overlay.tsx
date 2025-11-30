"use client";

import { useXpPopupStore } from "@/stores/xp-popup-store";
import { FastForward } from "@phosphor-icons/react/dist/ssr";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";

interface XpPopupOverlayProps {
  container?: "fixed" | "absolute";
}

export function XpPopupOverlay({ container = "fixed" }: XpPopupOverlayProps = {}) {
  const { showXpPopup, xpData } = useXpPopupStore();
  const positionClass = container === "absolute" ? "absolute" : "fixed";

  return (
    <AnimatePresence>
      {showXpPopup && xpData?.xpGained && (
        <>
          {/* Overlay escuro - cobre toda a área, mas não o header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`${positionClass} ${
              container === "absolute" 
                ? "inset-0" 
                : "top-[112px] lg:top-[63px] bottom-0 left-0 right-0"
            } bg-black/90 z-40 pointer-events-none flex items-center justify-center`}
          >
            {/* Popup de XP centralizado dentro do overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 500,
                damping: 35
              }}
              className="z-50 pointer-events-none"
            >
              <div className="text-[#00c0f5] text-[44px] lg:text-[80px] font-bold shadow-xl whitespace-nowrap text-center">
                +<CountUp
                  key={xpData.xpGained}
                  start={0}
                  end={xpData.xpGained}
                  duration={1.5}
                  decimals={0}
                  enableScrollSpy={false}
                />XP
              <div className="flex items-center justify-center gap-2">
                <p className="text-white text-xs font-medium">Ir para o próximo aula</p>
                <FastForward size={24} weight="fill" />
              </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

