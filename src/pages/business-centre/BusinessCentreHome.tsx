import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ManagedContentSections } from '@/components/ManagedContentSections';
import { ArrowRight, Bot, Box, GraduationCap, Palette, Printer, FileText, ScanLine, Globe2, BadgeCheck, Layers3, BrainCircuit } from 'lucide-react';

const highlights=[
 {title:'Document & Office Services',desc:'Typing, formatting, scanning, photocopying, binding and document preparation.',icon:FileText},
 {title:'Online & Business Support',desc:'Online forms, registrations, business-process assistance and computer services.',icon:Globe2},
 {title:'Print & Brand Production',desc:'Business cards, flyers, posters, banners, signage, apparel and promotional branding.',icon:Printer},
 {title:'Prototyping & Fabrication',desc:'3D printing, CAD support, enclosures, custom parts and prototype workflows.',icon:Layers3},
 {title:'AI & Compute',desc:'AI/ML workloads, data processing, experimentation and managed compute requests.',icon:BrainCircuit},
 {title:'Training & Skills',desc:'Software, cloud, AI, data, networking, cybersecurity, robotics and engineering tracks.',icon:GraduationCap},
];
const digitalServices=['Document typing & formatting','Photocopying & scanning','CV & professional documents','Online applications & forms','Business registration support','Internet & computer services','Lamination & binding','Passport & ID photo preparation','Bulk document processing'];
const units=[
 {title:'IHLink Print & Branding',href:'/print',icon:Printer,desc:'Print, design, brand and promote.',image:'/images/business-centre/print-branding.jpg'},
 {title:'IHLink 3D & Fabrication Lab',href:'/fabrication',icon:Box,desc:'Prototype, create and fabricate.',image:'/images/business-centre/fabrication.jpg'},
 {title:'IHLink AI & Compute',href:'/compute',icon:Bot,desc:'AI, research and future compute services.',image:'/images/business-centre/ai-compute.jpg'},
 {title:'IHLink Academy',href:'/academy',icon:GraduationCap,desc:'Learn practical technology and engineering skills.',image:'/images/business-centre/academy.jpg'},
 {title:'Digital Business Centre',href:'/business-centre/digital-services',icon:Palette,desc:'Documents, registrations and everyday business support.',image:'/images/business-centre/digital-business.jpg'},
];
export function BusinessCentreHome(){
 return <div className="min-h-screen bg-white"><Header product="corporate"/>
 <main>
  <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-sky-50">
   <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
    <div><span className="text-sm font-bold uppercase tracking-widest text-orange-600">IHLink Business & Innovation Centre</span>
    <h1 className="mt-4 text-4xl lg:text-6xl font-extrabold text-ink leading-tight">Create. Print. Learn. Innovate.</h1>
    <p className="mt-6 text-lg text-muted max-w-2xl">One connected centre for practical business services, printing and branding, 3D fabrication, technology training, digital business support and AI compute services.</p>
    <div className="mt-8 flex flex-wrap gap-3"><Link to="/contact" className="px-6 py-3 rounded-xl bg-orange-500 text-white font-bold">Get a Quote</Link><Link to="/business-centre/workspace" className="px-6 py-3 rounded-xl border border-border font-bold">My Business Workspace</Link></div></div>
    <div className="rounded-3xl overflow-hidden shadow-xl bg-slate-100 aspect-[4/3]"><img src="/images/business-centre/centre-hero.jpg" alt="IHLink Business and Innovation Centre services" className="w-full h-full object-cover" loading="eager"/></div>
   </div>
  </section>
  <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16"><div className="max-w-3xl"><p className="text-sm font-bold text-royal-600 uppercase tracking-wider">One ecosystem, many solutions</p><h2 className="mt-2 text-3xl lg:text-4xl font-extrabold">Business, skills and innovation in one connected experience</h2><p className="mt-3 text-muted">Explore each specialist unit. Each specialist unit now uses the shared IHLink account, customer workspace and internal operations workflow; provider-dependent services activate when their external integrations are configured.</p></div>
  <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">{units.map(({title,href,icon:Icon,desc,image})=><Link key={title} to={href} className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm hover:shadow-lg transition-shadow"><div className="aspect-[16/9] bg-slate-100 overflow-hidden"><img src={image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"/></div><div className="p-6"><div className="flex items-start justify-between gap-4"><Icon className="w-8 h-8 text-royal-600"/><ArrowRight className="w-5 h-5 text-muted group-hover:translate-x-1 transition-transform"/></div><h3 className="mt-5 text-xl font-extrabold">{title}</h3><p className="mt-2 text-sm text-muted">{desc}</p></div></Link>)}</div></section>
  <section className="border-y border-border bg-slate-50"><div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16"><p className="text-sm font-bold uppercase tracking-wider text-orange-600">What the centre does</p><h2 className="mt-2 text-3xl font-extrabold">Practical services you can request and track</h2><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{highlights.map(({title,desc,icon:Icon})=><div key={title} className="rounded-2xl border border-border bg-white p-6"><Icon className="h-7 w-7 text-royal-600"/><h3 className="mt-4 text-lg font-extrabold">{title}</h3><p className="mt-2 text-sm text-muted">{desc}</p></div>)}</div><div className="mt-10 rounded-3xl bg-white border border-border p-7"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-bold text-royal-600">Digital Business Centre</p><h3 className="mt-1 text-2xl font-extrabold">Everyday digital and document services</h3></div><Link to="/business-centre/digital-services" className="font-bold text-royal-600">Explore services <ArrowRight className="inline h-4 w-4"/></Link></div><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{digitalServices.map(x=><div key={x} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm font-semibold"><BadgeCheck className="h-4 w-4 text-emerald-600"/>{x}</div>)}</div></div></div></section><section className="bg-slate-50 border-y border-border"><div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 grid md:grid-cols-4 gap-6">{['Individuals','Schools','Businesses','NGOs & Institutions'].map(x=><div key={x} className="rounded-2xl bg-white border border-border p-6"><h3 className="font-extrabold">{x}</h3><p className="mt-2 text-sm text-muted">Access relevant IHLink services through one connected customer relationship.</p></div>)}</div></section>
 <ManagedContentSections pageKey="business_centre"/></main><Footer/></div>
}