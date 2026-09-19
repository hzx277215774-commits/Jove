/** No unapproved value may be returned by these public-content selectors. */
export type CanonStatus = 'CANON' | 'DRAFT' | 'UNKNOWN' | 'DEPRECATED';
export interface CanonValue<T> { status: CanonStatus; value?: T; source?: string }
export interface CanonRecord { id: string; status: CanonStatus; source: string }
export const confirmed = <T,>(value: T, source = 'AUTHOR_V11'): CanonValue<T> => ({ status: 'CANON', value, source });
export const unknown = <T,>(): CanonValue<T> => ({ status: 'UNKNOWN' });
export function readCanon<T>(field?: CanonValue<T>): T | undefined { return field?.status === 'CANON' ? field.value : undefined; }
export function publicRecords<T extends CanonRecord>(records: readonly T[]): T[] { return records.filter(record => record.status === 'CANON'); }
export const sources = {
  AUTHOR_V11: '作者 2026-09-18 V1.1 改版要求：品牌、唯一大陆、地理结构、十二芒、身体改变、主题。',
  AUTHOR_BRIEF: '作者最初官网需求中的职业与创作理念；与 V1.1 冲突时服从 V1.1。',
  AUTHOR_ART: '作者 2026-09-12 提供的原始作品集：只确认视觉作品及清楚可读的名称，不推断未标明的生态、地理或剧情。',
};
