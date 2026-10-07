/**
 * MICROTECH — FRONTEND INTERACTIVITY & UX SCRIPT
 * High-performance, accessible, dependency-free JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
  // CONFIGURACIÓN OFICIAL DE CONTACTO
  const WHATSAPP_PHONE = "573136371610"; // WhatsApp oficial MicroTech

  /* ==========================================================================
     1. HEADER & MOBILE MENU DRAWER
     ========================================================================== */
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinksWrapper = document.querySelector(".nav-links-wrapper");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sticky header background shift
  const handleScrollHeader = () => {
    if (window.scrollY > 25) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScrollHeader, { passive: true });
  handleScrollHeader();

  // Mobile menu toggle
  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinksWrapper.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");

    // Hamburger icon animation
    const lines = menuToggle.querySelectorAll(".hamburger-line");
    if (isOpen) {
      lines[0].style.transform = "translateY(7px) rotate(45deg)";
      lines[1].style.opacity = "0";
      lines[2].style.transform = "translateY(-7px) rotate(-45deg)";
    } else {
      lines[0].style.transform = "none";
      lines[1].style.opacity = "1";
      lines[2].style.transform = "none";
    }
  });

  const closeMobileMenu = () => {
    navLinksWrapper?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menú");
    const lines = menuToggle?.querySelectorAll(".hamburger-line");
    if (lines && lines.length === 3) {
      lines[0].style.transform = "none";
      lines[1].style.opacity = "1";
      lines[2].style.transform = "none";
    }
  };

  navLinks.forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  /* ==========================================================================
     2. ACTIVE SCROLLSPY (NAVBAR HIGHLIGHT)
     ========================================================================== */
  const sections = document.querySelectorAll("section[id]");

  const handleScrollspy = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  };
  window.addEventListener("scroll", handleScrollspy, { passive: true });

  /* ==========================================================================
     3. FLOATING WHATSAPP WIDGET INTERACTION
     ========================================================================== */
  const waFloatingBtn = document.getElementById("wa-floating-btn");
  const waFlyout = document.getElementById("wa-chat-flyout");
  const waCloseBtn = document.getElementById("wa-close-btn");
  const waInput = document.getElementById("wa-chat-input");
  const waSendBtn = document.getElementById("wa-send-btn");
  const waQuickChips = document.querySelectorAll(".wa-quick-chip");

  const openWhatsAppChat = (messageText) => {
    const cleanMessage = encodeURIComponent(messageText.trim() || "Hola MicroTech, deseo solicitar información sobre sus servicios.");
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${cleanMessage}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const toggleWaFlyout = () => {
    const isOpen = waFlyout.classList.toggle("open");
    waFloatingBtn.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      waInput?.focus();
    }
  };

  const closeWaFlyout = () => {
    waFlyout?.classList.remove("open");
    waFloatingBtn?.setAttribute("aria-expanded", "false");
  };

  waFloatingBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleWaFlyout();
  });

  waCloseBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeWaFlyout();
  });

  // Quick Chips in Floating Widget
  waQuickChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const msg = chip.getAttribute("data-msg") || chip.textContent;
      openWhatsAppChat(msg);
      closeWaFlyout();
    });
  });

  // Custom text in Floating Widget
  const submitFloatingMessage = () => {
    const text = waInput?.value.trim();
    if (text) {
      openWhatsAppChat(`Hola MicroTech, ${text}`);
      waInput.value = "";
      closeWaFlyout();
    }
  };

  waSendBtn?.addEventListener("click", submitFloatingMessage);
  waInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitFloatingMessage();
    }
  });

  // Click outside to close Floating Widget & Mobile Menu
  document.addEventListener("click", (e) => {
    if (waFlyout?.classList.contains("open") && !waFlyout.contains(e.target) && !waFloatingBtn.contains(e.target)) {
      closeWaFlyout();
    }
    if (navLinksWrapper?.classList.contains("open") && !navLinksWrapper.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Keyboard accessibility (ESC closes menus/flyouts)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (waFlyout?.classList.contains("open")) closeWaFlyout();
      if (navLinksWrapper?.classList.contains("open")) closeMobileMenu();
    }
  });

  /* ==========================================================================
     4. ASISTENTE INTERACTIVO DE WHATSAPP (SECCIÓN CONTACTO)
     ========================================================================== */
  const serviceChips = document.querySelectorAll(".service-chip");
  const userNameInput = document.getElementById("user-name");
  const userMessageInput = document.getElementById("user-message");
  const btnSubmitWhatsApp = document.getElementById("btn-submit-whatsapp");

  let selectedService = "Reparación Técnica";

  serviceChips.forEach(chip => {
    chip.addEventListener("click", () => {
      serviceChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      selectedService = chip.getAttribute("data-service") || chip.textContent.trim();
    });
  });

  btnSubmitWhatsApp?.addEventListener("click", () => {
    const name = userNameInput?.value.trim();
    const detail = userMessageInput?.value.trim();

    let fullMessage = `Hola MicroTech, deseo consultar sobre *${selectedService}*.`;
    if (name) {
      fullMessage += ` Mi nombre es ${name}.`;
    }
    if (detail) {
      fullMessage += ` Detalle: ${detail}`;
    }

    openWhatsAppChat(fullMessage);
  });

  /* ==========================================================================
     5. COPIAR NÚMERO DE TELÉFONO
     ========================================================================== */
  const copyPhoneBtn = document.getElementById("copy-phone-btn");
  const displayPhone = document.getElementById("display-phone");
  const copyText = document.getElementById("copy-text");

  copyPhoneBtn?.addEventListener("click", async () => {
    const phoneToCopy = displayPhone?.textContent.trim() || "+57 313 637 1610";
    try {
      await navigator.clipboard.writeText(phoneToCopy);
      if (copyText) {
        const originalText = copyText.textContent;
        copyText.textContent = "¡Copiado! ✓";
        copyPhoneBtn.style.background = "var(--wa-green)";
        copyPhoneBtn.style.borderColor = "var(--wa-green)";

        setTimeout(() => {
          copyText.textContent = originalText;
          copyPhoneBtn.style.background = "";
          copyPhoneBtn.style.borderColor = "";
        }, 2200);
      }
    } catch {
      // Fallback si clipboard falla
      if (copyText) copyText.textContent = "Copiado";
    }
  });

  /* ==========================================================================
     6. ANIMATED COUNTERS FOR STATS
     ========================================================================== */
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  let statsCounted = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute("data-target") || "0", 10);
      let count = 0;
      const step = Math.ceil(target / 45);

      const updateCounter = () => {
        count += step;
        if (count >= target) {
          stat.textContent = `+${target}`;
        } else {
          stat.textContent = `+${count}`;
          requestAnimationFrame(updateCounter);
        }
      };
      updateCounter();
    });
  };

  /* ==========================================================================
     7. SCROLL REVEAL OBSERVER
     ========================================================================== */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          
          // Triggers counter animation if in hero
          if (!statsCounted && entry.target.querySelector(".stat-number[data-target]")) {
            statsCounted = true;
            animateCounters();
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     8. YEAR IN FOOTER
     ========================================================================== */
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
