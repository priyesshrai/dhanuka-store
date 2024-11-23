const sliderBoxes = document.querySelectorAll(".bottom-img img");
const rightSectionImage = document.querySelector(".right-section img");

function fadeOutAndIn(element, newSrc, duration = 500) {
  element.style.transition = `opacity ${duration}ms ease-in-out`;
  element.style.opacity = 0;

  setTimeout(() => {
    element.src = newSrc;
    element.style.opacity = 1;
  }, duration);
}

sliderBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    const tempSrc = box.src;

    fadeOutAndIn(box, rightSectionImage.src);
    fadeOutAndIn(rightSectionImage, tempSrc);
  });
});

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

let tl = gsap.timeline();

gsap.to(".d-section .image-section img", {
  transform: "translateX(-570%)",
  scrollTrigger: {
    trigger: ".d-section",
    scroller: "body",
    // markers: true,
    start: "top 4%",
    end: "top -200%",
    scrub: 1,
    pin: true,
  },
});

const heading = document.querySelector(".hero-section .heading h1");
const sub_heading = document.querySelector(".hero-section .sub-description p");
const word = heading.textContent
  .trim()
  .split(/\s+/)
  .map((val) => (val === " " ? "&nbsp;" : `<span>${val}</span>`))
  .join(" ");
heading.innerHTML = word;

const sub_word = sub_heading.textContent
  .trim()
  .split(/\s+/)
  .filter((val) => val !== "")
  .map((val) => `<span>${val}</span>`)
  .join(" ");
sub_heading.innerHTML = sub_word;

tl.from(".hero-section .heading h1 span", {
  opacity: 0.2,
  delay: 0.2,
  duration: 0.3,
  stagger: 0.1,
  ease: "power2.out",
});

gsap.from(".hero-section .sub-description p span", {
  opacity: 0.2,
  delay: 0.2,
  duration: 0.3,
  stagger: 0.1,
  ease: "power2.out",
});

tl.call(() => {
  const spans = document.querySelectorAll(".hero-section .heading h1 span");

  function flipOneWord() {
    const randomSpan = spans[Math.floor(Math.random() * spans.length)];

    gsap.to(randomSpan, {
      rotationX: 360,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(randomSpan, { rotationX: 0 });
        setTimeout(flipOneWord, 1500);
      },
    });
  }

  flipOneWord();
});

gsap.from(".products-cards .first-card-wraper", {
  delay: 0.5,
  opacity: 0,
  x: -200,
  duration: 1,
  ease: "power2.out",
});

gsap.from(".products-cards .second-card-container .second-card", {
  delay: 0.8,
  opacity: 0,
  x: 200,
  duration: 0.8,
  stagger: 0.3,
  ease: "power2.out",
});

const features_sub_heading = document.querySelector(
  ".section .section-wraper .sub-heading p"
);
const features_sub = features_sub_heading.textContent
  .trim()
  .split("")
  .map((val) => (val === " " ? "&nbsp;" : `<span>${val}</span>`))
  .join("");
features_sub_heading.innerHTML = features_sub;

gsap.from(".section .section-wraper .sub-heading p span", {
  opacity: 0,
  duration: 0.3,
  stagger: 0.1,
  y: 100,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".section .section-wraper",
    start: "top 80%",
    end: "top 40%",
    scrub: 2,
  },
});

const features_heading = document.querySelector(
  ".section .section-wraper .section-heading h2"
);
const features_hed = features_heading.textContent
  .trim()
  .split(" ")
  .map((val) => (val === " " ? "&nbsp;" : `<span>${val}</span>`))
  .join(" ");
features_heading.innerHTML = features_hed;

gsap.from(".section .section-wraper .section-heading h2 span", {
  delay: 0.5,
  opacity: 0,
  duration: 0.7,
  stagger: 0.18,
  scrollTrigger: {
    trigger: ".section .section-wraper",
    start: "top 80%",
    end: "top 45%",
    scrub: 2,
    // markers:true
  },
});

gsap.from(".section .section-wraper .sub-description p", {
  delay: 0.8,
  opacity: 0,
  duration: 0.7,
  scrollTrigger: {
    trigger: ".section .section-wraper",
    start: "top 70%",
    end: "top 20%",
    scrub: 2,
  },
});

gsap.from(".section .section-wraper .details-card-wraper .details-card", {
  delay: 0.2,
  opacity: 0,
  duration: 0.5,
  stagger: 0.2,
  ease: "power2.out",
  y: 300,
  scrollTrigger: {
    trigger: ".section .section-wraper",
    start: "top 35%",
    end: "top 10%",
    scrub: 2,
  },
});

