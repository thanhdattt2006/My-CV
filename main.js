document.addEventListener('DOMContentLoaded', () => {
  switchLanguage('en');
});

function switchLanguage(lang) {
  // 1. Update simple text elements
  document.querySelectorAll('[data-en], [data-vi]').forEach((el) => {
    // Skip description lists handled separately below
    if (el.classList.contains('description-list')) return;

    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      // Keep existing HTML tags inside if needed (rare case), but mostly text
      el.innerHTML = text;
    }
  });

  // 2. Update Description Lists (maintain HTML structure <li>)
  document.querySelectorAll('.description-list').forEach((ul) => {
    const htmlContent = ul.getAttribute(`data-${lang}`);
    if (htmlContent) {
      ul.innerHTML = htmlContent;
    }
  });

  // 3. Update active button state
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    if (btn.innerText.toLowerCase() === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function downloadPDF() {
  const element = document.getElementById('cv-content');

  // Config for html2pdf
  // Scale 2 is good balance for quality/size
  const opt = {
    margin: 0,
    filename: 'CV_VoCaoThanhDat_Backend.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  // Add loading state
  const btnText = document.querySelector('.download-text');
  const originalText = btnText.innerText;
  btnText.innerText = 'Generating...';

  html2pdf()
    .from(element)
    .set(opt)
    .save()
    .then(() => {
      btnText.innerText = originalText;
    });
}
