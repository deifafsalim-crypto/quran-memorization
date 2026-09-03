import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BookOpen, ChevronLeft, ChevronRight, Download, Headphones, Map, Pause, Play, RotateCcw} from 'lucide-react';
import './tur-styles.css';

type Ayah={n:number; global:number; text:string; meaning:string; lesson:string};
const ayat:Ayah[]=[
{n:20,global:4755,text:'مُتَّكِـِٔينَ عَلَىٰ سُرُرٍ مَّصْفُوفَةٍ ۖ وَزَوَّجْنَـٰهُم بِحُورٍ عِينٍ',meaning:'يتكئ أهل الجنة في راحة وطمأنينة على أسرّة مصطفة، ويكرمهم الله بأزواج مطهرة حسان واسعات الأعين. وهذا من تمام نعيم الجنة الحسي والنفسي.',lesson:'نعيم الجنة كامل، وأعظمه رضا الله ورؤيته؛ فاعملي لها بطاعة ثابتة.'},
{n:21,global:4756,text:'وَٱلَّذِينَ ءَامَنُوا۟ وَٱتَّبَعَتْهُمْ ذُرِّيَّتُهُم بِإِيمَـٰنٍ أَلْحَقْنَا بِهِمْ ذُرِّيَّتَهُمْ وَمَآ أَلَتْنَـٰهُم مِّنْ عَمَلِهِم مِّن شَىْءٍۢ ۚ كُلُّ ٱمْرِئٍۭ بِمَا كَسَبَ رَهِينٌۭ',meaning:'من فضل الله أن يجمع ذرية المؤمنين بهم في الجنة إذا اتبعوهم على الإيمان، من غير أن ينقص من ثواب الآباء شيء. ومع هذا الفضل يبقى كل إنسان مسؤولًا عن كسبه.',lesson:'صلاحك ينفع أسرتك بإذن الله، لكنه لا يُسقط مسؤولية كل فرد عن إيمانه وعمله.'},
{n:22,global:4757,text:'وَأَمْدَدْنَـٰهُم بِفَـٰكِهَةٍۢ وَلَحْمٍۢ مِّمَّا يَشْتَهُونَ',meaning:'يزيد الله أهل الجنة من أنواع الفاكهة واللحم الذي تشتهيه نفوسهم؛ عطاءً متجددًا بلا انقطاع ولا ضرر.',lesson:'من ترك شهوة محرمة لله عوضه الله خيرًا منها.'},
{n:23,global:4758,text:'يَتَنَـٰزَعُونَ فِيهَا كَأْسًۭا لَّا لَغْوٌۭ فِيهَا وَلَا تَأْثِيمٌۭ',meaning:'يتعاطى أهل الجنة كأس الشراب بينهم في أُنس، ولا يترتب عليه كلام باطل ولا ذنب كما يقع في خمر الدنيا.',lesson:'نعيم الآخرة صافٍ من كل أذى، فلا يقاس بخمر الدنيا المحرمة.'},
{n:24,global:4759,text:'۞ وَيَطُوفُ عَلَيْهِمْ غِلْمَانٌۭ لَّهُمْ كَأَنَّهُمْ لُؤْلُؤٌۭ مَّكْنُونٌۭ',meaning:'يطوف على أهل الجنة خدم مهيؤون لخدمتهم، في صفائهم وجمالهم كاللؤلؤ المصون داخل صدفه.',lesson:'تكريم أهل الطاعة في الآخرة يفوق ما تتصوره النفوس.'},
{n:25,global:4760,text:'وَأَقْبَلَ بَعْضُهُمْ عَلَىٰ بَعْضٍۢ يَتَسَآءَلُونَ',meaning:'يتوجه أهل الجنة بعضهم إلى بعض يتحدثون عن أحوالهم في الدنيا وعن الطريق الذي أوصلهم إلى النجاة.',lesson:'صحبة الإيمان تمتد فرحتها إلى الجنة.'},
{n:26,global:4761,text:'قَالُوٓا۟ إِنَّا كُنَّا قَبْلُ فِىٓ أَهْلِنَا مُشْفِقِينَ',meaning:'يقولون: كنا في الدنيا ونحن بين أهلنا خائفين من عذاب الله، حذرين من التقصير، مع رجائنا رحمته.',lesson:'الخوف المحمود يدفع إلى العمل ولا يقود إلى اليأس.'},
{n:27,global:4762,text:'فَمَنَّ ٱللَّهُ عَلَيْنَا وَوَقَىٰنَا عَذَابَ ٱلسَّمُومِ',meaning:'تفضل الله عليهم بالهداية والمغفرة والجنة، وحماهم من عذاب النار النافذ بحرّه. نسبوا النجاة إلى منّة الله لا إلى إعجابهم بأعمالهم.',lesson:'اعملي ولا تغتري؛ فالنجاة بفضل الله ورحمته.'},
{n:28,global:4763,text:'إِنَّا كُنَّا مِن قَبْلُ نَدْعُوهُ ۖ إِنَّهُۥ هُوَ ٱلْبَرُّ ٱلرَّحِيمُ',meaning:'كانوا في الدنيا يعبدون الله ويدعونه وحده. وهو البَرّ كثير الإحسان، الرحيم بعباده، فاستجاب لهم وأنجاهم.',lesson:'الدعاء والتوحيد من أعظم أسباب النجاة، والله لا يضيّع من رجاه.'},
{n:29,global:4764,text:'فَذَكِّرْ فَمَآ أَنتَ بِنِعْمَتِ رَبِّكَ بِكَاهِنٍۢ وَلَا مَجْنُونٍ',meaning:'أمر الله نبيه ﷺ بمواصلة التذكير؛ فهو بنعمة الله رسول صادق، وليس كاهنًا يتلقى من الشياطين ولا مجنونًا كما افترى المكذبون.',lesson:'لا يوقفك كلام الناس عن تبليغ الحق بالحكمة.'},
{n:30,global:4765,text:'أَمْ يَقُولُونَ شَاعِرٌۭ نَّتَرَبَّصُ بِهِۦ رَيْبَ ٱلْمَنُونِ',meaning:'بل يزعمون أنه شاعر وينتظرون أن تنزل به حوادث الدهر أو الموت فيستريحوا من دعوته. وهذا تناقض؛ فقد عرفوا أن القرآن ليس شعرًا.',lesson:'المعاند يبدّل اتهاماته عندما يعجز عن مواجهة الحجة.'},
{n:31,global:4766,text:'قُلْ تَرَبَّصُوا۟ فَإِنِّى مَعَكُم مِّنَ ٱلْمُتَرَبِّصِينَ',meaning:'قل لهم: انتظروا ما تتمنونه، وأنا منتظر حكم الله ونصره وبيان عاقبة الصادق والمكذب.',lesson:'الثقة بوعد الله تمنح المؤمن ثباتًا بلا تهور.'},
{n:32,global:4767,text:'أَمْ تَأْمُرُهُمْ أَحْلَـٰمُهُم بِهَـٰذَآ ۚ أَمْ هُمْ قَوْمٌۭ طَاغُونَ',meaning:'أتأمرهم عقولهم بهذه الأقوال المتناقضة؟ ليست عقولًا راشدة، بل طغيانهم وتجاوزهم الحد هو الذي حملهم على التكذيب.',lesson:'الذكاء بلا تواضع للحق قد يتحول إلى أداة لتبرير الهوى.'},
{n:33,global:4768,text:'أَمْ يَقُولُونَ تَقَوَّلَهُۥ ۚ بَل لَّا يُؤْمِنُونَ',meaning:'أيزعمون أن محمدًا ﷺ اختلق القرآن من عند نفسه؟ الحقيقة أن رفضهم ناشئ عن عدم إرادتهم للإيمان، لا عن وجود دليل على افترائهم.',lesson:'افحصي الدليل بإنصاف ولا تجعلي الرغبة السابقة تحكم النتيجة.'},
{n:34,global:4769,text:'فَلْيَأْتُوا۟ بِحَدِيثٍۢ مِّثْلِهِۦٓ إِن كَانُوا۟ صَـٰدِقِينَ',meaning:'تحداهم الله أن يأتوا بكلام يماثل القرآن في هدايته ونظمه وصدقه إن كانوا صادقين في أنه كلام بشر، فعجزوا.',lesson:'عجز أهل الفصاحة عن معارضته آية من آيات صدق القرآن.'},
{n:35,global:4770,text:'أَمْ خُلِقُوا۟ مِنْ غَيْرِ شَىْءٍ أَمْ هُمُ ٱلْخَـٰلِقُونَ',meaning:'هل وُجدوا بلا خالق، أم خلقوا أنفسهم؟ كلا الاحتمالين باطل؛ فالمعدوم لا يخلق، والإنسان لم يخلق نفسه، فلا بد له من خالق وهو الله.',lesson:'وجود الخلق وانتظامه دليل فطري وعقلي على الخالق.'},
{n:36,global:4771,text:'أَمْ خَلَقُوا۟ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ ۚ بَل لَّا يُوقِنُونَ',meaning:'هل خلقوا السماوات والأرض حتى يستغنوا عن عبادة خالقهما؟ بل هم يعلمون أن الله خلقهما، لكن علمهم لم يتحول إلى يقين وخضوع.',lesson:'المعرفة الحقيقية تثمر عبادة، لا مجرد اعتراف نظري.'},
{n:37,global:4772,text:'أَمْ عِندَهُمْ خَزَآئِنُ رَبِّكَ أَمْ هُمُ ٱلْمُصَۣيْطِرُونَ',meaning:'هل يملكون خزائن رزق الله ورحمته ووحيه فيعطون ويمنعون، أم هم المتسلطون على الخلق؟ لا؛ فالملك والتدبير لله وحده.',lesson:'لا تحسدي أحدًا على فضل؛ خزائن الله واسعة وهو يقسمها بحكمة.'},
{n:38,global:4773,text:'أَمْ لَهُمْ سُلَّمٌۭ يَسْتَمِعُونَ فِيهِ ۖ فَلْيَأْتِ مُسْتَمِعُهُم بِسُلْطَـٰنٍۢ مُّبِينٍ',meaning:'هل لهم طريق يصعدون به إلى السماء فيسمعون الغيب والوحي؟ إن ادعوا ذلك فليأتوا بحجة ظاهرة، ولن يستطيعوا.',lesson:'الدعوى في الغيب لا تُقبل بلا وحي وبرهان.'},
{n:39,global:4774,text:'أَمْ لَهُ ٱلْبَنَـٰتُ وَلَكُمُ ٱلْبَنُونَ',meaning:'أنكر الله تناقضهم حين نسبوا إليه البنات وهم يفضلون لأنفسهم البنين. والله منزه عن الولد كله، والملائكة عباده المكرمون.',lesson:'العقيدة الباطلة يظهر فيها التناقض والافتراء.'},
{n:40,global:4775,text:'أَمْ تَسْـَٔلُهُمْ أَجْرًۭا فَهُم مِّن مَّغْرَمٍۢ مُّثْقَلُونَ',meaning:'هل تطلب منهم أجرًا على دعوتهم حتى أثقلهم الدين فرفضوه؟ لم يطلب النبي ﷺ منهم مالًا؛ إنما جاءهم بما فيه نجاتهم.',lesson:'دعوة الرسول ﷺ خالصة لله، واتباع الوحي ليس عبئًا ماليًا على الناس.'}
];

