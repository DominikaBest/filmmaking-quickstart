// Original user wording is preserved. Current shot 05 uses the merged former S06.
const activePromptIds=['01','02','03','04','05','07','08','09','10','11','11A','12'];
const uploadLists={
 '01':['S01','vivienne','linney','room','house-uniforms'],
 '02':['S02','cassius','vivienne','linney','room','house-uniforms'],
 '03':['S03','cassius','room'],'04':['S04','room','house-uniforms'],
 '05':['S06','vivienne','cassius','room','house-uniforms'],
 '07':['S07','linney','room','house-uniforms'],
 '08':['S08','S08-END','vivienne','linney','cassius','room','house-uniforms'],
 '09':['S09','cassius','room'],
 '10':['S10','cassius','vivienne','linney','room','house-uniforms'],
 '11':['S10','S11','cassius','vivienne','linney','room','house-uniforms'],
 '11A':['S11A','linney','room'],
 '12':['S12','linney','cassius','vivienne','room','house-uniforms']
};
let promptShot='01',promptModel='nexus';
function renderVideoPrompt(){
 const row=VIDEO_PROMPTS.find(r=>r.id===(promptShot==='05'?'06':promptShot));
 const title=promptShot==='05'?'The invitation':row.title;
 const uploads=promptShot==='11'&&promptModel==='magi'?['S10','S11']:promptShot==='08'&&promptModel==='magi'?['S08','S08-END']:uploadLists[promptShot];
 const still=uploads[0];
 const note=promptShot==='05'?'Merged shot 05 uses your former S06 prompt and its turn-back still.':promptShot==='08'?'True pan: the tripod stays in front of Vivienne\u2019s desk and turns right, past Cassius in the door, to land on Linney. S08 is the first frame, S08-END the last. MAGI-2 takes the two frames only.':promptShot==='12'?'Upload order below follows the @Image lines: Linney, Cassius, Vivienne.':promptShot==='11'?'S10 starts the move; S11 is the seated endpoint. Uploads follow your model-specific instructions.':'6 seconds generated · trim the selected clip in the edit.';
 $('#prompts').classList.add('prompt-slide');
 $('#prompts').innerHTML=`<div class="prompt-toolbar"><h1>Video prompts <small>· 6-second clips</small></h1><div class="prompt-shot-tabs" aria-label="Video prompt shots">${activePromptIds.map(id=>`<button data-prompt-shot="${id}" class="${id===promptShot?'active':''}" aria-pressed="${id===promptShot}">${id}</button>`).join('')}</div></div><div class="video-prompt-layout"><div class="video-prompt-inputs"><h2>${promptShot} · ${esc(title)}</h2><img class="prompt-preview" src="assets/classroom-build/${still}.png" alt="Start frame for shot ${promptShot}"><div class="upload-heading">ATTACH IN THIS ORDER</div><div class="prompt-upload-strip">${uploads.map((file,i)=>`<figure><img src="assets/classroom-build/${file}.png" alt="${esc(file)}"><figcaption>${i+1} · ${esc(file)}</figcaption></figure>`).join('')}</div><p class="prompt-note">${esc(note)}</p>${promptShot==='08'?'<a class="endpoint-link" href="classroom-shot-08-END.html">View pan endpoint →</a>':''}</div><div class="video-prompt-copy"><div class="prompt-model-tabs"><button data-model="nexus" class="${promptModel==='nexus'?'active':''}" aria-pressed="${promptModel==='nexus'}">Seedance</button><button data-model="magi" class="${promptModel==='magi'?'active':''}" aria-pressed="${promptModel==='magi'}">MAGI-2</button><button id="copy-video-prompt">Copy prompt</button></div><pre id="video-prompt-text" tabindex="0" aria-label="Full ${promptModel==='nexus'?'Seedance':'MAGI-2'} prompt">${esc(row[promptModel])}</pre><span id="video-copy-status" role="status">Your supplied wording · scroll within the prompt to read it all</span></div></div><div class="prompt-bottom"><span>Dialogue in these prompts: “Don’t look so hopeful. He’s not sitting with you.”</span><a href="assets/video-prompts/original-user-prompts.txt" download>Download all original prompts</a></div>`;
 document.querySelectorAll('[data-prompt-shot]').forEach(b=>b.onclick=()=>{promptShot=b.dataset.promptShot;renderVideoPrompt()});
 document.querySelectorAll('[data-model]').forEach(b=>b.onclick=()=>{promptModel=b.dataset.model;renderVideoPrompt()});
 $('#copy-video-prompt').onclick=async()=>{try{await navigator.clipboard.writeText(row[promptModel]);$('#video-copy-status').textContent='Copied full prompt.'}catch{$('#video-copy-status').textContent='Select the prompt text and copy it.'}};
}
renderVideoPrompt();
