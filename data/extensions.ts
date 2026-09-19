export type FutureModule = 'pv' | 'novels' | 'news' | 'community' | 'shop' | 'collaboration';
// Reserved content types only. V1 does not expose unfinished routes.
export interface FutureEntry { id: string; module: FutureModule; title: string; slug: string; publishedAt?: string; cover?: string }
export const futureEntries: FutureEntry[] = [];
