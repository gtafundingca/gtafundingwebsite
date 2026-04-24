import type { ComponentProps, ComponentType, SVGProps } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

type ContactIcon = ComponentType<ComponentProps<"svg">>;

export type ContactChannel = {
  icon: ContactIcon;
  label: string;
  value: string;
  href: string | null;
  hint: string;
};

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-3.37-3.37 4 4 0 0 1 3.37 3.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    icon: Mail,
    label: "Email",
    value: "info@gtafunding.ca",
    href: "mailto:info@gtafunding.ca",
    hint: "Attach bank stubs or a one-pager — we’ll reply with next steps.",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@gtafunding",
    href: "https://instagram.com/gtafunding",
    hint: "DM us for quick updates on funding programs and announcements.",
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
