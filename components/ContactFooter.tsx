"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Clock3, FileText, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { AREA_CODE, CONTACT_EMAIL, LANDLINE_NUMBER, PHONE_DISPLAY, WHATSAPP_DISPLAY, emailLink, landlineLink, telLink, whatsappLink } from "../lib/contact";
import { cleanPhone } from "../lib/phone";
import styles from "./ContactFooter.module.css";

const policyCategories = ["Savings", "Health", "Women Cover", "Career", "Corporate"];

export default function ContactFooter() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState(policyCategories[0]);
  const [budgetFrom, setBudgetFrom] = useState("");
  const [budgetTo, setBudgetTo] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [budgetError, setBudgetError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPhoneError("");
    setBudgetError("");

    const normalizedPhone = cleanPhone(phone);
    if (!normalizedPhone) {
      setPhoneError("Enter a valid phone number so the office can reach you.");
      return;
    }
    if (budgetFrom && budgetTo && Number(budgetFrom) > Number(budgetTo)) {
      setBudgetError("The lower end of the range must not exceed the upper end.");
      return;
    }

    setStatus("sending");
    const budgetDescription = budgetFrom || budgetTo
      ? `Preferred budget range: PKR ${budgetFrom || "not specified"} to PKR ${budgetTo || "not specified"}.`
      : "Preferred budget range: to be discussed.";

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: name.trim(),
          phone: normalizedPhone,
          plan: category,
          message: [budgetDescription, message.trim()].filter(Boolean).join("\n"),
          consent,
          website,
        }),
      });

      if (!response.ok) throw new Error("Inquiry could not be submitted.");
      setStatus("success");
      setName("");
      setPhone("");
      setBudgetFrom("");
      setBudgetTo("");
      setMessage("");
      setConsent(false);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactInner}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Local advice. Official guidance.</p>
            <h2>Speak with Sukkur Area Office 5405</h2>
            <p>Contact the office for policy guidance, claims assistance, or a private consultation.</p>
          </div>

          <div className={styles.contactGrid}>
            <section className={styles.officeCard} aria-labelledby="office-contact-title">
              <div className={styles.cardHeading}>
                <div className={styles.officeMark}><MapPin size={18} aria-hidden="true" /></div>
                <div>
                  <p className={styles.cardEyebrow}>Sukkur Area Office {AREA_CODE}</p>
                  <h3 id="office-contact-title">Visit or get in touch</h3>
                </div>
              </div>

              <a
                className={styles.addressLink}
                href="https://www.google.com/maps/dir/?api=1&destination=Shahlimar+Road,+near+Session+Court,+Sukkur,+Pakistan"
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={16} aria-hidden="true" />
                <span>Shahlimar Road, near Session Court, Sukkur</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>

              <div className={styles.contactMethods}>
                <a href={telLink()} className={styles.contactMethod}>
                  <span className={styles.methodIcon}><Phone size={16} aria-hidden="true" /></span>
                  <span><small>Phone</small><strong>{PHONE_DISPLAY}</strong></span>
                </a>
                <a href={landlineLink()} className={styles.contactMethod}>
                  <span className={styles.methodIcon}><Phone size={16} aria-hidden="true" /></span>
                  <span><small>Office landline</small><strong>{LANDLINE_NUMBER}</strong></span>
                </a>
                <a href={whatsappLink()} className={styles.contactMethod}>
                  <span className={styles.methodIcon}><MessageCircle size={16} aria-hidden="true" /></span>
                  <span><small>WhatsApp</small><strong>{WHATSAPP_DISPLAY}</strong></span>
                </a>
                <a href={emailLink()} className={styles.contactMethod}>
                  <span className={styles.methodIcon}><Mail size={16} aria-hidden="true" /></span>
                  <span className={styles.emailValue}><small>Email</small><strong>{CONTACT_EMAIL}</strong></span>
                </a>
              </div>

              <div className={styles.claimNote}>
                <ShieldCheck size={18} aria-hidden="true" />
                <div><strong>24/7 policyholder claim support</strong><span>For claim guidance, contact the office or use the official State Life portal.</span></div>
              </div>

              <p className={styles.officeHours}><Clock3 size={14} aria-hidden="true" /> Monday to Friday, 9:00 AM to 5:00 PM</p>
            </section>

            <section className={styles.inquiryCard} aria-labelledby="inquiry-title">
              <div className={styles.formHeading}>
                <span className={styles.formIcon}><FileText size={17} aria-hidden="true" /></span>
                <div>
                  <p className={styles.cardEyebrow}>Private &amp; confidential</p>
                  <h3 id="inquiry-title">Initiate private inquiry</h3>
                </div>
              </div>

              {status === "success" ? (
                <div className={styles.successState} role="status">
                  <CheckCircle2 size={24} aria-hidden="true" />
                  <div><strong>Inquiry received</strong><p>The Sukkur Area Office team will be in touch using the details you provided.</p></div>
                </div>
              ) : (
                <form className={styles.inquiryForm} onSubmit={handleSubmit}>
                  <div className={styles.fieldGrid}>
                    <div className={styles.field}>
                      <label htmlFor="contact-name">Name</label>
                      <input id="contact-name" autoComplete="name" maxLength={100} required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your full name" />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="contact-phone">Phone number</label>
                      <input id="contact-phone" type="tel" inputMode="tel" autoComplete="tel" required value={phone} onChange={(event) => { setPhone(event.target.value); setPhoneError(""); }} placeholder="03XX XXXXXXX" />
                      {phoneError && <span className={styles.fieldError} role="alert">{phoneError}</span>}
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="contact-category">Policy category</label>
                      <select id="contact-category" value={category} onChange={(event) => setCategory(event.target.value)}>
                        {policyCategories.map((policyCategory) => <option key={policyCategory}>{policyCategory}</option>)}
                      </select>
                    </div>
                    <fieldset className={styles.budgetField}>
                      <legend>Budget range (PKR, optional)</legend>
                      <div className={styles.budgetInputs}>
                        <label><span>From</span><input aria-label="Budget from PKR" type="number" min="0" step="any" value={budgetFrom} onChange={(event) => { setBudgetFrom(event.target.value); setBudgetError(""); }} placeholder="No minimum" /></label>
                        <span aria-hidden="true" className={styles.rangeSeparator}>to</span>
                        <label><span>To</span><input aria-label="Budget to PKR" type="number" min="0" step="any" value={budgetTo} onChange={(event) => { setBudgetTo(event.target.value); setBudgetError(""); }} placeholder="No maximum" /></label>
                      </div>
                      {budgetError && <span className={styles.fieldError} role="alert">{budgetError}</span>}
                    </fieldset>
                    <div className={`${styles.field} ${styles.messageField}`}>
                      <label htmlFor="contact-message">Message</label>
                      <textarea id="contact-message" rows={3} maxLength={1000} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="How can our team help?" />
                    </div>
                  </div>

                  <label className={styles.consent}>
                    <input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                    <span>I agree to be contacted about this inquiry.</span>
                  </label>
                  <input className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(event) => setWebsite(event.target.value)} />

                  {status === "error" && <p className={styles.submitError} role="alert">We couldn&apos;t send your inquiry. Please try again or contact the office directly.</p>}
                  <button className={styles.submitButton} type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending inquiry..." : "Send private inquiry"}
                    {status !== "sending" && <ArrowUpRight size={16} aria-hidden="true" />}
                  </button>
                </form>
              )}
            </section>
          </div>

          <footer id="footer" className={styles.siteFooter}>
            <div className={styles.footerBrand}>
              <Link className={styles.brandLink} href="/" aria-label="State Life Sukkur Area Office home">
                <Image src="/logo area.png" alt="State Life Insurance Corporation of Pakistan" width={420} height={144} />
                <span><strong>STATE LIFE</strong><small>SUKKUR AREA OFFICE {AREA_CODE}</small></span>
              </Link>
              <p>Local guidance for policyholders and families, from State Life Sukkur Area Office 5405.</p>
            </div>

            <div className={styles.footerLinks}>
              <div>
                <h4>Rate books</h4>
                <a href="/products">Policy tables &amp; rate guidance</a>
                <a href="/products">Savings plan guide</a>
                <a href="/contact">Request an official illustration</a>
              </div>
              <div>
                <h4>Claims &amp; portals</h4>
                <a href="/services">Claims settlement guidance</a>
                <a href="/services">e-Polis portal assistance</a>
                <a href="https://www.statelife.com.pk/en" target="_blank" rel="noreferrer">Official State Life portal <ArrowUpRight size={13} aria-hidden="true" /></a>
              </div>
              <div>
                <h4>Contact</h4>
                <a href={telLink()}>{PHONE_DISPLAY}</a>
                <a href={whatsappLink()}>WhatsApp {WHATSAPP_DISPLAY}</a>
                <a href={emailLink()}>{CONTACT_EMAIL}</a>
              </div>
            </div>

            <div className={styles.footerBottom}>
              <span>© 2026 State Life Sukkur Area Office {AREA_CODE}. All rights reserved.</span>
              <span>Official policy terms and benefits are subject to State Life documentation.</span>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}