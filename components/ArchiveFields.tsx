import { useLanguage, T } from '@/components/Language';
import Link from 'next/link';
import { readCanon, type CanonValue } from '@/content/canon/core';
import type { ArchiveRelation } from '@/content/world';
export function ArchiveFields({fields}:{fields:[string,CanonValue<string>|undefined][]}){const {t}=useLanguage();
 const visible=fields.flatMap(([label,field])=>{const value=readCanon(field);return value?.trim()?[{label,value}]:[]});
 if(!visible.length)return null;
 return <dl className="archive-fields">{visible.map(({label,value})=><div key={label}><dt>{t(label)}</dt><dd>{t(value)}</dd></div>)}</dl>;
}
export function ArchiveRelations({label,field}:{label:string;field?:CanonValue<ArchiveRelation[]>}){const {t}=useLanguage();
 const relations=readCanon(field);if(!relations?.length)return null;
 return <section className="archive-relations"><h3>{t(label)}</h3>{relations.map(r=><Link href={r.href} key={r.href}>{t(r.label)}</Link>)}</section>;
}
export function Unpublished(){return <p className="unpublished"><T text="档案尚未公开"/></p>}
