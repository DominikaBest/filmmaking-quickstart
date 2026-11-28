// What the edit actually became: shot order and timings measured from the final render (v13, 39.8 s).
const finalCut=[
 ['S01','The classroom',2.76,'Trimmed to the charity-case line.'],
 ['S04','Students react',2.04,'The whisper-and-giggle beat only.'],
 ['S05','Invitation',5.40,'Take 3: he strides in, looks at her, then at Linney.'],
 ['S07','Linney looks up',3.68,'Her glance, then back down.'],
 ['S08','Put-down + whip',5.48,'Line, then the whip pan lands on Linney.'],
 ['S09','He hears it',1.76,'Just the eye move and the jaw.'],
 ['S10','The choice',1.40,'Cut down to the turn toward her chair.'],
 ['S11A','Her page stops',2.00,'Moved BEFORE he sits: her hand freezes as he approaches.'],
 ['S11','He sits',5.32,'The walk to the chair and the sit.'],
 ['S11B','He smiles, she looks down',5.72,'New two-shot added after the first assembly.'],
 ['S12','The consequence',1.94,'Vivienne’s face, then out.'],
 ['■','Black + music reprise',2.26,'The music comes back over black.']
];
const cutVersions=[
 ['early/v01.mp4','v1','S02–S05 only, native MAGI-2 sound. First assembly with the editing rules applied: S01 dropped as a jump cut, S02 stopped in the doorway.'],
 ['early/v02.mp4','v2','Same cut plus Epidemic Sound effects: room tone, murmur, door, whisper, giggle, chair, pat.'],
 ['early/v03.mp4','v3','Suno music added (Take A, chamber march, 101 BPM). Cuts slid 1–2 frames onto the beat; mix at −14 LUFS.'],
 ['early/v04.mp4','v4','Your notes: cut inside the movement, best 2–3 s per shot. 15.6 s → 11.9 s.'],
 ['early/v05.mp4','v5','S01 back in with Vivienne’s line on its own dialogue track; the music enters after the line, so nothing ducks under it.'],
 ['early/v06.mp4','v6','S01 straight to the close-up: the door shot goes, and the door becomes a sound cue over the cut.'],
 ['1_EmptyChair_v09_clean-rebuild_S01-S05.mp4','v9','Clean rebuild of S01–S05.'],
 ['2_EmptyChair_v10_S07_S08-whip_music-returns.mp4','v10','Adds S07 and the S08 whip; music returns after the whip.'],
 ['3_EmptyChair_v11_S05-take3_S09-S10-S11_S11A-insert.mp4','v11','S05 take 3, S09–S11 and the S11A insert.'],
 ['4_EmptyChair_v12_S01-trim_S03-sped-up_S11B_S12.mp4','v12','S01 trimmed, S03 sped up, S11B and S12 added.'],
 ['EmptyChair_FINAL_v13.mp4','v13 · FINAL','S03 cut entirely, whispers built up, music reprise over black.']
];
function renderFinalCut(v=cutVersions.length-1){
 const root=$('#final-cut');if(!root)return;root.querySelector('video')?.pause();
 const total=finalCut.reduce((a,s)=>a+s[2],0);
 const [file,label,note]=cutVersions[v];
 root.innerHTML=`<div class="heading"><span>WHAT THE EDIT BECAME · v1 → v13</span><h2>The plan above was 3-second beats. <em>The cut found its own rhythm.</em></h2><p>Final cut · ${finalCut.length-1} shots · ${total.toFixed(1)} s · measured from the v13 render.</p></div>
<div class="timeline final-timeline">${finalCut.map(([id,t,d])=>`<div style="flex:${d}" title="${esc(t)}"><span>${id}</span><b>${esc(t)}</b><small>${d.toFixed(1)}s</small></div>`).join('')}</div>
<div class="final-cut-layout"><figure><figcaption>${esc(label)} · ${esc(note)}</figcaption><video controls playsinline preload="metadata" poster="assets/final-cut/poster.jpg"><source src="assets/final-cut/${file}" type="video/mp4"></video><div class="clip-tabs">${cutVersions.map((c,j)=>`<button data-cut-version="${j}" class="${j===v?'active':''}" aria-pressed="${j===v}">${esc(c[1])}</button>`).join('')}</div></figure>
<div class="final-cut-notes"><h3>What changed from the plan</h3><ul><li><b>S02 and S03 came out.</b> S02 repeats S01’s frontal wide (a jump cut), and S05 take 3 shows him walking in anyway. S03 was sped up in v12, then cut in v13.</li><li><b>S11A moved before S11.</b> Her page stops as he comes toward her, not after he sits.</li><li><b>S11B was added</b> after the first assembly, so the jump from the wide lands in a two-shot.</li><li><b>Short beats got shorter:</b> S09 and S10 play under 2 s; the reactions carry them.</li><li><b>Sound did the rest:</b> whispers built under the room, music returns after the whip and reprises over black.</li></ul>
<ol class="final-shotlist">${finalCut.map(([id,t,d,n])=>`<li><b>${id} · ${d.toFixed(1)}s</b> ${esc(n)}</li>`).join('')}</ol></div></div>`;
 root.querySelectorAll('[data-cut-version]').forEach(b=>b.onclick=()=>renderFinalCut(+b.dataset.cutVersion));
}
renderFinalCut();
window.addEventListener('hashchange',()=>{if(location.hash!=='#edit')$('#final-cut video')?.pause()});

