document.addEventListener('DOMContentLoaded', () => {
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    const cvSelector = document.getElementById('cvSelector');
    const harvardPage = document.getElementById('cv-harvard');
    const hybridPage = document.getElementById('cv-hybrid');

    if (cvSelector) {
        cvSelector.addEventListener('change', (e) => {
            if (e.target.value === 'harvard') {
                harvardPage.style.display = 'flex';
                hybridPage.style.display = 'none';
            } else {
                harvardPage.style.display = 'none';
                hybridPage.style.display = 'flex';
            }
        });
    }
});
