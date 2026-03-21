'use client';

import { useState } from 'react';
import styles from './Certifications.module.css';
import { ScrollReveal } from './ScrollReveal';

const filters = ['All', 'Cisco', 'AWS', 'Oracle', 'GitHub', 'Coursera', 'Other'];

const certs = [
  {
    title: 'Intro to Cybersecurity',
    org: 'Cisco',
    category: 'Cisco',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/badges%20and%20certifications/cisco/introduction-to-cybersecurity.png',
    href: 'https://www.credly.com/badges/9fc41e2e-401c-425d-b4e8-c948e659755e/public_url',
  },
  {
    title: 'Intro to IoT',
    org: 'Cisco',
    category: 'Cisco',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/badges%20and%20certifications/cisco/introduction-to-iot.png',
    href: 'https://www.credly.com/badges/8679a7e7-8388-46dc-b38e-e033ce14cd1d/public_url',
  },
  {
    title: 'Networking Essentials',
    org: 'Cisco',
    category: 'Cisco',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/badges%20and%20certifications/cisco/networking-essentials.png',
    href: 'https://www.credly.com/badges/e702cce4-40df-472c-9f9c-05046f05d3ca/public_url',
  },
  {
    title: 'Data Engineering',
    org: 'AWS',
    category: 'AWS',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/badges%20and%20certifications/aws/aws-academy-graduate-aws-academy-data-engineering.png',
    href: 'https://www.credly.com/badges/dd99595c-564c-46ac-993d-84ef45bb6e3a/public_url',
  },
  {
    title: 'ML Foundations',
    org: 'AWS',
    category: 'AWS',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/badges%20and%20certifications/aws/aws-academy-graduate-aws-academy-machine-learning-foundations.png',
    href: 'https://www.credly.com/badges/2db54c97-239b-4599-b337-d2cbfb2d2dfb/public_url',
  },
  {
    title: 'ML for NLP',
    org: 'AWS',
    category: 'AWS',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/badges%20and%20certifications/aws/aws-academy-graduate-aws-academy-machine-learning-for-natural-language-processing.png',
    href: 'https://www.credly.com/badges/0b0bb99b-9676-41d6-b696-c01756c8f144/public_url',
  },
  {
    title: 'Generative AI',
    org: 'AWS',
    category: 'AWS',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/badges%20and%20certifications/aws/aws-educate-introduction-to-generative-ai.png',
    href: 'https://www.credly.com/badges/8a05fa49-3eb2-450e-b77a-ac3d4234b879/public_url',
  },
  {
    title: 'GitHub Foundations',
    org: 'GitHub',
    category: 'GitHub',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/badges%20and%20certifications/Github/github-foundations.png',
    href: 'https://www.credly.com/badges/6e179ace-d218-418c-bc3c-6bf3bc8e6e95/public_url',
  },
  {
    title: 'Intro to Cloud Computing',
    org: 'Coursera',
    category: 'Coursera',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/badges%20and%20certifications/coursera/Intro_Cloud_Computing.png',
    href: 'https://coursera.org/share/2860540723088a5ff23d200be967e433',
  },
  {
    title: 'Cloud AI Foundations',
    org: 'Oracle',
    category: 'Oracle',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/badges%20and%20certifications/Oracle/Oracle%20Cloud%20Infrastructure%202025%20Certified%20AI%20Foundations%20Associate.jpeg',
    href: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=0AEA573B9E1F24199869B376264BD16E90F4DBE05270AD54AE4F690AD4BD3421',
  },
  {
    title: 'Cloud Foundations',
    org: 'Oracle',
    category: 'Oracle',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/badges%20and%20certifications/Oracle/Oracle%20Cloud%20Infrastructure%202025%20Certified%20Foundations%20Associate.jpeg',
    href: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=60A372316E6E6C7D648D75FE028110D62B548500A48467B665E07E05FD13BD19',
  },
  {
    title: 'Data Foundations',
    org: 'Oracle',
    category: 'Oracle',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/badges%20and%20certifications/Oracle/Oracle%20Data%20Platform%202025%20Certified%20Foundations%20Associate.jpg',
    href: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=6129C1BCF326BD59C126394FD6CCFD48D7767FEB774D746F133819A6AC112887',
  },
  {
    title: 'ML Specialization',
    org: 'Coursera',
    category: 'Coursera',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/badges%20and%20certifications/coursera/ML_Specialization.png',
    href: 'https://coursera.org/share/d294f68c8166c56abe44840907a9b9c5',
  },
  {
    title: 'Intro to AI',
    org: 'Accenture',
    category: 'Other',
    image: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/badges%20and%20certifications/Artificial_Intelligence_Introduction.png',
    href: 'https://www.futurelearn.com/certificates/7ujlse1',
  },
];

export function Certifications() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? certs : certs.filter((c) => c.category === active);

  return (
    <section id="certifications" className="section">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <span className="section-label">Certifications & Badges</span>
            <h2 className="section-title">Continuous learning</h2>
            <p className="section-subtitle">is key to staying ahead in technology</p>
          </div>
        </ScrollReveal>

        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${active === f ? styles.filterActive : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((cert) => (
            <a
              key={cert.title}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-card ${styles.card}`}
            >
              <div className={styles.imageWrapper}>
                <img src={cert.image} alt={cert.title} loading="lazy" />
              </div>
              <div className={styles.cardContent}>
                <h4 className={styles.certTitle}>{cert.title}</h4>
                <span className={styles.certOrg}>{cert.org}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
