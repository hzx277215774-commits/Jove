import { useLanguage, T } from './Language';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { siteConfig } from '@/data/config';
const cfg = siteConfig.backgroundMusic;
interface AmbientState { playing:boolean; available:boolean; volume:number; startFromEntry:()=>void; toggle:()=>void; setVolume:(v:number)=>void }
const AmbientContext = createContext<AmbientState | null>(null);
const safeVolume=(n:unknown)=>typeof n==='number'&&Number.isFinite(n)?Math.max(0,Math.min(cfg.maxVolume,n)):cfg.defaultVolume;
export function AmbientAudioProvider({children}:{children:ReactNode}) {
  const audio=useRef<HTMLAudioElement>(null), frame=useRef(0), generation=useRef(0);
  const preference=useRef(true), targetVolume=useRef<number>(cfg.defaultVolume);
  const [volume,setVolumeState]=useState<number>(cfg.defaultVolume);
  const [playing,setPlaying]=useState(false);
  const [available,setAvailable]=useState(cfg.enabled&&process.env.NEXT_PUBLIC_MANG_AUDIO_AVAILABLE==='true');
  const save=()=>{try{localStorage.setItem(cfg.storageKey,JSON.stringify({volume:targetVolume.current,isPlaying:preference.current}))}catch{/* Storage may be disabled. */}};
  useEffect(()=>{
    try{const stored=JSON.parse(localStorage.getItem(cfg.storageKey)||'null');if(stored){targetVolume.current=safeVolume(stored.volume);setVolumeState(targetVolume.current);preference.current=stored.isPlaying!==false;}}catch{/* Keep safe defaults. */}
    // Never restore audible playback without a new user gesture, including reloads.
    return()=>{generation.current++;cancelAnimationFrame(frame.current)};
  },[]);
  function play(){
    const node=audio.current;if(!node||!available)return;
    generation.current++;const run=generation.current;cancelAnimationFrame(frame.current);
    node.volume=0;node.preload='metadata';
    // This call stays synchronous in the entry/control click handler.
    const promise=node.play();
    promise.then(()=>{
      if(run!==generation.current){return;}
      setPlaying(true);preference.current=true;save();
      const start=performance.now();const fade=(time:number)=>{
        if(run!==generation.current)return;
        const progress=Math.max(0,Math.min(1,(time-start)/cfg.fadeDuration));node.volume=targetVolume.current*progress;
        if(progress<1)frame.current=requestAnimationFrame(fade);
      };frame.current=requestAnimationFrame(fade);
    }).catch((error:DOMException)=>{
      if(run!==generation.current)return;setPlaying(false);
      if(error.name==='NotSupportedError')setAvailable(false);
      // Policy, decode and network failures never block the site or surface console exceptions.
    });
  }
  function pause(){generation.current++;cancelAnimationFrame(frame.current);audio.current?.pause();setPlaying(false);preference.current=false;save();}
  function setVolume(value:number){const next=safeVolume(value);targetVolume.current=next;setVolumeState(next);if(audio.current)audio.current.volume=next;save();}
  return <AmbientContext.Provider value={{playing,available,volume,startFromEntry:()=>{if(preference.current)play()},toggle:()=>{if(playing||audio.current&&!audio.current.paused)pause();else play()},setVolume}}>
    {available&&<audio ref={audio} src={cfg.src} loop preload="none" aria-hidden="true" onPause={()=>setPlaying(false)} onPlaying={()=>setPlaying(true)} onError={()=>{generation.current++;cancelAnimationFrame(frame.current);setPlaying(false);setAvailable(false)}}/>}
    {children}
  </AmbientContext.Provider>;
}
export function useAmbientAudio(){const context=useContext(AmbientContext);if(!context)throw new Error('AmbientAudioProvider is required');return context;}
export function AudioControl(){const {t}=useLanguage();
  const {playing,available,volume,toggle,setVolume}=useAmbientAudio();
  return <div className="ambient-control"><div className="ambient-volume"><label htmlFor="ambient-volume"><T text="音量"/></label><input id="ambient-volume" aria-label={t("背景音乐音量")} type="range" min="0" max={cfg.maxVolume} step="0.01" value={volume} disabled={!available} onChange={e=>setVolume(Number(e.target.value))}/></div>
    <button className="ambient-toggle" type="button" disabled={!available} aria-label={t(!available?'背景音乐暂未开放':playing?'暂停背景音乐':'播放背景音乐')} aria-pressed={playing} title={playing?'Sound On':'Sound Off'} onClick={toggle}>{playing?<Volume2 size={19}/>:<VolumeX size={19}/>}<span className="audio-tooltip">{playing?'Sound On':'Sound Off'}</span></button>
  </div>;
}

