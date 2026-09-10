import { siteConfig } from "@/config/site";

/**
 * The support address, always as a real mailto: link. Used in the header, the
 * footer and throughout the legal pages so there is one place to change it.
 */
export function SupportLink({
  children,
  className,
  subject,
}: {
  children?: React.ReactNode;
  className?: string;
  subject?: string;
}) {
  const href = subject
    ? `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(subject)}`
    : `mailto:${siteConfig.supportEmail}`;

  return (
    <a className={className} href={href}>
      {children ?? siteConfig.supportEmail}
    </a>
  );
}
