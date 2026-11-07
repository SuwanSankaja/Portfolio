/* ──────────────────────────────────────────────
   Site-wide settings — edit here, it updates everywhere.
   ────────────────────────────────────────────── */

/**
 * AVAILABILITY
 * Change this one value to update every availability badge on the site
 * (hero chip, photo badge, About card, Contact section).
 *
 *   'open'        → actively looking / taking new work        (green)
 *   'limited'     → employed, open to special projects only   (amber)
 *   'unavailable' → fully booked, not taking anything new     (grey)
 */
export const AVAILABILITY_STATUS = 'limited';

const availabilityPresets = {
  open: {
    tone: 'green',
    headline: 'Open to new opportunities',
    short: 'Open to Opportunities',
    detail: 'Full-time roles & projects',
    note: 'I’m currently open to new roles and projects. If you have something in mind, let’s talk.',
  },
  limited: {
    tone: 'amber',
    headline: 'Selectively available for special projects',
    short: 'Select Projects Only',
    detail: 'Special projects & requests',
    note: 'I’m focused on my current role, but I still take on a small number of special projects and collaborations. If yours is a good fit, I’d love to hear about it.',
  },
  unavailable: {
    tone: 'muted',
    headline: 'Currently fully booked',
    short: 'Currently Unavailable',
    detail: 'Not taking new work',
    note: 'I’m not taking on new work right now, but I’m always happy to connect and chat about data, AI and engineering.',
  },
};

export const availability = availabilityPresets[AVAILABILITY_STATUS];

/* ── Identity & contact ── */
export const site = {
  name: 'Suwan Sankaja',
  role: 'Data Engineer & AI/ML Enthusiast',
  url: 'https://suwansankaja.com',
  location: 'Colombo, Sri Lanka',
  timeZone: 'Asia/Colombo',
  email: 'suwan.sankaja@gmail.com',
  phone: '+94 71 940 6335',
  phoneHref: 'tel:+94719406335',
  logo: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/profile_images/website_logo_cropped.png',
  portrait:
    'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/profile_images/graduation_side_cropped.png',
  resume: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/CV/Suwan%20Data%20Engineering%20CSE.pdf',
};

export const socials = [
  { label: 'GitHub', href: 'https://github.com/SuwanSankaja', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/suwansankaja/', icon: 'linkedin' },
  { label: 'X / Twitter', href: 'https://twitter.com/SuwanSankaja', icon: 'x' },
  { label: 'Instagram', href: 'https://www.instagram.com/suwansankaja/', icon: 'instagram' },
];
