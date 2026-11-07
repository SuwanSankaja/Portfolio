'use client';

import { useState } from 'react';
import { availability, site, socials } from '@/config/site';
import { ScrollReveal } from './ScrollReveal';
import { SectionHeader } from './SectionHeader';
import { IconCheck, IconCheckCircle, IconCopy, IconPhone, IconPin, IconSend, socialIcons } from './Icons';
import styles from './Contact.module.css';

const WEB3FORMS_KEY = 'c0160704-f5f3-4d1f-9b7f-fafc960bf796';

const contactInfo = [
  { icon: IconPhone, title: 'Phone', value: site.phone, href: site.phoneHref },
  { icon: IconPin, title: 'Based in', value: site.location },
];

function mailtoFallback({ name, email, subject, message }) {
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    // Honeypot: real visitors never fill this hidden field.
    if (form.botcheck.checked) return;

    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, from_name: 'Portfolio contact form', ...data }),
      });
      const result = await res.json();
      if (result.success) {
        setSent(true);
        form.reset();
      } else {
        mailtoFallback(data);
      }
    } catch {
      mailtoFallback(data);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className="container">
        <SectionHeader
          index="06"
          label="Contact"
          title="Have an idea worth building?"
          highlight="Let's talk."
          subtitle="Whether it's a data platform, an AI feature or a product from scratch, tell me what you're working on."
        />

        <div className={styles.grid}>
          <ScrollReveal direction="right" className={styles.aside}>
            <div className={styles.availability} data-tone={availability.tone}>
              <div className={styles.availabilityHead}>
                <span className="status-dot" data-tone={availability.tone} />
                <span>{availability.headline}</span>
              </div>
              <p>{availability.note}</p>
            </div>

            <div className={styles.emailBlock}>
              <span className={styles.emailLabel}>Prefer email?</span>
              <div className={styles.emailRow}>
                <a href={`mailto:${site.email}`} className={styles.emailLink}>
                  {site.email}
                </a>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={copyEmail}
                  aria-label={copied ? 'Email copied' : 'Copy email address'}
                >
                  {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <ul className={styles.info}>
              {contactInfo.map(({ icon: Icon, title, value, href }) => (
                <li key={title} className={styles.infoItem}>
                  <span className={styles.infoIcon}>
                    <Icon size={18} />
                  </span>
                  <div className={styles.infoBody}>
                    <span className={styles.infoTitle}>{title}</span>
                    {href ? (
                      <a href={href} className={styles.infoValue}>
                        {value}
                      </a>
                    ) : (
                      <span className={styles.infoValue}>{value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.socials}>
              {socials.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={s.label}
                    data-magnetic
                  >
                    <Icon size={19} />
                  </a>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.1}>
            <form className={`glass-card ${styles.form}`} onSubmit={handleSubmit}>
              {sent ? (
                <div className={styles.success} role="status">
                  <span className={styles.successIcon}>
                    <IconCheckCircle size={40} />
                  </span>
                  <h3>Message sent</h3>
                  <p>Thanks for reaching out. I usually reply within a day or two.</p>
                  <button type="button" className="btn btn-outline" onClick={() => setSent(false)}>
                    Send another
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.formHead}>
                    <h3>Send a message</h3>
                    <p>All fields are required.</p>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <input type="text" id="name" name="name" required placeholder=" " autoComplete="name" />
                      <label htmlFor="name">Your name</label>
                    </div>
                    <div className={styles.field}>
                      <input type="email" id="email" name="email" required placeholder=" " autoComplete="email" />
                      <label htmlFor="email">Email address</label>
                    </div>
                  </div>
                  <div className={styles.field}>
                    <input type="text" id="subject" name="subject" required placeholder=" " />
                    <label htmlFor="subject">What&apos;s it about?</label>
                  </div>
                  <div className={styles.field}>
                    <textarea id="message" name="message" rows={6} required placeholder=" " />
                    <label htmlFor="message">Tell me about your project</label>
                  </div>
                  <input
                    type="checkbox"
                    name="botcheck"
                    className={styles.honeypot}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                  <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={sending}>
                    {sending ? (
                      <>
                        <span className={styles.spinner} />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <IconSend size={17} />
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
