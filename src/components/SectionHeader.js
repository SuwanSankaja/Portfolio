import { ScrollReveal } from './ScrollReveal';

/**
 * Consistent section heading: numbered mono label, large title with an
 * optional gradient highlight, and a subtitle.
 */
export function SectionHeader({ index, label, title, highlight, subtitle, align = 'left', children }) {
  return (
    <ScrollReveal>
      <div
        style={{
          marginBottom: 'clamp(40px, 6vw, 72px)',
          textAlign: align,
          display: 'flex',
          flexDirection: 'column',
          alignItems: align === 'center' ? 'center' : 'flex-start',
        }}
      >
        <span className="section-label">
          {index && <span style={{ color: 'var(--text-muted)' }}>{index}</span>}
          {label}
        </span>
        <h2 className="section-title">
          {title}
          {highlight && (
            <>
              {' '}
              <span className="gradient-text">{highlight}</span>
            </>
          )}
        </h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        {children}
      </div>
    </ScrollReveal>
  );
}
