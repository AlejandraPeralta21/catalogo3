// Semana 3 - Desarrollo Agil y Smoke Testing (JS/smoke-test.js)
document.addEventListener('DOMContentLoaded', () => {
    const botonSmokeTest = document.getElementById('btnSmokeTest');
    const salidaAuditoria = document.getElementById('salidaAudit');
    if (!botonSmokeTest || !salidaAuditoria) return;

    botonSmokeTest.addEventListener('click', () => {
        const imgsSinAlt = document.querySelectorAll('img:not([alt]), img[alt=""]').length;
        const enlacesVacios = document.querySelectorAll('a[href=""], a:not([href])').length;
        const totalBotones = document.querySelectorAll('button').length;
        
        salidaAuditoria.textContent = `Smoke Test OK | Botones: ${totalBotones} | Imágenes sin alt: ${imgsSinAlt} | Enlaces vacíos: ${enlacesVacios}`;
        salidaAuditoria.style.borderColor = (imgsSinAlt === 0 && enlacesVacios === 0) ? '#22c55e' : '#ef4444';
        salidaAuditoria.style.color = (imgsSinAlt === 0 && enlacesVacios === 0) ? '#166534' : '#991b1b';
    });
});
