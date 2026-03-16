document.addEventListener("DOMContentLoaded", init);

function init() {
  initMobileMenu();
  initBlogModal();
}

function initMobileMenu() {
  const body = document.body;
  const button = document.querySelector(".menu-button");
  const nav = document.querySelector(".main-nav");
  const backdrop = document.querySelector(".nav-backdrop");
  const navWrapper = document.querySelector(".site-nav");

  if (!body.classList.contains("page-site") || !button || !nav) return;

  const setMenuState = (isOpen) => {
    body.classList.toggle("menu-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
  };

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") !== "true";
    setMenuState(isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  backdrop?.addEventListener("click", () => setMenuState(false));

  document.addEventListener("click", (event) => {
    if (window.innerWidth > 760) return;
    if (button.getAttribute("aria-expanded") !== "true") return;

    const target = event.target;
    if (!(target instanceof Node)) return;
    if (button.contains(target)) return;
    if (navWrapper?.contains(target)) return;

    setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      setMenuState(false);
    }
  });
}

function initBlogModal() {
  const modal = document.querySelector("[data-post-modal]");
  const content = document.querySelector("[data-post-content]");
  const triggers = document.querySelectorAll(".post-launch");

  if (!modal || !content || triggers.length === 0) return;

  let activeTrigger = null;

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    content.innerHTML = '<p class="meta">Loading post...</p>';
    activeTrigger?.focus();
    activeTrigger = null;
  };

  const openModal = async (trigger) => {
    const url = trigger.getAttribute("data-post-url");
    if (!url) return;

    activeTrigger = trigger;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    content.innerHTML = '<p class="meta">Loading post...</p>';

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load ${url}`);
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const post = doc.querySelector(".post-shell");

      if (!post) {
        throw new Error("Post content not found");
      }

      const heading = post.querySelector("h1");
      if (heading) {
        heading.id = "post-modal-title";
      }

      content.innerHTML = post.innerHTML;
      content.focus();
    } catch (error) {
      content.innerHTML = `
        <h2 id="post-modal-title">Could not load post</h2>
        <p>The post could not be opened in the overlay. <a href="${url}">Open it on its own page</a>.</p>
      `;
      content.focus();
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(trigger);
    });
  });

  modal.querySelectorAll("[data-post-close]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}
