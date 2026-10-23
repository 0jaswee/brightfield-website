// Shared behaviour: every page reads the same site-config.js file.
(() => {
  const c = window.SITE_CONFIG;
  if (!c) return;
  const $ = s => document.querySelector(s);
  const make = (tag, text, cls) => { const e = document.createElement(tag); if (text != null) e.textContent = text; if (cls) e.className = cls; return e; };
  // Only allow website links, local files, and anchors in configurable URLs.
  function safeUrl(value) { if (!value || typeof value !== 'string') return ''; try { const u = new URL(value, location.href); return ['https:', 'http:'].includes(u.protocol) || (u.protocol === 'file:' && !/^[a-z]+:/i.test(value)) ? value : ''; } catch { return ''; } }
  document.querySelectorAll('[data-text]').forEach(e => {
    const value = e.dataset.text.split('.').reduce((a, k) => a?.[k], c);
    if (typeof value === 'string' || typeof value === 'number') e.textContent = value;
  });
  document.title = `${document.body.dataset.title} | ${c.name}`;
  if (safeUrl(c.faviconUrl)) { const icon = make('link'); icon.rel = 'icon'; icon.href = c.faviconUrl; document.head.append(icon); }
  const pages = [['index.html','Home'],['school.html','School'],['college.html','Higher-study support'],['admissions.html','Admissions'],['about.html','About'],['facilities.html','Facilities'],['gallery.html','School gallery'],['fees.html','Student fee status'],['notices.html','Notices'],['chat.html','Chat with admin'],['contact.html','Contact']];
  const current = location.pathname.split('/').pop() || 'index.html';
  function link(href, text, cls) { const a = make('a', text, cls); a.href = href; if (href === current) a.setAttribute('aria-current','page'); return a; }
  const header = $('#site-header');
  const brand = link('index.html', '', 'brand');
  const mark = make('span', c.initials, 'brand-mark');
  if (safeUrl(c.logoUrl)) { const img = make('img'); img.src = c.logoUrl; img.alt = ''; img.width=64; img.height=64; img.decoding='async'; img.addEventListener('error', () => { mark.textContent = c.initials; }); mark.replaceChildren(img); }
  const names = make('span'); names.append(make('strong', c.name),make('small',c.tagline)); brand.append(mark,names);
  const desktop = make('nav',null,'desktop-nav'); desktop.setAttribute('aria-label','Main navigation');
  pages.slice(0,4).forEach(([url,title]) => desktop.append(link(url,title)));
  const more = make('button','More ▾','nav-more'); more.type='button'; more.setAttribute('aria-controls','more-menu'); more.setAttribute('aria-expanded','false'); desktop.append(more);
  header.append(brand,desktop,link('apply.html','Apply Now ↗','button header-apply'));
  const bottom = $('#bottom-nav');
  [['index.html','Home','⌂'],['school.html','School','▤'],['college.html','Guidance','◇'],['chat.html','Chat','☏']].forEach(([url,title,icon])=> {const a=link(url,'');a.append(make('span',icon,'nav-icon'),make('span',title));bottom.append(a);});
  const bottomMore=make('button');bottomMore.type='button';bottomMore.append(make('span','☰','nav-icon'),make('span','More'));bottomMore.setAttribute('aria-label','More pages');bottomMore.setAttribute('aria-controls','more-menu');bottomMore.setAttribute('aria-expanded','false');bottom.append(bottomMore);
  const dialog=$('#more-menu'); const menuNav=dialog.querySelector('nav');
  pages.forEach(([url,title],i)=> {const a=link(url,'');a.append(make('span',String(i+1).padStart(2,'0'),'menu-number'),make('span',title),make('span','↗','menu-arrow'));menuNav.append(a);});
  function openMenu(){dialog.showModal();document.body.classList.add('locked');[more,bottomMore].forEach(b=>b.setAttribute('aria-expanded','true'));}
  [more,bottomMore].forEach(b=>b.addEventListener('click',openMenu));
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{document.body.classList.remove('locked');[more,bottomMore].forEach(b=>b.setAttribute('aria-expanded','false'));});
  const footer=$('#site-footer');
  const intro=make('div');intro.append(make('strong',c.name),make('p',c.tagline),make('p',c.address));
  const quick=make('div');quick.append(make('h3','Explore'));[['about.html','About us'],['notices.html','Notices'],['contact.html','Contact'],['privacy.html','Privacy']].forEach(([u,t])=>quick.append(link(u,t)));
  const contact=make('div');contact.append(make('h3','Get in touch'),make('p',c.officeHours));
  if(c.phone) { const a=make('a',c.phone);a.href='tel:'+c.phone.replace(/[^+\d]/g,'');contact.append(a); }
  if(c.email) {const a=make('a',c.email);a.href='mailto:'+c.email;contact.append(a);}
  Object.entries(c.socialLinks).forEach(([title,url])=>{if(safeUrl(url))contact.append(link(url,title));});
  const footDetails=make('details',null,'footer-details');
  const footSummary=make('summary','School information & links');
  const footGrid=make('div',null,'footer-grid');footGrid.append(intro,quick,contact);
  footDetails.append(footSummary,footGrid);
  footer.append(footDetails,make('p',`© ${new Date().getFullYear()} ${c.name}.`,'copyright'));
  document.querySelectorAll('[data-demo]').forEach(e=>{e.hidden=!c.demoMode;});
  const hero=$('[data-hero-image]'); if(hero&&safeUrl(c.heroImageUrl)){hero.src=c.heroImageUrl;hero.alt=c.heroImageAlt;}
  function cards(selector,items,render){document.querySelectorAll(selector).forEach(container=>items.forEach(item=>container.append(render(item))));}
  cards('[data-stages]',c.school.stages,item=>{const e=make('article',null,'card');e.append(make('p',item.label,'eyebrow'),make('h3',item.title),make('p',item.description));return e;});
  cards('[data-courses]',c.courses,item=>{const e=make('article',null,'card course');e.append(make('p',item.duration,'eyebrow'),make('h3',item.title),make('p',item.description),make('p',item.eligibility,'small'),link('apply.html','Explore application →','inline-link'));return e;});
  cards('[data-facilities]',c.facilities,item=>{const e=make('article',null,'card');e.append(make('span',item.icon,'feature-number'),make('h3',item.title),make('p',item.description));return e;});
  cards('[data-notices]',c.notices,item=>{const e=make('article',null,'notice-card');e.append(make('p',`${item.category} · ${item.date}`,'eyebrow'),make('h3',item.title),make('p',item.text));if(safeUrl(item.url))e.append(link(item.url,'Read more →','inline-link'));return e;});
  cards('[data-gallery]',c.gallery,item=>{const e=make('figure',null,'gallery-card');e.dataset.category=item.category||'School';const img=make('img');img.loading='lazy';img.decoding='async';img.width=800;img.height=600;img.alt=item.alt;if(safeUrl(item.imageUrl))img.src=item.imageUrl;img.addEventListener('error',()=>{img.hidden=true;});const caption=make('figcaption');caption.append(make('p',`${item.category||'School'} · ${item.date||'Date to be added'}`,'eyebrow'),make('strong',item.caption));if(safeUrl(item.albumUrl))caption.append(link(item.albumUrl,'Open event album ↗','inline-link'));e.append(img,caption);return e;});
  document.querySelectorAll('[data-stat]').forEach(e=>{e.textContent=c[e.dataset.stat]!==''&&c[e.dataset.stat]!=null?String(c[e.dataset.stat]):'To be updated';});
  const filters=$('[data-gallery-filters]');
  if(filters){const galleryCards=document.querySelectorAll('[data-gallery] .gallery-card');['All',...new Set(c.gallery.map(i=>i.category||'School'))].forEach(category=>{const b=make('button',category);b.type='button';b.setAttribute('aria-pressed',String(category==='All'));b.addEventListener('click',()=>{filters.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button===b)));let count=0;galleryCards.forEach(card=>{card.hidden=category!=='All'&&card.dataset.category!==category;if(!card.hidden)count++;});$('[data-gallery-count]').textContent=`${count} photos shown`;});filters.append(b);});$('[data-gallery-count]').textContent=`${c.gallery.length} photos shown`;}
  const chat=$('[data-chat-service]');
  if(chat){const number=String(c.whatsappNumber||'').replace(/\D/g,'');if(number){chat.append(make('p','Open WhatsApp to message the school administration. A reply depends on staff availability.'),link(`https://wa.me/${number}`,'Chat on WhatsApp ↗','button'));}else{chat.append(make('p','Online chat is not connected yet. Please call the school office.'));}}
  const fees=$('[data-fees-service]');if(fees&&safeUrl(c.feesPortalUrl)){fees.append(link(c.feesPortalUrl,'Open private student service ↗','secondary-button'));}
  document.querySelectorAll('[data-phone]').forEach(e=>{if(c.phone){e.textContent=c.phone;e.href='tel:'+c.phone.replace(/[^+\d]/g,'');}else{e.textContent='Phone number to be added';e.removeAttribute('href');}});
  document.querySelectorAll('[data-email]').forEach(e=>{if(c.email){e.textContent=c.email;e.href='mailto:'+c.email;}else{e.textContent='Email address to be added';e.removeAttribute('href');}});
  [['[data-map]',c.mapUrl],['[data-prospectus]',c.prospectusUrl]].forEach(([sel,url])=>document.querySelectorAll(sel).forEach(e=>{if(safeUrl(url)){e.href=url;e.hidden=false;}else e.hidden=true;}));
  const apply=$('#application-service');
  if(apply){if(safeUrl(c.googleFormUrl)){apply.replaceChildren(make('p','The application opens in Google Forms. Your responses are handled by the institution’s connected form service.'),link(c.googleFormUrl,'Open admission form ↗','button'));}else{apply.replaceChildren(make('span','NOT YET CONNECTED','status-tag'),make('h3','Online applications are not open here yet.'),make('p','The institution has not connected its application form. No application or student details can be submitted on this page.'),link('contact.html','Contact admissions →','inline-link'));}}
})();