// Sound: what the final (v13) Resolve timeline actually uses, track by track. Times in seconds on the 39.8 s cut.
const soundTracks=[
 ['A1','Native MAGI-2 sound','Each shot’s own audio: Vivienne’s two lines, room, movement.',[[0,37.68,'All 11 shots']],null],
 ['A2','Room tone bed','Epidemic: Ambience, Room Tone, Very Quiet, Classroom A. One continuous bed so the cuts don’t jump in level.',[[0,37.68,'Under everything']],'roomtone'],
 ['A3','Murmur + background whispers','Epidemic: Crowds, Walla, Classroom, Young Teenagers. The murmur dies as the door opens; whispers return behind Vivienne.',[[0,3.16,'Murmur','walla'],[5.8,10.2,'Whispers behind her','whispers_bg']],null],
 ['A4','Door + giggle','Epidemic: Doors, Wood, Old, Open, Creak 02 · Laughter, Small, Girls. The door is never shown: it plays over the cut as an off-screen cue.',[[2.76,5.36,'Door creak','door'],[5.6,6.48,'Giggle','giggle']],null],
 ['A5','Foley details','Page turn on the cut · Epidemic: Wood, Friction, Chair, Creak, Squeak 02 as heads turn.',[[2.64,3.6,'Page','page'],[4.6,6.0,'Chair creak','chair']],null],
 ['A6','Music · Suno “Take A”','Chamber march, 101 BPM, G minor. Enters after the charity-case line, drops out for the put-down, returns after the whip, reprises over black.',[[2.76,13.88,'Part 1 · to the put-down','music1'],[17.28,26.44,'Part 2 · after the whip','music2'],[35.56,39.76,'Reprise · over black','music3']],null],
 ['A7','Whisper layers','Epidemic: Crowds, Children, Classroom, Girls Whispering. Close whisper on the entrance; at the end a swell that gets louder (your Resolve note: “more whispers that start getting louder here”).',[[2.76,5.16,'Close whisper','whisper'],[32.72,37.68,'Whisper swell','whisper_swell']],null]
];
function renderSoundFinal(){
 const root=$('#sound-final');if(!root)return;const T=39.76;
 const bar=(a,b,label,file)=>`<button class="sound-seg" style="left:${a/T*100}%;width:${(b-a)/T*100}%" ${file?`data-sound="${file}"`:'disabled'} title="${esc(label)} · ${a.toFixed(1)}–${b.toFixed(1)} s">${esc(label)}</button>`;
 root.innerHTML=`<div class="heading"><span>WHAT WE ACTUALLY USED · FINAL RESOLVE TIMELINE</span><h2>Seven tracks. <em>Each one has a job.</em></h2><p>Read from the v13 timeline in DaVinci Resolve. Click a bar to hear that sound on its own.</p></div>
<div class="sound-map"><div class="sound-ruler">${[0,5,10,15,20,25,30,35].map(t=>`<span style="left:${t/T*100}%">${t}s</span>`).join('')}</div>${soundTracks.map(([id,name,note,segs,file])=>`<div class="sound-row"><div class="sound-label"><b>${id} · ${esc(name)}</b><small>${esc(note)}</small></div><div class="sound-lane">${segs.map(([a,b,l,f])=>bar(a,b,l,f||file)).join('')}</div></div>`).join('')}</div>
<div class="sound-player"><audio id="sound-preview" controls preload="none"></audio><span id="sound-now">Pick a bar to solo a layer · or play the <button data-sound="final_mix">final mix</button></span></div>
<div class="final-cut-notes"><h3>The mix rules we followed</h3><ul><li><b>No music under dialogue.</b> The music enters after “Who let the charity case in?” and drops out before “Don’t look so hopeful…”, so nothing has to duck.</li><li><b>Room tone never stops.</b> AI clips jump about 10 dB from shot to shot; one bed underneath hides the joins.</li><li><b>Sound tells you what the picture doesn’t:</b> the door is heard, not shown.</li><li><b>Effects sit about 8 dB under the music;</b> the whole mix lands at −14 LUFS for social.</li><li><b>Music on its own track</b> (Suno), effects from a licensed library (Epidemic Sound), never baked-in generator music.</li></ul></div>`;
 const au=root.querySelector('#sound-preview');
 root.querySelectorAll('[data-sound]').forEach(b=>b.onclick=()=>{au.src=`assets/final-cut/sound/${b.dataset.sound}.mp3`;au.play();root.querySelector('#sound-now').textContent='Playing: '+(b.title||'final mix');});
}
renderSoundFinal();
window.addEventListener('hashchange',()=>{if(location.hash!=='#sound')$('#sound-preview')?.pause()});
