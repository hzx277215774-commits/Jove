import { useLanguage, T } from '@/components/Language';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { characters } from './characters';
import { Art, Modal } from '@/components/UI';
import { ArchiveFields, ArchiveRelations, Unpublished } from '@/components/ArchiveFields';
import { readCanon } from '@/content/canon/core';
export function CharacterArchive(){const {t}=useLanguage();
 const [selected,setSelected]=useState<string|null>(null);const person=characters.find(c=>c.id===selected);
 return <><div className="character-grid">{characters.map((c,i)=><button className="character-card" key={c.id} onClick={()=>setSelected(c.id)}><Art name={readCanon(c.image)!} alt={`${t(readCanon(c.name))}角色设计`}/><span className="character-no">{t('人物档案')} / {String(i+1).padStart(3,'0')}</span><div className="character-label">{readCanon(c.identity)&&<p>{t(readCanon(c.identity))}</p>}<h2>{t(readCanon(c.name))}</h2><span><T text="展开人物档案 "/><ArrowUpRight size={17}/></span></div></button>)}</div>{!characters.length&&<Unpublished/>}{person&&<Modal title={`${t(readCanon(person.name))}人物档案`} onClose={()=>setSelected(null)}><div className="character-modal"><Art name={readCanon(person.image)!} alt={readCanon(person.name)!}/><div className="modal-copy"><p className="eyebrow">CHARACTER ARCHIVE</p><h2>{t(readCanon(person.name))}</h2><ArchiveFields fields={[
 ['身份',person.identity],['出身',person.origin],['芒性',person.element],['体质',person.constitution],['人物简介',person.introduction],['性格',person.personality],['经历',person.history],['关系',person.relationships],['能力',person.abilities],
 ]}/><ArchiveRelations label="相关地区" field={person.regions}/><ArchiveRelations label="相关故事" field={person.stories}/>{readCanon(person.designImages)?.length&&<section className="character-designs"><h3><T text="设计图"/></h3>{readCanon(person.designImages)!.map(name=><Art name={name} alt={`${t(readCanon(person.name))}设计图`} key={name}/>)}</section>}</div></div></Modal>}</>;
}
