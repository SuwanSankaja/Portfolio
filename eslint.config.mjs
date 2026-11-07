import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...nextVitals,
  {
    ignores: ['.next/', 'out/', 'build/', 'node_modules/', 'assets/', 'api/', 'forms/'],
  },
  {
    rules: {
      // Images are served from an external CDN with `images.unoptimized` (static export).
      '@next/next/no-img-element': 'off',
    },
  },
];

export default eslintConfig;
