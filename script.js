const saleHeroCopy = { sv:'AUTA.SE ÄR TILL SALU', en:'AUTA.SE IS FOR SALE', pl:'AUTA.SE JEST NA SPRZEDAŻ' };
const copy = {
  sv: { status:'DOMÄN TILL SALU', eyebrow:'FYRA BOKSTÄVER. OÄNDLIG POTENTIAL.', heroText:'Kort. Internationellt. Omedelbart. Ett namn byggt för rörelse — och för nästa stora idé inom bilvärlden.', contact:'GÖR ETT FÖRSTA DRAG', scroll:'UPPTÄCK VÄRDET', opportunity:'MÖJLIGHETEN', statement:'Vissa namn behöver<br>ingen <i>förklaring.</i>', statementText:'AUTA betyder bilar på polska och känns hemma långt utanför en enda marknad. Minnesvärt, tydligt och gjort för att växa.', letters:'BOKSTÄVER', word:'STARKT ORD', directions:'MÖJLIGA RIKTNINGAR', next:'NÄSTA KAPITEL', ready:'Redo att sätta<br>namnet i <i>rörelse?</i>', sale:'DOMÄN TILLGÄNGLIG FÖR FÖRVÄRV' },
  en: { status:'DOMAIN FOR SALE', eyebrow:'FOUR LETTERS. LIMITLESS POTENTIAL.', heroText:'Short. International. Instant. A name built for motion — and for the next big idea in automotive.', contact:'MAKE THE FIRST MOVE', scroll:'DISCOVER THE VALUE', opportunity:'THE OPPORTUNITY', statement:'Some names need<br>no <i>explanation.</i>', statementText:'AUTA means cars in Polish and feels at home far beyond a single market. Memorable, clear and ready to grow.', letters:'LETTERS', word:'POWERFUL WORD', directions:'POSSIBLE DIRECTIONS', next:'THE NEXT CHAPTER', ready:'Ready to put the<br>name in <i>motion?</i>', sale:'DOMAIN AVAILABLE FOR ACQUISITION' },
  pl: { status:'DOMENA NA SPRZEDAŻ', eyebrow:'CZTERY LITERY. NIESKOŃCZONY POTENCJAŁ.', heroText:'Krótko. Międzynarodowo. Natychmiastowo. Nazwa stworzona dla ruchu — i kolejnego wielkiego pomysłu w motoryzacji.', contact:'ZRÓB PIERWSZY RUCH', scroll:'ODKRYJ WARTOŚĆ', opportunity:'MOŻLIWOŚĆ', statement:'Niektórych nazw<br>nie trzeba <i>wyjaśniać.</i>', statementText:'AUTA to słowo, które mówi samo za siebie, a brzmi dobrze daleko poza jednym rynkiem. Zapamiętywalne, jasne i gotowe do rozwoju.', letters:'LITERY', word:'MOCNE SŁOWO', directions:'MOŻLIWE KIERUNKI', next:'NASTĘPNY ROZDZIAŁ', ready:'Gotowi wprawić tę<br>nazwę w <i>ruch?</i>', sale:'DOMENA DOSTĘPNA DO NABYCIA' }
};

function setLanguage(lang) {
  const t = copy[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t[el.dataset.i18n]);
  document.querySelectorAll('[data-i18n-html]').forEach(el => el.innerHTML = t[el.dataset.i18nHtml]);
  document.querySelector('[data-sale-hero]').textContent = saleHeroCopy[lang];
  document.querySelectorAll('.lang').forEach(btn => {
    const on = btn.dataset.lang === lang;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-pressed', String(on));
  });
  try { localStorage.setItem('auta-lang', lang); } catch (_) {}
}

document.querySelectorAll('.lang').forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));
document.getElementById('year').textContent = new Date().getFullYear();
let saved = 'sv';
try { saved = localStorage.getItem('auta-lang') || 'sv'; } catch (_) {}
setLanguage(copy[saved] ? saved : 'sv');

requestAnimationFrame(() => document.body.classList.add('loaded'));

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  const stage = document.querySelector('.car-stage');
  addEventListener('scroll', () => {
    const y = Math.min(scrollY * .08, 55);
    stage.style.transform = `translate3d(${y}px,0,0)`;
  }, { passive:true });
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.035}px,${(e.clientY-r.top-r.height/2)*.08}px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
}
