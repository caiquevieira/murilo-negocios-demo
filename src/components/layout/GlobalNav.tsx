"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LeadLink } from "../ui/LeadLink";
import { InstagramIcon, WhatsAppIcon } from "../ui/icons";
import { Monogram } from "../ui/Monogram";

const links = [
  { href: "/iphone", label: "iPhone" },
  { href: "/seminovos", label: "Seminovos" },
  { href: "/troca", label: "Troca" },
  { href: "/comparar", label: "Comparar" },
  { href: "/loja", label: "Loja" },
];

export function GlobalNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <nav
        aria-label="Principal"
        className="border-b border-white/10 bg-[rgba(22,22,23,0.82)] text-white backdrop-blur-xl backdrop-saturate-150"
      >
        <div className="wrap flex h-14 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Murilo Negócios, início">
            <Monogram priority className="h-10 md:h-9" />
            <span className="text-[13px] leading-none font-semibold tracking-[0.08em]">
              MURILO <span className="gold-text">NEGÓCIOS</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-7 text-[12.5px] md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`transition-colors hover:text-white ${pathname.startsWith(l.href) ? "text-white" : "text-white/75"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LeadLink
              channel="instagram"
              source="header"
              ariaLabel="Instagram @murilonegocioss"
              className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
            </LeadLink>
            <LeadLink channel="whatsapp" source="header" className="btn btn-whatsapp btn-sm hidden sm:inline-flex">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </LeadLink>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full text-white/85 md:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-14 bottom-0 bg-[rgba(22,22,23,0.97)] text-white backdrop-blur-xl md:hidden"
          >
            <ul className="wrap pt-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link href={l.href} className="block py-3 text-[28px] font-semibold tracking-tight">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="wrap mt-8 flex flex-col gap-3">
              <LeadLink channel="whatsapp" source="header-menu" className="btn btn-whatsapp">
                <WhatsAppIcon /> Falar no WhatsApp
              </LeadLink>
              <LeadLink channel="instagram" source="header-menu" className="btn btn-instagram">
                <InstagramIcon /> Ofertas no Instagram
              </LeadLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
