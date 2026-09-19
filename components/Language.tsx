import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { en } from '@/data/i18n/en';
export type Language='zh'|'en';
export function translate(text:string|undefined,language:Language):string {
 if(!text)return '';if(language==='zh')return text;if(en[text])return en[text];if(en[text.trim()])return en[text.trim()];
 const numbered=text.match(/^(区域|场景档案|生物档案|人物档案)\s*(\d+)$/);
 if(numbered)return `${en[numbered[1]]} ${numbered[2]}`;
 const open=text.match(/^打开(.+)档案$/);if(open)return `Open ${translate(open[1],language)} archive`;
 const design=text.match(/^(.+?)(角色设计|设计图|人物档案|档案)$/);if(design)return `${translate(design[1],language)} — ${({'角色设计':'Character Design','设计图':'Design Sheets','人物档案':'Character Archive','档案':'Archive'} as Record<string,string>)[design[2]]}`;
 return text;
}
const LanguageContext=createContext<{language:Language;t:(text:string|undefined)=>string;setLanguage:(language:Language)=>void}|null>(null);
export function LanguageProvider({children}:{children:ReactNode}) {
 const [language,setLanguageState]=useState<Language>('zh');
 useEffect(()=>{try{const query=new URLSearchParams(location.search).get('lang');const saved=query||localStorage.getItem('mangLanguage');if(saved==='en'||saved==='zh')setLanguageState(saved)}catch{/* Chinese remains the default without storage. */}},[]);
 useEffect(()=>{document.documentElement.lang=language==='en'?'en':'zh-CN';document.documentElement.dataset.language=language},[language]);
 function setLanguage(next:Language){setLanguageState(next);try{localStorage.setItem('mangLanguage',next)}catch{/* In-memory selection remains functional. */}}
 return <LanguageContext.Provider value={{language,t:text=>translate(text,language),setLanguage}}>{children}</LanguageContext.Provider>;
}
export function useLanguage(){const context=useContext(LanguageContext);if(!context)throw new Error('LanguageProvider required');return context;}
export function T({text}:{text:string}){return useLanguage().t(text)}
export function LanguageSwitch(){const {language,setLanguage}=useLanguage();return <button type="button" className="language-switch" onClick={()=>setLanguage(language==='zh'?'en':'zh')} aria-label={language==='zh'?'Switch to English':'切换为中文'} title={language==='zh'?'Switch to English':'切换为中文'}><span className={language==='zh'?'selected':''}>中</span><i aria-hidden="true">/</i><span className={language==='en'?'selected':''}>EN</span></button>}
