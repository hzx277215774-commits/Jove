import { confirmed, type CanonRecord, type CanonValue } from './canon/core';
export const world = {
  definition: confirmed('芒，是构成这个世界一切实体与自然现象的基础物质。'),
  geography: confirmed('世界是一块大陆，由巨大自然地理阻隔形成三个主要区域。'),
  use: confirmed('人可以感知与操纵芒。'),
  cost: confirmed('使用芒越深入，人的身体也会逐渐被对应的芒改变。人与芒的边界会逐渐模糊。'),
  theme: confirmed('人越接近世界，也可能越远离人。'),
  elements: confirmed(['金', '木', '水', '火', '土', '风', '雪', '雷', '气', '光', '影', '意']),
};
export type RelationKind = '地区' | '城市' | '势力' | '人物' | '生物' | '场景' | '故事';
export interface ArchiveRelation { kind: RelationKind; label: string; href: string }
export interface Region extends CanonRecord {
  label: CanonValue<string>; kind: CanonValue<string>; description: CanonValue<string>;
  name?: CanonValue<string>; terrain?: CanonValue<string>; history?: CanonValue<string>;
  image?: CanonValue<string>; relations?: CanonValue<ArchiveRelation[]>;
  position?: CanonValue<{x:number;y:number}>;
}
// Nodes below encode known relationships only. Their UI positions are not geographic coordinates.
export const regionRecords: Region[] = [
  ...['01','02','03'].map(n=>({id:`region-${n}`,status:'CANON' as const,source:'AUTHOR_V11',label:confirmed(`区域 ${n}`),kind:confirmed('区域'),description:confirmed('大陆上的三个主要区域之一，由巨大自然地理阻隔形成。')})),
  {id:'confluence',status:'CANON',source:'AUTHOR_V11',label:confirmed('三地交汇处'),kind:confirmed('地貌'),description:confirmed('三地交汇处有巨大深坑，汇海入渊。')},
  {id:'mountains',status:'CANON',source:'AUTHOR_V11',label:confirmed('高耸山脉'),kind:confirmed('地貌'),description:confirmed('高耸山脉是大陆的重要自然地理结构。')},
  {id:'river',status:'CANON',source:'AUTHOR_V11',label:confirmed('大江'),kind:confirmed('地貌'),description:confirmed('无法轻易横渡的大江，是大陆的重要自然地理阻隔。')},
  {id:'mist',status:'CANON',source:'AUTHOR_V11',label:confirmed('迷雾禁地'),kind:confirmed('地点'),description:confirmed('世界的重要结构包括迷雾禁地。')},
  {id:'abandoned',status:'CANON',source:'AUTHOR_V11',label:confirmed('遗弃地 / 死亡硚'),kind:confirmed('地点'),description:confirmed('世界的重要结构包括遗弃地 / 死亡硚。')},
];
