import { publicRecords, readCanon } from '@/content/canon/core';
import { characterRecords } from '@/content/characters';
export const characters = publicRecords(characterRecords).filter(c=>readCanon(c.name)&&readCanon(c.image));
