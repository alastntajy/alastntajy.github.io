const articles = [
  {id:1,category:"التقنية",date:"2026-10-30",title:"ما هو الذكاء الاصطناعي؟ مدخل مبسّط لفهم التقنية",summary:"تعرّف على مفهوم الذكاء الاصطناعي، وكيف تتعلم الأنظمة من البيانات، وأبرز استخداماته في حياتنا.",icon:"⌘",style:"tech",body:["الذكاء الاصطناعي هو مجال من مجالات علوم الحاسوب يهتم ببناء أنظمة تستطيع تنفيذ مهام تتطلب عادةً قدرات بشرية مثل فهم اللغة، والتعرّف على الأنماط، والتنبؤ، وحل المشكلات.","تعتمد كثير من تطبيقات الذكاء الاصطناعي الحديثة على البيانات والخوارزميات. وكلما كانت البيانات مناسبة ومنظمة، أمكن للنظام اكتشاف أنماط تساعده على تقديم نتائج مفيدة.","يُستخدم الذكاء الاصطناعي في التعليم والطب والترجمة وتحليل البيانات، لكنه يحتاج إلى مراجعة بشرية واعية للتأكد من دقة النتائج ومراعاة الخصوصية."]},
  {id:2,category:"الإحصاء",date:"2026-10-28",title:"الحوسبة الإحصائية: كيف تتحول البيانات إلى معرفة؟",summary:"نظرة على دور البرامج الإحصائية في تنظيم البيانات وتحليلها واستخلاص النتائج.",icon:"▥",style:"stats",body:["الحوسبة الإحصائية هي استخدام الحاسوب والبرمجيات لتنفيذ العمليات الإحصائية وتحليل البيانات بكفاءة ودقة.","تساعد أدوات مثل R وPython والبرامج الإحصائية المتخصصة على تنظيف البيانات، وإجراء الاختبارات، وبناء النماذج، وعرض النتائج في جداول ورسوم بيانية.","لا يغني البرنامج عن التفكير الإحصائي؛ إذ ينبغي اختيار الطريقة المناسبة وفهم افتراضاتها وتفسير النتائج في سياق المشكلة البحثية."]},
  {id:3,category:"العلوم",date:"2026-10-25",title:"كيف يعمل المنهج العلمي؟",summary:"خطوات منظمة تساعد الباحث على طرح الأسئلة واختبار الفرضيات وبناء المعرفة.",icon:"✳",style:"science",body:["المنهج العلمي طريقة منظمة لدراسة الظواهر والإجابة عن الأسئلة بالاعتماد على الملاحظة والأدلة.","تبدأ العملية غالبًا بسؤال واضح، ثم مراجعة المعرفة السابقة وصياغة فرضية قابلة للاختبار، يلي ذلك تصميم دراسة وجمع البيانات وتحليلها.","تُعرض النتائج مع توضيح حدود الدراسة، وتظل الاستنتاجات قابلة للمراجعة عندما تظهر أدلة جديدة."]},
  {id:4,category:"التعليم",date:"2026-10-22",title:"مهارات التعلّم الذاتي في العصر الرقمي",summary:"طرق عملية لتنظيم التعلم واختيار المصادر ومتابعة التقدم خطوة بخطوة.",icon:"⌑",style:"learning",body:["التعلّم الذاتي هو أن يتحمل المتعلم دورًا نشطًا في تحديد ما يحتاج إلى تعلمه واختيار المصادر المناسبة وتنظيم وقته.","ابدأ بهدف صغير وواضح، وقسّمه إلى جلسات قصيرة، واستخدم مصدرًا موثوقًا، ثم اختبر فهمك بالتطبيق والشرح بأسلوبك.","دوّن ما تعلمته وما يحتاج إلى مراجعة. الاستمرارية والتقييم المنتظم أهم من محاولة إنجاز كل شيء دفعة واحدة."]},
  {id:5,category:"التقنية",date:"2026-10-19",title:"لماذا نتعلم البرمجة؟",summary:"البرمجة ليست كتابة أوامر فقط؛ إنها طريقة لتفكيك المشكلات وبناء الحلول.",icon:"</>",style:"tech",body:["تساعد البرمجة على تحويل الأفكار إلى تعليمات يمكن للحاسوب تنفيذها. وهي تجمع بين التفكير المنطقي والإبداع وحل المشكلات.","يمكن البدء بلغة مناسبة للهدف، ثم تعلم المتغيرات والشروط والتكرار والدوال، مع تطبيق كل مفهوم في مشروع صغير.","أفضل طريقة للتقدم هي كتابة البرامج وتجربتها وفهم الأخطاء وتصحيحها، بدل الاكتفاء بقراءة الشروحات."]},
  {id:6,category:"الإحصاء",date:"2026-10-16",title:"الفرق بين المجتمع والعينة في البحث العلمي",summary:"مفهومان أساسيان لفهم تصميم الدراسات وجمع البيانات والاستدلال الإحصائي.",icon:"▤",style:"stats",body:["المجتمع الإحصائي هو جميع العناصر التي يرغب الباحث في دراستها، أما العينة فهي مجموعة فرعية تُختار من ذلك المجتمع.","تُستخدم العينات عندما يصعب دراسة المجتمع كله بسبب الوقت أو التكلفة أو صعوبة الوصول إلى جميع أفراده.","تعتمد جودة الاستنتاجات على طريقة اختيار العينة وحجمها ومدى تمثيلها للمجتمع، مع توضيح حدود التعميم."]}
];

