// Counters
function animateCounters(){
  document.querySelectorAll('.counter').forEach(el=>{
    const target = +el.dataset.target;
    const step = Math.max(1, Math.floor(target/120));
    let n=0;
    const tick = ()=>{
      n += step;
      if(n>=target){ el.textContent = target.toLocaleString(); }
      else { el.textContent = n.toLocaleString(); requestAnimationFrame(tick); }
    };
    tick();
  });
}

// Scroll reveal
function setupReveal(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); obs.unobserve(e.target);} });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}

// Copy wallets
function copy(id){
  const el = document.getElementById(id);
  navigator.clipboard.writeText(el.textContent.trim()).then(()=>alert('Copied!'));
}

// Leaderboard mock data
const leaderboard = [
  {user:'Ana R.', city:'Santiago', impact:5, ecoins:598},
  {user:'Carlos T.', city:'Santo Domingo', impact:4, ecoins:441},
  {user:'María G.', city:'La Vega', impact:4, ecoins:392},
  {user:'Eliel P.', city:'Puerto Plata', impact:3, ecoins:276},
  {user:'Julia M.', city:'San Cristóbal', impact:3, ecoins:230}
];
function renderLeaderboard(){
  const tbody = document.getElementById('lb-body');
  leaderboard.forEach((r,i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i+1}</td><td>${r.user}</td><td>${r.city}</td><td>${'★'.repeat(r.impact)}</td><td>${r.ecoins}</td>`;
    tbody.appendChild(tr);
  });
}

// Calculator
function calcImpact(){
  const kg = +document.getElementById('kg').value||0;
  const trees = +document.getElementById('trees').value||0;
  const hours = +document.getElementById('hours').value||0;
  // Simple model: weights can be tuned later
  const co2 = kg*1.2 + trees*21 + hours*0.8; // kg CO2 eq saved
  const ecoins = Math.round(kg*1 + trees*8 + hours*3);
  document.getElementById('calc-result').innerHTML = `Estimated CO₂ saved: <strong>${co2.toFixed(1)} kg</strong> · Potential reward: <strong>${ecoins} E-COINS</strong>`;
}

// Map
function initMap(){
  const el = document.getElementById('mapview');
  if(!window.L){ el.textContent = 'Map will appear when online (Leaflet CDN).'; return; }
  const m = L.map(el).setView([18.4855, -69.8734], 7); // Dominican Republic
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OSM' }).addTo(m);
  const sites = [
    {name:'Santo Domingo', lat:18.4861, lng:-69.9312},
    {name:'Santiago', lat:19.4517, lng:-70.6970},
    {name:'Puerto Plata', lat:19.7808, lng:-70.6871}
  ];
  sites.forEach(s=> L.marker([s.lat,s.lng]).addTo(m).bindPopup(`${s.name}: community actions running`));
}

document.addEventListener('DOMContentLoaded',()=>{
  animateCounters();
  setupReveal();
  renderLeaderboard();
  calcImpact();
  initMap();
});
