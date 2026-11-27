// Current classroom renders, paired for screen sharing.
const classroomShots=[
 ['The classroom','WIDE · locked symmetry','Two desks. Two empty seats.','wide'],
 ['Cassius enters','WIDE · hold the doorway','He enters; attention shifts.','entry'],
 ['Meet the power lead','CLOSE-UP · hold','Let his stillness register.','cassius'],
 ['Everyone notices','MEDIUM · reaction cut','Whispers and glances establish his pull.','students'],
 ['The invitation','MEDIUM · deep staging','Vivienne turns back to Cassius, hand on the empty chair.','turn'],
 ['She turns back','MEDIUM · deep staging','Her look connects to Cassius at the door.','turn'],
 ['Linney looks up','CLOSE-UP · reaction cut','A glance, then back to her book.','linney'],
 ['The put-down','MEDIUM · hold, then pan right','Proposed: “He’s not sitting with you.”','offer'],
 ['He hears it','CLOSE-UP · hold','His expression changes.','cassius'],
 ['The choice','WIDE · actor moves, camera holds','He pauses, then chooses Linney.','choice'],
 ['He sits beside her','WIDE · hold','Chair scrape. Vivienne’s seat stays empty.','seated'],
 ['Her pen stops','INSERT · exact overhead','Writing stops as he sits. Hold the tiny pause.','pen','11A'],
 ['The flip lands','WIDE · hold the consequence','Power Lead Chooses YOU.','seated','12']
];
const shotImage=n=>`assets/classroom-build/S${Number(n)===5?'06':String(n).padStart(2,'0')}.png`;
function classroomSketch(kind){
 const person=(x,y,c,label)=>`<circle cx="${x}" cy="${y}" r="9" fill="#e5c8b5"/><rect x="${x-10}" y="${y+10}" width="20" height="23" rx="4" fill="${c}"/><text x="${x}" y="${y+48}" text-anchor="middle">${label}</text>`;
 const chair=x=>`<rect x="${x-12}" y="79" width="24" height="28" rx="6" fill="none" stroke="#e4a18c" stroke-width="3"/>`;
 let content='';
 if(kind==='pen')return art('pen');
 if(['cassius','linney'].includes(kind))content=person(200,48,kind==='cassius'?'#46454c':'#a9aaae',kind==='cassius'?'Cassius':'Linney');
 else if(kind==='students')content=[100,160,220,280].map((x,i)=>person(x,44,['#bfd6e5','#c8b9db','#c5ddd3','#eee3cc'][i],i<2?'whisper':'look')).join('');
 else if(['offer','turn'].includes(kind))content='<rect x="92" y="112" width="200" height="10" fill="#ccb076"/>'+person(135,55,'#44434a','Vivienne')+chair(240)+(kind==='turn'?'<rect x="320" y="10" width="45" height="70" fill="#677e70"/>'+person(342,24,'#44434a','Cassius'):'')+'<path d="M145 78L228 82" stroke="#e5c8b5" stroke-width="5"/>';
 else content='<rect x="181" y="8" width="38" height="54" fill="#718a79"/><rect x="35" y="112" width="135" height="10" fill="#ccb076"/><rect x="230" y="112" width="135" height="10" fill="#ccb076"/>'+person(65,62,'#44434a','Vivienne')+person(335,62,'#a9aaae','Linney')+chair(140)+(kind==='seated'?person(260,62,'#44434a','Cassius'):chair(260))+(kind==='entry'?person(200,18,'#44434a','Cassius'):kind==='choice'?person(200,62,'#44434a','Cassius'):'');
 return `<svg viewBox="0 0 400 140" role="img" aria-label="${kind} simplified staging"><rect width="400" height="140" fill="#303d38"/><g fill="#eee" font-family="system-ui" font-size="10">${content}</g></svg>`;
}
// Proposed camera and performance directions, indexed by stable production shot ID.
const shotDirections={
 '01':['▣ HOLD','Locked, frontal wide. Keep the aisle centered.','Students chat or read; Linney looks down. Both spare chairs stay empty.'],
 '02':['▣ HOLD','Hold the doorway in the centered wide.','Cassius steps through, pauses, then starts down the aisle.'],
 '03':['▣ HOLD','Locked close-up at eye level.','Cassius pauses and surveys the room with a small eye movement.'],
 '04':['▣ HOLD','Locked medium on the students.','Heads turn toward Cassius; two girls lean together, whisper and giggle.'],
 '05':['▣ HOLD','Hold Vivienne and the empty chair foreground, Cassius in the doorway.','Vivienne turns back to look at Cassius, keeping her hand on the empty chair.'],
 '06':['▣ HOLD','Hold Vivienne foreground and Cassius in the doorway.','She turns back toward him; students glance over and whisper.'],
 '07':['▣ HOLD','Locked close-up on Linney.','She glances toward Cassius, then lowers her eyes to the page.'],
 '08':['→ PAN','Hold for the line, then pan right from Vivienne to Linney.','Vivienne gives Linney a dismissive smile; Linney keeps her eyes down.'],
 '09':['▣ HOLD','Locked close-up. Let his reaction play.','Cassius hears the insult; his eyes shift toward Vivienne and his jaw settles.'],
 '10':['▣ HOLD','Locked symmetrical wide; show both empty chairs.','Cassius stops, looks at Vivienne, then turns toward Linney’s chair.'],
 '11':['▣ HOLD','Hold the wide through the sit.','Cassius pulls out Linney’s adjacent chair and sits behind the desk.'],
 '11A':['↓ OVERHEAD','Locked straight down on the notebook.','Linney writes, stops mid-line, then holds the pen still.'],
 '12':['▣ HOLD','Locked wide; keep the rejected chair visible.','Linney meets his eyes; Vivienne’s smile fades and her hand leaves the chair.']
};
function classroomCard(s,i,direct=false){
 const number=s[4]||String(i+1).padStart(2,'0');const direction=shotDirections[number];
 const caption=direct?`<div class="blocking-row"><b>CAMERA</b><span>${esc(direction[1])}</span></div><div class="blocking-row"><b>ACTORS</b><span>${esc(direction[2])}</span></div>`:`<b>${esc(s[1])}</b><p>${esc(s[2])}</p>`;
 return `<article class="classroom-card"><h3>${number} · ${esc(s[0])}${direct?`<span class="move-badge">${esc(direction[0])}</span>`:''}</h3><img src="${shotImage(number)}" alt="${esc(s[0])}"/><div class="classroom-geometry">${classroomSketch(s[3])}<small>Simplified staging</small></div><div class="classroom-caption">${caption}<a href="classroom-shot-${number}.html">References & full prompt ↗</a></div></article>`
}
let classroomPair=0;
function renderClassroomPair(n){
 classroomPair=Math.max(0,Math.min(6,n));
 for(const id of ['storyboard','direct']){
 const root=$('#'+id);root.classList.add('classroom-slide');
 root.innerHTML=`<div class="classroom-toolbar"><h1>${id==='direct'?'Camera &amp; blocking':'The Empty Chair'} <small>· Wes-inspired test</small></h1><div class="classroom-pairs" aria-label="Shot pairs">${Array.from({length:7},(_,j)=>`<button data-classroom-pair="${j}" class="${j===classroomPair?'active':''}" aria-pressed="${j===classroomPair}">${j<5?`${j*2+1}–${j*2+2}`:j===5?'11–11A':'12'}</button>`).join('')}</div></div><div class="classroom-grid">${classroomShots.map((s,i)=>`<div ${Math.floor(i/2)!==classroomPair?'hidden':''}>${classroomCard(s,i,id==='direct')}</div>`).join('')}</div><div class="classroom-controls"><button data-classroom-prev ${classroomPair===0?'disabled':''}>← Previous shots</button><span>${classroomPair+1} / 7 · Stills above, staging below · camera moves are proposals</span><button data-classroom-next ${classroomPair===6?'disabled':''}>Next shots →</button></div>`;
 root.querySelectorAll('[data-classroom-pair]').forEach(b=>b.onclick=()=>renderClassroomPair(+b.dataset.classroomPair));
 root.querySelector('[data-classroom-prev]').onclick=()=>renderClassroomPair(classroomPair-1);
 root.querySelector('[data-classroom-next]').onclick=()=>renderClassroomPair(classroomPair+1);
 }
}
renderClassroomPair(0);
[['#scene-art',1],['#still-art',5],['#motion-art',5]].forEach(([selector,n])=>{const target=$(selector);target.classList.add('render-stack');target.insertAdjacentHTML('afterbegin',`<img src="${shotImage(n)}" alt="Current Empty Chair rendered reference">`)});

