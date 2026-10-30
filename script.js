9const DEFAULT_ARTICLES = [
  {
    id: "stats-01", title: "الحوسبة الإحصائية: كيف تتحول البيانات إلى معرفة؟",
    category: "الإحصاء", date: "2026-10-28", author: "فريق AZMAH",
    excerpt: "نظرة على دور البرامج الإحصائية في تنظيم البيانات وتحليلها واستخلاص النتائج.",
    body: "أصبحت الحوسبة الإحصائية جزءًا أساسيًا من العمل البحثي؛ فهي تجمع بين الأساليب الإحصائية والقدرة الحاسوبية لمعالجة البيانات بكفاءة.\n\nتبدأ العملية بتحديد سؤال واضح، ثم جمع البيانات وتنظيفها واختيار الأسلوب المناسب للتحليل. بعد ذلك تُفسَّر النتائج في ضوء السؤال البحثي وحدود البيانات.\n\nمن المهم ألا تُعامل مخرجات البرامج بوصفها حقائق نهائية؛ فصحة الاستنتاج تعتمد على جودة البيانات وملاءمة المنهج والافتراضات المستخدمة."
  },
  {
    id: "science-02", title: "كيف يعمل المنهج العلمي؟",
    category: "العلوم", date: "2026-10-25", author: "فريق AZMAH",
    excerpt: "خطوات منظمة تساعد الباحث على طرح الأسئلة واختبار الفرضيات وبناء المعرفة.",
    body: "المنهج العلمي طريقة منظمة لفهم الظواهر والإجابة عن الأسئلة اعتمادًا على الملاحظة والأدلة.\n\nعادةً يبدأ الباحث بملاحظة أو مشكلة، ثم يصوغ سؤالًا قابلًا للدراسة، ويراجع المعرفة السابقة، ويحدد طريقة جمع الأدلة وتحليلها.\n\nلا يعني المنهج العلمي أن كل دراسة تقدم إجابة نهائية؛ بل إن النتائج قابلة للمراجعة والتطوير كلما ظهرت أدلة جديدة."
  },
  {
    id: "tech-03", title: "مدخل إلى البرمجة بلغة R",
    category: "التقنية", date: "2026-10-21", author: "فريق AZMAH",
    excerpt: "تعرف على لغة R واستخدامها في التحليل الإحصائي والتصور البياني.",
    body: "لغة R بيئة برمجية مفتوحة المصدر تُستخدم على نطاق واسع في الإحصاء وتحليل البيانات والرسوم البيانية.\n\nيمكن للمبتدئ البدء بالمتغيرات والمتجهات والجداول، ثم الانتقال إلى استيراد البيانات وتنظيفها وتحليلها.\n\nتساعد الممارسة على بيانات صغيرة وواضحة في فهم الأوامر، كما أن توثيق خطوات التحليل يجعل العمل أسهل للمراجعة وإعادة التنفيذ."
  }
];

const STORAGE_KEY = "azmah_articles_v3";
const readArticles = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_ARTICLES;
  } catch (error) { return DEFAULT_ARTICLES; }
};
const saveArticles = articles => localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
const dateLabel = value => {
  if (!value) return "";
  const parts = value.split("-");
  return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : value;
};
const coverSymbols = {"الإحصاء":"∑","التقنية":"⌘","العلوم":"✳","التعليم":"▤"};

function initPublicSite() {
  const grid = document.getElementById("articleGrid");
  if (!grid) return;
  let articles = readArticles();
  let activeCategory = "الكل";
  const search = document.getElementById("searchInput");
  const empty = document.getElementById("emptyState");
  const count = document.getElementById("articleCount");
  const dialog = document.getElementById("articleDialog");

  function render() {
    const term = search.value.trim().toLowerCase();
    const visible = articles.filter(article =>
      (activeCategory === "الكل" || article.category === activeCategory) &&
      [article.title, article.excerpt, article.category, article.author].join(" ").toLowerCase().includes(term)
    );
    grid.innerHTML = visible.map(article => `
      <article class="article-card">
        <button class="article-cover cover-${esc(article.category)}" data-open="${esc(article.id)}" aria-label="اقرأ ${esc(article.title)}">
          <span class="cover-symbol">${coverSymbols[article.category] || "✦"}</span><span class="cover-label">AZMAH JOURNAL</span>
        </button>
        <div class="article-card-content">
          <div class="article-meta"><span>${esc(article.category)}</span><i></i><time>${esc(dateLabel(article.date))}</time></div>
          <h3><button class="article-title-button" data-open="${esc(article.id)}">${esc(article.title)}</button></h3>
          <p>${esc(article.excerpt)}</p>
          <button class="read-link" data-open="${esc(article.id)}">اقرأ المقال <span>←</span></button>
        </div>
      </article>`).join("");
    empty.hidden = visible.length !== 0;
    count.textContent = String(articles.length).padStart(2, "0");
  }
  document.getElementById("categoryFilters").addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
    render();
  });
  search.addEventListener("input", render);
  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-open]");
    if (!button) return;
    const article = articles.find(item => item.id === button.dataset.open);
    if (!article) return;
    document.getElementById("dialogCover").textContent = `AZMAH JOURNAL  ${coverSymbols[article.category] || "✦"}`;
    document.getElementById("dialogMeta").textContent = `${article.category}  •  ${dateLabel(article.date)}  •  ${article.author || "AZMAH"}`;
    document.getElementById("dialogTitle").textContent = article.title;
    document.getElementById("dialogExcerpt").textContent = article.excerpt;
    document.getElementById("dialogBody").innerHTML = String(article.body || "").split(/\n{2,}/).map(p => `<p>${esc(p)}</p>`).join("");
    dialog.showModal();
  });
  document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  document.querySelectorAll("[data-jump]").forEach(link => link.addEventListener("click", () => {
    activeCategory = link.dataset.jump;
    document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item.dataset.category === activeCategory));
    render();
  }));
  const menuToggle = document.getElementById("menuToggle");
  menuToggle.addEventListener("click", () => document.getElementById("mainNav").classList.toggle("nav-open"));
  document.querySelectorAll("#mainNav a").forEach(link => link.addEventListener("click", () => document.getElementById("mainNav").classList.remove("nav-open")));
  const emailLink = document.getElementById("contactEmailLink");
  if (emailLink && AZMAH_CONFIG.contactEmail) emailLink.href = `mailto:${AZMAH_CONFIG.contactEmail}`;
  else if (emailLink) emailLink.addEventListener("click", event => { event.preventDefault(); alert("لم يُضف بريد التواصل بعد. افتح config.js وضع بريد التواصل الذي تريد نشره."); });
  document.getElementById("year").textContent = new Date().getFullYear();
  render();
}

