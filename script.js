/* Bytrise DigiTech — shared site script */
const $=s=>document.querySelector(s);
/* theme toggle (preference saved in localStorage) */
(()=>{const r=document.documentElement,b=$('#tg');if(!b)return;const set=t=>{b.setAttribute('aria-pressed',t==='light');b.setAttribute('aria-label',t==='light'?'Switch to dark mode':'Switch to light mode')};set(r.dataset.theme==='light'?'light':'dark');
b.onclick=()=>{const t=r.dataset.theme==='light'?'dark':'light';r.classList.add('tt');r.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}set(t);setTimeout(()=>r.classList.remove('tt'),450)}})();
/* testimonials carousel + portfolio filter */
(()=>{const c=$('#car');if(c){$('#nx').onclick=()=>c.scrollBy({left:c.clientWidth*.8,behavior:'smooth'});$('#pv').onclick=()=>c.scrollBy({left:-c.clientWidth*.8,behavior:'smooth'})}
const f=$('#flt');if(f)f.onclick=e=>{const b=e.target.closest('button');if(!b)return;document.querySelectorAll('.fb').forEach(x=>x.setAttribute('aria-pressed',x===b));document.querySelectorAll('#pj .pc').forEach(c=>c.hidden=!(b.dataset.f=='all'||c.dataset.c.split(' ').includes(b.dataset.f)))}})();
/* ===== BEHAVIOUR ===== */
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
setTimeout(()=>$('#ld').classList.add('h'),rm?100:1300);
const hd=$('#hd');addEventListener('scroll',()=>hd.classList.toggle('s',scrollY>30),{passive:true});
const bg=$('#bg'),mb=$('#mb');const tg=o=>{mb.classList.toggle('o',o);bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Close menu':'Open menu')};
bg.onclick=()=>tg(!mb.classList.contains('o'));mb.querySelectorAll('a').forEach(a=>a.onclick=()=>tg(false));addEventListener('keydown',e=>e.key==='Escape'&&tg(false));
$('#fq')&&$('#fq').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);$('#'+b.getAttribute('aria-controls')).classList.toggle('o',!o)});
const count=el=>{const n=+el.dataset.n,s=el.dataset.s??'+',d=+(el.dataset.d||0),f=v=>v.toFixed(d)+s;if(rm){el.textContent=f(n);return}const t0=performance.now();(function t(x){const p=Math.min((x-t0)/1500,1);el.textContent=f(n*(1-Math.pow(1-p,3)));p<1&&requestAnimationFrame(t)})(t0)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');const c=e.target.querySelector('[data-n]');c&&count(c);io.unobserve(e.target)}),{threshold:.15});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
const fm=$('#fm');if(fm){const sb=$('#sb'),ms=$('#ok'),v=id=>$(id).value.trim();
const W3F={url:'https://api.web3forms.com/submit',key:'b899c7c4-b241-494a-8787-294829906772'};
const phoneOk=x=>{const d=x.replace(/\D/g,'');if(!/^[+\d\s()-]+$/.test(x))return false;if(/^\+(?!91)/.test(x.trim()))return d.length>=8&&d.length<=15;const n=d.length===12&&d.startsWith('91')?d.slice(2):d.length===11&&d[0]==='0'?d.slice(1):d;return /^[6-9]\d{9}$/.test(n)};
const RULES=[['#nm',x=>x.length>1,'Please enter your full name'],['#em',x=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x),'Please enter a valid email address'],['#ph',phoneOk,'Please enter a valid mobile number'],['#sv',x=>!!x,'Please select a service'],['#pd',x=>x.length>4,'Please tell us about your project'],['#cs',()=>$('#cs').checked,'Please accept to continue']];
let busy=false;
fm.addEventListener('submit',async e=>{e.preventDefault();if(busy)return;
let ok=true,first=null;RULES.forEach(([s,f,m])=>{const i=$(s),g=f(i.value.trim());i.setAttribute('aria-invalid',!g);i.closest('div').querySelector('.err').textContent=g?'':m;if(!g){ok=false;first=first||i}});
ms.className='note';ms.textContent='';if(!ok){first.focus();return}
if(v('#co')){ms.textContent='Thank you! Your enquiry has been received. Our team will contact you shortly.';fm.reset();return} /* honeypot: bots only */
busy=true;sb.disabled=true;sb.textContent='Sending...';
try{const r=await fetch(W3F.url,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:W3F.key,subject:'New Website Enquiry — Bytrise DigiTech',from_name:'Bytrise DigiTech Website',enquiry:'NEW WEBSITE ENQUIRY',name:v('#nm'),company:v('#bn'),email:v('#em'),phone:v('#ph'),service:v('#sv'),budget:v('#bd'),message:v('#pd'),consent:'Agreed to be contacted',website:'https://bytrisedigitech.in/'})});
const d=await r.json().catch(()=>({}));if(!r.ok||!d.success)throw new Error(d.message||r.status);
ms.className='note good';ms.textContent='Thank you! Your enquiry has been received. Our team will contact you shortly.';fm.reset()}
catch(err){console.warn('Enquiry not sent',err);ms.innerHTML='Something went wrong. Please try again or contact us directly: <a href="tel:+919462933109" style="color:var(--y)">+91 9462933109</a> · <a href="mailto:bytrisedigitech@gmail.com" style="color:var(--y)">bytrisedigitech@gmail.com</a>'}
finally{busy=false;sb.disabled=false;sb.textContent='Send Project Enquiry'}});
}

/* tel: and mailto: with fallback when the browser or in-app viewer blocks them */
(()=>{const mobile=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||matchMedia('(pointer:coarse)').matches;
const toast=m=>{let t=document.getElementById('tt');if(!t){t=document.createElement('div');t.id='tt';t.setAttribute('role','status');document.body.appendChild(t)}t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),5000)};
const copy=(s,m)=>(navigator.clipboard?navigator.clipboard.writeText(s):Promise.reject()).then(()=>toast(m+' copied: '+s),()=>toast(s));
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="tel:"],a[href^="mailto:"]');if(!a)return;const h=a.getAttribute('href'),mail=h.startsWith('mailto:'),val=mail?h.slice(7).split('?')[0]:'+91 9462933109';
if(!mobile){e.preventDefault();if(mail)window.open('https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(val),'_blank','noopener');else copy(val,'Number');return}
/* phones: let the app open; if the page stays in front, the link was blocked, so show the details instead */
let opened=false;const f=()=>{opened=true};addEventListener('blur',f,{once:true});document.addEventListener('visibilitychange',f,{once:true});
setTimeout(()=>{removeEventListener('blur',f);if(!opened)copy(val,mail?'Email':'Number')},900)});})();

/* ===== COOL LAYER: behaviour ===== */
(()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const pg=document.getElementById('pg');
addEventListener('scroll',()=>{const h=document.documentElement;pg.style.transform='scaleX('+(scrollY/(h.scrollHeight-innerHeight||1))+')'},{passive:true});
document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.c');if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')},{passive:true});
const card=document.querySelector('.vis .card'),vis=document.querySelector('.vis');
if(card&&matchMedia('(hover:hover)').matches){vis.addEventListener('pointermove',e=>{const r=vis.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(800px) rotateY('+x*14+'deg) rotateX('+-y*14+'deg)'});vis.addEventListener('pointerleave',()=>card.style.transform='')}
})();
