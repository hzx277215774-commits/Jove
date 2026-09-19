import { confirmed, type CanonRecord, type CanonValue } from './canon/core';
import type { ArchiveRelation } from './world';
export interface ArtworkRecord extends CanonRecord {
  image: CanonValue<string>; name?: CanonValue<string>; category?: CanonValue<string>;
  region?: CanonValue<string>; terrain?: CanonValue<string>; culture?: CanonValue<string>; purpose?: CanonValue<string>;
  characters?: CanonValue<ArchiveRelation[]>; stories?: CanonValue<ArchiveRelation[]>; design?: CanonValue<string>;
  distribution?: CanonValue<string>; ecology?: CanonValue<string>; habits?: CanonValue<string>;
  mangRelation?: CanonValue<string>; danger?: CanonValue<string>; humanRelation?: CanonValue<string>;
}
const art=(id:string,image:string,name?:string):ArtworkRecord=>({id,status:'CANON',source:'AUTHOR_ART',image:confirmed(image,'AUTHOR_ART'),...(name?{name:confirmed(name,'AUTHOR_ART')}:{})});
export const sceneRecords: ArtworkRecord[] = [art('scene-01','wuyin','雾殷谷'),art('scene-02','landscape'),art('scene-03','relic'),art('scene-04','clouds'),art('scene-05','coast')];
// Visual design only. A record's approval does not approve any missing ecological field.
export const creatureRecords: ArtworkRecord[] = [art('creature-01','lantern'),art('creature-02','lanternStudy')];
export const designStudies = [
  {id:'study-01',status:'CANON' as const,source:'AUTHOR_ART',image:confirmed('lineup','AUTHOR_ART'),label:confirmed('角色群像','AUTHOR_ART')},
  {id:'study-02',status:'CANON' as const,source:'AUTHOR_ART',image:confirmed('study','AUTHOR_ART'),label:confirmed('服装与形态研究','AUTHOR_ART')},
  {id:'study-03',status:'CANON' as const,source:'AUTHOR_ART',image:confirmed('guardianSheet','AUTHOR_ART'),label:confirmed('造型设计','AUTHOR_ART')},
];
