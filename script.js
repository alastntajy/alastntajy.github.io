const DEFAULT_ARTICLES = [
  {
    title: "الحوسبة الإحصائية: كيف تتحول البيانات إلى معرفة؟",
    category: "الإحصاء", author: "فريق AZMAH",
    excerpt: "نظرة على دور البرامج الإحصائية في تنظيم البيانات وتحليلها واستخلاص النتائج.",
    content: "أصبحت الحوسبة الإحصائية جزءًا أساسيًا من العمل البحثي؛ فهي تجمع بين الأساليب الإحصائية والقدرة الحاسوبية لمعالجة البيانات بكفاءة.\n\nتبدأ العملية بتحديد سؤال واضح، ثم جمع البيانات وتنظيفها واختيار الأسلوب المناسب للتحليل. بعد ذلك تُفسَّر النتائج في ضوء السؤال البحثي وحدود البيانات.\n\nمن المهم ألا تُعامل مخرجات البرامج بوصفها حقائق نهائية؛ فصحة الاستنتاج تعتمد على جودة البيانات وملاءمة المنهج والافتراضات المستخدمة.",
    published: true
  },
  {
    title: "كيف يعمل المنهج العلمي؟",
    category: "العلوم", author: "فريق AZMAH",
    excerpt: "خطوات منظمة تساعد الباحث على طرح الأسئلة واختبار الفرضيات وبناء المعرفة.",
    content: "المنهج العلمي طريقة منظمة لفهم الظواهر والإجابة عن الأسئلة اعتمادًا على الملاحظة والأدلة.\n\nعادةً يبدأ الباحث بملاحظة أو مشكلة، ثم يصوغ سؤالًا قابلًا للدراسة، ويراجع المعرفة السابقة، ويحدد طريقة جمع الأدلة وتحليلها.\n\nلا يعني المنهج العلمي أن كل دراسة تقدم إجابة نهائية؛ بل إن النتائج قابلة للمراجعة والتطوير كلما ظهرت أدلة جديدة.",
    published: true
  },
  {
    title: "مدخل إلى البرمجة بلغة R",
    category: "التقنية", author: "فريق AZMAH",
    excerpt: "تعرف على لغة R واستخدامها في التحليل الإحصائي والتصور البياني.",
    content: "لغة R بيئة برمجية مفتوحة المصدر تُستخدم على نطاق واسع في الإحصاء وتحليل البيانات والرسوم البيانية.\n\nيمكن للمبتدئ البدء بالمتغيرات والمتجهات والجداول، ثم الانتقال إلى استيراد البيانات وتنظيفها وتحليلها.\n\nتساعد الممارسة على بيانات صغيرة وواضحة في فهم الأوامر، كما أن توثيق خطوات التحليل يجعل العمل أسهل للمراجعة وإعادة التنفيذ.",
    published: true
  }
];

const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
}[char]));

const dateLabel = value => {
  if (!value) return "";
  const date = String(value).slice(0, 10);
  const parts = date.split("-");
  return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : date;
};

const coverSymbols = {"الإحصاء":"∑","التقنية":"⌘","العلوم":"✳","التعليم":"▤"};

function getSupabase() {
  if (!window.supabase || typeof AZMAH_CONFIG === "undefined" ||
      !AZMAH_CONFIG.supabaseUrl || !AZMAH_CONFIG.supabaseKey) {
    return null;
  }
  if (!window.azmahSupabase) {
    window.azmahSupabase = window.supabase.createClient(
      AZMAH_CONFIG.supabaseUrl,
      AZMAH_CONFIG.supabaseKey
    );
  }
  return window.azmahSupabase;
}

function mapArticle(row) {
  return {
    id: String(row.id),
    title: row.title || "",
    category: row.category || "عام",
    date: row.created_at ? String(row.created_at).slice(0, 10) : "",
    author: row.author || "فريق AZMAH",
    excerpt: row.excerpt || "",
    body: row.content || "",
    published: Boolean(row.published)
  };
}

