import { useLanguage, T } from '@/components/Language';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Art, Eyebrow, PageHeading } from '@/components/UI';
import { ArchiveFields } from '@/components/ArchiveFields';
import { WorldMap } from '@/world/WorldMap';
import { CharacterArchive } from '@/characters/CharacterArchive';
import { Gallery } from '@/gallery/Gallery';
import { scenes, creatures } from '@/gallery/artworks';
import { headings } from '@/data/site';
import { readCanon, publicRecords } from '@/content/canon/core';
import { world } from '@/content/world';
import { story, creator } from '@/content/stories';
import { designStudies } from '@/content/artworks';
export default function ArchivePage({section}:{section:string}){const {t}=useLanguage();const h=headings[section];return <div className={`subpage section-wrap ${section}-page`}><PageHeading {...h}/>
 {section==='world'&&<WorldMap/>}
 {section==='characters'&&<CharacterArchive/>}
 {section==='scenes'&&<Gallery items={scenes} label="场景档案"/>}
 {section==='creatures'&&<Gallery items={creatures} label="生物档案"/>}
 {section==='about'&&<><div className="about-lead"><div><p className="large-copy">{t(readCanon(world.definition))}</p><p>{t(readCanon(world.geography))}</p></div><Art name="coast" alt="芒 · 作者原作山海场景"/></div><section className="canon-section"><Eyebrow>TWELVE FORMS OF MANG</Eyebrow><h2><T text="当前文明已知的十二种芒"/></h2><div className="mang-elements">{readCanon(world.elements)?.map((name,i)=><div key={name}><small>{String(i+1).padStart(2,'0')}</small><span>{t(name)}</span></div>)}</div></section><section className="canon-section"><Eyebrow>MANG AND HUMANITY</Eyebrow><h2><T text="感知、操纵与改变"/></h2><p>{t(readCanon(world.use))}</p><p>{t(readCanon(world.cost))}</p></section><div className="statement"><h2>{t(readCanon(world.theme))}</h2></div></>}
 {section==='stories'&&<><div className="story-prologue"><Art name="landscape" alt="芒 · 作者原作山谷场景"/><div><Eyebrow>THE CORE THEME</Eyebrow><h2>{t(readCanon(story.theme))}</h2><p>{t(readCanon(story.concept))}</p></div></div>{[story.era,story.locations,story.protagonists,story.conflict].some(field=>readCanon(field))&&<section className="canon-section"><ArchiveFields fields={[
 ['时代背景',story.era],['故事发生地',story.locations],['主要角色',story.protagonists],['核心矛盾',story.conflict],
 ]}/></section>}{publicRecords(story.chapters).length>0&&<section className="canon-section"><h2><T text="故事章节"/></h2>{publicRecords(story.chapters).map(c=><article key={c.id}><h3>{t(readCanon(c.title))}</h3><p>{t(readCanon(c.body))}</p></article>)}</section>}</>}
 {section==='philosophy'&&<><section className="creator-letter"><span className="creator-mark" aria-hidden="true">造<br/>境</span><div><Eyebrow>BEHIND THE WORLD</Eyebrow><h2><T text="通过视觉设计，"/><br/><T text="创造东方幻想世界。"/></h2><p>{t(readCanon(creator.introduction))}</p></div></section><section className="creative-values"><Eyebrow>CREATIVE THEMES</Eyebrow><div>{readCanon(creator.themes)?.map((theme,i)=><span key={theme}><small>0{i+1}</small>{t(theme)}</span>)}</div></section><div className="section-heading"><div><Eyebrow>DESIGN PROCESS</Eyebrow><h2><T text="创作过程。"/></h2></div></div><div className="process-board">{publicRecords(designStudies).map(s=><div className="process-study" key={s.id}><Art name={readCanon(s.image)!} alt={readCanon(s.label)!}/><span>{t(readCanon(s.label))}</span></div>)}</div></>}
 </div>}
export const getStaticPaths:GetStaticPaths=async()=>({paths:Object.keys(headings).map(section=>({params:{section}})),fallback:false});
export const getStaticProps:GetStaticProps=async({params})=>({props:{section:params?.section}});
