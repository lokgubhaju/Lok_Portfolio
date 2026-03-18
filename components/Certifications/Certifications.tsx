"use client";

import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import s from "@/components/Certifications/Certifications.module.scss";
import Tag from "../Tag/Tag";
import { BadgeCheck, ExternalLink } from "lucide-react";
import GoogleIcon from "../Icon/GoogleIcon";
import ContentfulIcon from "../Icon/ContentfulIcon";
import { trackLinkClick } from "@/lib/analytics";

interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  credentialUrl?: string;
  logo: React.ReactNode;
  accentColor: string;
}

const certifications: CertificationItem[] = [
  {
    id: "1",
    title: "Google AI Professional Certificate",
    issuer: "Google",
    issuedDate: "Mar 16, 2026",
    accentColor: "#4285F4",
    logo: <GoogleIcon />,
    credentialUrl:
      "https://coursera.org/share/a8e88326a7dde7bc0447a30de57536cd",
  },
  {
    id: "2",
    title: "Contentful Certified Professional",
    issuer: "Contentful",
    issuedDate: "May 11, 2025",
    accentColor: "#FFB71B",
    logo: <ContentfulIcon />,
    credentialUrl:
      "https://www.credly.com/badges/e5d09e10-70e9-4fe8-8505-88d23fe9bccb/public_url",
  },
  {
    id: "3",
    title: "Contentful Certified Content Manager",
    issuer: "Contentful",
    issuedDate: "May 05, 2025",
    accentColor: "#FFB71B",
    logo: <ContentfulIcon />,
    credentialUrl:
      "https://www.credly.com/badges/8038eb6f-0f06-4666-9d1f-d862359b3ec1/public_url",
  },
];

export default function Certifications() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (id) {
            setVisibleItems((prev) => {
              const next = new Set(prev);
              if (entry.isIntersecting) {
                next.add(id);
              } else {
                next.delete(id);
              }
              return next;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    const timer = setTimeout(() => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section className={s["section-certifications"]}>
      <Tag label="CERTIFICATIONS" lucideIcon={BadgeCheck} />

      <div className={s["certifications__items"]}>
        {certifications.map((cert, index) => {
          const isVisible = visibleItems.has(cert.id);
          return (
            <div
              key={cert.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              data-id={cert.id}
              className={cn(s["certifications__item"], {
                [s["certifications__item--visible"]]: isVisible,
              })}
              style={
                {
                  "--accent": cert.accentColor,
                  "--delay": `${index * 0.12}s`,
                  cursor: cert.credentialUrl ? "pointer" : "default",
                } as React.CSSProperties
              }
              onClick={(e) => {
                if (cert.credentialUrl) {
                  e.preventDefault();
                  trackLinkClick(cert.credentialUrl, cert.title, "external");
                  window.open(
                    cert.credentialUrl,
                    "_blank",
                    "noopener,noreferrer",
                  );
                }
              }}
            >
              {/* Decorative corner accent */}
              <div className={s["certifications__item-accent"]} />

              {/* Header row */}
              <div className={s["certifications__item-header"]}>
                <div className={s["certifications__logo"]}>{cert.logo}</div>
                <div className={s["certifications__verified"]}>
                  <BadgeCheck
                    className={s["certifications__verified-icon"]}
                    size={18}
                  />
                  <span>Verified</span>
                </div>
              </div>

              {/* Content */}
              <div className={s["certifications__item-body"]}>
                <h3
                  className={cn(
                    s["certifications__title"],
                    "text-black dark:text-white",
                  )}
                >
                  {cert.title}
                </h3>
                <p
                  className={cn(
                    s["certifications__issuer"],
                    "text-black/60 dark:text-white/50",
                  )}
                >
                  {cert.issuer}
                </p>
              </div>

              {/* Footer */}
              <div className={s["certifications__item-footer"]}>
                <span
                  className={cn(
                    s["certifications__date"],
                    "text-black/50 dark:text-white/40",
                  )}
                >
                  Issued {cert.issuedDate}
                </span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s["certifications__link"]}
                    onClick={(e) => {
                      e.stopPropagation();
                      trackLinkClick(
                        cert.credentialUrl!,
                        `View ${cert.title}`,
                        "external",
                      );
                    }}
                  >
                    <ExternalLink size={13} />
                    <span>View</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
