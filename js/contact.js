// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const q = item.querySelector('.faq-question');
    q.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});
