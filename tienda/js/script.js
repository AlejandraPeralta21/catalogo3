/* =====================================================
   MI TIENDITA · script.js
   Arquitectura Frontend Escalable: jQuery 3.6+
   - Control de Fugas de Memoria (.off().on(), Event Bubbling)
   - Lazy Loading Nativo & URLs de Internet (Unsplash)
   - PWA Offline-First (Service Worker + Manifest + Red Status)
   - Modal UI con Temporizador Asíncrono Expirable (setInterval)
   - Sanitización Anti-XSS con DOMPurify
   UPDS - Diseño Web II
   ===================================================== */

/* ---------- 1. DATOS: CATEGORÍAS Y PRODUCTOS ---------- */
var CATEGORIES = [
  { id: 'Panadería', icon: '🥖', subs: ['Pan', 'Galletas', 'Queques'] },
  { id: 'Lácteos',   icon: '🥛', subs: ['Leche', 'Yogur', 'Queso', 'Mantequilla'] },
  { id: 'Bebidas',   icon: '🥤', subs: ['Refrescos', 'Jugos', 'Agua'] },
  { id: 'Abarrotes', icon: '🍚', subs: ['Arroz', 'Azúcar', 'Fideos', 'Aceite', 'Harina'] },
  { id: 'Snacks',    icon: '🍫', subs: ['Papitas', 'Chocolates', 'Caramelos'] },
  { id: 'Otros',     icon: '🥚', subs: ['Huevos', 'Consumo diario'] }
];

