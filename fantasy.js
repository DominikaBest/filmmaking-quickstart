const ufExamples=[
 {trope:'Popular lead / overlooked outsider',uf:'The hottest guy in the room chooses you',before:'He enters. Heads turn; people clear seats for him.',after:'He sits beside the girl they excluded.',proof:'Wide: show both seats. Close: her pencil stops.',kind:'chair'},
 {trope:'Enemies to lovers',uf:'Even your rival chooses your wellbeing',before:'He could win by exposing her injury.',after:'He lowers his weapon and calls for help.',proof:'Insert: the weapon lowers. Reaction: she realizes why.',kind:'rival'},
 {trope:'Fake dating',uf:'The affection becomes real',before:'They hold hands for the watching crowd.',after:'The crowd leaves. Neither lets go.',proof:'Shared frame → witnesses exit → hold on the joined hands.',kind:'hands'},
 {trope:'Grumpy / sunshine',uf:'The person who shuts everyone out makes room for you',before:'He turns every visitor away.',after:'He sees her and pulls out the second cup.',proof:'Repeat the doorway framing. Change his response.',kind:'cup'},
 {trope:'Forced proximity',uf:'Someone notices what you need without being asked',before:'She shivers but insists she is fine.',after:'He moves the heater closer and gives her space.',proof:'Show the shiver, his noticing, then her shoulders relaxing.',kind:'warmth'},
 {trope:'Second-chance romance',uf:'This time, you are worth showing up for',before:'She prepares for another empty seat.',after:'He arrives before she asks and stays.',proof:'Establish the empty place. Hold on her registering him.',kind:'arrival'},
 {trope:'Forbidden love',uf:'You are worth choosing despite the consequences',before:'Their families stand on opposite sides.',after:'He crosses the room and takes her offered hand.',proof:'Wide: the divide. Movement: the crossing. Reaction: her choice.',kind:'cross'},
 {trope:'Found family',uf:'You belong without having to earn your place',before:'She starts to leave the crowded table.',after:'Someone shifts over and sets a place for her.',proof:'An opened gap, a plate placed, her bag lowered.',kind:'table'}
];
function ufPanel(kind,after){const bg=after?'#344a42':'#30343b',actor=after?'#dfaf6b':'#a5aea6';let art='';
if(kind==='chair'||kind==='arrival'){art=person(90,135,1.1,'#7c9e91')+`<rect x="175" y="85" width="55" height="65" rx="16" fill="#b36553"/>`+(after?person(202,135,1.1,actor):'')+'<path d="M45 151H260" stroke="#b49a73" stroke-width="12"/>';}
if(kind==='hands'){art=person(90,135,1.2,'#7c9e91')+person(218,135,1.2,actor)+'<path d="M119 133Q154 160 186 133" stroke="#d5b18e" stroke-width="11" fill="none"/>'+(after?'':'<g fill="#777f83"><circle cx="145" cy="36" r="11"/><circle cx="173" cy="36" r="11"/></g>');}
if(kind==='cup'){art=person(85,140,1.2,'#7c9e91')+`<path d="M30 155H280" stroke="#b49a73" stroke-width="12"/><rect x="160" y="118" width="27" height="30" rx="5" fill="#e4c8a1"/>`+(after?'<rect x="220" y="118" width="27" height="30" rx="5" fill="#e4c8a1"/>':'<path d="m220 115 30 30m0-30-30 30" stroke="#a97568" stroke-width="3"/>');}
if(kind==='rival'){art=person(80,140,1.2,'#7c9e91')+person(230,140,1.2,actor)+`<path d="${after?'M195 127 160 172':'M195 120 130 70'}" stroke="#e0ded2" stroke-width="5"/><circle cx="74" cy="145" r="8" fill="#b36553"/>`;}
if(kind==='warmth'){art=person(90,135,1.2,'#7c9e91')+person(245,135,1.2,actor)+`<rect x="${after?139:270}" y="130" width="25" height="38" fill="#dfaf6b"/><path d="M65 45Q59 30 65 18M80 45Q74 30 80 18" stroke="${after?'#dfaf6b':'#90aabb'}" fill="none" stroke-width="2"/>`;}
if(kind==='cross'){art='<path d="M160 20V180" stroke="#8e8d85" stroke-width="2" stroke-dasharray="5 5"/>'+person(80,140,1.2,'#7c9e91')+person(after?145:250,140,1.2,actor)+(after?'<path d="M200 65H140m10-10-10 10 10 10" stroke="#dfaf6b" fill="none" stroke-width="3"/>':'');}
if(kind==='table'){art=person(70,135,1.1,'#7c9e91')+person(245,135,1.1,actor)+'<path d="M25 155H295" stroke="#b49a73" stroke-width="18"/>'+(after?'<ellipse cx="160" cy="151" rx="25" ry="8" fill="#f1eadb"/>':'<path d="M155 80V115m-8-8 8 8 8-8" stroke="#9ba8a2" stroke-width="3" fill="none"/>');}
return `<svg viewBox="0 0 320 200" role="img" aria-label="${after?'Payoff':'Setup'} diagram"><rect width="320" height="200" fill="${bg}"/>${art}</svg>`}
$('#uf-chair-art').innerHTML=scene(['#a99d87','#bd715d','#c9ac75','#506d60']);
$('#uf-cards').innerHTML=ufExamples.map((x,i)=>`<article class="uf-card"><p class="eyebrow">${String(i+1).padStart(2,'0')} · TROPE: ${esc(x.trope)}</p><h2>${esc(x.uf)}</h2><div class="uf-pair"><figure>${ufPanel(x.kind,false)}<figcaption><span>SETUP</span>${esc(x.before)}</figcaption></figure><figure>${ufPanel(x.kind,true)}<figcaption><span>PAYOFF</span>${esc(x.after)}</figcaption></figure></div><p class="uf-camera">SHOW IT · ${esc(x.proof)}</p></article>`).join('');

