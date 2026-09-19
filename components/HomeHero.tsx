import { useRef } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Art, ExploreButton } from './UI';
import { useLanguage, T } from './Language';
export function HomeHero(){const hero=useRef<HTMLElement>(null);const {t,language}=useLanguage();return <>
 <section className="hero restored-hero" ref={hero} onPointerMove={e=>{if(e.pointerType==='mouse'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const rect=e.currentTarget.getBoundingClientRect();hero.current?.style.setProperty('--mx',`${((e.clientX-rect.left)/rect.width-.5)*9}px`);hero.current?.style.setProperty('--my',`${((e.clientY-rect.top)/rect.height-.5)*6}px`)}}} onPointerLeave={()=>{hero.current?.style.setProperty('--mx','0px');hero.current?.style.setProperty('--my','0px')}}>
  <Art name="landscape" alt="作者原作：暮色中的山谷、聚落与远行者" className="hero-art" priority/><div className="hero-shade"/><div className="mist mist-one"/><div className="mist mist-two"/>
  <div className="hero-topline"><span><T text="原创东方幻想 IP"/></span><span>THE WORLD ARCHIVE · VOL. 01</span></div>
  <div className="hero-copy"><p className="hero-kicker"><T text="山 海 有 灵 · 万 物 生 芒"/></p><div className="hero-title"><h1>芒</h1><span className="hero-seal"><T text="东方"/><br/><T text="幻想"/></span></div><p className="hero-english">MANG FLUX</p><div className="hero-rule"><i/><span>◇</span><i/></div><p className="hero-quote"><T text="万物由芒构成，"/><br/><T text="人在世界中寻找自己的存在。"/></p><ExploreButton href="/world/"><span><T text="探索世界"/></span>{language==='zh'&&<small>EXPLORE THE WORLD</small>}</ExploreButton></div>
  <div className="hero-side"><T text="天地有序，万物有声。"/></div><a className="scroll-cue" href="#archive" aria-label={t('向下浏览世界档案')}><span><T text="向下，展开世界"/></span><ArrowDown size={15}/></a><div className="hero-coordinate"><T text="山谷暮色 · 原作场景"/><br/><small>MANG FLUX / ORIGINAL CONCEPT ART</small></div>
  <div className="hero-bottom"><span><T text="一部关于人与世界的幻想长卷"/></span><span><T text="序章"/> <b>01</b><i/> 08</span></div>
 </section>
 <section className="principles-strip" aria-label={t('三个世界核心概念')}>{[
  {glyph:'界',title:'世界',en:'WORLD',text:'一块大陆，三个区域。',href:'/about/'},
  {glyph:'芒',title:'芒',en:'MANG',text:'构成万物的基础物质。',href:'#mang'},
  {glyph:'人',title:'人',en:'HUMAN',text:'感知、操纵，也被改变。',href:'#cost'},
 ].map(p=><Link href={p.href} key={p.en}><span className="principle-symbol" aria-hidden="true">{p.glyph}</span><div><h2>{language==='zh'?p.title:p.en}{language==='zh'&&<small>{p.en}</small>}</h2><p>{t(p.text)}</p></div><ArrowUpRight size={17}/></Link>)}</section>
 </>}
