// Page Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    setTimeout(() => loader && loader.classList.add('hidden'), 1400);
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const body        = document.body;
const savedTheme  = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);
themeToggle.addEventListener('click', () => {
    const next = body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
});
function applyTheme(t) {
    body.classList.toggle('light-mode', t === 'light');
    themeIcon.className = t === 'light' ? 'bx bx-sun' : 'bx bx-moon';
}

// Mobile Menu
const menuIcon = document.querySelector('#menu-icon');
const navBar   = document.querySelector('.navbar');
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navBar.classList.toggle('active');
});

// Scroll Events
const sections  = document.querySelectorAll('section');
const navLinks  = document.querySelectorAll('header nav a');
const header    = document.querySelector('.header');
const progress  = document.getElementById('scroll-progress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const y    = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${(y / docH) * 100}%`;
    header.classList.toggle('sticky', y > 80);
    if (backToTop) backToTop.classList.toggle('visible', y > 400);
    sections.forEach(sec => {
        const off = sec.offsetTop - 160;
        if (y >= off && y < off + sec.offsetHeight) {
            navLinks.forEach(l => l.classList.remove('active'));
            const lnk = document.querySelector(`header nav a[href="#${sec.id}"]`);
            if (lnk) lnk.classList.add('active');
        }
    });
    menuIcon.classList.remove('bx-x');
    navBar.classList.remove('active');
});

if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Typed.js
new Typed('.multiple-text', {
    strings: ['Data Analyst', 'Data Scientist', 'ML Enthusiast', 'Problem Solver'],
    typeSpeed: 85, backSpeed: 55, backDelay: 1400, loop: true,
});

// ScrollReveal
ScrollReveal({ distance: '50px', duration: 750, delay: 80, easing: 'cubic-bezier(0.4,0,0.2,1)' });
ScrollReveal().reveal('.home-content .greeting, .home-content h1', { origin: 'top', interval: 80 });
ScrollReveal().reveal('.home-content .role-line, .home-content .bio, .home-stats, .social-media, .btn-group', { origin: 'bottom', interval: 100, delay: 150 });
ScrollReveal().reveal('.home-img', { origin: 'right', delay: 250 });
ScrollReveal().reveal('.heading, .section-subtitle', { origin: 'top', interval: 70 });
ScrollReveal().reveal('.projects-box', { origin: 'bottom', interval: 90 });
ScrollReveal().reveal('.edu-box', { origin: 'left', interval: 140 });
ScrollReveal().reveal('.contact form', { origin: 'bottom', distance: '35px' });

// Counter Animation
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const step   = (target / 1400) * 16;
    let cur = 0;
    const tick = () => {
        cur += step;
        el.textContent = cur >= target ? target + '+' : Math.floor(cur) + '+';
        if (cur < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObserver.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(c => counterObserver.observe(c));

// Credentials Toggle
function showSection(section) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active-section'));
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(section).classList.add('active-section');
    document.getElementById(section === 'certificates' ? 'btn-cert' : 'btn-achv').classList.add('active');
}

// LeetCode Stats
async function loadLeetCodeData() {
    try {
        const data = await fetch('https://leetcode-api-faisalshohag.vercel.app/tanishk-raj08').then(r => r.json());
        const { easySolved: e = 0, mediumSolved: m = 0, hardSolved: h = 0,
                totalEasy = 825, totalMedium = 2015, totalHard = 896, ranking } = data;
        const total = e + m + h;
        const $  = id => document.getElementById(id);
        if ($('totalSolved')) $('totalSolved').textContent = total;
        if ($('rank'))        $('rank').textContent = ranking ? `#${ranking}` : 'N/A';
        if ($('easyLabel'))   $('easyLabel').textContent = `${e}/${totalEasy}`;
        if ($('mediumLabel')) $('mediumLabel').textContent = `${m}/${totalMedium}`;
        if ($('hardLabel'))   $('hardLabel').textContent = `${h}/${totalHard}`;
        if (!total) return;
        const pie = document.querySelector('.leet-pie');
        if (pie) {
            const ed = (e / total) * 360, md = ((e + m) / total) * 360;
            pie.style.background = `conic-gradient(#2db88a 0deg ${ed}deg,#e6b000 ${ed}deg ${md}deg,#e05a5a ${md}deg 360deg)`;
        }
    } catch { const el = document.getElementById('totalSolved'); if (el) el.textContent = '?'; }
}
loadLeetCodeData();
setInterval(loadLeetCodeData, 60000);

// Toast
function showToast(msg, type = 'success') {
    const t = document.getElementById('toast');
    if (!t) return;
    t.innerHTML = `<i class="bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}"></i> ${msg}`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 4000);
}

// Contact Form
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    btn.disabled = true;
    const fd = new FormData(e.target);
    fd.append('access_key', 'edaae21f-ba84-4877-86f4-e594d317ddd0');
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(fd)),
    })
    .then(async r => {
        const res = await r.json();
        btn.innerHTML = '<i class="bx bx-send"></i> Send Message';
        btn.disabled = false;
        if (r.status === 200) { e.target.reset(); showToast("Message sent! I'll get back to you soon."); }
        else { console.log(res); showToast('Something went wrong.', 'error'); }
    })
    .catch(err => {
        console.log(err);
        btn.innerHTML = '<i class="bx bx-send"></i> Send Message';
        btn.disabled = false;
        showToast('Error sending message.', 'error');
    });
}

