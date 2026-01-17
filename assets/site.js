const PROFILE = {
  name: "Sua Kim",
  email: "suakim7514@gmail.com",
  links: {
    github: "https://github.com/Suakimgxx-one",
    linkedin: "https://www.linkedin.com/in/suakim1105",
    resume: "assets/Resume.pdf"
  },
  tagline: "CS, music, sports, and building my life into something calm",
  welcomeQuick:
    "This is my little online scrapbook. I am a Computer Science student at the University of Waterloo, but I care just as much about music, sports, and learning clearly as I do about code.",
  aboutShort:
    "This site is a small window into who I am beyond labels. I am a Computer Science student at the University of Waterloo, but learning has never been just about code for me. I care deeply about understanding things clearly, especially in math, until they feel intuitive rather than intimidating. Outside of academics, I spend a lot of time practicing flute and piccolo and training in badminton and volleyball. Those parts of my life teach me discipline, patience, and consistency in a way that mirrors how I approach learning and building. I like routines that bring calm, systems that reduce chaos, and creating things such as music, tools, or habits that make life feel a little more intentional.",

  tags: [
    { label: "student", value: "Waterloo CS" },
    { label: "music", value: "flute / piccolo" },
    { label: "sports", value: "badminton / volleyball" },
    { label: "brain", value: "clarity + systems" },
    { label: "builder", value: "tools I actually use" }
  ],

  projects: [
    {
      title: "School Hub App",
      why: "I wanted students to find events, clubs, and resources without digging through chaos.",
      what: "A student hub platform used by 500 plus users in high school.",
      tags: ["Community", "Product thinking", "Web"],
      links: { github: "", demo: "" }
    },
    {
      title: "Vocabulary Game",
      why: "I like learning that feels playful. I wanted practice to feel fun and repeatable.",
      what: "A Python game built with Pygame for vocabulary building without boredom.",
      tags: ["Python", "Pygame", "Learning"],
      links: { github: "", demo: "" }
    },
    {
      title: "Waterloo Life Dashboard",
      why: "I wanted a personal system that feels calm, cute, and actually usable every day.",
      what: "A personal dashboard for study blocks, weekly resets, and course tasks.",
      tags: ["HTML", "CSS", "JavaScript", "Daily use"],
      links: { github: "", demo: "" }
    }
  ],

  currently: {
    learning: [
      "Building stronger fundamentals in CS and math, with a focus on clarity",
      "Sharpening interview prep over time, not overnight panic"
    ],
    training: [
      "Badminton footwork and consistency drills",
      "Volleyball fundamentals and stamina"
    ],
    practicing: [
      "Flute and piccolo passages, tone, phrasing, and clean repetitions",
      "Making practice feel intentional instead of rushed"
    ],
    building: [
      "Small tools that make my week calmer, like dashboards and planners",
      "Projects that feel like me, not just a checklist"
    ]
  }
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function toast(msg="Saved!"){
  const t = $("#toast");
  if(!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(()=> t.classList.remove("show"), 1100);
}

function safeLink(aEl, url){
  if(!aEl) return;
  if(url && url.trim().length){
    aEl.href = url;
    aEl.classList.remove("disabled");
    aEl.setAttribute("aria-disabled","false");
  } else {
    aEl.href = "#";
    aEl.classList.add("disabled");
    aEl.setAttribute("aria-disabled","true");
  }
}

function makeSparkles(){
  const wrap = $("#sparkles");
  if(!wrap) return;
  const icons = ["✨","💗","🎀","⭐","🫧","🧁"];
  const count = 22;
  for(let i=0;i<count;i++){
    const s = document.createElement("div");
    s.className="sparkle";
    s.textContent = icons[Math.floor(Math.random()*icons.length)];
    s.style.left = (Math.random()*100)+"%";
    s.style.top = (Math.random()*100)+"%";
    s.style.animationDuration = (8 + Math.random()*10)+"s";
    s.style.animationDelay = (-Math.random()*10)+"s";
    wrap.appendChild(s);
  }
}

function renderNav(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$("[data-nav]").forEach(a=>{
    const target = (a.getAttribute("href") || "").toLowerCase();
    if(target === path) a.setAttribute("aria-current","page");
  });
}

function renderShared(){
  if($("#siteTitle")) $("#siteTitle").textContent = `${PROFILE.name} ✿`;
  if($("#brandTiny")) $("#brandTiny").textContent = PROFILE.tagline;
  if($("#year")) $("#year").textContent = new Date().getFullYear();

  const tagrow = $("#tagrow");
  if(tagrow){
    tagrow.innerHTML = "";
    PROFILE.tags.forEach(t=>{
      const el = document.createElement("div");
      el.className = "tag";
      el.innerHTML = `<b>${t.label}</b>: ${t.value}`;
      tagrow.appendChild(el);
    });
  }

  safeLink($("#githubBtn"), PROFILE.links.github);
  safeLink($("#linkedinBtn"), PROFILE.links.linkedin);
  safeLink($("#resumeBtn"), PROFILE.links.resume);

  const copy = $("#copyEmailBtn");
  if(copy){
    copy.addEventListener("click", async ()=>{
      try{
        await navigator.clipboard.writeText(PROFILE.email);
        toast("Email copied 💌");
      }catch(e){
        toast("Copy blocked. Use Live Server.");
      }
    });
  }
}

function renderHome(){
  if($("#welcomeText")) $("#welcomeText").textContent = PROFILE.welcomeQuick;
  if($("#aboutBlurb")) $("#aboutBlurb").textContent = PROFILE.aboutShort;
}

function renderAbout(){
  if($("#aboutFull")){
    $("#aboutFull").textContent =
      "I am a Computer Science student at the University of Waterloo, but I never wanted my personality to be only code.\n\n" +
      "I care a lot about learning clearly, especially in math. I like getting to the point where a concept feels intuitive and explainable.\n\n" +
      "Outside academics, I spend a lot of time practicing flute and piccolo and training in badminton and volleyball. Music and sports taught me patience and discipline in a way that shows up everywhere in my life.\n\n" +
      "I like routines that bring calm, systems that reduce chaos, and building things that actually get used.";
  }
}

function renderProjects(){
  const list = $("#projectsList");
  if(!list) return;
  list.innerHTML = "";
  PROFILE.projects.forEach(p=>{
    const el = document.createElement("div");
    el.className = "item";
    el.innerHTML = `
      <h3>${p.title}</h3>
      <p><b>why:</b> ${p.why}</p>
      <p><b>what it does:</b> ${p.what}</p>
      <div class="badges">${p.tags.map(x=>`<span class="badge">${x}</span>`).join("")}</div>
    `;
    list.appendChild(el);
  });
}

function renderCurrently(){
  const set = (id, arr) => {
    const wrap = $(id);
    if(!wrap) return;
    wrap.innerHTML = "";
    arr.forEach(x=>{
      const el = document.createElement("div");
      el.className = "item";
      el.innerHTML = `<h3>${x}</h3><p>little progress counts. consistency is cute.</p>`;
      wrap.appendChild(el);
    });
  };

  set("#learningList", PROFILE.currently.learning);
  set("#trainingList", PROFILE.currently.training);
  set("#practicingList", PROFILE.currently.practicing);
  set("#buildingList", PROFILE.currently.building);
}

function renderResume(){
  const link = $("#resumeLink");
  if(link) link.href = PROFILE.links.resume;

  const iframe = $("#resumeFrame");
  if(iframe) iframe.src = PROFILE.links.resume;
}

function init(){
  makeSparkles();
  renderNav();
  renderShared();

  // page-specific
  renderHome();
  renderAbout();
  renderProjects();
  renderCurrently();
  renderResume();
}

init();
