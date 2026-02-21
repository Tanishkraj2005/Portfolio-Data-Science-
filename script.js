// Toggle Icon Navbar

let menuIcon = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navBar.classList.toggle('active');
};



// Scroll section active link

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset+height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');

            });
        };
    });

    //  Sticky Navbar

    let header = document.querySelector('header')

    header.classList.toggle('sticky',window.scrollY > 100);

    // Remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navBar.classList.remove('active');
};

// Scroll Reveal

ScrollReveal({ 
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200 
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Typed js

const typed = new Typed('.multiple-text',{
    strings: ['Data Analyst','Data Scientist'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// For switching between achivement and certificates

function showSection(section) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active-section'));
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));

    document.getElementById(section).classList.add('active-section');

    if(section === "certificates") {
        document.querySelectorAll('.toggle-btn')[0].classList.add('active');
    } else {
        document.querySelectorAll('.toggle-btn')[1].classList.add('active');
    }
}

// Live leetcode data

async function loadLeetCodeData() {
    try {
        const res = await fetch("https://leetcode-api-faisalshohag.vercel.app/tanishk-raj08");
        const data = await res.json();

        const easy = data.easySolved || 0;
        const medium = data.mediumSolved || 0;
        const hard = data.hardSolved || 0;

        const totalSolved = easy + medium + hard;
        document.getElementById("totalSolved").innerText = totalSolved;

        document.getElementById("rank").innerText =
            data.ranking ? `#${data.ranking}` : "N/A";

        document.getElementById("easyLabel").innerText =
            `${easy} / ${data.totalEasy || 825}`;
        document.getElementById("mediumLabel").innerText =
            `${medium} / ${data.totalMedium || 2015}`;
        document.getElementById("hardLabel").innerText =
            `${hard} / ${data.totalHard || 896}`;

        if (totalSolved === 0) return;

        const easyDeg = (easy / totalSolved) * 360;
        const mediumDeg = ((easy + medium) / totalSolved) * 360;

        document.querySelector(".leet-pie").style.background = `
            conic-gradient(
                #36d6a9 0deg ${easyDeg}deg,
                #ffd33d ${easyDeg}deg ${mediumDeg}deg,
                #ff6b6b ${mediumDeg}deg 360deg
            )
        `;

    } catch (err) {
        document.getElementById("totalSolved").innerText = "Error";
        console.error("LeetCode Fetch Error:", err);
    }
    
}



loadLeetCodeData();
setInterval(loadLeetCodeData, 60000);