// ── Skills: Data-Driven Cards + Tabs + Stagger + Count Badges ─────────────────
const DEVICONS = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const ICONS8   = 'https://img.icons8.com/color/48';

const SKILLS = [
    { name: 'Python',          cat: 'languages', img: `${DEVICONS}/python/python-original.svg` },
    { name: 'SQL',             cat: 'languages', img: `${DEVICONS}/mysql/mysql-original.svg` },
    { name: 'C / C++',         cat: 'languages', img: `${DEVICONS}/cplusplus/cplusplus-original.svg` },
    { name: 'Java',            cat: 'languages', img: `${DEVICONS}/java/java-original.svg` },
    { name: 'Power BI',        cat: 'tools',     img: `${ICONS8}/power-bi.png` },
    { name: 'Microsoft Excel', cat: 'tools',     img: `${ICONS8}/microsoft-excel-2019.png` },
    { name: 'Tableau',         cat: 'tools',     img: `${ICONS8}/tableau-software.png` },
    { name: 'Google Sheets',   cat: 'tools',     img: `${ICONS8}/google-sheets.png` },
    { name: 'Pandas',          cat: 'libraries', img: `${DEVICONS}/pandas/pandas-original.svg` },
    { name: 'NumPy',           cat: 'libraries', img: `${DEVICONS}/numpy/numpy-original.svg` },
    { name: 'Matplotlib',      cat: 'libraries', img: `${DEVICONS}/matplotlib/matplotlib-original.svg` },
    { name: 'Seaborn',         cat: 'libraries', icon: 'bx bx-scatter-chart' },
    { name: 'Scikit-learn',    cat: 'libraries', img: `${DEVICONS}/scikitlearn/scikitlearn-original.svg` },
    { name: 'MySQL',           cat: 'libraries', img: `${DEVICONS}/mysql/mysql-original.svg` },
    { name: 'DSA',             cat: 'soft',      icon: 'bx bx-network-chart' },
    { name: 'Data Analysis',   cat: 'soft',      icon: 'bx bx-line-chart' },
    { name: 'Data Cleaning',   cat: 'soft',      icon: 'bx bx-filter-alt' },
    { name: 'Problem Solving', cat: 'soft',      icon: 'bx bx-bulb' },
    { name: 'Communication',   cat: 'soft',      icon: 'bx bx-conversation' },
];

// Build skill cards
const grid = document.getElementById('skills-grid');
SKILLS.forEach(s => {
    const inner = s.img ? `<img src="${s.img}" alt="${s.name}">` : `<i class="${s.icon}"></i>`;
    grid.insertAdjacentHTML('beforeend',
        `<div class="skill-card" data-category="${s.cat}">
            <div class="skill-icon-wrap">${inner}</div>
            <span class="skill-name">${s.name}</span>
        </div>`
    );
});

// Build marquee (duplicate for loop)
const MARQUEE_SKILLS = SKILLS.filter(s => s.img);
const marquee = document.getElementById('marquee-track');
[...MARQUEE_SKILLS, ...MARQUEE_SKILLS].forEach(s => {
    marquee.insertAdjacentHTML('beforeend',
        `<span class="marquee-item"><img src="${s.img}" alt="">${s.name}</span>`
    );
});

// Tab buttons + count badges + stagger
const tabBtns    = document.querySelectorAll('.skill-tab-btn');
const skillCards = document.querySelectorAll('.skill-card');
const skillsGridEl = document.getElementById('skills-grid');

// Count badges
const catCount = {};
skillCards.forEach(c => { catCount[c.dataset.category] = (catCount[c.dataset.category] || 0) + 1; });
tabBtns.forEach(btn => {
    const f = btn.dataset.filter;
    const badge = btn.querySelector('.tab-count');
    if (badge) badge.textContent = f === 'all' ? skillCards.length : (catCount[f] || 0);
});

// Stagger helpers
function setStagger() {
    let i = 0;
    skillCards.forEach(c => { if (!c.classList.contains('hidden')) c.style.setProperty('--stagger-i', i++); });
}
function reAnimate() {
    const vis = [...skillCards].filter(c => !c.classList.contains('hidden'));
    vis.forEach(c => { c.style.animation = 'none'; });
    if (vis.length) void vis[0].offsetHeight;
    vis.forEach(c => { c.style.animation = ''; });
}
setStagger();

// IntersectionObserver — play on scroll into view
const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { skillsGridEl.classList.add('in-view'); skillObs.unobserve(e.target); } });
}, { threshold: 0.08 });
skillObs.observe(document.querySelector('#skills'));

// Tab filter
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        skillCards.forEach(c => c.classList.toggle('hidden', f !== 'all' && c.dataset.category !== f));
        setStagger();
        reAnimate();
    });
});