// Reference inputs belong in the lesson itself, above the small teaching sketches.
const referenceSlides=[
 ['Cassius · character sheet','cassius.png','Face · hair · costume',classroomSketch('cassius')],
 ['The empty classroom','room.png','Door · separate desks · light',scene()],
 ['Vivienne · character sheet','vivienne.png','Same house crest as Cassius',classroomSketch('offer')],
 ['Linney · character sheet','linney.png','Linney alone wears plain grey',classroomSketch('linney')],
 ['Background house uniforms','house-uniforms.png','Pastel blue · cream · lilac · teal',classroomSketch('students')],
 ['The composed first frame','S01.png','One empty chair beside each woman',classroomSketch('wide')]
];
function renderReferencePair(pair=0){
 const root=$('#references');root.classList.add('classroom-slide');
 root.innerHTML=`<div class="classroom-toolbar"><h1>Make references <small>· Lock the people and the place</small></h1><div class="classroom-pairs" aria-label="Reference pairs">${['Person + room','Vivienne + Linney','Uniforms + frame'].map((name,i)=>`<button data-reference-pair="${i}" class="${i===pair?'active':''}" aria-pressed="${i===pair}">${name}</button>`).join('')}</div></div><div class="classroom-grid">${referenceSlides.map(([title,file,note,diagram],i)=>`<div ${Math.floor(i/2)!==pair?'hidden':''}><article class="classroom-card"><h3>${esc(title)}</h3><img src="assets/classroom-build/${file}" alt="${esc(title)}"><div class="classroom-geometry">${diagram}<small>Simplified teaching sketch</small></div><div class="classroom-caption"><b>${esc(note)}</b><p>${i===5?'Combine the references to build the shot.':'Reuse this reference when making each shot.'}</p><a href="assets/classroom-build/${file}" target="_blank" rel="noopener">Open full-size reference ↗</a></div></article></div>`).join('')}</div><div class="classroom-controls"><button data-reference-prev ${pair===0?'disabled':''}>← Previous references</button><span>${pair+1} / 3 · <a href="classroom-shot-01.html">First shot: inputs & full prompt ↗</a></span><button data-reference-next ${pair===2?'disabled':''}>Next references →</button></div>`;
 root.querySelectorAll('[data-reference-pair]').forEach(b=>b.onclick=()=>renderReferencePair(+b.dataset.referencePair));
 root.querySelector('[data-reference-prev]').onclick=()=>renderReferencePair(pair-1);
 root.querySelector('[data-reference-next]').onclick=()=>renderReferencePair(pair+1);
}
renderReferencePair();

