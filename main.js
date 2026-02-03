// Đặt ngôn ngữ mặc định khi tải trang
document.addEventListener('DOMContentLoaded', () => {
  switchLanguage('en');
});

/**
 * Chuyển đổi ngôn ngữ của trang
 * @param {string} lang - Ngôn ngữ để chuyển (ví dụ: 'en' hoặc 'vi')
 */
function switchLanguage(lang) {
  // Cập nhật tất cả các phần tử có thuộc tính data-lang (nội dung)
  document.querySelectorAll('[data-en], [data-vi]').forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (text && !el.classList.contains('description-list')) {
      // Bỏ qua description-list để xử lý riêng
      el.innerText = text;
    }
  });

  // Xử lý riêng các ul.description-list để duy trì cấu trúc li
  document.querySelectorAll('ul.description-list').forEach((ul) => {
    const htmlContent = ul.getAttribute(`data-${lang}`);
    if (htmlContent) {
      ul.innerHTML = htmlContent;
    }
  });

  // Cập nhật trạng thái 'active' cho nút ngôn ngữ
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    if (btn.innerText.toLowerCase() === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

/**
 * Tạo và tải xuống CV dưới dạng tệp PDF
 */
function downloadPDF() {
  const element = document.getElementById('cv-content');
  const defaultLang = document
    .querySelector('.lang-btn.active')
    .innerText.toLowerCase();

  // Tạm chuyển sang tiếng Anh để tên file PDF nhất quán (nếu muốn)
  // hoặc giữ nguyên ngôn ngữ hiện tại
  // switchLanguage('en');

  const opt = {
    margin: [0.3, 0.3, 0.5, 0.3], // top, left, bottom, right (inches)
    filename: 'CV_VoCaoThanhDat.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  // Tạo PDF
  html2pdf()
    .from(element)
    .set(opt)
    .save()
    .then(() => {
      // Tùy chọn: Chuyển về ngôn ngữ ban đầu sau khi tạo PDF
      // switchLanguage(defaultLang);
    });
}