async function initPublicSite() {
  const grid = document.getElementById("articleGrid");
  if (!grid) return;

  const search = document.getElementById("searchInput");
  const empty = document.getElementById("emptyState");
  const count = document.getElementById("articleCount");
  const dialog = document.getElementById("articleDialog");
  let articles = [];
  let activeCategory = "الكل";

  function render() {
    const term = (search?.value || "").trim().toLowerCase();
    const visible = articles.filter(article =>
      (activeCategory === "الكل" || article.category === activeCategory) &&
      [article.title, article.excerpt, article.category, article.author]
        .join(" ").toLowerCase().includes(term)
    );

    grid.innerHTML = visible.map(article => `
      <article class="article-card">
        <button class="article-cover cover-${esc(article.category)}" data-open="${esc(article.id)}" aria-label="اقرأ ${esc(article.title)}">
          <span class="cover-symbol">${coverSymbols[article.category] || "✦"}</span>
          <span class="cover-label">AZMAH JOURNAL</span>
        </button>
        <div class="article-card-content">
          <div class="article-meta"><span>${esc(article.category)}</span><i></i><time>${esc(dateLabel(article.date))}</time></div>
          <h3><button class="article-title-button" data-open="${esc(article.id)}">${esc(article.title)}</button></h3>
          <p>${esc(article.excerpt)}</p>
          <button class="read-link" data-open="${esc(article.id)}">اقرأ المقال <span>←</span></button>
        </div>
      </article>`).join("");

    if (empty) empty.hidden = visible.length !== 0;
    if (count) count.textContent = String(articles.length).padStart(2, "0");
  }

  const client = getSupabase();
  if (!client) {
    grid.innerHTML = '<p class="empty-state">تعذر الاتصال بقاعدة البيانات. تحقق من إعدادات config.js واتصال الإنترنت.</p>';
    return;
  }

  const { data, error } = await client
    .from("articles")
    .select("id,title,slug,excerpt,content,category,published,created_at,author")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    grid.innerHTML = `<p class="empty-state">تعذر تحميل المقالات: ${esc(error.message)}</p>`;
    return;
  }
  articles = (data || []).map(mapArticle);
  render();

  document.getElementById("categoryFilters")?.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    document.querySelectorAll(".filter").forEach(item =>
      item.classList.toggle("active", item === button)
    );
    render();
  });

  search?.addEventListener("input", render);

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-open]");
    if (!button) return;
    const article = articles.find(item => item.id === button.dataset.open);
    if (!article || !dialog) return;
    document.getElementById("dialogCover").textContent =
      `AZMAH JOURNAL  ${coverSymbols[article.category] || "✦"}`;
    document.getElementById("dialogMeta").textContent =
      `${article.category}  •  ${dateLabel(article.date)}  •  ${article.author}`;
    document.getElementById("dialogTitle").textContent = article.title;
    document.getElementById("dialogExcerpt").textContent = article.excerpt;
    document.getElementById("dialogBody").innerHTML =
      String(article.body).split(/\n{2,}/).map(p => `<p>${esc(p)}</p>`).join("");
    dialog.showModal();
  });

  document.getElementById("dialogClose")?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  document.querySelectorAll("[data-jump]").forEach(link => link.addEventListener("click", () => {
    activeCategory = link.dataset.jump;
    document.querySelectorAll(".filter").forEach(item =>
      item.classList.toggle("active", item.dataset.category === activeCategory)
    );
    render();
  }));

  const menuToggle = document.getElementById("menuToggle");
  menuToggle?.addEventListener("click", () =>
    document.getElementById("mainNav")?.classList.toggle("nav-open")
  );
  document.querySelectorAll("#mainNav a").forEach(link => link.addEventListener("click", () =>
    document.getElementById("mainNav")?.classList.remove("nav-open")
  ));

  const emailLink = document.getElementById("contactEmailLink");
  if (emailLink && AZMAH_CONFIG.contactEmail) {
    emailLink.href = `mailto:${AZMAH_CONFIG.contactEmail}`;
  } else if (emailLink) {
    emailLink.addEventListener("click", event => {
      event.preventDefault();
      alert("لم يُضف بريد التواصل بعد. افتح config.js وضع بريد التواصل الذي تريد نشره.");
    });
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

async function initAdmin() {
  const form = document.getElementById("articleForm");
  if (!form) return;

  const client = getSupabase();
  const loginPanel = document.getElementById("loginPanel");
  const adminApp = document.getElementById("adminApp");
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");
  const logoutButton = document.getElementById("logoutButton");
  const list = document.getElementById("adminArticleList");
  const idField = document.getElementById("articleId");
  const titleField = document.getElementById("titleInput");
  const categoryField = document.getElementById("categoryInput");
  const authorField = document.getElementById("authorInput");
  const excerptField = document.getElementById("excerptInput");
  const bodyField = document.getElementById("bodyInput");
  const publishedField = document.getElementById("publishedInput");
  let articles = [];

  function message(text, isError = false) {
    if (!loginMessage) return;
    loginMessage.textContent = text;
    loginMessage.style.color = isError ? "#b42318" : "inherit";
  }

  function showAdmin(isLoggedIn) {
    loginPanel.hidden = isLoggedIn;
    adminApp.hidden = !isLoggedIn;
  }

  function renderAdmin() {
    document.getElementById("adminTotal").textContent = articles.length;
    document.getElementById("adminCategories").textContent =
      new Set(articles.map(a => a.category)).size;
    list.innerHTML = articles.map(article => `
      <div class="admin-article">
        <div>
          <b>${esc(article.title)}</b>
          <small>${esc(article.category)} • ${esc(dateLabel(article.date))} • ${article.published ? "منشور" : "مسودة"}</small>
        </div>
        <div class="admin-actions">
          <button class="edit-button" data-edit="${esc(article.id)}">تعديل</button>
          <button class="delete-button" data-delete="${esc(article.id)}">حذف</button>
        </div>
      </div>`).join("") || '<p class="empty-state">لا توجد مقالات بعد.</p>';
  }

  function clearForm() {
    form.reset();
    idField.value = "";
    if (publishedField) publishedField.checked = true;
    document.getElementById("formHeading").textContent = "إضافة مقال جديد";
    document.getElementById("saveButton").textContent = "حفظ المقال";
  }

  async function loadArticles() {
    const { data, error } = await client.from("articles")
      .select("id,title,slug,excerpt,content,category,published,created_at,author")
      .order("created_at", { ascending: false });
    if (error) throw error;
    articles = (data || []).map(mapArticle);
    renderAdmin();
  }

  async function seedIfEmpty() {
    if (articles.length) return;
    const rows = DEFAULT_ARTICLES.map((article, index) => ({
      ...article,
      slug: `azmah-intro-${index + 1}-${Date.now()}`,
      updated_at: new Date().toISOString()
    }));
    const { error } = await client.from("articles").insert(rows);
    if (error) throw error;
    await loadArticles();
  }

  async function refreshAdmin() {
    try {
      await loadArticles();
      await seedIfEmpty();
    } catch (error) {
      message(`تعذر تحميل المقالات: ${error.message}`, true);
    }
  }

  if (!client) {
    showAdmin(false);
    message("إعدادات Supabase غير مكتملة. تحقق من config.js وتحميل مكتبة Supabase.", true);
    return;
  }

  loginForm.addEventListener("submit", async event => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const submit = loginForm.querySelector('button[type="submit"]');
    submit.disabled = true;
    message("جارٍ تسجيل الدخول...");
    const { error } = await client.auth.signInWithPassword({ email, password });
    submit.disabled = false;
    if (error) {
      message(`تعذر تسجيل الدخول: ${error.message}`, true);
      return;
    }
    message("تم تسجيل الدخول.");
    showAdmin(true);
    await refreshAdmin();
  });

  logoutButton.addEventListener("click", async () => {
    await client.auth.signOut();
    showAdmin(false);
    clearForm();
    message("تم تسجيل الخروج.");
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const saveButton = document.getElementById("saveButton");
    saveButton.disabled = true;
    const title = titleField.value.trim();
    const payload = {
      title,
      slug: `${title.toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 70)}-${Date.now()}`,
      category: categoryField.value,
      author: authorField.value.trim() || "فريق AZMAH",
      excerpt: excerptField.value.trim(),
      content: bodyField.value.trim(),
      published: Boolean(publishedField?.checked),
      updated_at: new Date().toISOString()
    };

    let result;
    if (idField.value) {
      delete payload.slug;
      result = await client.from("articles").update(payload).eq("id", Number(idField.value));
    } else {
      result = await client.from("articles").insert(payload);
    }
    saveButton.disabled = false;
    if (result.error) {
      alert(`لم يتم حفظ المقال: ${result.error.message}`);
      return;
    }
    clearForm();
    await refreshAdmin();
    alert("تم حفظ المقال في قاعدة بيانات AZMAH.");
  });

  list.addEventListener("click", async event => {
    const edit = event.target.closest("[data-edit]");
    const del = event.target.closest("[data-delete]");
    if (edit) {
      const article = articles.find(item => item.id === edit.dataset.edit);
      if (!article) return;
      idField.value = article.id;
      titleField.value = article.title;
      categoryField.value = article.category;
      authorField.value = article.author;
      excerptField.value = article.excerpt;
      bodyField.value = article.body;
      if (publishedField) publishedField.checked = article.published;
      document.getElementById("formHeading").textContent = "تعديل المقال";
      document.getElementById("saveButton").textContent = "حفظ التعديلات";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (del && confirm("هل تريد حذف هذا المقال نهائيًا؟")) {
      const { error } = await client.from("articles").delete().eq("id", Number(del.dataset.delete));
      if (error) {
        alert(`تعذر حذف المقال: ${error.message}`);
        return;
      }
      await refreshAdmin();
    }
  });

  document.getElementById("resetButton").addEventListener("click", clearForm);
  document.getElementById("exportButton").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(articles, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "azmah-articles.json";
    anchor.click();
    URL.revokeObjectURL(url);
  });

  const { data: sessionData } = await client.auth.getSession();
  if (sessionData.session) {
    showAdmin(true);
    await refreshAdmin();
  } else {
    showAdmin(false);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initPublicSite();
  initAdmin();
});
