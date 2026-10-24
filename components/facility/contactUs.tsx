"use client";

import { useState } from "react";
import ContactPopup from "@/components/facility/ContactPopup";

type Props = {
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  className?: string;
};

// Drop this on the facility details page. It renders the "Contact Us" button
// and owns the open/closed state of the pop-up.
//
//   <ContactUs email={f.email} phone={f.phone} website={f.website} />
export default function ContactUs({ email, phone, website, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "block w-full rounded-xl bg-[#0b4468] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#093652] focus-visible::outline-none focus-visible::ring-2 focus-visible:ring-[#0b4468] focus-visible:ring-offset-2"
        }
      >
        Contact Us
      </button>
      <ContactPopup email={email} phone={phone} website={website} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