function initAdmin() {
  const form = document.getElementById("articleForm");
  if (!form) return;
  let articles = readArticles();
  const list = document.getElementById("adminArticleList");
  const idField = document.getElementById("articleId");
  const titleField = document.getElementById("titleInput");
  const categoryField = document.getElementById("categoryInput");
  const authorField = document.getElementById("authorInput");
  const excerptField = document.getElementById("excerptInput");
  const bodyField = document.getElementById("bodyInput");

  function renderAdmin() {
    document.getElementById("adminTotal").textContent = articles.length;
    document.getElementById("adminCategories").textContent = new Set(articles.map(a => a.category)).size;
    list.innerHTML = articles.map(article => `
      <div class="admin-article">
        <div><b>${esc(article.title)}</b><small>${esc(article.category)} • ${esc(dateLabel(article.date))}</small></div>
        <div class="admin-actions"><button class="edit-button" data-edit="${esc(article.id)}">تعديل</button><button class="delete-button" data-delete="${esc(article.id)}">حذف</button></div>
      </div>`).join("") || '<p class="empty-state">لا توجد مقالات بعد.</p>';
  }
  function clearForm() {
    form.reset(); idField.value = "";
    document.getElementById("formHeading").textContent = "إضافة مقال جديد";
    document.getElementById("saveButton").textContent = "حفظ المقال";
  }
  form.addEventListener("submit", event => {
    event.preventDefault();
    const article = {
      id: idField.value || `article-${Date.now()}`,
      title: titleField.value.trim(), category: categoryField.value,
      author: authorField.value.trim() || "فريق AZMAH",
      excerpt: excerptField.value.trim(), body: bodyField.value.trim(),
      date: new Date().toISOString().slice(0,10)
    };
    if (idField.value) articles = articles.map(item => item.id === idField.value ? article : item);
    else articles.unshift(article);
    saveArticles(articles); clearForm(); renderAdmin();
    alert("تم حفظ المقال في تخزين هذا المتصفح. لن يظهر للزوار قبل نشر التحديثات بالطريقة المناسبة.");
  });
  list.addEventListener("click", event => {
    const edit = event.target.closest("[data-edit]");
    const del = event.target.closest("[data-delete]");
    if (edit) {
      const article = articles.find(item => item.id === edit.dataset.edit);
      if (!article) return;
      idField.value = article.id; titleField.value = article.title; categoryField.value = article.category;
      authorField.value = article.author || ""; excerptField.value = article.excerpt; bodyField.value = article.body;
      document.getElementById("formHeading").textContent = "تعديل المقال";
      document.getElementById("saveButton").textContent = "حفظ التعديلات";
      window.scrollTo({top: 0, behavior: "smooth"});
    }
    if (del && confirm("هل تريد حذف هذا المقال من تخزين هذا المتصفح؟")) {
      articles = articles.filter(item => item.id !== del.dataset.delete);
      saveArticles(articles); renderAdmin();
    }
  });
  document.getElementById("resetButton").addEventListener("click", clearForm);
  document.getElementById("exportButton").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(articles, null, 2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "azmah-articles.json"; anchor.click();
    URL.revokeObjectURL(url);
  });
  renderAdmin();
}
document.addEventListener("DOMContentLoaded", () => { initPublicSite(); initAdmin(); });document.addEventListener("DOMContentLoaded", () => {
  initPublicSite();
  initAdmin();
});
