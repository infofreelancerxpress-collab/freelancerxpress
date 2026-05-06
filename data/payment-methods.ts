export type PaymentMethodType = "bkash" | "nagad" | "upay" | "rocket" | "bank";

export interface PaymentMethod {
  id: PaymentMethodType;
  name: string;
  type: "mobile" | "bank";
  accountNumber: string;
  accountName?: string;
  bankName?: string;
  branchName?: string;
  routingNumber?: string;
  color: string;
  colorEnd: string;
  iconBg: string;
  description: string;
}

/**
 * Payment methods configuration.
 * In production, this would be fetched from a secure API endpoint.
 * Never expose full account numbers in client-side code for real applications.
 */
export const paymentMethods: PaymentMethod[] = [
  {
    id: "bkash",
    name: "bKash",
    type: "mobile",
    accountNumber: "01577164844",
    accountName: "FreelancerXpress",
    color: "#E2136E",
    colorEnd: "#A9105A",
    iconBg: "rgba(226, 19, 110, 0.12)",
    description: "Send payment via bKash mobile banking",
  },
  {
    id: "nagad",
    name: "Nagad",
    type: "mobile",
    accountNumber: "01996538146",
    accountName: "FreelancerXpress",
    color: "#F6921E",
    colorEnd: "#E07A0C",
    iconBg: "rgba(246, 146, 30, 0.12)",
    description: "Send payment via Nagad mobile banking",
  },
  {
    id: "upay",
    name: "Upay",
    type: "mobile",
    accountNumber: "01996538146",
    accountName: "FreelancerXpress",
    color: "#2B3990",
    colorEnd: "#1A2566",
    iconBg: "rgba(43, 57, 144, 0.12)",
    description: "Send payment via Upay mobile banking",
  },
  {
    id: "rocket",
    name: "Rocket",
    type: "mobile",
    accountNumber: "01577164844",
    accountName: "FreelancerXpress",
    color: "#8B2F87",
    colorEnd: "#6A1F68",
    iconBg: "rgba(139, 47, 135, 0.12)",
    description: "Send payment via Rocket (DBBL) mobile banking",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    type: "bank",
    accountNumber: "20502420203714314",
    accountName: "FreelancerXpress",
    bankName: "Dutch Bangla Bank Ltd.",
    branchName: "Main Branch",
    routingNumber: "090261726",
    color: "#0D6B3E",
    colorEnd: "#084D2C",
    iconBg: "rgba(13, 107, 62, 0.12)",
    description: "Direct bank transfer via DBBL",
  },
];
