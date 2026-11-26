/* =========================================================
   script.js  –  مشترك بين الصفحتين
   1) القلوب الطايرة (الصفحتين)
   2) منطق تسجيل الدخول (صفحة الباسورد بس)
   3) حماية صفحة الكروت (لو حد فتحها من غير باسورد)
   ========================================================= */

// ---------- غيّر الباسورد من هنا ----------
const PASSWORD = "20/8/2003";

// ---------- القلوب الطايرة ----------
(function hearts(){
  const box = document.createElement('div');
  box.id = 'hearts';
  document.body.prepend(box);

  const shapes = ['💗','💖','💕','🩷','♥'];
  const colors = ['#540863','#92487A','#E49BA6','#ff9fb0'];

  function spawn(){
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = shapes[Math.floor(Math.random()*shapes.length)];
    h.style.left = Math.random()*100 + 'vw';
    h.style.fontSize = (14 + Math.random()*30) + 'px';
    h.style.color = colors[Math.floor(Math.random()*colors.length)];
    const dur = 7 + Math.random()*7;
    h.style.animationDuration = dur + 's';
    box.appendChild(h);
    setTimeout(() => h.remove(), dur*1000);
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i=0;i<14;i++) setTimeout(spawn, i*250);
  setInterval(spawn, 600);
})();

// ---------- تنظيف شكل التاريخ (يقبل 20/08/2003 و 20-8-2003 وأرقام عربي) ----------
function normalize(v){
  const ar = '٠١٢٣٤٥٦٧٨٩';
  return v.trim()
    .replace(/[٠-٩]/g, d => ar.indexOf(d))
    .replace(/[-.\s]/g, '/')
    .split('/')
    .map(p => String(parseInt(p, 10)))
    .join('/');
}

// ---------- صفحة الباسورد ----------
const form = document.getElementById('loginForm');
if (form){
  const input = document.getElementById('password');
  const error = document.getElementById('error');
  const card  = document.querySelector('.login-card');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if (normalize(input.value) === normalize(PASSWORD)){
      try { sessionStorage.setItem('unlocked', 'yes'); } catch(_) {}
      window.location.href = 'gift.html';
    } else {
      error.textContent = 'الباسورد غلط يا لولو، جربي تاني 💔';
      card.classList.remove('shake');
      void card.offsetWidth;           // يعيد تشغيل الأنيميشن
      card.classList.add('shake');
      input.select();
    }
  });
}

// ---------- حماية صفحة الكروت ----------
if (document.body.dataset.protected === 'true'){
  let ok = false;
  try { ok = sessionStorage.getItem('unlocked') === 'yes'; } catch(_) { ok = true; }
  if (!ok) window.location.replace('login.html');
}