const grid = document.getElementById("articleGrid");
const search = document.getElementById("searchInput");
const empty = document.getElementById("emptyState");
let activeCategory = "الكل";

function renderArticles(){
  const term = search.value.trim().toLowerCase();
  const shown = articles.filter(a => (activeCategory==="الكل" || a.category===activeCategory) &&
    (a.title+" "+a.summary+" "+a.category).toLowerCase().includes(term));
  grid.innerHTML = shown.map(a => `
    <article class="article-card" tabindex="0" role="button" data-id="${a.id}" aria-label="قراءة ${a.title}">
      <div class="article-visual ${a.style}"><span class="visual-icon">${a.icon}</span><span class="visual-label">AZMAH JOURNAL</span></div>
      <div class="article-body"><div class="article-meta"><span>${a.category}</span><span>•</span><time>${a.date}</time></div>
      <h3>${a.title}</h3><p>${a.summary}</p><span class="read-more">اقرأ المقال ←</span></div>
    </article>`).join("");
  empty.hidden = shown.length !== 0;
}
function openArticle(id){
  const a = articles.find(item => item.id === Number(id));
  if(!a) return;
  document.getElementById("dialogContent").innerHTML = `
    <span class="dialog-category">${a.category}</span><h2>${a.title}</h2>
    <div class="dialog-date">AZMAH · ${a.date}</div>
    ${a.body.map(p=>`<p>${p}</p>`).join("")}
    <div class="dialog-note">ملاحظة تحريرية: هذا نموذج تجريبي للمحتوى. راجع المصادر وأضف المراجع العلمية قبل نشر أي بحث أكاديمي.</div>`;
  document.getElementById("articleDialog").showModal();
}
grid.addEventListener("click",e=>{const card=e.target.closest(".article-card");if(card)openArticle(card.dataset.id)});
grid.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.classList.contains("article-card")){e.preventDefault();openArticle(e.target.dataset.id)}});
search.addEventListener("input",renderArticles);
document.getElementById("filters").addEventListener("click",e=>{
  const btn=e.target.closest(".filter");if(!btn)return;
  activeCategory=btn.dataset.category;
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));
  renderArticles();
});
document.querySelectorAll(".category-card").forEach(btn=>btn.addEventListener("click",()=>{
  activeCategory=btn.dataset.pick;
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.category===activeCategory));
  document.getElementById("articles").scrollIntoView({behavior:"smooth"});
  renderArticles();
}));
document.getElementById("dialogClose").addEventListener("click",()=>document.getElementById("articleDialog").close());
document.getElementById("articleDialog").addEventListener("click",e=>{if(e.target.id==="articleDialog")e.target.close()});
const menu=document.getElementById("mainNav"),toggle=document.getElementById("menuToggle");
toggle.addEventListener("click",()=>{const open=menu.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))});
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menu.classList.remove("open");toggle.setAttribute("aria-expanded","false")}));
document.getElementById("year").textContent=new Date().getFullYear();
renderArticles();

// عنوان البريد يضبطه مالك الموقع في config.js
const contactEmailLink = document.getElementById("contactEmailLink");
if (contactEmailLink && typeof AZMAH_EMAIL !== "undefined" &&
    AZMAH_EMAIL && !AZMAH_EMAIL.startsWith("ضع_")) {
  contactEmailLink.href = "mailto:" + AZMAH_EMAIL + "?subject=" + encodeURIComponent("رسالة إلى AZMAH");
} else if (contactEmailLink) {
  contactEmailLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("يرجى وضع بريدك الشخصي في ملف config.js أولاً.");
  });
}
