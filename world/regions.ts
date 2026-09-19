import { regionRecords } from '@/content/world';
import { publicRecords } from '@/content/canon/core';
export type { Region } from '@/content/world';
export const regions=publicRecords(regionRecords);
