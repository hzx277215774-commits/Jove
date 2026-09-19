import type { NextConfig } from 'next';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { siteConfig } from './data/config';
const config: NextConfig = {
  output: 'export', images: { unoptimized: true }, trailingSlash: true,
  env: { NEXT_PUBLIC_MANG_AUDIO_AVAILABLE: String(existsSync(resolve('public',siteConfig.backgroundMusic.src.replace(/^\//,'')))) },
};
export default config;
