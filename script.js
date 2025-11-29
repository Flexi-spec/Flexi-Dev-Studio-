const PHONE_NUMBER = "2349160368712"; // Your WhatsApp number
const GROUP_LINK = "https://chat.whatsapp.com/FunOE9HNsXcKfoHQ88gDQN?mode=wwt"; // WhatsApp group
const WEBSITE_LINK = "https://flexi-spec.github.io/Flexi-Dev-Studio-/"; // Replace with deployed site

const SHARE_MESSAGE = encodeURIComponent(
  `🚀 Welcome to Flexi Dev Studio — a vibrant community where ideas meet action! Whether you are a developer, designer, creator, or someone passionate about learning and innovation, this is the place to grow and build. Join our active Flexi Dev Studio group here: ${GROUP_LINK} to collaborate, share ideas, and stay updated, connect with me personally on WhatsApp: https://wa.me/${PHONE_NUMBER}, and explore our projects and resources on our website: ${WEBSITE_LINK}. Let's come together, inspire each other, and turn our creative visions into reality. Your journey to learning, networking, and creating amazing projects starts here!`
);

/* Replace https://your-site-link.example with your deployed site URL before sharing */

/* ======= SPLASH LOGIC ======= */
window.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const app = document.getElementById("app");

  // Show splash for ~2.4s (CSS animation times) then reveal app
  setTimeout(() => {
    splash.style.display = "none";
    app.classList.remove("hidden");
    initApp();
  }, 2400);
});

/* ======= APP INIT ======= */
function initApp() {
  document.getElementById("year").textContent = new Date().getFullYear();

  // Elements
  const hamburger = document.getElementById("hamburger");
  const sidenav = document.getElementById("sidenav");
  const navLinks = document.querySelectorAll(".nav-link");
  const joinBtn = document.getElementById("joinBtn");
  const joinBtn2 = document.getElementById("joinBtn2");
  const shareBtn = document.getElementById("shareBtn");
  const aiBtn = document.getElementById("aiBtn");
  const localCountEl = document.getElementById("localCount");
  const chatOverlay = document.getElementById("chatOverlay");
  const closeBtn = document.getElementById("closeBtn");

  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    sidenav.classList.toggle("hidden");
  });

  // Nav link routing (show sections)
  navLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = a.getAttribute("data-target");
      showSection(target);
      sidenav.classList.add("hidden");
    });
  });

  // Join flow (DM then redirect to group)
  const performJoinFlow = () => {
    // 1) open DM in new tab/window
    const dmURL = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(PRESSED_JOIN_MESSAGE)}`;
    window.open(dmURL, "_blank");

    // 2) increment localSession counter (only visible to user)
    localCount++;
    localStorage.setItem(LOCAL_KEY, String(localCount));
    localCountEl.textContent = localCount;

    // 3) after delay, open group link (slightly long to give user time to send DM)
    setTimeout(() => {
      window.open(GROUP_LINK, "_blank");
    }, 4200); // 4.2s
  };

  joinBtn.addEventListener("click", performJoinFlow);
  joinBtn2.addEventListener("click", performJoinFlow);

  // Share via WhatsApp
  shareBtn.addEventListener("click", () => {
    const waShare = `https://wa.me/?text=${SHARE_MESSAGE}`;
    window.open(waShare, "_blank");
  });

  // AI button - open fullscreen Wonderchat overlay
  aiBtn.addEventListener("click", () => {
    chatOverlay.style.display = "block";
  });

  // Close button for chat overlay
  closeBtn.addEventListener("click", () => {
    chatOverlay.style.display = "none";
  });

  // Simple routing - show home by default
  showSection("home");
}

/* show/hide sections */
function showSection(id) {
  const hero = document.getElementById("home");
  const join = document.getElementById("join");
  const contact = document.getElementById("contact");
  const about = document.getElementById("about"); // fixed undefined

  hero.style.display = (id === "home") ? "block" : "none";
  join.style.display = (id === "join") ? "block" : "none";
  contact.style.display = (id === "contact") ? "block" : "none";
  about.style.display = (id === "about") ? "block" : "none";
}
