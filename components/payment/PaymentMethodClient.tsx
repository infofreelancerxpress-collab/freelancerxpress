"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Smartphone,
  Landmark,
  QrCode,
  BadgeDollarSign,
  ShieldCheck,
  CircleCheckBig,
} from "lucide-react";
import { paymentMethods, type PaymentMethod, type PaymentMethodType } from "@/data/payment-methods";

/* ------------------------------------------------------------------ */
/*  Utility helpers                                                    */
/* ------------------------------------------------------------------ */

function maskNumber(num: string): string {
  if (num.length <= 4) return num;
  const last4 = num.slice(-4);
  const masked = num.slice(0, -4).replace(/./g, "•");
  // Insert spaces every 4 chars for readability
  const full = masked + last4;
  return full.replace(/(.{4})/g, "$1 ").trim();
}

function formatNumber(num: string): string {
  return num.replace(/(.{4})/g, "$1 ").trim();
}

/* ------------------------------------------------------------------ */
/*  Brand SVG logos                                                    */
/* ------------------------------------------------------------------ */

function BrandLogo({ method, size = 32 }: { method: PaymentMethod; size?: number }) {
  const s = size;
  const common = { width: s, height: s, viewBox: "0 0 48 48", fill: "none" } as const;

  switch (method.id) {
    case "bkash":
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="12" fill={method.color} />
          <text x="24" y="30" textAnchor="middle" fill="white" fontWeight="800" fontSize="18" fontFamily="sans-serif">b</text>
        </svg>
      );
    case "nagad":
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="12" fill={method.color} />
          <text x="24" y="30" textAnchor="middle" fill="white" fontWeight="800" fontSize="18" fontFamily="sans-serif">N</text>
        </svg>
      );
    case "upay":
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="12" fill={method.color} />
          <text x="24" y="30" textAnchor="middle" fill="white" fontWeight="800" fontSize="18" fontFamily="sans-serif">U</text>
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="12" fill={method.color} />
          <text x="24" y="30" textAnchor="middle" fill="white" fontWeight="800" fontSize="18" fontFamily="sans-serif">R</text>
        </svg>
      );
    case "bank":
      return (
        <svg {...common}>
          <rect width="48" height="48" rx="12" fill={method.color} />
          <Landmark className="text-white" x="10" y="10" width="28" height="28" />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Step indicator                                                     */
/* ------------------------------------------------------------------ */

const steps = ["Select Method", "View Details", "Confirm Payment"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((label, i) => {
        const isActive = i === current;
        const isCompleted = i < current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                  ${isCompleted ? "bg-primary text-primary-foreground" : ""}
                  ${isActive ? "bg-primary text-primary-foreground shadow-glow scale-110" : ""}
                  ${!isActive && !isCompleted ? "bg-muted text-muted-foreground" : ""}
                `}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`hidden sm:inline text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-8 md:w-16 h-0.5 rounded-full transition-colors duration-300 ${
                  isCompleted ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 1 — Select payment method                                     */
/* ------------------------------------------------------------------ */

function StepSelectMethod({
  onSelect,
}: {
  onSelect: (m: PaymentMethodType) => void;
}) {
  const [hovered, setHovered] = useState<PaymentMethodType | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Choose Payment Method</h2>
      <p className="text-muted-foreground mb-8">
        Select your preferred payment method to view account details.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paymentMethods.map((m) => (
          <motion.button
            key={m.id}
            type="button"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setHovered(m.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect(m.id)}
            className={`
              relative overflow-hidden rounded-2xl border bg-card p-5 text-left
              transition-all duration-300 cursor-pointer group
              hover:shadow-xl hover:border-transparent
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            `}
          >
            {/* Gradient accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
              style={{
                background: `linear-gradient(90deg, ${m.color}, ${m.colorEnd})`,
                opacity: hovered === m.id ? 1 : 0.4,
              }}
            />

            <div className="flex items-start gap-4">
              <div
                className="rounded-xl p-2 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: m.iconBg }}
              >
                <BrandLogo method={m} size={36} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-lg">{m.name}</span>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: m.iconBg,
                      color: m.color,
                    }}
                  >
                    {m.type === "mobile" ? (
                      <Smartphone className="w-3 h-3" />
                    ) : (
                      <Landmark className="w-3 h-3" />
                    )}
                    {m.type === "mobile" ? "Mobile" : "Bank"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {m.description}
                </p>
              </div>
            </div>

            {/* Arrow indicator */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 2 — View details                                              */
/* ------------------------------------------------------------------ */

function StepViewDetails({
  method,
  onBack,
  onConfirm,
}: {
  method: PaymentMethod;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const [showFull, setShowFull] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(method.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = method.accountNumber;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const displayNumber = showFull
    ? formatNumber(method.accountNumber)
    : maskNumber(method.accountNumber);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    `${method.name}: ${method.accountNumber}`
  )}&bgcolor=ffffff&color=000000&margin=8`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to methods
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main details card */}
        <div className="lg:col-span-3">
          <div
            className="relative rounded-2xl border bg-card overflow-hidden shadow-lg"
          >
            {/* Gradient header */}
            <div
              className="h-2 w-full"
              style={{
                background: `linear-gradient(90deg, ${method.color}, ${method.colorEnd})`,
              }}
            />

            <div className="p-6 md:p-8">
              {/* Method identity */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="rounded-xl p-2.5"
                  style={{ backgroundColor: method.iconBg }}
                >
                  <BrandLogo method={method} size={44} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{method.name}</h2>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              </div>

              {/* Account number section */}
              <div className="space-y-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {method.type === "mobile" ? "Account Number" : "Bank Account Number"}
                </label>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border">
                  <span className="flex-1 font-mono text-xl md:text-2xl font-bold tracking-wider select-all">
                    {displayNumber}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setShowFull((v) => !v)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                      title={showFull ? "Hide number" : "Show full number"}
                    >
                      {showFull ? (
                        <EyeOff className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <Eye className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className={`p-2 rounded-lg transition-all cursor-pointer ${
                        copied
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                          : "hover:bg-muted text-muted-foreground"
                      }`}
                      title={copied ? "Copied!" : "Copy number"}
                    >
                      {copied ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Account name */}
                {method.accountName && (
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Account Name
                    </label>
                    <p className="mt-1 font-semibold text-lg">{method.accountName}</p>
                  </div>
                )}

                {/* Bank-specific details */}
                {method.type === "bank" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {method.bankName && (
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Bank Name
                        </label>
                        <p className="mt-1 font-semibold">{method.bankName}</p>
                      </div>
                    )}
                    {method.branchName && (
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Branch
                        </label>
                        <p className="mt-1 font-semibold">{method.branchName}</p>
                      </div>
                    )}
                    {method.routingNumber && (
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Routing Number
                        </label>
                        <p className="mt-1 font-mono font-semibold">{method.routingNumber}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Proceed button */}
              <button
                type="button"
                onClick={onConfirm}
                className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${method.color}, ${method.colorEnd})`,
                }}
              >
                I&apos;ve Sent the Payment
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* QR code & tips sidebar */}
        <div className="lg:col-span-2 space-y-6">
          {/* QR Code card — mobile only */}
          {method.type === "mobile" && (
            <div className="rounded-2xl border bg-card p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <QrCode className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">Scan to Pay</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Scan this QR code with your {method.name} app to auto-fill the payment details.
              </p>
              <div className="flex justify-center p-4 bg-white rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt={`QR code for ${method.name}`}
                  width={180}
                  height={180}
                  className="rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Security notice */}
          <div className="rounded-2xl border bg-card p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">Security Notice</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                Account numbers are masked for your security
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                Always verify the recipient before sending
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                Keep your transaction ID for confirmation
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 3 — Confirm payment                                           */
/* ------------------------------------------------------------------ */

function StepConfirm({
  method,
  onBack,
}: {
  method: PaymentMethod;
  onBack: () => void;
}) {
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${method.color}, ${method.colorEnd})`,
          }}
        >
          <CircleCheckBig className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Thank You!</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Your payment confirmation has been received. We&apos;ll verify your
          transaction and get back to you shortly.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted hover:bg-muted/80 font-semibold text-sm transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Make Another Payment
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to details
      </button>

      <div className="max-w-xl mx-auto">
        <div className="rounded-2xl border bg-card overflow-hidden shadow-lg">
          <div
            className="h-2 w-full"
            style={{
              background: `linear-gradient(90deg, ${method.color}, ${method.colorEnd})`,
            }}
          />

          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <BadgeDollarSign className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Payment Confirmation</h2>
            </div>
            <p className="text-muted-foreground mb-8">
              After completing the payment, please keep the following details ready:
            </p>

            {/* Payment method summary */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border mb-6">
              <div
                className="rounded-lg p-1.5"
                style={{ backgroundColor: method.iconBg }}
              >
                <BrandLogo method={method} size={28} />
              </div>
              <div>
                <p className="font-bold">{method.name}</p>
                <p className="text-xs text-muted-foreground">
                  {method.type === "mobile" ? "Mobile Banking" : "Bank Transfer"}
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3 mb-8">
              {[
                "Screenshot of the transaction",
                "Transaction ID (TrxID)",
                `Last 4 digits of the ${method.type === "mobile" ? "sender number" : "sender account"}`,
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setConfirmed(true)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${method.color}, ${method.colorEnd})`,
              }}
            >
              <CircleCheckBig className="w-4 h-4" />
              I&apos;ve Completed the Payment
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main exported component                                            */
/* ------------------------------------------------------------------ */

export default function PaymentMethodClient() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedId, setSelectedId] = useState<PaymentMethodType | null>(null);

  const selectedMethod = paymentMethods.find((m) => m.id === selectedId) ?? null;

  function handleSelect(id: PaymentMethodType) {
    setSelectedId(id);
    setCurrentStep(1);
  }

  function handleGoToConfirm() {
    setCurrentStep(2);
  }

  function handleBackToSelect() {
    setCurrentStep(0);
    setSelectedId(null);
  }

  function handleBackToDetails() {
    setCurrentStep(1);
  }

  return (
    <div>
      <StepIndicator current={currentStep} />

      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <StepSelectMethod key="step-select" onSelect={handleSelect} />
        )}

        {currentStep === 1 && selectedMethod && (
          <StepViewDetails
            key="step-details"
            method={selectedMethod}
            onBack={handleBackToSelect}
            onConfirm={handleGoToConfirm}
          />
        )}

        {currentStep === 2 && selectedMethod && (
          <StepConfirm
            key="step-confirm"
            method={selectedMethod}
            onBack={handleBackToDetails}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
