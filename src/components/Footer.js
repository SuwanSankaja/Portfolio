import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <img
              src="https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/profile_images/website_logo_cropped.png"
              alt="Suwan Sankaja"
              width={32}
              height={32}
              className={styles.logo}
            />
            <span className={styles.brandName}>Suwan Sankaja</span>
          </div>
          <div className={styles.links}>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#resume">Resume</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Suwan Sankaja. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
