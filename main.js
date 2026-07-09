// System Navigation Engine
function navigateTo(pageId) {
    // Hide all structural page components
    const pages = document.querySelectorAll('[data-page]');
    pages.forEach(page => page.classList.remove('active-view'));

    // Show current target page
    const activePage = document.querySelector(`[data-page="${pageId}"]`);
    if (activePage) {
        activePage.classList.add('active-view');
    }

    // Sync navigation highlight links
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => link.classList.remove('active'));
    
    const currentActiveLink = document.getElementById(`nav-${pageId}`);
    if (currentActiveLink) {
        currentActiveLink.classList.add('active');
    }

    // Scroll window safely to top viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Initialize running guestbook logic if module is loaded
    if (pageId === 'guestbook') {
        renderRegistry();
    }
}

// Live Client Guestbook Database Engine
function signBook() {
    const input = document.getElementById("signerName");
    if (!input || !input.value.trim()) return;

    let entries = JSON.parse(localStorage.getItem("aua_guestbook") || "[]");
    entries.unshift({
        name: input.value.trim(),
        timestamp: new Date().toLocaleDateString()
    });

    localStorage.setItem("aua_guestbook", JSON.stringify(entries));
    input.value = "";
    renderRegistry();
}

function renderRegistry() {
    const container = document.getElementById("registryLogs");
    if (!container) return;
    
    let entries = JSON.parse(localStorage.getItem("aua_guestbook") || "[]");
    
    if (entries.length === 0) {
        container.innerHTML = `<p style="font-style: italic; color: var(--text-secondary);">No signatures logged inside this section node yet.</p>`;
        return;
    }

    container.innerHTML = entries.map(entry => `
        <div class="log-entry">
            <span style="font-weight: 500;">${escapeHtml(entry.name)}</span>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary);">${entry.timestamp}</span>
        </div>
    `).join("");
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Boot system to land cleanly on Home layout panel upon content load
document.addEventListener("DOMContentLoaded", () => {
    navigateTo('home');
});
