import type { LucideIcon } from "lucide-react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export type ContactChannel = {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
  hint: string;
};

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@gtafunding.ca",
    href: "mailto:hello@gtafunding.ca",
    hint: "Attach bank stubs or a one-pager — we’ll reply with next steps.",
  },
  {
    icon: Phone,
    label: "Advisor line",
    value: "1 (844) 482-3863",
    href: "tel:+18444823863",
    hint: "Mon–Fri · 9am–7pm ET · No menus — you reach a human.",
  },
  {
    icon: Clock,
    label: "Typical reply",
    value: "Under 2 hours",
    href: null,
    hint: "During business hours. Urgent? Say so in your subject or voicemail.",
  },
  {
    icon: MapPin,
    label: "Head office",
    value: "Toronto, ON",
    href: null,
    hint: "Canada-wide · Remote-first advisors in your time zone.",
  },
];
