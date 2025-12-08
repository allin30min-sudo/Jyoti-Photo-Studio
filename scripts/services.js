document.addEventListener('DOMContentLoaded', () => {
    initServiceInteractions();
    initBookingLogic();
    handleUrlParams();
});

function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        // Find corresponding card and panel
        const card = document.querySelector(`.service-interactive-card[data-category="${category}"]`);
        const panel = document.getElementById(`panel-${category}`);

        if (card && panel) {
            // Activate them
            card.click();

            // Or manually if click has side effects or wait
            if (!card.classList.contains('active')) {
                card.classList.add('active');
                panel.classList.add('active');

                // Scroll
                setTimeout(() => {
                    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        }
    }
}

// State
let selectedServices = new Set();

function initServiceInteractions() {
    const cards = document.querySelectorAll('.service-interactive-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const targetPanel = document.getElementById(`panel-${category}`);

            // Independent Toggle Logic (Allow multiple open)
            card.classList.toggle('active');

            if (targetPanel) {
                targetPanel.classList.toggle('active');

                // Scroll to panel if opening
                if (targetPanel.classList.contains('active')) {
                    setTimeout(() => {
                        targetPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            }
        });
    });
}

function initBookingLogic() {
    const checkboxes = document.querySelectorAll('.service-checkbox');
    const bookingBar = document.getElementById('booking-bar');
    const countSpan = document.getElementById('selected-count');
    const bookBtn = document.getElementById('btn-book-now');
    const modal = document.getElementById('booking-modal');
    // const closeModal = document.querySelector('.close-modal-btn'); 
    const confirmBtn = document.getElementById('btn-confirm-booking');
    const editBtn = document.getElementById('btn-edit-booking');

    // Checkbox Change Handler
    checkboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            const serviceName = e.target.value;
            const panel = e.target.closest('.sub-services-panel');
            const categoryLabel = panel.dataset.categoryLabel;
            const categoryId = panel.id.replace('panel-', '');

            if (e.target.checked) {
                selectedServices.add({
                    name: serviceName,
                    category: categoryLabel,
                    categoryId: categoryId
                });
            } else {
                // Remove item logic
                const tempSet = new Set(selectedServices);
                tempSet.forEach(item => {
                    if (item.name === serviceName) selectedServices.delete(item);
                });
            }

            updateBookingBar();
        });
    });

    function updateBookingBar() {
        countSpan.textContent = selectedServices.size;

        if (selectedServices.size > 0) {
            bookingBar.classList.add('visible');
        } else {
            bookingBar.classList.remove('visible');
        }
    }

    // Open Modal
    if (bookBtn) {
        bookBtn.addEventListener('click', () => {
            populateModal();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Modal Actions
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';

            // SMART EDIT: Auto-expand categories with active selections
            const categoriesToOpen = new Set();
            selectedServices.forEach(item => {
                if (item.categoryId) categoriesToOpen.add(item.categoryId);
            });

            categoriesToOpen.forEach(catId => {
                const panel = document.getElementById(`panel-${catId}`);
                const card = document.querySelector(`.service-interactive-card[data-category="${catId}"]`);

                if (panel && !panel.classList.contains('active')) {
                    panel.classList.add('active');
                }
                if (card && !card.classList.contains('active')) {
                    card.classList.add('active');
                }
            });
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const message = formatWhatsAppMessage();
            const whatsappUrl = `https://wa.me/918287852599?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close on click outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

function populateModal() {
    const listContainer = document.getElementById('modal-summary-list');
    listContainer.innerHTML = '';

    if (selectedServices.size === 0) return;

    // Group by Category
    const grouped = {};
    selectedServices.forEach(item => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item.name);
    });

    for (const [cat, items] of Object.entries(grouped)) {
        const catHeader = document.createElement('h4');
        catHeader.style.color = '#C9A961';
        catHeader.style.marginTop = '1rem';
        catHeader.style.marginBottom = '0.5rem';
        catHeader.textContent = cat;
        listContainer.appendChild(catHeader);

        items.forEach(service => {
            const div = document.createElement('div');
            div.className = 'summary-item';
            div.innerHTML = `<span>${service}</span> <i class="fas fa-check" style="color:#C9A961"></i>`;
            listContainer.appendChild(div);
        });
    }
}

function formatWhatsAppMessage() {
    let msg = "Hello Team Jyoti Photo Studio! I am interested in booking the following premium services:\n\n";

    // Use grouped set iteration to avoid duplicates if any
    const grouped = {};
    selectedServices.forEach(item => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item.name);
    });

    for (const [cat, items] of Object.entries(grouped)) {
        msg += `*${cat}*\n`;
        items.forEach(svc => msg += `- ${svc}\n`);
        msg += `\n`;
    }

    msg += "Please confirm availability and pricing.";
    return msg;
}