gsap.from(".section .saree-section .left-section-wraper .left-section", {
  opacity: 0,
  delay: 0.2,
  duration: 3,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".section .saree-section .left-section-wraper",
    start: "top 65%",
    end: "top 30%",
    scrub: 2,
  },
});
gsap.from(
  ".section .saree-section .left-section-wraper .left-bottom-section .bottom-img-container",
  {
    opacity: 0,
    delay: 0.2,
    duration: 0.5,
    stagger: 0.2,
    ease: "power2.out",
    y: 300,
    scrollTrigger: {
      trigger: ".section .saree-section .left-section-wraper",
      start: "top 20%",
      end: "top 10%",
      scrub: 2,
    },
  }
);

gsap.from(".section .saree-section .right-section-wraper", {
  opacity: 0,
  duration: 1,
  ease: "power2.out",
  x: 300,
  scrollTrigger: {
    trigger: ".section .saree-section .right-section-wraper",
    start: "top 70%",
    end: "top 30%",
    scrub: 2,
  },
});

const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section .items-wraper",
    scroller: "body",
    top: "top 55%",
    end: "top 30%",
    scrub: 2,
  },
});

tl2.from(
  ".section .items-wraper .item-one-container",
  {
    opacity: 0,
    delay: 0.2,
    duration: 1,
    ease: "power2.out",
    x: -300,
  },
  "asd"
);
tl2.from(
  ".section .items-wraper .item-two-container .item-inner",
  {
    opacity: 0,
    delay: 0.2,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.3,
  },
  "asd"
);
tl2.from(
  ".section .items-wraper .item-three-container",
  {
    opacity: 0,
    delay: 0.2,
    duration: 1,
    ease: "power2.out",
    x: 300,
  },
  "asd"
);

const tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section .items-wraper .item-section-heading-container",
    scroller: "body",
    top: "top 25%",
    end: "top 5%",
    scrub: 3,
  },
});

const product = document.querySelector(
  ".section .item-section-heading-container .item-section-heading h2"
);

const productWords = product.textContent
  .trim()
  .split(" ")
  .map((val) => (val === " " ? "&nbsp;" : `<span>${val}</span>`))
  .join(" ");
product.innerHTML = productWords;

tl3.from(
  ".section .item-section-heading-container .item-section-heading h2 span",
  {
    opacity: 0,
    duration: 5,
    y: 300,
    stagger: 0.5,
  },
  "asd"
);

const product_desc = document.querySelector(
  ".section .item-section-heading-container .item-section-sub-heading p"
);

const productDescWords = product_desc.textContent
  .trim()
  .split(/\s+/)
  .filter((val) => val !== "")
  .map((val) => `<span>${val}</span>`)
  .join(" ");
product_desc.innerHTML = productDescWords;

tl3.from(
  ".section .item-section-heading-container .item-section-sub-heading p span",
  {
    opacity: 0.2,
    duration: 5,
    stagger: 0.3,
    delay: 3,
    ease: "power2.out",
  },
  "asd"
);

tl3.from(
  ".section .item-section-heading-container .item-section-sub-heading .shop-btn a button",
  {
    opacity: 0,
    duration: 5,
    delay: 8,
    x: 300,
    ease: "power2.out",
  },
  "asd"
);

const d_section = document.querySelector(".d-section h1");
const d_section_word = d_section.textContent
  .trim()
  .split(/\s+/)
  .map((val) => (val === " " ? "&nbsp;" : `<span>${val}</span>`))
  .join(" ");
d_section.innerHTML = d_section_word;

gsap.from(".d-section h1 span", {
  opacity: 0,
  delay: 0.2,
  duration: 1,
  stagger: 0.2,
  y: 200,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".d-section h1",
    start: "top 70%",
    end: "top 25%",
    scrub: 2,
  },
});

const contact_heading = document.querySelector(
  ".contact-section .contact-heading h1"
);
const contact_heading_word = contact_heading.textContent
  .trim()
  .split(/\s+/)
  .map((val) => (val === " " ? "&nbsp;" : `<span>${val}</span>`))
  .join(" ");
contact_heading.innerHTML = contact_heading_word;

gsap.from(".contact-section .contact-heading h1 span", {
  opacity: 0,
  delay: 0.2,
  duration: 1,
  stagger: 0.2,
  y: 200,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".contact-section .contact-heading",
    start: "top 80%",
    end: "top 30%",
    scrub: 2,
  },
});

gsap.from(".contact-section .contact-tabs-container ul li", {
  opacity: 0,
  stagger: 0.2,
  y: 200,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".contact-section .contact-heading",
    start: "top 40%",
    end: "top 25%",
    scrub: 2,
  },
});

gsap.from(".contact-section .contact-sub-heading p", {
  opacity: 0,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".contact-section",
    start: "top 60%",
    end: "top 35%",
    scrub: 2,
  },
});

const footer_heading = document.querySelector(".footer .footer-heading h1");
const footer_heading_letter = footer_heading.textContent
  .trim()
  .split("")
  .map((val) => (val === " " ? "&nbsp;" : `<span>${val}</span>`))
  .join("");
footer_heading.innerHTML = footer_heading_letter;

gsap.from(".footer .footer-heading h1 span", {
  opacity: 0,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".footer",
    start: "top 72%",
    end: "top 47%",
    scrub: 2,
  },
});

