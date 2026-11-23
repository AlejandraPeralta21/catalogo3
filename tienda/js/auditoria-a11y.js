// Semana 3 - Cierre A11Y HTML5 y HMR (JS/auditoria-a11y.js)
document.addEventListener('DOMContentLoaded', () => {
    const botonAuditar = document.getElementById('btnAuditarA11Y');
    const salidaReporte = document.getElementById('reporteA11Y');
    if (!botonAuditar || !salidaReporte) return;

    botonAuditar.addEventListener('click', () => {
        const zonasSemanticas = document.querySelectorAll('header, nav, main, article, section, footer, aside').length;
        const imagenesSinAlt = document.querySelectorAll('img:not([alt]), img[alt=""]').length;
        
        salidaReporte.textContent = `Auditoría en vivo: ${zonasSemanticas} etiquetas semánticas HTML5 detectadas | Imágenes sin alt: ${imagenesSinAlt}.`;
        salidaReporte.style.borderColor = (imagenesSinAlt === 0) ? '#22c55e' : '#ef4444';
        salidaReporte.style.color = (imagenesSinAlt === 0) ? '#166534' : '#991b1b';
    });
});
