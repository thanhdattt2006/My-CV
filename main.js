        let currentLanguage = 'en';

        function switchLanguage(lang) {
            currentLanguage = lang;
            
            // Update button states
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-lang') === lang) {
                    btn.classList.add('active');
                }
            });

            // Update content
            document.querySelectorAll('[data-en]').forEach(element => {
                const text = element.getAttribute('data-' + lang);
                if (text) {
                    element.textContent = text;
                }
            });
        }

        function downloadPDF() {
            // Hide controls before PDF generation
            const controls = document.querySelector('.controls');
            controls.style.display = 'none';

            const element = document.getElementById('cv-content');
            const opt = {
                margin: 10,
                filename: `CV_Vo_Cao_Thanh_Dat_${currentLanguage.toUpperCase()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    useCORS: true,
                    letterRendering: true,
                    logging: false
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait',
                    compressPDF: true
                }
            };

            html2pdf().set(opt).from(element).save().then(() => {
                // Show controls after PDF generation
                controls.style.display = 'flex';
            });
        }

        // Initialize with English
        switchLanguage('en');
    