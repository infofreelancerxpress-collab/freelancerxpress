"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: Array<{ name: string; href: string }>;
}

export function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-16 right-0 bottom-0 w-full max-w-sm bg-card border-l shadow-xl z-40 md:hidden"
          >
            <nav className="flex flex-col p-6 space-y-4">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block text-lg font-medium text-foreground hover:text-primary transition-colors py-3 border-b border-border"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigation.length * 0.1 }}
                className="pt-4"
              >
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="block w-full text-center gradient-primary text-white font-medium py-3 px-6 rounded-lg hover:shadow-glow transition-all"
                >
                  Get Started
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
