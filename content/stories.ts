import { confirmed, unknown, type CanonRecord, type CanonValue } from './canon/core';
export interface StoryChapter extends CanonRecord { title: CanonValue<string>; body: CanonValue<string> }
export const story = {
  era: unknown<string>(), locations: unknown<string>(), protagonists: unknown<string>(), conflict: unknown<string>(),
  theme: confirmed('人越接近世界，也可能越远离人。'),
  concept: confirmed('人可以感知与操纵芒。使用芒越深入，人的身体也会逐渐被对应的芒改变，人与芒的边界会逐渐模糊。'),
  chapters: [] as StoryChapter[],
};
export const creator = {
  introduction: confirmed('《芒 Mang Flux》由个人游戏美术概念设计师创造。通过视觉设计，构建一个东方幻想世界。','AUTHOR_BRIEF'),
  themes: confirmed(['人与自然','力量与代价','文明与毁灭','希望与遗憾'],'AUTHOR_BRIEF'),
};
