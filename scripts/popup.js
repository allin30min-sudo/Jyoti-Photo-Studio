// ===================================
// WELCOME POPUP CONTROLLER
// Show after 3.5 seconds delay
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('welcomePopup');

    if (popup) {
        // Initial state is hidden via CSS (opacity: 0, pointer-events: none)

        // 1. Show popup after 3.5 seconds
        setTimeout(() => {
            popup.classList.add('active');
        }, 3500);

        // 2. Auto-hide after being visible for ~4 seconds (Total 7.5s from start)
        const autoHideTimer = setTimeout(() => {
            hidePopup();
        }, 7500);

        // 3. Manual Close Button
        const closeBtn = popup.querySelector('.popup-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function (e) {
                e.preventDefault();
                clearTimeout(autoHideTimer); // Stop auto-hide if manually closed
                hidePopup();
            });
        }

        function hidePopup() {
            popup.classList.remove('active');
            popup.classList.add('hiding');

            // Wait for transition to finish then hide display (optional, but good for cleanup)
            setTimeout(() => {
                // popup.style.display = 'none'; 
            }, 500);
        }
    }
});
