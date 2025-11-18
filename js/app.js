// Language data and apply
const LANG = {
  en: { about:"ABOUT ME", contact:"CONTACT ME", portfolio:"PORTFOLIO", job:"Graphic Designer Based in Indonesia", intro:"Hi! I'm a graphic designer...", explore:"EXPLORE NOW", hire:"Hire Me", loading:"Loading Agiat Portfolio..." },
  id: { about:"TENTANG SAYA", contact:"KONTAK SAYA", portfolio:"PORTOFOLIO", job:"Desainer Grafis Berdomisili di Indonesia", intro:"Hai! Saya seorang desainer grafis...", explore:"JELAJAHI SEKARANG", hire:"Hubungi Saya", loading:"Loading Agiat Portfolio..." }
};
function applyLang(lang){
  document.querySelectorAll('[data-lang]').forEach(el=>{const k=el.getAttribute('data-lang'); if(LANG[lang]&&LANG[lang][k]) el.textContent=LANG[lang][k];});
}
// detect or use saved
(function(){ const saved=localStorage.getItem('site_lang'); let lang='id'; if(saved) lang=saved; else { const nav=(navigator.language||'id').toLowerCase(); lang = nav.startsWith('en')?'en':'id'; localStorage.setItem('site_lang', lang);} applyLang(lang);})();
document.addEventListener('click', e=>{ if(e.target && e.target.id==='langEN'){ localStorage.setItem('site_lang','en'); applyLang('en'); } if(e.target && e.target.id==='langID'){ localStorage.setItem('site_lang','id'); applyLang('id'); } });

// loader hide
function hideLoader(){ const loader=document.getElementById('loader'); if(!loader) return; loader.style.transition='opacity .6s ease'; loader.style.opacity='0'; setTimeout(()=>loader.remove(),700); }
window.addEventListener('load', ()=>{ if(window.AOS) AOS.init(); setTimeout(hideLoader, 1400); });

// portfolio loader
function loadPortfolio(category, count=20){
  const gallery=document.getElementById(category+'-gallery')||document.getElementById('portfolio');
  if(!gallery) return;
  gallery.innerHTML='';
  for(let i=1;i<=count;i++){
    const div=document.createElement('div'); div.className='portfolio-item '+category;
    const imgPath = `img/portofolio/${category}/${category}${i}.jpg`;
    // randomly make some videos appear (every 4th)
    if(i % 4 === 0){
      const video = document.createElement('video'); 
      video.src = `img/portofolio/${category}/${category}${i}.mp4`;
      video.muted = true; video.loop = true; video.autoplay = true; video.playsInline = true;
      div.appendChild(video);
    } else {
      const img = document.createElement('img'); img.src = imgPath; img.alt = `${category} ${i}`; img.loading='lazy';
      div.appendChild(img);
    }
    // open lightbox on click (delegate)
    div.addEventListener('click', ()=> openLightbox(category, i));
    gallery.appendChild(div);
  }
}

// lightbox
function openLightbox(category, i){
  const lb = document.getElementById('lightbox');
  lb.innerHTML='';
  const imgPath = `img/portofolio/${category}/${category}${i}.jpg`;
  const vidPath = `img/portofolio/${category}/${category}${i}.mp4`;
  // prefer video if exists (we won't actually have mp4 placeholders, but code supports it)
  fetch(vidPath, {method:'HEAD'}).then(res=>{
    if(res.ok){
      const v = document.createElement('video'); v.src=vidPath; v.controls=true; v.autoplay=true; v.style.maxWidth='92%'; v.style.maxHeight='92%'; lb.appendChild(v);
    } else {
      const img = document.createElement('img'); img.src=imgPath; lb.appendChild(img);
    }
    lb.classList.add('open');
  }).catch(()=>{
    const img = document.createElement('img'); img.src=imgPath; lb.appendChild(img); lb.classList.add('open');
  });
}
function closeLightbox(){ const lb=document.getElementById('lightbox'); lb.classList.remove('open'); lb.innerHTML=''; }
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeLightbox(); });
document.addEventListener('click', e=>{ if(e.target && e.target.id==='lightbox') closeLightbox(); });

// main sample load
document.addEventListener('DOMContentLoaded', ()=>{
  if(document.getElementById('portfolio')){
    const cats=['motion','desain-grafis','3d-designer','fotografer','artworks'];
    cats.forEach(cat=>{ for(let i=1;i<=5;i++){ const d=document.createElement('div'); d.className='portfolio-item '+cat; d.innerHTML=`<img src="img/portofolio/${cat}/${cat}${i}.jpg">`; document.getElementById('portfolio').appendChild(d); } });
  }
});

<script>
document.querySelector(".contact-form form").addEventListener("submit", function(e) {
  e.preventDefault(); // mencegah reload halaman

  const name = this.querySelector("input[placeholder='Full Name']").value;
  const email = this.querySelector("input[placeholder='E-mail']").value;
  const message = this.querySelector("textarea").value;

  // email tujuan kamu
  const targetEmail = "agilaw7@gmail.com";

  // subjek email
  const subject = `New Message From Portfolio Website`;

  // isi body email
  const body = `Full Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;

  // membuka email client
  window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
});
</script>