// The reversal needs a visible desirability setup before its payoff.
const earnedBeats=[
 ['He enters','Conversation falters. Several heads turn.','Establish that the room notices him.'],
 ['Attention is offered','One person straightens up; another clears a seat.','Show that his attention is coveted.'],
 ['Vivienne expects him','She confidently offers the chair beside her.','Give us the expected choice.'],
 ['He hears the insult','Vivienne mocks Linney. He registers it; Linney keeps writing.','Connect his decision to what he heard.'],
 ['He chooses Linney','He passes the offered chair and sits beside her.','The most sought-after person chooses the outsider.'],
 ['The choice lands','Linney’s pencil stops. Vivienne’s confidence fades.','Let both women register what changed.']
];
const entryArt=`<rect width="400" height="225" fill="#303f39"/><rect x="145" y="15" width="110" height="190" fill="#819080"/>${person(200,170,1.6,'#c29d51')}<path d="M60 85H125m-12-10 12 10-12 10M340 85H275m12-10-12 10 12 10" stroke="#e9be86" stroke-width="4" fill="none"/>`;
const attentionArt=`<rect width="400" height="225" fill="#303f39"/>${person(65,170,1.4,'#7c9e91')}<rect x="150" y="100" width="65" height="85" rx="18" fill="#b36553"/><rect x="270" y="100" width="65" height="85" rx="18" fill="#b36553"/><path d="M95 135H160M245 80l30-25" stroke="#dfaf6b" stroke-width="9"/><text x="240" y="40" fill="#f5f1e8" font-size="12" font-family="sans-serif" text-anchor="middle">A PLACE FOR HIM</text>`;
const earnedArt=[entryArt,attentionArt,beatArt[2],beatArt[1],beatArt[3],beatArt[4]];
$('#beat-grid').innerHTML=earnedBeats.map(([title,action,why],i)=>`<article class="beat"><svg viewBox="0 0 400 225" role="img" aria-label="${esc(title)} teaching diagram">${earnedArt[i]}</svg><h3>${i+1} · ${esc(title)}</h3><p>${esc(action)}</p><small>${esc(why)}</small></article>`).join('');
const setup=document.createElement('div');setup.className='desirability-note';setup.innerHTML='<b>FIRST, ESTABLISH HIS DESIRABILITY.</b><p>A handsome face isn’t enough. The room’s response tells us what his attention is worth.</p>';$('#beat-grid').before(setup);
// Keep the UF teaching notes visible on their own presentation tab.
openTeachingNotes('#fantasy','uf-notes','10 · UF teaching notes','The promise behind the trope.');
showTab(location.hash.slice(1));