// Catálogo con imágenes fotográficas de alta resolución desde Unsplash
var PRODUCTS = [
  // Panadería
  { id: 1,  name: 'Pan francés',        price: 1.50,  cat: 'Panadería', sub: 'Pan',         img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', emoji: '🥖' },
  { id: 2,  name: 'Pan integral',       price: 2.00,  cat: 'Panadería', sub: 'Pan',         img: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80', emoji: '🍞' },
  { id: 3,  name: 'Galletas de soda',   price: 5.00,  cat: 'Panadería', sub: 'Galletas',    img: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80', emoji: '🍘' },
  { id: 4,  name: 'Galletas dulces',    price: 6.50,  cat: 'Panadería', sub: 'Galletas',    img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80', emoji: '🍪' },
  { id: 5,  name: 'Queque de vainilla', price: 12.00, cat: 'Panadería', sub: 'Queques',     img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80', emoji: '🧁' },
  { id: 6,  name: 'Queque de chocolate',price: 12.00, cat: 'Panadería', sub: 'Queques',     img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', emoji: '🍰' },
  // Lácteos
  { id: 7,  name: 'Leche entera 1L',    price: 12.00, cat: 'Lácteos',   sub: 'Leche',       img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80', emoji: '🥛' },
  { id: 8,  name: 'Leche deslactosada 1L', price: 14.00, cat: 'Lácteos',sub: 'Leche',       img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80', emoji: '🥛' },
  { id: 9,  name: 'Yogur de frutilla',  price: 6.00,  cat: 'Lácteos',   sub: 'Yogur',       img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80', emoji: '🍓' },
  { id: 10, name: 'Yogur natural',      price: 5.50,  cat: 'Lácteos',   sub: 'Yogur',       img: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=600&q=80', emoji: '🥣' },
  { id: 11, name: 'Queso fresco',       price: 18.00, cat: 'Lácteos',   sub: 'Queso',       img: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80', emoji: '🧀' },
  { id: 12, name: 'Queso criollo',      price: 22.00, cat: 'Lácteos',   sub: 'Queso',       img: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=600&q=80', emoji: '🧀' },
  { id: 13, name: 'Mantequilla',        price: 9.00,  cat: 'Lácteos',   sub: 'Mantequilla', img: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80', emoji: '🧈' },
  // Bebidas
  { id: 14, name: 'Refresco de cola',   price: 8.00,  cat: 'Bebidas',   sub: 'Refrescos',   img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80', emoji: '🥤' },
  { id: 15, name: 'Refresco de naranja',price: 7.50,  cat: 'Bebidas',   sub: 'Refrescos',   img: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80', emoji: '🧃' },
  { id: 16, name: 'Jugo de naranja',    price: 10.00, cat: 'Bebidas',   sub: 'Jugos',       img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80', emoji: '🍊' },
  { id: 17, name: 'Jugo de durazno',    price: 9.00,  cat: 'Bebidas',   sub: 'Jugos',       img: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=600&q=80', emoji: '🍑' },
  { id: 18, name: 'Agua sin gas 2L',    price: 4.00,  cat: 'Bebidas',   sub: 'Agua',        img: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80', emoji: '💧' },
  { id: 19, name: 'Agua con gas 600ml', price: 5.00,  cat: 'Bebidas',   sub: 'Agua',        img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80', emoji: '💧' },
  // Abarrotes
  { id: 20, name: 'Arroz 1kg',          price: 8.50,  cat: 'Abarrotes', sub: 'Arroz',       img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80', emoji: '🍚' },
  { id: 21, name: 'Azúcar 1kg',         price: 7.00,  cat: 'Abarrotes', sub: 'Azúcar',      img: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=600&q=80', emoji: '🍬' },
  { id: 22, name: 'Fideo tallarín 400g',price: 4.50,  cat: 'Abarrotes', sub: 'Fideos',      img: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=600&q=80', emoji: '🍝' },
  { id: 23, name: 'Fideo espagueti 400g',price: 5.00, cat: 'Abarrotes', sub: 'Fideos',      img: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80', emoji: '🍝' },
  { id: 24, name: 'Aceite 1L',          price: 16.00, cat: 'Abarrotes', sub: 'Aceite',      img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80', emoji: '🫗' },
  { id: 25, name: 'Harina 1kg',         price: 8.00,  cat: 'Abarrotes', sub: 'Harina',      img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80', emoji: '🌾' },
  // Snacks
  { id: 26, name: 'Papitas clásicas',   price: 7.00,  cat: 'Snacks',    sub: 'Papitas',     img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80', emoji: '🥔' },
  { id: 27, name: 'Papitas picantes',   price: 7.50,  cat: 'Snacks',    sub: 'Papitas',     img: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=80', emoji: '🌶️' },
  { id: 28, name: 'Chocolate en barra', price: 6.00,  cat: 'Snacks',    sub: 'Chocolates',  img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80', emoji: '🍫' },
  { id: 29, name: 'Chocolate relleno',  price: 8.00,  cat: 'Snacks',    sub: 'Chocolates',  img: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80', emoji: '🍫' },
  { id: 30, name: 'Caramelos surtidos', price: 3.00,  cat: 'Snacks',    sub: 'Caramelos',   img: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=600&q=80', emoji: '🍬' },
  { id: 31, name: 'Gomitas',            price: 4.00,  cat: 'Snacks',    sub: 'Caramelos',   img: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80', emoji: '🍭' },
  // Otros
  { id: 32, name: 'Huevos (6 unidades)',price: 14.00, cat: 'Otros',     sub: 'Huevos',      img: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=600&q=80', emoji: '🥚' },
  { id: 33, name: 'Huevos (12 unidades)',price: 26.00,cat: 'Otros',     sub: 'Huevos',      img: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=600&q=80', emoji: '🥚' },
  { id: 34, name: 'Sal yodada 1kg',     price: 3.00,  cat: 'Otros',     sub: 'Consumo diario', img: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=600&q=80', emoji: '🧂' },
  { id: 35, name: 'Servilletas',        price: 5.00,  cat: 'Otros',     sub: 'Consumo diario', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80', emoji: '🧻' }
];

var FEATURED_IDS = [1, 7, 14, 32];

/* ---------- 2. CONSTANTES Y UTILIDADES ---------- */
var STORAGE_CART = 'mt_cart';
var STORAGE_THEME = 'mt_theme';

function money(n) { return 'Bs ' + Number(n).toFixed(2); }

function normalize(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function findProduct(id) {
  return PRODUCTS.filter(function (p) { return p.id === Number(id); })[0];
}

function safeGet(key, fallback) {
  try { var v = localStorage.getItem(key); return v === null ? fallback : v; }
  catch (e) { return fallback; }
}

function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) {}
}

// Fallback de imagen con respaldo seguro a emoji
function imgFallback(img) {
  var emoji = img.getAttribute('data-emoji') || '🛒';
  $(img).replaceWith('<span class="emoji" aria-hidden="true">' + emoji + '</span>');
}
window.imgFallback = imgFallback;

// Generador de etiquetas <img> con Lazy Loading, decoding asíncrono y dimensiones fijas (CLS <= 0.1)
function productImg(p) {
  var cleanName = window.DOMPurify ? DOMPurify.sanitize(p.name) : p.name;
  return '<img src="' + p.img + '" alt="' + cleanName + '" class="img-ampliable"' +
         ' loading="lazy" decoding="async" width="400" height="300"' +
         ' data-emoji="' + p.emoji + '" onerror="imgFallback(this)">';
}

var toastTimer;
function toast(msg) {
  var $t = $('#toast').text(msg).addClass('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { $t.removeClass('show'); }, 2200);
}

// Toast Flotante Nivel PRO con jQuery slideDown / fadeOut (Guía UPDS C2-A2)
var floatingToastTimer = null;
function showFloatingToast(msg, type) {
  var $el = $('#toastAlert');
  $el.removeClass('success danger info').addClass(type || 'info');
  
  if (window.DOMPurify) {
    $el.html(DOMPurify.sanitize(msg));
  } else {
    $el.text(msg);
  }
  
  clearTimeout(floatingToastTimer);
  $el.stop(true, true).slideDown(300);
  floatingToastTimer = setTimeout(function () {
    $el.fadeOut(400);
  }, 3500);
}


// Semana 2 - Fetch Lazy Loading y Bubbling
function abrirLightboxImagen(srcImagen, tituloImagen) {
  if (!srcImagen) return;
  const visorLightbox = document.getElementById('lightboxImagenVisor');
  const fotoAmpliada = document.getElementById('lightboxImagenFoto');
  const etiquetaTitulo = document.getElementById('lightboxImagenTitulo');
  if (!visorLightbox || !fotoAmpliada) return;
  fotoAmpliada.setAttribute('src', srcImagen);
  fotoAmpliada.setAttribute('alt', tituloImagen || 'Vista ampliada del producto');
  if (etiquetaTitulo) etiquetaTitulo.textContent = tituloImagen || '';
  visorLightbox.classList.add('activo');
  document.body.style.overflow = 'hidden';
}

function cerrarLightboxImagen() {
  const visorLightbox = document.getElementById('lightboxImagenVisor');
  if (visorLightbox) {
    visorLightbox.classList.remove('activo');
    document.body.style.overflow = '';
  }
}

// Delegación global de clics para imágenes ampliables (Bubbling seguro con .off().on())
$(document).off('click.lightbox', 'img.img-ampliable, .card__img img, .hero__imgs img').on('click.lightbox', 'img.img-ampliable, .card__img img, .hero__imgs img', function (e) {
  if ($(this).closest('#lightboxImagenVisor').length) return;
  const src = $(this).attr('src');
  const titulo = $(this).attr('alt') || $(this).closest('.card, article').find('h3, .card__name').text() || 'Producto Mi Tiendita';
  abrirLightboxImagen(src, titulo);
});

$(document).off('click.closeLightbox', '#btnCerrarLightbox').on('click.closeLightbox', '#btnCerrarLightbox', cerrarLightboxImagen);

$(document).off('click.overlayLightbox', '#lightboxImagenVisor').on('click.overlayLightbox', '#lightboxImagenVisor', function (e) {
  if (e.target === this) cerrarLightboxImagen();
});

$(document).off('keydown.lightbox').on('keydown.lightbox', function (e) {
  if (e.key === 'Escape') cerrarLightboxImagen();
});

/* ---------- 3. PWA OFFLINE-FIRST & DETECTOR DE RED ---------- */
var deferredInstallPrompt = null;

function actualizarEstadoRed() {
  var $badge = $('#estadoRed');
  if (navigator.onLine) {
    $badge.removeClass('offline').text('🟢 En Línea').css({
      'background': '#dcfce7',
      'color': '#166534',
      'border-color': '#bbf7d0'
    });
  } else {
    $badge.addClass('offline').text('🟠 Modo Offline Activo').css({
      'background': '#ffedd5',
      'color': '#9a3412',
      'border-color': '#fed7aa'
    });
    toast('Estás navegando sin conexión. Datos servidos desde Caché.');
  }
}

function initPWA() {
  // 1. Registro del Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js')
        .then(function (reg) {
          console.log('[SW] PWA Offline-First activo con alcance:', reg.scope);
        })
        .catch(function (err) {
          console.error('[SW] Fallo al registrar Service Worker:', err);
        });
    });
  }

  // 2. Escuchar cambios de conectividad en tiempo real (Regla de oro: limpieza de memoria previa)
  $(window).off('online offline').on('online offline', actualizarEstadoRed);
  actualizarEstadoRed();

  // 3. Captura del evento de instalación nativo (beforeinstallprompt)
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredInstallPrompt = e;
    $('#btnInstalarPWA, #btnInstalarDrawer').removeAttr('hidden').show();
  });

  // Manejador del botón de instalación
  $(document).off('click', '#btnInstalarPWA, #btnInstalarDrawer')
    .on('click', '#btnInstalarPWA, #btnInstalarDrawer', function () {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then(function (choiceResult) {
        if (choiceResult.outcome === 'accepted') {
          showFloatingToast('🎉 ¡Gracias por instalar Mi Tiendita!', 'success');
        }
        deferredInstallPrompt = null;
        $('#btnInstalarPWA, #btnInstalarDrawer').hide();
      });
    });

  // Botón de recarga de caché en configuración
  $('#btnReloadCache').off('click').on('click', function () {
    if ('caches' in window) {
      caches.keys().then(function (names) {
        names.forEach(function (name) { caches.delete(name); });
        toast('Caché restablecida. Recargando app...');
        setTimeout(function () { location.reload(); }, 600);
      });
    }
  });
}

/* ---------- 4. TEMA CLARO / OSCURO ---------- */
// Semana 1 - Modo Oscuro
function setTheme(theme) {
  $('html').attr('data-theme', theme);
  $('.theme-switch').prop('checked', theme === 'dark');
  safeSet(STORAGE_THEME, theme);
}

function initTheme() {
  setTheme(safeGet(STORAGE_THEME, 'light'));
  $('.theme-switch').off('change').on('change', function () {
    setTheme(this.checked ? 'dark' : 'light');
  });
  $('#btnThemeTop').off('click').on('click', function () {
    setTheme($('html').attr('data-theme') === 'dark' ? 'light' : 'dark');
  });
}

/* ---------- 5. MENÚ LATERAL (DRAWER) ---------- */
function openMenu() {
  $('#drawer').addClass('open').attr('aria-hidden', 'false');
  $('#overlay').addClass('open');
  $('#btnMenu').attr('aria-expanded', 'true');
  $('body').css('overflow', 'hidden');
}

function closeMenu() {
  $('#drawer').removeClass('open').attr('aria-hidden', 'true');
  $('#overlay').removeClass('open');
  $('#btnMenu').attr('aria-expanded', 'false');
  $('body').css('overflow', '');
}

function initMenu() {
  $('#btnMenu').off('click').on('click', function () {
    $('#drawer').hasClass('open') ? closeMenu() : openMenu();
  });
  $('#btnCloseMenu, #overlay').off('click').on('click', closeMenu);
  $(document).off('keydown.menu').on('keydown.menu', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ---------- 6. NAVEGACIÓN SPA ---------- */
var VIEWS = ['inicio', 'categorias', 'productos', 'carrito', 'contacto', 'configuracion'];

function showView(name) {
  if (VIEWS.indexOf(name) === -1) name = 'inicio';
  $('.view').attr('hidden', true);
  $('#view-' + name).removeAttr('hidden');
  $('[data-nav]').removeClass('active');
  $('[data-nav="' + name + '"]').not('.logo, .cart-btn').addClass('active');
  if (name === 'carrito') $('.cart-btn').addClass('active');
  closeMenu();
  window.scrollTo(0, 0);
}

function navigate(name) {
  showView(name);
  if (location.hash !== '#' + name) history.pushState(null, '', '#' + name);
}

function initNav() {
  $(document).off('click', '[data-nav]').on('click', '[data-nav]', function (e) {
    e.preventDefault();
    navigate($(this).data('nav'));
  });
  $(window).off('popstate.nav hashchange.nav').on('popstate.nav hashchange.nav', function () {
    showView(location.hash.replace('#', '') || 'inicio');
  });
  showView(location.hash.replace('#', '') || 'inicio');
}

/* ---------- 7. PRODUCTOS, BÚSQUEDA Y FILTROS ---------- */
var state = { cat: 'all', sub: 'all', q: '' };

function productCard(p) {
  var cleanName = window.DOMPurify ? DOMPurify.sanitize(p.name) : p.name;
  var cleanCat = window.DOMPurify ? DOMPurify.sanitize(p.cat) : p.cat;
  var cleanSub = window.DOMPurify ? DOMPurify.sanitize(p.sub) : p.sub;

  return '' +
    '<article class="card" data-id="' + p.id + '">' +
      '<div class="card__img">' + productImg(p) + '</div>' +
      '<div class="card__body">' +
        '<span class="card__cat">' + cleanCat + ' · ' + cleanSub + '</span>' +
        '<h3 class="card__name" title="' + cleanName + '">' + cleanName + '</h3>' +
        '<span class="card__price">' + money(p.price) + '</span>' +
        '<button type="button" class="btn btn-add" data-id="' + p.id + '" aria-label="Agregar ' + cleanName + ' al carrito">🛒 Agregar</button>' +
      '</div>' +
    '</article>';
}

function renderFilterChips() {
  var html = '<button type="button" class="chip' + (state.cat === 'all' ? ' active' : '') + '" data-cat="all">Todos</button>';
  CATEGORIES.forEach(function (c) {
    html += '<button type="button" class="chip' + (state.cat === c.id ? ' active' : '') + '" data-cat="' + c.id + '">' + c.icon + ' ' + c.id + '</button>';
  });
  $('#filterCats').html(html);

  var subsHtml = '';
  if (state.cat !== 'all') {
    var cat = CATEGORIES.filter(function (c) { return c.id === state.cat; })[0];
    subsHtml = '<button type="button" class="chip' + (state.sub === 'all' ? ' active' : '') + '" data-sub="all">Todas</button>';
    if (cat && cat.subs) {
      cat.subs.forEach(function (s) {
        subsHtml += '<button type="button" class="chip' + (state.sub === s ? ' active' : '') + '" data-sub="' + s + '">' + s + '</button>';
      });
    }
  }
  $('#filterSubs').html(subsHtml).toggle(state.cat !== 'all');
}

function renderProducts() {
  var q = normalize(state.q.trim());
  var list = PRODUCTS.filter(function (p) {
    if (state.cat !== 'all' && p.cat !== state.cat) return false;
    if (state.sub !== 'all' && p.sub !== state.sub) return false;
    if (q && normalize(p.name + ' ' + p.cat + ' ' + p.sub).indexOf(q) === -1) return false;
    return true;
  });
  $('#productGrid').html(list.map(productCard).join(''));
  $('#productEmpty').prop('hidden', list.length > 0);
  $('#resultCount').text(list.length + (list.length === 1 ? ' producto' : ' productos'));
}

function applyFilters() { renderFilterChips(); renderProducts(); }

function initProducts() {
  // Delegación de eventos con .off().on() para prevenir acumulación de memoria
  $('#filterCats').off('click', '.chip').on('click', '.chip', function () {
    state.cat = $(this).data('cat'); 
    state.sub = 'all'; 
    applyFilters();
  });
  
  $('#filterSubs').off('click', '.chip').on('click', '.chip', function () {
    state.sub = $(this).data('sub'); 
    applyFilters();
  });

  // Búsqueda en tiempo real
  $('#searchInput').off('input').on('input', function () {
    state.q = $(this).val();
    if (state.q.trim() && $('#view-productos').is('[hidden]')) navigate('productos');
    renderProducts();
  });

  $('#searchForm').off('submit').on('submit', function (e) {
    e.preventDefault();
    navigate('productos');
    renderProducts();
  });

  applyFilters();
}

/* ---------- 8. CATEGORÍAS & ACORDEÓN JQUERY ---------- */
var catState = { cat: null, sub: 'all' };

function renderCatList() {
  var html = '';
  CATEGORIES.forEach(function (c) {
    var open = catState.cat === c.id;
    html += '<li class="cat-item' + (open ? ' open' : '') + '">' +
      '<button type="button" class="cat-item__btn" data-cat="' + c.id + '" aria-expanded="' + open + '">' +
        '<span class="ico">' + c.icon + '</span>' + c.id + '<span class="arrow">⌄</span>' +
      '</button>' +
      '<div class="cat-item__subs" style="' + (open ? 'display:flex;' : 'display:none;') + '">' +
        '<button type="button" class="chip' + (open && catState.sub === 'all' ? ' active' : '') + '" data-cat="' + c.id + '" data-sub="all">Todo</button>';
    c.subs.forEach(function (s) {
      html += '<button type="button" class="chip' + (open && catState.sub === s ? ' active' : '') + '" data-cat="' + c.id + '" data-sub="' + s + '">' + s + '</button>';
    });
    html += '</div></li>';
  });
  $('#catList').html(html);
}

function renderCatResults() {
  if (!catState.cat) {
    $('#catTitle').text('Elige una categoría');
    $('#catGrid').html('<p class="empty" style="grid-column:1/-1">Selecciona una categoría para ver sus productos.</p>');
    return;
  }
  var list = PRODUCTS.filter(function (p) {
    return p.cat === catState.cat && (catState.sub === 'all' || p.sub === catState.sub);
  });
  $('#catTitle').text(catState.cat + (catState.sub !== 'all' ? ' › ' + catState.sub : ''));
  $('#catGrid').html(list.map(productCard).join(''));
}

function selectCategory(cat, sub) {
  catState.cat = cat; 
  catState.sub = sub || 'all';
  renderCatList(); 
  renderCatResults();
}

function initCategories() {
  // Acordeón jQuery con efecto slideToggle suave (Guía C2-A1 UPDS)
  $('#catList').off('click', '.cat-item__btn').on('click', '.cat-item__btn', function (e) {
    e.preventDefault();
    var cat = $(this).data('cat');
    var $parent = $(this).closest('.cat-item');
    var $subs = $parent.find('.cat-item__subs');

    if (catState.cat === cat) {
      $subs.slideUp('fast', function () {
        $parent.removeClass('open');
        catState.cat = null;
        catState.sub = 'all';
        renderCatResults();
      });
    } else {
      $('.cat-item').not($parent).removeClass('open').find('.cat-item__subs').slideUp('fast');
      $subs.slideDown('fast', function () {
        $parent.addClass('open');
        selectCategory(cat, 'all');
      });
    }
  });

  // Selección de subcategoría
  $('#catList').off('click', '.chip').on('click', '.chip', function (e) {
    e.preventDefault();
    selectCategory($(this).data('cat'), $(this).data('sub'));
  });

  selectCategory(null);
}


// Semana 2 - Filtro de 3 Capas
function initFiltro3Capas() {
  $('#capa1').off('change').on('change', function () {
    const area = $(this).val();
    const $c2 = $('#capa2');
    $c2.empty().append($('<option>').val('').text('-- Seleccione subcategoría --')).prop('disabled', false);

    if (area === 'panaderia') {
      $c2.append($('<option>').val('pan').text('Pan Tradicional y Francés'));
      $c2.append($('<option>').val('galletas').text('Galletas y Queques'));
    } else if (area === 'lacteos') {
      $c2.append($('<option>').val('leche').text('Leche Entera y Deslactosada'));
      $c2.append($('<option>').val('queso').text('Queso Fresco y Criollo'));
      $c2.append($('<option>').val('yogur').text('Yogur y Derivados'));
    } else if (area === 'bebidas') {
      $c2.append($('<option>').val('refrescos').text('Refrescos y Gaseosas'));
      $c2.append($('<option>').val('jugos').text('Jugos de Fruta Natural'));
      $c2.append($('<option>').val('agua').text('Agua Mineral y de Mesa'));
    } else if (area === 'abarrotes') {
      $c2.append($('<option>').val('granos').text('Arroz y Azúcar'));
      $c2.append($('<option>').val('fideos').text('Fideos y Pastas'));
      $c2.append($('<option>').val('aceite').text('Aceites y Harinas'));
    } else if (area === 'snacks') {
      $c2.append($('<option>').val('papitas').text('Papitas y Frituras'));
      $c2.append($('<option>').val('chocolates').text('Chocolates y Caramelos'));
    } else {
      $c2.prop('disabled', true);
      $('#resultadoFiltro').text('Seleccione las capas anteriores...');
    }
  });

  $('#capa2').off('change').on('change', function () {
    const texto = $(this).find('option:selected').text();
    $('#resultadoFiltro').text(texto && $(this).val() ? 'Capa 3: ' + texto : 'Seleccione las capas anteriores...');
  });
}

/* ---------- 9. CARRITO & MODAL CON TEMPORIZADOR ASÍNCRONO ---------- */
var cart = {};
var orderTimer = null;
var timeLeft = 30;

function loadCart() {
  try { cart = JSON.parse(safeGet(STORAGE_CART, '{}')) || {}; } catch (e) { cart = {}; }
  Object.keys(cart).forEach(function (id) { if (!findProduct(id)) delete cart[id]; });
}

function saveCart() { safeSet(STORAGE_CART, JSON.stringify(cart)); }

function cartCount() {
  return Object.keys(cart).reduce(function (n, id) { return n + cart[id]; }, 0);
}

function cartTotal() {
  return Object.keys(cart).reduce(function (t, id) { return t + findProduct(id).price * cart[id]; }, 0);
}

function renderCart() {
  var ids = Object.keys(cart);
  var count = cartCount();

  $('.cart-count').text(count).toggle(count > 0);

  if (!ids.length) {
    $('.cart-layout').hide();
    $('#cartEmpty').prop('hidden', false);
    $('#btnClearCart').hide();
    return;
  }
  $('.cart-layout').show();
  $('#cartEmpty').prop('hidden', true);
  $('#btnClearCart').show();

  var html = '';
  ids.forEach(function (id) {
    var p = findProduct(id), q = cart[id];
    var cleanName = window.DOMPurify ? DOMPurify.sanitize(p.name) : p.name;
    html += '<li class="cart-item" data-id="' + id + '">' +
      '<div class="cart-item__img">' + productImg(p) + '</div>' +
      '<div class="cart-item__info">' +
        '<h3>' + cleanName + '</h3>' +
        '<small>' + money(p.price) + ' c/u</small><br>' +
        '<div class="qty">' +
          '<button type="button" class="qty-minus" aria-label="Disminuir">−</button>' +
          '<span aria-live="polite">' + q + '</span>' +
          '<button type="button" class="qty-plus" aria-label="Aumentar">+</button>' +
        '</div>' +
      '</div>' +
      '<div class="cart-item__sub">' + money(p.price * q) + '</div>' +
      '<button type="button" class="cart-item__del">Eliminar</button>' +
    '</li>';
  });
  $('#cartList').html(html);
  $('#sumItems').text(count);
  $('#sumSubtotal').text(money(cartTotal()));
  $('#sumTotal').text(money(cartTotal()));
}

function addToCart(id) {
  var p = findProduct(id);
  if (!p) return;
  cart[id] = (cart[id] || 0) + 1;
  saveCart(); 
  renderCart();
  toast('✔ ' + p.name + ' agregado al carrito');
}

// Control del Temporizador Asíncrono Expirable (setInterval)
function startOrderCountdown() {
  clearInterval(orderTimer);
  timeLeft = 30;
  updateTimerUI();

  orderTimer = setInterval(function () {
    timeLeft--;
    updateTimerUI();

    if (timeLeft <= 0) {
      clearInterval(orderTimer);
      // Auto-cierre con .fadeOut() tras expiración de tiempo (Guía Viernes UPDS)
      $('#checkoutModal').fadeOut(300, function () {
        $('body').css('overflow', '');
      });
      showFloatingToast('⚠️ Tarifa Flash Expirada: Tiempo límite de confirmación agotado.', 'danger');
    }
  }, 1000);
}

function updateTimerUI() {
  var secStr = timeLeft < 10 ? '0' + timeLeft : timeLeft;
  $('#modalTimer').text('00:' + secStr + 's');
}

// Semana 2 - Calculador Modal 30s y Toast
function openCheckoutModal() {
  var count = cartCount();
  if (!count) {
    toast('El carrito está vacío');
    return;
  }
  $('#modalQty').text(count + (count === 1 ? ' producto' : ' productos'));
  $('#modalTotal').text(money(cartTotal()));
  $('body').css('overflow', 'hidden');
  $('#checkoutModal').fadeIn(250);
  startOrderCountdown();
}

function closeCheckoutModal() {
  clearInterval(orderTimer);
  $('#checkoutModal').fadeOut(200, function () {
    $('body').css('overflow', '');
  });
}

function initCart() {
  loadCart();
  renderCart();

  // Delegación de eventos global con .off() previo para prevenir acumulación en RAM
  $(document).off('click', '.btn-add').on('click', '.btn-add', function (e) {
    e.preventDefault();
    addToCart($(this).data('id'));
  });

  $('#cartList')
    .off('click', '.qty-plus')
    .on('click', '.qty-plus', function () {
      var id = $(this).closest('.cart-item').data('id');
      cart[id]++; 
      saveCart(); 
      renderCart();
    })
    .off('click', '.qty-minus')
    .on('click', '.qty-minus', function () {
      var id = $(this).closest('.cart-item').data('id');
      if (cart[id] > 1) cart[id]--; else delete cart[id];
      saveCart(); 
      renderCart();
    })
    .off('click', '.cart-item__del')
    .on('click', '.cart-item__del', function () {
      var id = $(this).closest('.cart-item').data('id');
      delete cart[id];
      saveCart(); 
      renderCart();
      toast('Producto eliminado');
    });

  $('#btnClearCart, #btnResetData').off('click').on('click', function () {
    if (!cartCount()) { toast('El carrito ya está vacío'); return; }
    if (confirm('¿Deseas vaciar todos los productos del carrito?')) {
      cart = {}; 
      saveCart(); 
      renderCart(); 
      toast('Carrito vaciado');
    }
  });

  // Apertura del Modal Confirmatorio
  $('#btnCheckout').off('click').on('click', function (e) {
    e.preventDefault();
    openCheckoutModal();
  });

  // Cierre del Modal
  $('#btnCloseModal, #btnCancelModal').off('click').on('click', closeCheckoutModal);

  // Confirmar Compra
  $('#btnConfirmOrder').off('click').on('click', function () {
    clearInterval(orderTimer);
    var totalFormateado = money(cartTotal());
    var metodoPago = $('#modalPayment').val();
    
    // Limpieza de datos
    cart = {};
    saveCart();
    renderCart();
    closeCheckoutModal();

    // Feedback dinámico con Toast Alert flotante de 3 segundos
    showFloatingToast('🎉 ¡Pedido confirmado con éxito! Total: ' + totalFormateado + ' (' + metodoPago + ')', 'success');
  });
}

/* ---------- 10. FORMULARIO DE CONTACTO & SANITIZACIÓN ANTI-XSS ---------- */
var RULES = {
  cName: function (v) {
    if (!v) return 'Escribe tu nombre completo.';
    if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]{3,}$/.test(v) || v.split(/\s+/).length < 2) return 'Escribe nombre y apellido.';
    return '';
  },
  cEmail: function (v) {
    if (!v) return 'Escribe tu correo electrónico.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Correo no válido. Ejemplo: nombre@correo.com';
    return '';
  },
  cPhone: function (v) {
    if (!v) return 'Escribe tu número de celular.';
    var digits = v.replace(/[\s-]/g, '').replace(/^\+?591/, '');
    if (!/^[67]\d{7}$/.test(digits)) return 'Celular de 8 dígitos que empiece con 6 o 7.';
    return '';
  },
  cSubject: function (v) { return v.length < 3 ? 'Escribe el asunto (mínimo 3 letras).' : ''; },
  cMsg: function (v) {
    if (!v) return 'Escribe tu mensaje.';
    return v.length < 10 ? 'El mensaje debe tener al menos 10 caracteres.' : '';
  }
};

function validateField($input) {
  var id = $input.attr('id');
  if (!RULES[id]) return true;
  var msg = RULES[id]($.trim($input.val()));
  var $field = $input.closest('.field');
  $field.toggleClass('invalid', !!msg).toggleClass('valid', !msg);
  $field.find('.error').text(msg);
  return !msg;
}

function initForm() {
  var $form = $('#contactForm');

  $('#cPhone').off('input').on('input', function () {
    this.value = this.value.replace(/[^\d+\s-]/g, '');
  });

  $form.find('input, textarea')
    .off('blur input')
    .on('blur input', function () {
      if ($(this).closest('.field').is('.invalid, .valid')) validateField($(this));
    })
    .on('blur', function () {
      validateField($(this));
    });

  $form.off('submit').on('submit', function (e) {
    e.preventDefault();
    $('#formSuccess').prop('hidden', true);
    var ok = true;
    $form.find('input, textarea').each(function () {
      if (!validateField($(this))) ok = false;
    });

    if (!ok) {
      $form.find('.invalid input, .invalid textarea').first().trigger('focus');
      toast('Revisa los campos marcados en rojo');
      return;
    }

    // Sanitización obligatoria con DOMPurify (o texto seguro) para evitar inyecciones XSS
    var rawNombre = $.trim($('#cName').val()).split(/\s+/)[0];
    var nombreSeguro = window.DOMPurify ? DOMPurify.sanitize(rawNombre) : $('<div>').text(rawNombre).html();

    var mensajeHtml = '¡Muchas gracias, <strong>' + nombreSeguro + '</strong>! Tu mensaje ha sido recibido. Te responderemos hoy mismo.';
    $('#formSuccess').html(mensajeHtml).prop('hidden', false);
    
    $form[0].reset();
    $form.find('.field').removeClass('valid invalid').find('.error').text('');
    showFloatingToast('✉️ Mensaje enviado correctamente.', 'success');
  });
}

/* ---------- 11. INICIO ---------- */
function initHome() {
  var featured = FEATURED_IDS.map(findProduct).filter(Boolean);
  $('#featuredGrid').html(featured.map(productCard).join(''));

  var tiles = '';
  CATEGORIES.forEach(function (c) {
    tiles += '<button type="button" class="cat-tile" data-home-cat="' + c.id + '"><span>' + c.icon + '</span>' + c.id + '</button>';
  });
  $('#homeCats').html(tiles);

  $('#homeCats').off('click', '.cat-tile').on('click', '.cat-tile', function () {
    selectCategory($(this).data('home-cat'), 'all');
    navigate('categorias');
  });
}

/* ---------- 12. ARRANQUE DEL SISTEMA (DOCUMENT READY) ---------- */
$(function () {
  initTheme();
  initMenu();
  initHome();
  initProducts();
  initCategories();
  initFiltro3Capas();
  initCart();
  initForm();
  initNav();
  initPWA();
});

// Semana 3 - Desarrollo Agil y Smoke Testing
// Integrado mediante ./js/smoke-test.js

// Semana 3 - Cierre A11Y HTML5 y HMR
// Integrado mediante ./js/auditoria-a11y.js
