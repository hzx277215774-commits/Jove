import Head from 'next/head';
import { useRouter } from 'next/router';
import { siteConfig } from '@/data/config';
import { headings } from '@/data/site';
import { useLanguage } from './Language';
export function SiteSEO(){
 const {t,language}=useLanguage();const router=useRouter();const section=typeof router.query.section==='string'?router.query.section:'';const page=headings[section];
 const brand=language==='zh'?'芒 · Mang Flux':'Mang Flux';
 const title=page?`${t(page.title)} | ${brand}`:router.pathname==='/404'?`${t('档案尚未公开')} | ${brand}`:t(siteConfig.title);
 const description=page?`${t(page.description)} ${t(siteConfig.description)}`:t(siteConfig.description);
 const path=section?`/${section}/`:router.pathname==='/404'?'/404/':'/';const url=siteConfig.origin+path;
 return <Head><title>{title}</title><meta name="description" content={description}/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="theme-color" content="#111714"/><meta property="og:title" content={title}/><meta property="og:description" content={description}/><meta property="og:site_name" content={brand}/><meta property="og:type" content="website"/><meta property="og:locale" content={language==='en'?'en_US':'zh_CN'}/><meta property="og:url" content={url}/><meta name="twitter:card" content="summary"/><meta name="twitter:title" content={title}/><meta name="twitter:description" content={description}/><link rel="canonical" href={url}/><link rel="icon" href="/favicon.svg"/></Head>;
}
