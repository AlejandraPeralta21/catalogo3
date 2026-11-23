// Semana 3 - Accesibilidad a11y y Contraste WCAG (JS/accesibilidad.js)
document.addEventListener('DOMContentLoaded', () => {
    const botonContraste = document.getElementById('btnSimularContraste');
    const botonContrasteTop = document.getElementById('btnSimularContrasteTop');
    
    function alternarContraste() {
        const contrasteActivo = document.body.classList.toggle('alto-contraste');
        if (botonContraste) botonContraste.setAttribute('aria-pressed', String(contrasteActivo));
        if (botonContrasteTop) botonContrasteTop.setAttribute('aria-pressed', String(contrasteActivo));
        try {
            localStorage.setItem('upds_alto_contraste', contrasteActivo ? '1' : '0');
        } catch (e) {}
    }

    if (botonContraste) {
        botonContraste.addEventListener('click', alternarContraste);
    }
    if (botonContrasteTop) {
        botonContrasteTop.addEventListener('click', alternarContraste);
    }

    // Recordar preferencia guardada
    try {
        if (localStorage.getItem('upds_alto_contraste') === '1') {
            document.body.classList.add('alto-contraste');
            if (botonContraste) botonContraste.setAttribute('aria-pressed', 'true');
            if (botonContrasteTop) botonContrasteTop.setAttribute('aria-pressed', 'true');
        }
    } catch (e) {}
});
