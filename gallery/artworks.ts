import { publicRecords, readCanon } from '@/content/canon/core';
import { sceneRecords, creatureRecords, type ArtworkRecord } from '@/content/artworks';
export type Artwork = ArtworkRecord;
export const scenes=publicRecords(sceneRecords).filter(r=>readCanon(r.image));
export const creatures=publicRecords(creatureRecords).filter(r=>readCanon(r.image));
