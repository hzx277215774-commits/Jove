import { useLanguage, T } from '@/components/Language';
import Link from 'next/link';
import { HomeHero } from '@/components/HomeHero';
import { ArrowUpRight } from 'lucide-react';
import { Art, Eyebrow, TextLink } from '@/components/UI';
import { Unpublished } from '@/components/ArchiveFields';
import { WorldMap } from '@/world/WorldMap';
import { homeSections } from '@/data/site';
import { readCanon } from '@/content/canon/core';
import { world } from '@/content/world';
import { characters } from '@/characters/characters';
import { scenes, creatures } from '@/gallery/artworks';
import { story, creator } from '@/content/stories';
function Heading({index}:{index:number}){const {t}=useLanguage();const s=homeSections[index];return <div className="section-heading"><div><Eyebrow>{s.num} / {s.en}</Eyebrow><h2>{t(s.title)}<span>。</span></h2></div></div>}
export default function Home(){const {t}=useLanguage();return <><HomeHero/>
 <section className="home-archive section-wrap" id="archive"><div><Eyebrow>01 / WORLD ARCHIVE V1.1</Eyebrow><h2>芒 <span>Mang Flux</span></h2><p className="home-tagline"><T text="山海有灵，万物生芒。"/></p><p>{t(readCanon(world.geography))}</p><p>{t(readCanon(world.definition))}</p><TextLink href="/about/"><T text="阅读世界档案"/></TextLink></div><Art name="coast" alt="芒 · 作者原作中的山海与远行者"/></section>
 <section className="home-section section-wrap" id="mang"><Heading index={1}/><p className="section-lead">{t(readCanon(world.definition))}</p><p className="muted-body"><T text="当前文明已知十二种芒。"/></p><div className="mang-elements" aria-label={t('十二种芒')}>{readCanon(world.elements)?.map((name,i)=><div key={name}><small>{String(i+1).padStart(2,'0')}</small><span>{t(name)}</span></div>)}</div></section>
 <section className="home-section section-wrap cost-section" id="cost"><Heading index={2}/><div className="cost-layout"><p className="cost-theme">{t(readCanon(world.theme))}</p><div><p>{t(readCanon(world.use))}</p><p>{t(readCanon(world.cost))}</p></div></div></section>
 <section className="home-section section-wrap" id="atlas"><Heading index={3}/><p className="section-lead">{t(readCanon(world.geography))}</p><WorldMap/><TextLink href="/world/"><T text="打开完整地图档案"/></TextLink></section>
 <section className="home-section section-wrap" id="locations"><Heading index={4}/>{readCanon(story.locations)?<p className="section-lead">{t(readCanon(story.locations))}</p>:<Unpublished/>}</section>
 <section className="home-section section-wrap" id="people"><Heading index={5}/><div className="chapter-grid home-people">{characters.map(c=><Link className="chapter-card" href="/characters/" key={c.id}><Art name={readCanon(c.image)!} alt={readCanon(c.name)!}/><div className="chapter-copy"><p><T text="人物档案"/></p><h3>{t(readCanon(c.name))}<ArrowUpRight size={22}/></h3></div></Link>)}</div><TextLink href="/characters/"><T text="阅读人物档案"/></TextLink></section>
 <section className="home-section section-wrap" id="scenes"><Heading index={6}/><div className="chapter-grid">{scenes.slice(0,3).map((a,i)=><Link href="/scenes/" className="chapter-card" key={a.id}><Art name={readCanon(a.image)!} alt={readCanon(a.name)||`场景档案 ${i+1}`}/><div className="chapter-copy"><p>CONCEPT ART</p><h3>{t(readCanon(a.name)||`场景档案 ${String(i+1).padStart(2,'0')}`)}<ArrowUpRight size={22}/></h3></div></Link>)}</div><TextLink href="/scenes/"><T text="浏览全部场景"/></TextLink></section>
 <section className="home-section section-wrap" id="creatures"><Heading index={7}/>{creatures.length>0?<div className="creature-preview"><Art name={readCanon(creatures[0].image)!} alt="生物设计图"/><div><p className="section-lead"><T text="生物设计图"/></p><TextLink href="/creatures/"><T text="浏览生物档案"/></TextLink></div></div>:<Unpublished/>}</section>
 <section className="home-section section-wrap" id="stories"><Heading index={8}/><p className="section-lead">{t(readCanon(story.theme))}</p><p className="muted-body">{t(readCanon(story.concept))}</p><TextLink href="/stories/"><T text="阅读故事概念"/></TextLink></section>
 <section className="home-section section-wrap" id="creator"><Heading index={9}/><p className="section-lead">{t(readCanon(creator.introduction))}</p><TextLink href="/philosophy/"><T text="了解创作理念"/></TextLink></section>
 </>}
