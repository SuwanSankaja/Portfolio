import { availability, site } from '@/config/site';
import { ScrollReveal } from './ScrollReveal';
import { SectionHeader } from './SectionHeader';
import { IconBrain, IconClock, IconLayout, IconMail, IconPhone, IconPin, IconPipeline } from './Icons';
import styles from './About.module.css';

const pillars = [
  {
    icon: IconPipeline,
    title: 'Data Engineering',
    text: 'Reliable batch & streaming pipelines, warehouses and lakehouses that teams can trust.',
  },
  {
    icon: IconBrain,
    title: 'AI / ML',
    text: 'From Transformer research to production models, LLM and RAG applications.',
  },
  {
    icon: IconLayout,
    title: 'Product Engineering',
    text: 'Full-stack web and native mobile apps that put data in people’s hands.',
  },
];

const infoItems = [
  { icon: IconPin, label: 'Location', value: site.location },
  { icon: IconMail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: IconPhone, label: 'Phone', value: site.phone, href: site.phoneHref },
  { icon: IconClock, label: 'Availability', value: availability.detail, tone: availability.tone },
];

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader
          index="01"
          label="About"
          title="Passionate about solving"
          highlight="complex challenges."
        />

        <div className={styles.grid}>
          <ScrollReveal direction="right" className={styles.media}>
            <div className={styles.portrait} data-tilt>
              <div className={styles.portraitRing} aria-hidden="true" />
              <img src={site.portrait} alt={`Portrait of ${site.name}`} className={styles.image} loading="lazy" />
              <div className={styles.portraitShade} aria-hidden="true" />
              <div className={styles.statusBadge}>
                <span className="status-dot" data-tone={availability.tone} />
                {availability.short}
              </div>
            </div>
            <div className={styles.locationTag} aria-hidden="true">
              <IconPin size={14} />
              Colombo, LK
            </div>
          </ScrollReveal>

          <div className={styles.text}>
            <ScrollReveal delay={0.1}>
              <h3 className={styles.role}>{site.role}</h3>
              <p className={styles.lead}>
                Computer Science &amp; Engineering graduate from the{' '}
                <span className={styles.highlight}>University of Moratuwa</span>.
              </p>
              <p className={styles.bio}>
                I turn messy, real-world data into reliable systems: pipelines, models and products
                that make a measurable difference. My path runs from Transformer-based NLP research to
                production data platforms and native apps.
              </p>
              <p className={styles.bio}>
                Outside of work I still compete in hackathons and coding competitions. It keeps me
                curious, sharp and working alongside talented people.
              </p>
            </ScrollReveal>

            <div className={styles.pillars}>
              {pillars.map(({ icon: Icon, title, text }, i) => (
                <ScrollReveal key={title} delay={0.15 + i * 0.08}>
                  <div className={`glass-card ${styles.pillar}`}>
                    <span className={styles.pillarIcon}>
                      <Icon size={20} />
                    </span>
                    <div>
                      <h4 className={styles.pillarTitle}>{title}</h4>
                      <p className={styles.pillarText}>{text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.2}>
              <dl className={styles.infoGrid}>
                {infoItems.map(({ icon: Icon, label, value, href, tone }) => (
                  <div key={label} className={styles.info}>
                    <span className={styles.infoIcon}>
                      <Icon size={18} />
                    </span>
                    <div className={styles.infoBody}>
                      <dt className={styles.infoLabel}>{label}</dt>
                      <dd className={styles.infoValue}>
                        {tone && <span className="status-dot" data-tone={tone} />}
                        {href ? <a href={href}>{value}</a> : value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
