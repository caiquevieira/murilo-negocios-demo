"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LeadLink } from "../ui/LeadLink";
import { InstagramIcon, WhatsAppIcon } from "../ui/icons";

/** Barra fixa no mobile: aparece depois que o usuário rola a primeira dobra. */
export function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 380, damping: 36 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/80 px-3 pt-3 backdrop-blur-xl md:hidden"
          style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
        >
          <div className="flex gap-2">
            <LeadLink channel="instagram" source="flutuante" className="btn btn-ghost flex-1 px-3 text-[15px]">
              <InstagramIcon /> Ofertas
            </LeadLink>
            <LeadLink channel="whatsapp" source="flutuante" className="btn btn-whatsapp flex-[1.4] px-3 text-[15px]">
              <WhatsAppIcon /> Falar com consultor
            </LeadLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
