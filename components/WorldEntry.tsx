import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { LanguageSwitch, useLanguage, T } from './Language';
import { useAmbientAudio } from './AmbientAudio';
const cfg=siteConfig.entry;
export function WorldEntryGate({children}:{children:ReactNode}) {
  const {t}=useLanguage();const router=useRouter();const root=router.pathname==='/';
  const [entered,setEntered]=useState(!root);const [phase,setPhase]=useState<'checking'|'ready'|'leaving'>('checking');
  const timeout=useRef<ReturnType<typeof setTimeout>|null>(null);const surface=useRef<HTMLElement>(null);const {startFromEntry}=useAmbientAudio();
  const committed=useRef(false);
  const remember=()=>{committed.current=true;setEntered(true);try{sessionStorage.setItem(cfg.sessionKey,'true')}catch{/* In-memory state still permits navigation. */}};
  useEffect(()=>{
    if(!root){remember();return;}
    try{if(sessionStorage.getItem(cfg.sessionKey)==='true'){remember();return}}catch{/* Fall back to this tab's memory. */}
    setPhase('ready');
  },[root]);
  useEffect(()=>()=>{if(timeout.current)clearTimeout(timeout.current)},[]);
  const show=root&&!entered&&!committed.current;
  useEffect(()=>{if(!show)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous}},[show]);
  function enter(){
    if(phase==='leaving')return;
    startFromEntry();setPhase('leaving');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    timeout.current=setTimeout(()=>{remember();requestAnimationFrame(()=>{document.querySelector<HTMLElement>('#main')?.focus()})},reduced?0:cfg.duration);
  }
  if(!show)return <>{children}</>;
  return <><Head><link rel="preload" as="image" href={cfg.src} fetchPriority="high"/></Head>
    <main ref={surface} className={`world-entry entry-${phase}`} aria-label={t("芒 · 世界入口")} onPointerMove={e=>{if(e.pointerType==='mouse'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const box=e.currentTarget.getBoundingClientRect();surface.current?.style.setProperty('--entry-x',`${(e.clientX/box.width-.5)*5}px`)}}} onPointerLeave={()=>surface.current?.style.setProperty('--entry-x','0px')}>
      <img className="entry-art" src={cfg.src} alt={t("芒：红衣少年背影与辽阔海岸")} fetchPriority="high"/>
      <div className="entry-shade"/><div className="entry-language"><LanguageSwitch/></div><div className="entry-copy"><p className="entry-overline"><T text="东方幻想世界档案"/></p><h1>芒</h1><p className="entry-english">MANG FLUX</p><span className="entry-divider" aria-hidden="true">◇</span><p className="entry-tagline">{t(siteConfig.tagline)}</p><button className="explore-button entry-button" onClick={enter} disabled={phase==='leaving'}><span><T text="进入世界"/></span><ArrowRight size={18}/></button></div>
      <span className="entry-edition">WORLD ARCHIVE V1.1</span>
    </main></>;
}