const mapGroups=[
['٢٠–٢٤','نعيم أهل الجنة: السرر، الأزواج المطهرة، اجتماع الذرية، الطعام والشراب والخدم.'],
['٢٥–٢٨','حديث أهل الجنة عن خوفهم في الدنيا، ومنّة الله عليهم، ونجاتهم بالدعاء والتوحيد.'],
['٢٩–٣١','تثبيت النبي ﷺ والرد على تهم الكهانة والجنون والشعر وانتظار نصر الله.'],
['٣٢–٣٤','كشف طغيان المكذبين وتناقضهم، ثم تحديهم أن يأتوا بمثل القرآن.'],
['٣٥–٣٦','براهين الخلق: لم يخلق الإنسان نفسه ولم يخلق السماوات والأرض؛ فالخالق هو الله.'],
['٣٧–٣٨','ليس للمشركين خزائن الله ولا السيطرة على الخلق ولا طريق إلى سماع الغيب.'],
['٣٩–٤٠','إبطال نسبة البنات إلى الله، وبيان أن الرسول ﷺ لا يطلب أجرًا على الدعوة.']
];

const ar=(n:number)=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[+d]);
const audioUrl=(global:number)=>`https://cdn.islamic.network/quran/audio/128/ar.minshawi/${global}.mp3`;