const sceneIdeas=[
 ['wes','Wes Anderson','Pastel pink, sage and yellow · frontal symmetry · a precise social snub.'],
 ['tarantino','Quentin Tarantino','Bold contrast · confrontational framing · hold for the reaction.'],
 ['villeneuve','Denis Villeneuve','Muted color · imposing space · tension through distance and stillness.'],
 ['kubrick','Stanley Kubrick','Controlled geometry · central perspective · an unsettling sense of order.'],
 ['indie','Indie drama','Natural light · intimate faces · small reactions carry the choice.']
];
function renderIdea(i){const [id,name,note]=sceneIdeas[i];$('#ideas-tabs').innerHTML=sceneIdeas.map((s,n)=>`<button data-idea="${n}" class="${n===i?'active':''}" aria-pressed="${n===i}">${esc(s[1])}</button>`).join('');$('#idea-sheet').innerHTML=`<img src="assets/ideas/${id}.png" alt="The Empty Chair: ${esc(name)} concept storyboard sheet"><figcaption><b>Our scene · ${esc(name)}</b><span>${esc(note)}</span></figcaption>`;$('#idea-note').innerHTML=`<span>Early look tests · before our character references were locked.</span><a href="assets/ideas/${id}.png" target="_blank" rel="noopener">Open full-size sheet ↗</a>`;$('#ideas-tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>renderIdea(+b.dataset.idea))}
renderIdea(0);
