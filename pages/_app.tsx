import type { AppProps } from 'next/app';
import { LanguageProvider } from '@/components/Language';
import { Shell } from '@/components/UI';
import { AmbientAudioProvider, AudioControl } from '@/components/AmbientAudio';
import { WorldEntryGate } from '@/components/WorldEntry';
import { SiteSEO } from '@/components/SiteSEO';
import '@/styles/globals.css';
import '@/styles/v1.1.css';
export default function App({Component,pageProps}:AppProps){return <LanguageProvider><SiteSEO/><AmbientAudioProvider><WorldEntryGate><Shell><Component {...pageProps}/></Shell><AudioControl/></WorldEntryGate></AmbientAudioProvider></LanguageProvider>}
