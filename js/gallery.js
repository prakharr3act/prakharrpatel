const btn = document.getElementById("themeToggle");
const icon = btn.querySelector("i");
const saved = localStorage.getItem("theme");


if (saved) {
  document.documentElement.setAttribute("data-theme", saved);
  icon.className = saved === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

btn.onclick = () => {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute("data-theme", dark ? "light" : "dark");
  localStorage.setItem("theme", dark ? "light" : "dark");
  icon.className = dark ? "fa-solid fa-moon" : "fa-solid fa-sun";
};


const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.onclick = () => {
  mobileMenu.classList.toggle("active");
  menuBtn.innerHTML = mobileMenu.classList.contains("active")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
  document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto";
};


setInterval(() => {
  document.getElementById("time").innerText = new Date().toLocaleString();
}, 1000);


document.querySelector(".logo-wrap").addEventListener("click", function () {
  this.classList.toggle("active");
});


window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if(loader){
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      loader.classList.add("fade-out");
      document.body.style.overflow = "auto";
    }, 2500);
  }
});

const overlay = document.getElementById("overlay");
const closePopup = document.getElementById("closePopup");

document.querySelectorAll(".certificate-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (overlay) {
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden"; 
    }
  });
});

if (closePopup) {
  closePopup.addEventListener("click", () => {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  });
}


if (overlay) {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}


const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('#lightbox .close');
const dotsContainer = document.querySelector('#lightbox .dots');

let currentIndex = 0;
let startX = 0;
let endX = 0;


galleryItems.forEach((img, index) => {
  const dot = document.createElement('span');
  dot.dataset.index = index;
  dotsContainer.appendChild(dot);

  dot.addEventListener('click', () => {
    currentIndex = index;
    updateLightbox();
  });
});


galleryItems.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    lightbox.classList.add('active');
    updateLightbox();
  });
});


function updateLightbox() {
  lightboxImg.src = galleryItems[currentIndex].src;
  const dots = dotsContainer.querySelectorAll('span');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}


closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox) lightbox.classList.remove('active');
});


lightboxImg.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

lightboxImg.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

lightboxImg.addEventListener('touchend', () => {
  let diff = startX - endX;
  if(Math.abs(diff) > 50) {
    if(diff > 0) nextImage();  
    else prevImage();
  }
});

function nextImage() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateLightbox();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightbox();
}


document.addEventListener('keydown', (e) => {
  if(!lightbox.classList.contains('active')) return;
  if(e.key === 'ArrowRight') nextImage();
  if(e.key === 'ArrowLeft') prevImage();
});


let images = document.querySelectorAll('.gallery-item img')
let current = 0

images.forEach((img, index)=>{
  img.onclick = ()=>{
    current = index
    showImage()
  }
})

function showImage(){
  lightboxImg.src = images[current].src
  updateDots()
}



const pill95122 = document.getElementById("pill95122");

const savedTheme = localStorage.getItem("theme");
if(savedTheme){
  document.documentElement.setAttribute("data-theme", savedTheme);
}

pill95122.onclick = () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};