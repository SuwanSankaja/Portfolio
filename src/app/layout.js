import './globals.css';

export const metadata = {
  title: 'Suwan Sankaja — Data Engineer & AI/ML Enthusiast',
  description:
    'Portfolio of Suwan Sankaja — Computer Science & Engineering graduate from University of Moratuwa, specializing in Data Science, Machine Learning, and Full-Stack Development.',
  keywords:
    'Suwan Sankaja, portfolio, data science, machine learning, developer, engineer, University of Moratuwa',
  icons: {
    icon: 'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/profile_images/website_logo_cropped.png',
    apple:
      'https://filedn.eu/lKBQ3k74oxYj0kgKuxh2wfS/Portfolio%20Website/profile_images/website_logo_cropped.png',
  },
  openGraph: {
    title: 'Suwan Sankaja — Data Engineer & AI/ML Enthusiast',
    description:
      'Portfolio showcasing projects in Data Science, Machine Learning, and Full-Stack Development.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
