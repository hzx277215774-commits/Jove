export const siteConfig = {
  name: '芒', englishName: 'Mang Flux', logoEnglish: 'MANG FLUX', version: '1.1',
  title: '芒 | Mang Flux — 东方幻想世界档案',
  description: '《芒 Mang Flux》是一个以东方文化与元素自然观为基础构建的原创幻想世界。探索芒、世界地图、角色、场景、生物与故事。',
  origin: 'https://mang-flux-archive.hzx277215774.chatgpt.site',
  tagline: '山海有灵，万物生芒。',
  entry: { image: 'coast', src: '/art/portfolio/coast.webp', duration: 1000, sessionKey: 'enteredMangWorld' },
  backgroundMusic: { enabled: true, src: '/audio/mang-theme.mp3', defaultVolume: 0.3, maxVolume: 0.4, fadeDuration: 1500, storageKey: 'mangAmbientAudio' },
} as const;