const tabs = document.querySelectorAll(".contact-tabs-container ul li");
const contactInfo = document.querySelector(".contact-info .contact-details");

const contactData = {
  Mahmoorganj: {
    phone: "09919600600, 0542-2220110 , 7348600600",
    address:
      "Virat Aishwarya Complex, Mahmoorganj Rd, Mahmoorganj, Varanasi, Uttar Pradesh 221010",
    email: "dhanukastores@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d115422.29323008511!2d82.981481!3d25.305996!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e320818bd827b%3A0x28e3492af94ba276!2sDHANUKA%20STORES!5e0!3m2!1sen!2sin!4v1732178416915!5m2!1sen!2sin",
  },
  Bansphatak: {
    phone: "7348400400, 7348500500",
    address: "C.K. 37/21 Kotwalpura Kotwalpura Varanasi, Uttar Pradesh 221001",
    email: "dhanukastores@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28854.401140851118!2d83.009212!3d25.310918!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2e1c2a689f9d%3A0xdc301f719b4db13f!2sDhanuka!5e0!3m2!1sen!2sin!4v1732186604022!5m2!1sen!2sin",
  },
  Rathyatra: {
    phone: "7348700700, 6386439350",
    address: "B 37/117, M-R-S-B, Rathyatra Varanasi, Uttar Pradesh",
    email: "dhanukastores@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28855.432096772623!2d82.989648!3d25.306589!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e320083374c79%3A0x649ab934bde4693a!2sDhanuka%20Silks!5e0!3m2!1sen!2sin!4v1732186743943!5m2!1sen!2sin",
  },
  Nadesar: {
    phone: "7348400400, 6386439350",
    address: "Shop No-S18/38-A-36 Opp Hotal Taj Ganges Nadesar Varanasi-221002",
    email: "dhanukastores@gmail.com",
    map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d450.7608097582822!2d82.986283!3d25.334879!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2d6a1f22030b%3A0xb186f6b2d0d5679c!2sSardarji%20papad%20rahul%20papad%20bhandar!5e0!3m2!1sen!2sin!4v1732186822031!5m2!1sen!2sin",
  },
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));

    tab.classList.add("active");

    const selectedTab = tab.textContent.trim();
    const data = contactData[selectedTab];

    if (data) {
      contactInfo.innerHTML = `
        <div class="details-container">
          <div class="contact-icon-holder">
            <i class="fa-solid fa-phone"></i>
          </div>
          <div class="contact-data">
            <p>${data.phone}</p>
          </div>
        </div>
        <div class="details-container">
          <div class="contact-icon-holder">
            <i class="fa-solid fa-location-dot"></i>
          </div>
          <div class="contact-data">
            <p>${data.address}</p>
          </div>
        </div>
        <div class="details-container">
          <div class="contact-icon-holder">
            <i class="fa-solid fa-envelope-open-text"></i>
          </div>
          <div class="contact-data">
            <p>${data.email}</p>
          </div>
        </div>
        <div class="details-container">
          <iframe
            src="${data.map}"
            width="100%"
            height="250"
            style="border: 0; border-radius: 20px"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      `;
    }
  });
});




const menuTl = gsap.timeline()

menuTl.to(".menu-links-container",{
  delay:0.3,
  duration:0.3,
  clipPath:"circle(150% at 100% 0)",
})

menuTl.from(".menu-links-container ul li a",{
  y:100,
  opacity:0,
  duration:0.2,
  delay:0.15,
  stagger:0.2
})
menuTl.from(".close-menu-btn-container",{
  opacity:0,
  duration:0.2,
})

menuTl.pause()


const menuBtnContainer = document.querySelector('.menu-btn-container');
const menuBtn = document.querySelectorAll('.menu-btn-container .menu-btn-wraper .menu-btn');

const closeMenuBtn = document.querySelector(".close-menu-btn-container")
const closeMenu = document.querySelectorAll('.close-menu-btn-container .close-menu-btn-wraper .close-menu-btn');

let hideMenu = true;

menuBtnContainer.addEventListener('click', () => {
  menuBtn.forEach(btn => {
    btn.classList.add('active-btn');
  });
  closeMenu.forEach(btn => {
    btn.classList.remove('close-active-btn');
  });
  menuTl.play(); 
});

closeMenuBtn.addEventListener('click',()=>{
  menuBtn.forEach(btn => {
    btn.classList.remove('active-btn');
  });
  closeMenu.forEach(btn => {
    btn.classList.add('close-active-btn');
  });
  menuTl.reverse()
})

const menuLinks = document.querySelectorAll(".menu-links-container ul li")

menuLinks.forEach((links)=>{
  links.addEventListener('click',()=>{
    menuTl.reverse()
    menuBtn.forEach(btn => {
      btn.classList.remove('active-btn');
    });
    closeMenu.forEach(btn => {
      btn.classList.remove('close-active-btn');
    });
  })
  
})
