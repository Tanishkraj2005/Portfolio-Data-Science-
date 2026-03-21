//  Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const next = body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
});

function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeIcon.className = 'bx bx-sun';
    } else {
        body.classList.remove('light-mode');
        themeIcon.className = 'bx bx-moon';
    }
}

//  Mobile Menu 
const menuIcon = document.querySelector('#menu-icon');
const navBar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navBar.classList.toggle('active');
});

// Scroll Events 
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('.header');
const progress = document.getElementById('scroll-progress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;

    // Progress bar
    progress.style.width = `${(scrollY / docH) * 100}%`;

    // Sticky header
    header.classList.toggle('sticky', scrollY > 80);

    // Back to top visibility
    if (backToTop) backToTop.classList.toggle('visible', scrollY > 400);

    // Active nav link
    sections.forEach(sec => {
        const offset = sec.offsetTop - 160;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (scrollY >= offset && scrollY < offset + height) {
            navLinks.forEach(l => l.classList.remove('active'));
            const link = document.querySelector(`header nav a[href="#${id}"]`);
            if (link) link.classList.add('active');
        }
    });

    menuIcon.classList.remove('bx-x');
    navBar.classList.remove('active');
});

//  Back to Top
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const typed = new Typed('.multiple-text', {
    strings: ['Data Analyst', 'Data Scientist', 'ML Enthusiast', 'Problem Solver'],
    typeSpeed: 85,
    backSpeed: 55,
    backDelay: 1400,
    loop: true,
});

ScrollReveal({
    distance: '50px',
    duration: 750,
    delay: 80,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
});

ScrollReveal().reveal('.home-content .greeting, .home-content h1', { origin: 'top', interval: 80 });
ScrollReveal().reveal('.home-content .role-line, .home-content .bio, .home-stats, .social-media, .btn-group', {
    origin: 'bottom',
    interval: 100,
    delay: 150,
});
ScrollReveal().reveal('.home-img', { origin: 'right', delay: 250 });
ScrollReveal().reveal('.heading, .section-subtitle', { origin: 'top', interval: 70 });
ScrollReveal().reveal('.skill-box', { origin: 'bottom', interval: 100 });
ScrollReveal().reveal('.projects-box', { origin: 'bottom', interval: 90 });
ScrollReveal().reveal('.edu-box', { origin: 'left', interval: 140 });
ScrollReveal().reveal('.contact form', { origin: 'bottom', distance: '35px' });

function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const step = (target / duration) * 16;
    let current = 0;

    const tick = () => {
        current += step;
        if (current >= target) {
            el.textContent = target + '+';
            return;
        }
        el.textContent = Math.floor(current) + '+';
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

function showSection(section) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active-section'));
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(section).classList.add('active-section');
    document.getElementById(section === 'certificates' ? 'btn-cert' : 'btn-achv').classList.add('active');
}

// Live LeetCode Data with progress bars 
async function loadLeetCodeData() {
    try {
        const res = await fetch('https://leetcode-api-faisalshohag.vercel.app/tanishk-raj08');
        const data = await res.json();

        const easy = data.easySolved || 0;
        const medium = data.mediumSolved || 0;
        const hard = data.hardSolved || 0;
        const total = easy + medium + hard;

        const totalEasy = data.totalEasy || 825;
        const totalMedium = data.totalMedium || 2015;
        const totalHard = data.totalHard || 896;

        // Update text
        const solvedEl = document.getElementById('totalSolved');
        if (solvedEl) solvedEl.textContent = total;

        const rankEl = document.getElementById('rank');
        if (rankEl) rankEl.textContent = data.ranking ? `#${data.ranking}` : 'N/A';

        const easyLabel = document.getElementById('easyLabel');
        if (easyLabel) easyLabel.textContent = `${easy}/${totalEasy}`;

        const mediumLabel = document.getElementById('mediumLabel');
        if (mediumLabel) mediumLabel.textContent = `${medium}/${totalMedium}`;

        const hardLabel = document.getElementById('hardLabel');
        if (hardLabel) hardLabel.textContent = `${hard}/${totalHard}`;

        if (total === 0) return;

        // Donut chart
        const easyDeg = (easy / total) * 360;
        const mediumDeg = ((easy + medium) / total) * 360;

        const pie = document.querySelector('.leet-pie');
        if (pie) {
            pie.style.background = `
                conic-gradient(
                    #2db88a 0deg ${easyDeg}deg,
                    #e6b000 ${easyDeg}deg ${mediumDeg}deg,
                    #e05a5a ${mediumDeg}deg 360deg
                )
            `;
        }

    } catch (err) {
        console.error('LeetCode fetch error:', err);
        const solvedEl = document.getElementById('totalSolved');
        if (solvedEl) solvedEl.textContent = '?';
    }
}

loadLeetCodeData();
setInterval(loadLeetCodeData, 60000);

// Contact Form Submit 
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerHTML = `<i class="bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}"></i> ${message}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    btn.disabled = true;

    // Collect form data
    const formData = new FormData(e.target);
    formData.append("access_key", "edaae21f-ba84-4877-86f4-e594d317ddd0");

    // Convert FormData to JSON
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: json
    })
    .then(async (response) => {
        let jsonRes = await response.json();
        if (response.status == 200) {
            btn.innerHTML = '<i class="bx bx-send"></i> Send Message';
            btn.disabled = false;
            e.target.reset();
            showToast("Message sent! I'll get back to you soon.", 'success');
        } else {
            console.log(jsonRes);
            btn.innerHTML = '<i class="bx bx-send"></i> Send Message';
            btn.disabled = false;
            showToast("Something went wrong.", 'error');
        }
    })
    .catch((error) => {
        console.log(error);
        btn.innerHTML = '<i class="bx bx-send"></i> Send Message';
        btn.disabled = false;
        showToast("Error sending message.", 'error');
    });
}
