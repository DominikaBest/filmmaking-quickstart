const selectedClips=[
 ['01','Classroom','Opening classroom atmosphere.'],
 ['02','Cassius enters','Full-length select. Cut at about 2.5 seconds in the edit, while Cassius is still at the rear doorway.'],
 ['03','Cassius close-up','His close-up follows the entrance.'],
 ['04','Students react','The room’s reaction establishes his appeal.'],
 ['05','Invitation','Cassius stays in the rear doorway. Vivienne twists back and rests her hand on the empty chair; students turn and whisper. Matches the early S02 cut.']
];
function renderClip(i=0){
 const root=$('#generate');root.querySelector('video')?.pause();
 const [id,title,note]=selectedClips[i];const still=id==='05'?'06':id;
 root.classList.add('clip-slide');root.innerHTML=`<div class="clip-toolbar"><h1>Make clips <small>· MAGI-2 selects</small></h1><div class="clip-tabs" aria-label="Selected clips">${selectedClips.map(([id,t],j)=>`<button data-clip="${j}" class="${j===i?'active':''}" aria-pressed="${j===i}">${id} · ${esc(t)}</button>`).join('')}</div></div><div class="clip-comparison"><figure><figcaption>STILL · ${id} · ${esc(title)}</figcaption><img src="assets/classroom-build/S${still}.png" alt="Shot ${id} input still"></figure><figure><figcaption>VIDEO · TAKE 01 · press play</figcaption><video controls playsinline preload="metadata" poster="assets/classroom-build/S${still}.png" aria-label="Shot ${id} MAGI-2 selected clip"><source src="assets/magi2-selects/S${id}.mp4" type="video/mp4">Your browser cannot play this video. Download it below.</video></figure></div><div class="clip-note"><b>${esc(note)}</b><span>Source take: S${id}_magi2_t01.mp4 · Select: S${id}.mp4 · Full-length files preserved.</span></div><div class="clip-bottom"><button data-prev-clip ${i===0?'disabled':''}>← Previous clip</button><span>5 selects available · storyboard order</span><a href="assets/magi2-selects/S${id}.mp4" download="S${id}.mp4">Download select ↓</a><button data-next-clip ${i===4?'disabled':''}>Next clip →</button></div>`;
 root.querySelectorAll('[data-clip]').forEach(b=>b.onclick=()=>renderClip(+b.dataset.clip));root.querySelector('[data-prev-clip]').onclick=()=>renderClip(i-1);root.querySelector('[data-next-clip]').onclick=()=>renderClip(i+1);
}
renderClip();
// Stop playback whenever the presenter moves to another lesson.
document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>$('#generate video')?.pause()));
window.addEventListener('hashchange',()=>{if(location.hash!=='#generate')$('#generate video')?.pause()});
