// Đặt ngôn ngữ mặc định khi tải trang
document.addEventListener('DOMContentLoaded', () => {
  switchLanguage('en');
});

/**
 * Chuyển đổi ngôn ngữ của trang
 * @param {string} lang - Ngôn ngữ để chuyển (ví dụ: 'en' hoặc 'vi')
 */
function switchLanguage(lang) {
  // 1. Text elements
  document.querySelectorAll('[data-en], [data-vi]').forEach((el) => {
    if (el.classList.contains('description-list')) return;
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.innerHTML = text;
  });

  // 2. List elements
  document.querySelectorAll('.description-list').forEach((ul) => {
    const htmlContent = ul.getAttribute(`data-${lang}`);
    if (htmlContent) ul.innerHTML = htmlContent;
  });

  // 3. Button states
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    if (btn.innerText.toLowerCase() === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}
