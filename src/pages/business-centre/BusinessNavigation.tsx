import {openPlatformWithHandoff} from '@/lib/platformHandoff';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';

export const unitPaths = {academy:'/academy',fabrication:'/fabrication',compute:'/compute',digital_business:'/business-centre/digital-services',print:'/print'};
const names = {academy:'IHLink Academy',fabrication:'3D & Fabrication Lab',compute:'IHLink AI & Compute',digital_business:'Digital Business Centre',print:'Print & Branding'};
type Unit=keyof typeof unitPaths;

export function BusinessNavigation({unit}:{unit:Unit}) {
 const {user,profile,signOut}=useAuth();const path=unitPaths[unit];
 return <header className="border-b bg-white"><div className="mx-auto flex max-w-[1300px] flex-wrap items-center justify-between gap-4 px-6 py-4"><Link to={path} className="flex items-center gap-3"><Logo variant="icon" disableLink/><strong>{names[unit]}</strong></Link><nav aria-label="Platform navigation" className="flex flex-wrap items-center gap-5 text-sm font-semibold"><Link to={path}>Home</Link><Link to={path+'/dashboard'}>Dashboard</Link><Link to={path+'#services'}>Services</Link><Link to={path+'#workspace'}>Start a request</Link><Link to={path+'/support'}>Support tickets</Link><Link to={path+'/get-in-touch'}>Get in Touch</Link>{profile?.status==='active'&&profile.role==='super_admin'&&<button onClick={()=>void openPlatformWithHandoff('admin','/admin').catch(()=>window.alert('Unable to open owner administration. Please sign in to the Admin platform.'))}>Owner administration</button>}{user?<button onClick={()=>void signOut()}>Sign out</button>:<Link to={'/signin?next='+encodeURIComponent(path+'/dashboard')}>Sign in</Link>}</nav></div></header>;
}
export function BusinessFooter({unit}:{unit:Unit}) {
 return <footer className="border-t bg-slate-50 px-6 py-8"><div className="mx-auto flex max-w-[1300px] flex-wrap justify-between gap-4 text-sm"><span>{names[unit]} · IHLink Co. Ltd.</span><Link to={unitPaths[unit]+'/get-in-touch'}>Get in Touch</Link><a href="https://ihlink-corporate.vercel.app">IHLink corporate site</a></div></footer>;
}
export function BusinessSupport({unit}:{unit:Unit}) {
 return <><BusinessNavigation unit={unit}/><main className="mx-auto max-w-3xl px-6 py-14"><h1 className="text-3xl font-black">{names[unit]} · Get in Touch</h1><p className="mt-4">Include your request number when asking about a quote, progress, delivery or payment.</p><div className="mt-8 space-y-4"><p><a className="text-royal-600 underline" href="https://wa.me/2348146676278">WhatsApp IHLink</a></p><p><a className="text-royal-600 underline" href="tel:+2348146676278">0814 667 6278</a></p><p><a className="text-royal-600 underline" href="mailto:hassanisahassan12@gmail.com">hassanisahassan12@gmail.com</a></p><Link className="text-royal-600 underline" to={unitPaths[unit]+'/dashboard'}>View my requests</Link></div></main><BusinessFooter unit={unit}/></>;
}
export function BusinessAccessDenied({unit}:{unit:Unit}) {
 return <><BusinessNavigation unit={unit}/><main className="mx-auto max-w-3xl px-6 py-14"><h1 className="text-3xl font-black">Workspace access unavailable</h1><p className="mt-4">This account does not currently have permission to open the {names[unit]} workspace. Contact support to review your service access.</p><Link className="mt-6 inline-block text-royal-600 underline" to={unitPaths[unit]+'/get-in-touch'}>Contact this platform</Link></main><BusinessFooter unit={unit}/></>;
}
