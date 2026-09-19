import { useLanguage, T } from '@/components/Language';
import { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Art, Modal } from '@/components/UI';
import { ArchiveFields, ArchiveRelations, Unpublished } from '@/components/ArchiveFields';
import { publicRecords, readCanon } from '@/content/canon/core';
import type { Artwork } from './artworks';
export function Gallery({items,label='场景档案'}:{items:Artwork[];label?:string}){const {t}=useLanguage();
 const approved=publicRecords(items).filter(a=>readCanon(a.image));
 const categories=Array.from(new Set(approved.flatMap(a=>readCanon(a.category)?[readCanon(a.category)!]:[])));
 const [filter,setFilter]=useState('全部'),[selected,setSelected]=useState<string|null>(null);
 const list=filter==='全部'?approved:approved.filter(a=>readCanon(a.category)===filter);const current=list.find(a=>a.id===selected);
 const title=(a:Artwork)=>t(readCanon(a.name)||`${label} ${String(approved.indexOf(a)+1).padStart(2,'0')}`);
 function move(step:number){if(!list.length)return;const index=list.findIndex(a=>a.id===selected);setSelected(list[(index+step+list.length)%list.length].id)}
 return <><div className="filter-row" role="group" aria-label={t('作品分类')}>{['全部',...categories].map(c=><button key={c} aria-pressed={filter===c} onClick={()=>{setFilter(c);setSelected(null)}}>{t(c)}</button>)}<span>{String(list.length).padStart(2,'0')} {t('件档案')}</span></div><div className="gallery-grid">{list.map((a,i)=><button key={a.id} className={`gallery-item gallery-${a.id}`} onClick={()=>setSelected(a.id)}><div className="gallery-visual"><Art name={readCanon(a.image)!} alt={title(a)}/><span className="image-open"><Plus size={20}/></span><span className="image-index">{String(i+1).padStart(2,'0')} / CONCEPT ART</span></div><div className="gallery-caption"><div>{(readCanon(a.category)||readCanon(a.region))&&<small>{[readCanon(a.category),readCanon(a.region)].filter(Boolean).map(v=>t(v)).join(' · ')}</small>}<h2>{title(a)}</h2></div><ArrowUpRight size={22}/></div></button>)}</div>{!list.length&&<Unpublished/>}{current&&<Modal title={title(current)} onClose={()=>setSelected(null)} onPrev={()=>move(-1)} onNext={()=>move(1)}><Art name={readCanon(current.image)!} alt={title(current)} className="lightbox-art"/><div className="modal-copy"><p className="eyebrow">CONCEPT ART</p><h2>{title(current)}</h2><ArchiveFields fields={[
 ['名称',current.name],['分类',current.category],['地区',current.region],['地貌',current.terrain],['文化',current.culture],['用途',current.purpose],['分布',current.distribution],['生态',current.ecology],['习性',current.habits],['芒关系',current.mangRelation],['危险等级',current.danger],['人与它的关系',current.humanRelation],['设计说明',current.design],
 ]}/><ArchiveRelations label="相关人物" field={current.characters}/><ArchiveRelations label="相关故事" field={current.stories}/></div></Modal>}</>;
}