function App(){
 const [index,setIndex]=useState(0); const [repeat,setRepeat]=useState(5); const [done,setDone]=useState(0);
 const [playing,setPlaying]=useState(false); const [autoNext,setAutoNext]=useState(true); const [tab,setTab]=useState<'memorize'|'map'|'explain'>('memorize');
 const audio=useRef<HTMLAudioElement>(null); const current=ayat[index];
 useEffect(()=>{setDone(0); setPlaying(false); audio.current?.load()},[index]);
 const play=()=>{audio.current?.play();setPlaying(true)}; const pause=()=>{audio.current?.pause();setPlaying(false)};
 const ended=()=>{const next=done+1;if(next<repeat){setDone(next);audio.current!.currentTime=0;audio.current!.play()}else{setDone(repeat);setPlaying(false);if(autoNext&&index<ayat.length-1){setTimeout(()=>{setIndex(x=>x+1);setTimeout(()=>audio.current?.play().then(()=>setPlaying(true)),250)},500)}}};
 const select=(i:number)=>{setIndex(i);setTab('memorize');window.scrollTo({top:0,behavior:'smooth'})};
 return <div className="tur-app">
  <header className="hero"><nav><a href="./index.html">منصة سورة النجم</a><a href="./dhariyat.html">منصة سورة الذاريات</a><a href="#word"><Download size={17}/> ملف Word</a></nav><div className="hero-copy"><span>رحلة حفظ وتدبر</span><h1>سورة الطور</h1><p>الآيات ٢٠–٤٠ · بصوت الشيخ محمد صديق المنشاوي</p></div><div className="progress"><i style={{width:`${((index+1)/ayat.length)*100}%`}}/><span>{ar(index+1)} من {ar(ayat.length)}</span></div></header>
  <main>
   <div className="tabs"><button className={tab==='memorize'?'active':''} onClick={()=>setTab('memorize')}><Headphones/> الحفظ والتلاوة</button><button className={tab==='map'?'active':''} onClick={()=>setTab('map')}><Map/> خريطة الآيات</button><button className={tab==='explain'?'active':''} onClick={()=>setTab('explain')}><BookOpen/> الشرح كاملًا</button></div>
   {tab==='memorize'&&<section className="memorize-grid"><aside className="ayah-list">{ayat.map((a,i)=><button key={a.n} className={i===index?'active':''} onClick={()=>select(i)}><span>{ar(a.n)}</span><small>{a.text.slice(0,34)}…</small></button>)}</aside><article className="player-card">
    <div className="badge">الآية {ar(current.n)}</div><p className="quran-text">﴿ {current.text} ﴾</p>
    <audio ref={audio} src={audioUrl(current.global)} onEnded={ended} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/>
    <div className="player-controls"><button onClick={()=>setIndex(Math.max(0,index-1))} disabled={index===0}><ChevronRight/></button><button className="play" onClick={playing?pause:play}>{playing?<Pause/>:<Play/>}</button><button onClick={()=>setIndex(Math.min(ayat.length-1,index+1))} disabled={index===ayat.length-1}><ChevronLeft/></button></div>
    <div className="repeat-panel"><label><RotateCcw/> عدد تكرار الآية <select value={repeat} onChange={e=>{setRepeat(+e.target.value);setDone(0)}}>{[1,3,5,7,10].map(x=><option key={x} value={x}>{ar(x)} مرات</option>)}</select></label><label className="switch"><input type="checkbox" checked={autoNext} onChange={e=>setAutoNext(e.target.checked)}/><span/> انتقال تلقائي للآية التالية</label></div>
    <div className="repeat-dots">{Array.from({length:repeat},(_,i)=><i key={i} className={i<done?'done':i===done&&playing?'now':''}>{ar(i+1)}</i>)}</div>
    <div className="meaning"><h2>المعنى الميسّر</h2><p>{current.meaning}</p><h3>وقفة للحفظ</h3><p>{current.lesson}</p></div>
   </article></section>}
   {tab==='map'&&<section className="content-card"><div className="section-title"><Map/><div><span>الصورة الكبرى</span><h2>خريطة الآيات ٢٠–٤٠</h2></div></div><div className="map-list">{mapGroups.map((g,i)=><div key={g[0]}><b>{g[0]}</b><i>{ar(i+1)}</i><p>{g[1]}</p></div>)}</div><div className="story"><b>القصة المتسلسلة</b><p>نعيم الجنة واجتماع المؤمنين بأهلهم ← تذكّر خوفهم ودعائهم في الدنيا ← تثبيت الرسول ﷺ أمام اتهامات المكذبين ← تحديهم بالقرآن ← براهين وجود الخالق ← نفي امتلاكهم خزائن الله أو علم الغيب ← إبطال افترائهم وبيان إخلاص الدعوة.</p></div></section>}
   {tab==='explain'&&<section className="content-card"><div className="section-title"><BookOpen/><div><span>آيةً آية</span><h2>الشرح الميسّر</h2></div></div><div className="explain-list">{ayat.map((a,i)=><article key={a.n}><button className="listen-mini" onClick={()=>select(i)}><Play/> استماع وتكرار</button><span>الآية {ar(a.n)}</span><h3>﴿ {a.text} ﴾</h3><p>{a.meaning}</p><em>{a.lesson}</em></article>)}</div></section>}
   <section id="word" className="word-card"><div><span>نسخة للطباعة والمراجعة</span><h2>شرح سورة الطور ٢٠–٤٠</h2><p>ملف Word يضم الخريطة، والشرح آيةً آية، وخطة تكرار للحفظ.</p></div><a href="./%D8%B4%D8%B1%D8%AD%20%D8%B3%D9%88%D8%B1%D8%A9%20%D8%A7%D9%84%D8%B7%D9%88%D8%B1%20%D9%85%D9%86%2020%20%D8%A5%D9%84%D9%89%2040.docx" download><Download/> تنزيل ملف Word</a></section>
  </main><footer>التلاوة: الشيخ محمد صديق المنشاوي · مرتل حفص عن عاصم · مصدر الصوت: Al Quran Cloud</footer>
 </div>
}
createRoot(document.getElementById('root')!).render(<App/>);
