"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Phone, X } from "lucide-react";
// The designer's stylesheet, used as-is. The class names below must match it.
import "./contact-popup.css";

type Props = {
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  open: boolean;
  onClose: () => void;
};

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
const websiteHref = (site: string) => (/^https?:\/\//i.test(site) ? site : `https://${site}`);
const websiteLabel = (site: string) => site.replace(/^https?:\/\//i, "").replace(/\/$/, "");

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers / non-secure pages
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
}

export default function ContactPopup({ email, phone, website, open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Keep the native <dialog> in sync with the `open` prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  async function handleCopy(text: string) {
    const ok = await copyText(text);
    setToast(ok ? "Email copied" : "Couldn't copy");
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 1800);
  }

  const hasAny = Boolean(email || phone || website);

  return (
    <dialog
      ref={dialogRef}
      className="contact-popup"
      aria-labelledby="contact-popup-title"
      onClose={onClose} // fires on Esc and on dialog.close()
      onClick={(e) => {
        // Only a tap on the dimmed area (the dialog element itself) closes it
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="contact-popup__inner">
        <button type="button" className="contact-popup__close" onClick={onClose} aria-label="Close contact details">
          <X size={20} aria-hidden />
        </button>

        <h2 className="contact-popup__title" id="contact-popup-title">
          Contact Us
        </h2>

        {hasAny ? (
          <dl className="contact-popup__list">
            {email && (
              <div className="contact-popup__item">
                <dt className="contact-popup__label">Email :</dt>
                <dd className="contact-popup__value">
                  <span className="contact-popup__text">{email}</span>
                  <button
                    type="button"
                    className="contact-popup__icon-btn"
                    onClick={() => handleCopy(email)}
                    aria-label="Copy email address"
                  >
                    <Copy size={22} aria-hidden />
                  </button>
                </dd>
              </div>
            )}

            {phone && (
              <div className="contact-popup__item">
                <dt className="contact-popup__label">phone number :</dt>
                <dd className="contact-popup__value">
                  <a className="contact-popup__call" href={telHref(phone)}>
                    <span className="contact-popup__text">{phone}</span>
                    <Phone size={18} aria-hidden />
                  </a>
                </dd>
              </div>
            )}

            {website && (
              <div className="contact-popup__item">
                <dt className="contact-popup__label">website :</dt>
                <dd className="contact-popup__value">
                  <a
                    className="contact-popup__link"
                    href={websiteHref(website)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {websiteLabel(website)}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="contact-popup__empty">No contact details have been listed for this facility yet.</p>
        )}

        <p className={`contact-popup__toast${toast ? " is-visible" : ""}`} role="status" aria-live="polite">
          {toast}
        </p>
      </div>
    </dialog>
  );
}
