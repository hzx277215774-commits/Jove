import { useLanguage, T } from '@/components/Language';
import { useState } from 'react';
import { Compass, Plus, Minus, RotateCcw, ArrowUpRight } from 'lucide-react';
import { regions } from './regions';
import { readCanon } from '@/content/canon/core';
import { world, type Region } from '@/content/world';
import { Art, Modal } from '@/components/UI';
import { ArchiveFields, ArchiveRelations, Unpublished } from '@/components/ArchiveFields';

function RegionBody({region}:{region:Region}) {const {t}=useLanguage();
 return <>
  <p className="eyebrow">{t(readCanon(region.kind))} / WORLD ATLAS</p>
  <h2>{t(readCanon(region.label))}</h2>
  {readCanon(region.image)&&<Art name={readCanon(region.image)!} alt={readCanon(region.label)||'地区档案'} className="region-canon-art"/>}
  <ArchiveFields fields={[
   ['地理',region.description],['名称',region.name],['地貌',region.terrain],['历史',region.history],
  ]}/>
  <ArchiveRelations label="相关档案" field={region.relations}/>
 </>;
}

export function WorldMap() {const {t}=useLanguage();
 const [selectedId,setSelectedId]=useState(regions[0]?.id);
 const [opened,setOpened]=useState<Region|null>(null);
 const [filter,setFilter]=useState('全部');
 const [zoom,setZoom]=useState(1);
 const filters=['全部',...Array.from(new Set(regions.flatMap(r=>readCanon(r.kind)?[readCanon(r.kind)!]:[])))];
 const visible=regions.filter(r=>filter==='全部'||readCanon(r.kind)===filter);
 const selected=visible.find(r=>r.id===selectedId)||visible[0];
 const mainRegions=visible.filter(r=>readCanon(r.kind)==='区域');
 const confluence=visible.find(r=>r.id==='confluence');
 const terrain=visible.filter(r=>readCanon(r.kind)!=='区域'&&r.id!=='confluence');
 const select=(r:Region)=>{setSelectedId(r.id);setOpened(r)};
 const node=(r:Region)=><button key={r.id} className={`structure-node ${selected?.id===r.id?'selected':''}`}
  onPointerEnter={e=>{if(e.pointerType==='mouse')setSelectedId(r.id)}} onFocus={()=>setSelectedId(r.id)}
  onClick={()=>select(r)} aria-label={t(`打开${readCanon(r.label)}档案`)}>
  {readCanon(r.kind)==='区域'&&<span aria-hidden="true">◇</span>}{t(readCanon(r.label))}
 </button>;
 if(!regions.length)return <Unpublished/>;
 return <div className="atlas">
  <div className="map-toolbar"><div role="group" aria-label={t('地图分类')}>{filters.map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{t(f)}</button>)}</div><span><Compass size={15}/><T text=" 世界结构 · 非比例"/></span></div>
  <div className="map-layout">
   <div className="map-viewport canon-map"><div className="map-scroll"><div className="structure-canvas" style={{width:`${zoom*100}%`}}><div className="continent-outline">
    <p className="continent-caption"><T text="一块大陆"/><span>{t(readCanon(world.geography))}</span></p>
    {mainRegions.length>0&&<div className="structure-regions">{mainRegions.map(node)}</div>}
    {confluence&&<button className="confluence-node" onPointerEnter={e=>{if(e.pointerType==='mouse')setSelectedId(confluence.id)}} onFocus={()=>setSelectedId(confluence.id)} onClick={()=>select(confluence)}><span>{t(readCanon(confluence.label))}</span><strong>{t(readCanon(confluence.description))}</strong></button>}
    {terrain.length>0&&<div className="terrain-nodes">{terrain.map(node)}</div>}
    <p className="structure-note"><T text="地理关系图 · 不表示方位与距离"/></p>
   </div></div></div>
   <div className="map-controls"><button aria-label={t('放大地图')} disabled={zoom>=2} onClick={()=>setZoom(z=>Math.min(2,z+.25))}><Plus size={18}/></button><button aria-label={t('缩小地图')} disabled={zoom<=1} onClick={()=>setZoom(z=>Math.max(1,z-.25))}><Minus size={18}/></button><button aria-label={t('重置地图缩放')} onClick={()=>setZoom(1)}><RotateCcw size={17}/></button></div><span className="map-hint"><span className="desktop-map-hint"><T text="悬停查看 · "/></span><T text="点击展开档案"/></span></div>
   <aside className="region-detail" aria-live="polite"><div className="region-copy">{selected?<><RegionBody region={selected}/><button className="text-link" onClick={()=>setOpened(selected)}><T text="打开档案 "/><ArrowUpRight size={16}/></button></>:<Unpublished/>}</div></aside>
  </div>
  <div className="region-index"><span><T text="档案索引"/></span>{visible.map(r=><button key={r.id} aria-pressed={selected?.id===r.id} onClick={()=>select(r)}>{t(readCanon(r.label))}</button>)}</div>
  {opened&&<Modal title={`${t(readCanon(opened.label))}档案`} onClose={()=>setOpened(null)}><div className="modal-copy"><RegionBody region={opened}/></div></Modal>}
 </div>;
}
