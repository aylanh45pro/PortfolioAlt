document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const drawerToggle = document.getElementById('drawer-toggle');
    const navDrawer = document.getElementById('nav-drawer');
    const mainContent = document.querySelector('.main-content');
    const navItems = document.querySelectorAll('.nav-item');
    const pageSections = document.querySelectorAll('.page-section');
    
    // 1. Drawer Toggle logic
    drawerToggle.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navDrawer.classList.toggle('active-mobile');
        } else {
            navDrawer.classList.toggle('hidden');
            mainContent.classList.toggle('drawer-hidden');
        }
    });

    // 2. Main Page navigation switching
    function switchMainPage(pageId) {
        // Deactivate all nav buttons & pages
        navItems.forEach(item => item.classList.remove('active'));
        pageSections.forEach(section => section.classList.remove('active'));

        // Activate matching elements
        const targetBtn = document.querySelector(`.nav-item[data-page="${pageId}"]`);
        const targetSection = document.getElementById(`page-${pageId}`);
        
        if (targetBtn && targetSection) {
            targetBtn.classList.add('active');
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Auto close drawer on mobile size
        if (window.innerWidth <= 768) {
            navDrawer.classList.remove('active-mobile');
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.getAttribute('data-page');
            switchMainPage(pageId);
        });
    });

    // 3. Tab switching inside main pages
    function initTabNavigation() {
        const tabContainers = document.querySelectorAll('.page-section');
        
        tabContainers.forEach(section => {
            const tabButtons = section.querySelectorAll('.v-tab-btn');
            const tabPanes = section.querySelectorAll('.v-tab-pane');

            tabButtons.forEach((btn, idx) => {
                btn.addEventListener('click', () => {
                    // Remove active from all tabs & panes in this section
                    tabButtons.forEach(b => b.classList.remove('active'));
                    tabPanes.forEach(p => p.classList.remove('active'));

                    // Set active to clicked tab
                    btn.classList.add('active');
                    if (tabPanes[idx]) {
                        tabPanes[idx].classList.add('active');
                    }
                });
            });
        });
    }

    initTabNavigation();

    // 4. Internal Synthesis Links deep-linking
    const internalLinks = document.querySelectorAll('.internal-link');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-target');
            const targetTabIdx = parseInt(link.getAttribute('data-tab'), 10);

            // Switch to the main page first
            switchMainPage(targetPage);

            // Active the targeted tab index within that page
            const targetPageEl = document.getElementById(`page-${targetPage}`);
            if (targetPageEl) {
                const tabButtons = targetPageEl.querySelectorAll('.v-tab-btn');
                const tabPanes = targetPageEl.querySelectorAll('.v-tab-pane');

                if (tabButtons[targetTabIdx]) {
                    tabButtons.forEach(b => b.classList.remove('active'));
                    tabPanes.forEach(p => p.classList.remove('active'));

                    tabButtons[targetTabIdx].classList.add('active');
                    if (tabPanes[targetTabIdx]) {
                        tabPanes[targetTabIdx].classList.add('active');
                    }
                }
            }
        });
    });

    // Adjust UI on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navDrawer.classList.remove('active-mobile');
        } else {
            navDrawer.classList.remove('hidden');
            mainContent.classList.remove('drawer-hidden');
        }
    });
});
