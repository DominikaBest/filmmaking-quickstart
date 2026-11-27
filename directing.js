// Current classroom renders, paired for screen sharing.
const classroomShots=[
 ['The classroom','WIDE · locked symmetry','Two desks. Two empty seats.','wide'],
 ['Cassius enters','WIDE · hold the doorway','He enters; attention shifts.','entry'],
 ['Meet the power lead','CLOSE-UP · hold','Let his stillness register.','cassius'],
 ['Everyone notices','MEDIUM · reaction cut','Whispers and glances establish his pull.','students'],
 ['The invitation','MEDIUM · locked','Vivienne claims the empty chair.','offer'],
 ['She turns back','MEDIUM · deep staging','Her look connects to Cassius at the door.','turn'],
 ['Linney looks up','CLOSE-UP · reaction cut','A glance, then back to her book.','linney'],
 ['The put-down','MEDIUM · hold, then pan right','Proposed: “He’s not sitting with you.”','offer'],
 ['He hears it','CLOSE-UP · hold','His expression changes.','cassius'],
 ['The choice','WIDE · actor moves, camera holds','He pauses, then chooses Linney.','choice'],
 ['He sits beside her','WIDE · hold','Chair scrape. Vivienne’s seat stays empty.','seated'],
 ['The flip lands','WIDE · hold the consequence','Power Lead Chooses YOU.','seated']
];
const shotImage=n=>`assets/classroom-build/S${String(n).padStart(2,'0')}.png`;
function classroomSketch(kind){
 const person=(x,y,c,label)=>`<circle cx="${x}" cy="${y}" r="9" fill="#e5c8b5"/><rect x="${x-10}" y="${y+10}" width="20" height="23" rx="4" fill="${c}"/><text x="${x}" y="${y+48}" text-anchor="middle">${label}</text>`;
 const chair=x=>`<rect x="${x-12}" y="79" width="24" height="28" rx="6" fill="none" stroke="#e4a18c" stroke-width="3"/>`;
 let content='';
 if(['cassius','linney'].includes(kind))content=person(200,48,kind==='cassius'?'#46454c':'#a9aaae',kind==='cassius'?'Cassius':'Linney');
 else if(kind==='students')content=[100,160,220,280].map((x,i)=>person(x,44,['#bfd6e5','#c8b9db','#c5ddd3','#eee3cc'][i],i<2?'whisper':'look')).join('');
 else if(['offer','turn'].includes(kind))content='<rect x="92" y="112" width="200" height="10" fill="#ccb076"/>'+person(135,55,'#44434a','Vivienne')+chair(240)+(kind==='turn'?'<rect x="320" y="10" width="45" height="70" fill="#677e70"/>'+person(342,24,'#44434a','Cassius'):'')+'<path d="M145 78L228 82" stroke="#e5c8b5" stroke-width="5"/>';
 else content='<rect x="181" y="8" width="38" height="54" fill="#718a79"/><rect x="35" y="112" width="135" height="10" fill="#ccb076"/><rect x="230" y="112" width="135" height="10" fill="#ccb076"/>'+person(65,62,'#44434a','Vivienne')+person(335,62,'#a9aaae','Linney')+chair(140)+(kind==='seated'?person(260,62,'#44434a','Cassius'):chair(260))+(kind==='entry'?person(200,18,'#44434a','Cassius'):kind==='choice'?person(200,62,'#44434a','Cassius'):'');
 return `<svg viewBox="0 0 400 140" role="img" aria-label="${kind} simplified staging"><rect width="400" height="140" fill="#303d38"/><g fill="#eee" font-family="system-ui" font-size="10">${content}</g></svg>`;
}
function classroomCard(s,i){return `<article class="classroom-card"><h3>${String(i+1).padStart(2,'0')} · ${esc(s[0])}</h3><img src="${shotImage(i+1)}" alt="${esc(s[0])}"/><div class="classroom-geometry">${classroomSketch(s[3])}<small>Simplified staging</small></div><div class="classroom-caption"><b>${esc(s[1])}</b><p>${esc(s[2])}</p><a href="classroom-shot-${String(i+1).padStart(2,'0')}.html">References & full prompt ↗</a></div></article>`}
let classroomPair=0;
function renderClassroomPair(n){
 classroomPair=Math.max(0,Math.min(5,n));
 for(const id of ['storyboard','direct']){
 const root=$('#'+id);root.classList.add('classroom-slide');
 root.innerHTML=`<div class="classroom-toolbar"><h1>${id==='direct'?'Direct the shots':'The Empty Chair'} <small>· Wes-inspired test</small></h1><div class="classroom-pairs" aria-label="Shot pairs">${Array.from({length:6},(_,j)=>`<button data-classroom-pair="${j}" class="${j===classroomPair?'active':''}" aria-pressed="${j===classroomPair}">${j*2+1}–${j*2+2}</button>`).join('')}</div></div><div class="classroom-grid">${classroomShots.map((s,i)=>`<div ${Math.floor(i/2)!==classroomPair?'hidden':''}>${classroomCard(s,i)}</div>`).join('')}</div><div class="classroom-controls"><button data-classroom-prev ${classroomPair===0?'disabled':''}>← Previous shots</button><span>${classroomPair+1} / 6 · Stills above, staging below · camera moves are proposals</span><button data-classroom-next ${classroomPair===5?'disabled':''}>Next shots →</button></div>`;
 root.querySelectorAll('[data-classroom-pair]').forEach(b=>b.onclick=()=>renderClassroomPair(+b.dataset.classroomPair));
 root.querySelector('[data-classroom-prev]').onclick=()=>renderClassroomPair(classroomPair-1);
 root.querySelector('[data-classroom-next]').onclick=()=>renderClassroomPair(classroomPair+1);
 }
}
renderClassroomPair(0);
[['#scene-art',1],['#still-art',5],['#motion-art',5]].forEach(([selector,n])=>{const target=$(selector);target.classList.add('render-stack');target.insertAdjacentHTML('afterbegin',`<img src="${shotImage(n)}" alt="Current Empty Chair rendered reference">`)});
