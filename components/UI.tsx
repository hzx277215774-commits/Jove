import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage, LanguageSwitch, T } from './Language';
import { nav } from '@/data/site';
import { artAssets, type ArtAsset } from '@/assets/manifest';

export function Art({name,alt,className='',priority=false}:{name:string;alt:string;className?:string;priority?:boolean}) {
 const {t}=useLanguage(); const asset: ArtAsset = artAssets[name] ?? { src: name }; const index = asset.panel;
 return <div className={`art ${className} ${index!==undefined?'triptych':''}`}><img src={asset.src} alt={t(alt)} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} style={{...(index!==undefined?{left:`-${index*100}%`}:{}),objectFit:asset.fit,objectPosition:asset.position,background:asset.background}}/></div>;
}
export function Shell({children}:{children:ReactNode}) {
 const {t}=useLanguage();const router=useRouter();const [open,setOpen]=useState(false);const navRef=useRef<HTMLElement>(null);const toggleRef=useRef<HTMLButtonElement>(null);
 useEffect(()=>{setOpen(false)},[router.asPath]);
 useEffect(()=>{
  if(!open)return;const old=document.body.style.overflow;document.body.style.overflow='hidden';navRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
  const keys=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);toggleRef.current?.focus()}if(e.key==='Tab'){const languageButton=toggleRef.current?.parentElement?.querySelector<HTMLButtonElement>('.language-switch');const nodes=[...Array.from(navRef.current?.querySelectorAll<HTMLAnchorElement>('a')||[]),...(languageButton?[languageButton]:[]),toggleRef.current!];const index=nodes.indexOf(document.activeElement as HTMLAnchorElement);if(e.shiftKey&&index<=0){e.preventDefault();nodes[nodes.length-1]?.focus()}else if(!e.shiftKey&&(index===nodes.length-1||index<0)){e.preventDefault();nodes[0]?.focus()}}};
  const resize=()=>{if(innerWidth>680)setOpen(false)};window.addEventListener('keydown',keys);window.addEventListener('resize',resize);return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',keys);window.removeEventListener('resize',resize)};
 },[open]);
 return <><a className="skip" href="#main"><T text="跳转至正文"/></a><header className="site-header"><Link href="/" className="brand" aria-label={t('芒 · Mang Flux，返回正式首页')}><span className="brand-cn">芒<span className="seal" aria-hidden="true">芒</span></span><span className="brand-en">MANG FLUX</span></Link><nav ref={navRef} id="main-navigation" className={open?'main-nav is-open':'main-nav'} aria-label={t('主导航')}>{nav.map(item=><Link key={item.href} href={item.href} aria-current={router.asPath.split('#')[0]===item.href?'page':undefined} className={router.asPath.split('#')[0]===item.href?'active':''}>{t(item.label)}</Link>)}</nav><div className="header-end"><LanguageSwitch/><span className="small-diamond">◇</span><span className="edition"><T text="世界档案 · 壹"/></span><button ref={toggleRef} className="menu-toggle" onClick={()=>setOpen(!open)} aria-label={t(open?'关闭导航':'打开导航')} aria-controls="main-navigation" aria-expanded={open}>{open?<X size={22}/>:<Menu size={22}/>}</button></div></header><main id="main" tabIndex={-1} key={router.asPath.split('#')[0]} className="page-turn">{children}</main><footer><div className="footer-top"><Link className="footer-brand" href="/">芒 <small>MANG FLUX</small></Link><p><T text="山海有灵 · 万物生芒"/></p></div><div className="footer-bottom"><span>© 2026 Mang Flux</span><span>WORLD ARCHIVE V1.1</span></div></footer></>;
}
export function Eyebrow({children}:{children:ReactNode}){return <p className="eyebrow"><span/> {children}</p>}
export function PageHeading({num,en,title,description}:{num:string;en:string;title:string;description:string}){const {t,language}=useLanguage();return <div className="page-heading"><Eyebrow>{language==='zh'?`卷 ${num} · `:''}{en}</Eyebrow><h1>{t(title)}<span>{language==='zh'?'。':'.'}</span></h1><p>{t(description)}</p></div>}
export function TextLink({href,children}:{href:string;children:ReactNode}){const {t}=useLanguage();return <Link className="text-link" href={href}>{typeof children==='string'?t(children):children}<ArrowUpRight size={18}/></Link>}
export function ExploreButton({href,children}:{href:string;children:ReactNode}){const {t}=useLanguage();return <Link className="explore-button" href={href}><span>{typeof children==='string'?t(children):children}</span><ArrowRight size={17}/></Link>}
export function Modal({title,children,onClose,onPrev,onNext}:{title:string;children:ReactNode;onClose:()=>void;onPrev?:()=>void;onNext?:()=>void}) {
 const {t}=useLanguage();const ref=useRef<HTMLDialogElement>(null);const closeRef=useRef(onClose);closeRef.current=onClose;
 useEffect(()=>{const d=ref.current;const prior=document.activeElement as HTMLElement;d?.showModal();const before=document.body.style.overflow;document.body.style.overflow='hidden';const cancel=(e:Event)=>{e.preventDefault();closeRef.current()};d?.addEventListener('cancel',cancel);return()=>{d?.removeEventListener('cancel',cancel);d?.close();document.body.style.overflow=before;prior?.focus()}},[]);
 return <dialog ref={ref} className="archive-dialog" aria-label={t(title)} onClick={e=>{if(e.target===e.currentTarget)onClose()}}><button autoFocus className="close-button" onClick={onClose} aria-label={t('关闭档案')}><X/></button>{children}{onPrev&&onNext&&<div className="modal-paging"><button onClick={onPrev} aria-label={t('上一幅作品')}><ChevronLeft/><T text=" 上一幅"/></button><span><T text="作品档案"/></span><button onClick={onNext} aria-label={t('下一幅作品')}><T text="下一幅 "/><ChevronRight/></button></div>}</dialog>;
}
