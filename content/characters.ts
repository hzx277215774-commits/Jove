import { confirmed, type CanonRecord, type CanonValue } from './canon/core';
import type { ArchiveRelation } from './world';
export interface CharacterRecord extends CanonRecord {
  name: CanonValue<string>; image: CanonValue<string>; identity?: CanonValue<string>; origin?: CanonValue<string>;
  element?: CanonValue<string>; constitution?: CanonValue<string>; introduction?: CanonValue<string>;
  personality?: CanonValue<string>; history?: CanonValue<string>; relationships?: CanonValue<string>;
  abilities?: CanonValue<string>; designImages?: CanonValue<string[]>;
  regions?: CanonValue<ArchiveRelation[]>; stories?: CanonValue<ArchiveRelation[]>;
}
// Only names and artwork are exposed; prior AI summaries are not character canon.
export const characterRecords: CharacterRecord[] = [
  {id:'guyuan',status:'CANON',source:'AUTHOR_ART',name:confirmed('谷源','AUTHOR_ART'),image:confirmed('wanderer','AUTHOR_ART'),designImages:confirmed(['guyuanSheet','study'],'AUTHOR_ART')},
  {id:'liurumian',status:'CANON',source:'AUTHOR_ART',name:confirmed('柳茹眠','AUTHOR_ART'),image:confirmed('archivist','AUTHOR_ART'),designImages:confirmed(['liuSheet'],'AUTHOR_ART')},
];
