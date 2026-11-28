// MAGI-2 / Seedance clips for The Empty Chair, in storyboard order.
// Each shot lists every take we generated on the way to the select, with why it was redone.
const selectedClips=[
 {id:'01',title:'Classroom',still:'S01',takes:[
   ['S01_magi2_t01.mp4','Take 1','Look approved, but no dialogue: the "doesn’t belong" line from the storyboard was missing.'],
   ['S01_magi2_t02.mp4','Take 2 · SELECT','Added Vivienne’s line, “Who let the charity case in?” She says it facing front, a cold aside.']]},
 {id:'02',title:'Cassius enters',still:'S02',takes:[
   ['S02_magi2_t01.mp4','Take 1 · SELECT','He pushes the doors open and walks down the aisle. Cut at about 2.5 s, while he pauses in the doorway.']]},
 {id:'03',title:'Cassius close-up',still:'S03',takes:[
   ['S03_magi2_t01.mp4','Take 1 · SELECT','First take held: face matches the sheet, shallow focus.']]},
 {id:'04',title:'Students react',still:'S04',takes:[
   ['S04_magi2_t01.mp4','Take 1 · SELECT','Whisper, giggle, heads turn. The room’s reaction establishes his pull.']]},
 {id:'05',title:'Invitation',still:'S06',takes:[
   ['S05_magi2_t01.mp4','Take 1','He just stands in the doorway; it looked stiff.'],
   ['S05_magi2_t02.mp4','Take 2','Rewrote it so he strides in. Better, but he walks too far and never looks at Vivienne when she pats the chair.'],
   ['S05_magi2_t03.mp4','Take 3 · SELECT','He looks at her as she pats the chair, then his eyes slide across to Linney. That look sets up the choice.']]},
 {id:'07',title:'Linney looks up',still:'S07',takes:[
   ['S07_magi2_t01.mp4','Take 1 · SELECT','A glance toward him, then back to the book.']]},
 {id:'08',title:'The put-down (whip pan)',still:'S08',takes:[
   ['S08_seedance_whip_t01.mp4','Seedance whip · SELECT','A slow pan between two frames never matched (doors, desks, where Cassius stood). Switched to a whip pan on Seedance 2.5 so the blur carries the move. 720p.']]},
 {id:'09',title:'He hears it',still:'S09',takes:[
   ['S09_magi2_t01.mp4','Take 1 · SELECT','Prompt moved him from the doorway to mid-aisle to match S05.']]},
 {id:'10',title:'The choice',still:'S10',takes:[
   ['S10_magi2_t01.mp4','Take 1 · SELECT','He looks at Vivienne’s chair, then turns to Linney’s.']]},
 {id:'11',title:'He sits',still:'S11',takes:[
   ['S11_magi2_t01.mp4','Take 1 · SELECT','Frames mode: S10 start, S11 end.']]},
 {id:'11A',title:'Her page stops',still:'S11A',takes:[
   ['S11A_magi2_t01.mp4','Take 1 · SELECT','Planned as a pen insert, but she reads a book in every other shot. Re-made the still as a book insert first.']]},
 {id:'11B',title:'He smiles, she looks down',still:'S11B',takes:[
   ['S11B_magi2_t02.mp4','Take 2 · SELECT','New shot added so the cut lands in a two-shot before the wide. Take 1 painted a blush on her because the prompt said she “colours”; take 2 shows shyness with action instead.']]},
 {id:'12',title:'The consequence',still:'S12',takes:[
   ['S12_magi2_t01.mp4','Take 1 · SELECT','Vivienne glares; Linney looks up and smiles at him, he smiles back.']]}
];
let clipTake={};
function renderClip(i=0){
 const root=$('#generate');root.querySelector('video')?.pause();
 const c=selectedClips[i];const n=selectedClips.length;
 const t=Math.min(clipTake[c.id]??c.takes.length-1,c.takes.length-1);const [file,label,note]=c.takes[t];
 const isSelect=t===c.takes.length-1;
 root.classList.add('clip-slide');root.innerHTML=`<div class="clip-toolbar"><h1>Make clips <small>· selects and the takes behind them</small></h1><div class="clip-tabs" aria-label="Selected clips">${selectedClips.map((s,j)=>`<button data-clip="${j}" class="${j===i?'active':''}" aria-pressed="${j===i}">${s.id}${s.takes.length>1?' ·'+s.takes.length:''}</button>`).join('')}</div></div><div class="clip-comparison"><figure><figcaption>STILL · ${c.id} · ${esc(c.title)}</figcaption><img src="assets/classroom-build/${c.still}.png" alt="Shot ${c.id} input still"></figure><figure><figcaption>VIDEO · ${esc(label)} · press play</figcaption><video controls playsinline preload="metadata" poster="assets/classroom-build/${c.still}.png" aria-label="Shot ${c.id} ${esc(label)}"><source src="assets/magi2-takes/${file}" type="video/mp4">Your browser cannot play this video. Download it below.</video></figure></div><div class="clip-note">${c.takes.length>1?`<div class="clip-tabs" aria-label="Takes for shot ${c.id}">${c.takes.map((k,j)=>`<button data-take="${j}" class="${j===t?'active':''}" aria-pressed="${j===t}">${esc(k[1])}</button>`).join('')}</div>`:''}<b>${esc(note)}</b><span>Take file: ${file}${isSelect?` · Select: S${c.id}.mp4`:' · not the select'}</span></div><div class="clip-bottom"><button data-prev-clip ${i===0?'disabled':''}>← Previous clip</button><span>${n} selects · ${selectedClips.reduce((a,s)=>a+s.takes.length,0)} takes shown · storyboard order</span><a href="assets/${isSelect?'magi2-selects/S'+c.id+'.mp4':'magi2-takes/'+file}" download>Download ↓</a><button data-next-clip ${i===n-1?'disabled':''}>Next clip →</button></div>`;
 root.querySelectorAll('[data-clip]').forEach(b=>b.onclick=()=>renderClip(+b.dataset.clip));
 root.querySelectorAll('[data-take]').forEach(b=>b.onclick=()=>{clipTake[c.id]=+b.dataset.take;renderClip(i)});
 root.querySelector('[data-prev-clip]').onclick=()=>renderClip(i-1);root.querySelector('[data-next-clip]').onclick=()=>renderClip(i+1);
}
renderClip();
// Stop playback whenever the presenter moves to another lesson.
document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>$('#generate video')?.pause()));
window.addEventListener('hashchange',()=>{if(location.hash!=='#generate')$('#generate video')?.pause()});
