// assets/icon-animations.js
// مسؤول عن: تهيئة قائمة الإعدادات (عناصر القائمة المنقولة)، وظائف المشاركة، الإبلاغ، المساعدة، وتبديل الثيم.
// يش��غل رشيقاً مع الكود المضمّن في index.html/settings.html

(function(){
  const STORAGE_KEY = 'flash_ui_prefs_v1';
  const THEME_KEY = 'flash_ui_theme_v1';

  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return Array.from((root||document).querySelectorAll(sel)); }

  // تحميل / حفظ التفضيلات (موجودة أيضاً في السكربت المضمن، لكن نحافظ هنا على تزامن)
  function loadPrefs(){
    try{ const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : { animationEnabled:true, colorCycleEnabled:true, colorIntervalMs:60000 }; }
    catch(e){ return { animationEnabled:true, colorCycleEnabled:true, colorIntervalMs:60000 }; }
  }
  function savePrefs(p){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }catch(e){} }

  // Theme helpers
  function currentTheme(){ return localStorage.getItem(THEME_KEY) || 'dark'; }
  function applyTheme(name){
    document.documentElement.classList.remove('dark-theme','light-theme','blue-theme','purple-theme');
    if(name === 'dark') document.documentElement.classList.add('dark-theme');
    if(name === 'light') document.documentElement.classList.add('light-theme');
    if(name === 'blue') document.documentElement.classList.add('blue-theme');
    if(name === 'purple') document.documentElement.classList.add('purple-theme');
    localStorage.setItem(THEME_KEY, name);
  }

  // Utilities
  function copyToClipboard(text){
    if(navigator.clipboard && navigator.clipboard.writeText){
      return navigator.clipboard.writeText(text);
    }
    // fallback
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); }catch(e){}
    ta.remove();
    return Promise.resolve();
  }

  // وظائف عناصر القائمة المنقولة
  const menuActions = [
    { id: 'share', text: 'مشاركة التطبيق', handler: async () => {
        const url = location.href;
        if(navigator.share){
          try{ await navigator.share({ title: document.title, url }); alert('تم فتح واجهة المشاركة لنظامك'); }
          catch(e){ /* user cancel or error */ }
        } else {
          await copyToClipboard(url);
          alert('رابط التطبيق نُسخ إلى الحافظة');
        }
      }
    },
    { id: 'report', text: 'إبلاغ عن مشكلة', handler: () => {
        const subject = encodeURIComponent('إبلاغ عن مشكلة في FLASH V');
        const body = encodeURIComponent('وصف المشكلة:\n\n(أدخل التفاصيل هنا)\n\nنسخة المتصفح: ' + navigator.userAgent);
        window.location.href = `mailto:bugs@example.com?subject=${subject}&body=${body}`;
      }
    },
    { id: 'help', text: 'تعليمات', handler: () => {
        // عرض مساعدة سريعة — يمكن استبدالها بمودال أجمَل
        const help = `تعليمات سريعة:\n\n- استخدم صفحة الإعدادات لتعطيل الحركة أو دورة الألوان.\n- يمكنك مشاركة التطبيق عبر زر المشاركة.\n- للإبلاغ عن مشكلة استخدم 'إبلاغ عن مشكلة'.`;
        alert(help);
      }
    },
    { id: 'theme', text: 'تبديل الثيم (داكن/فاتح)', handler: () => {
        const th = currentTheme() === 'dark' ? 'light' : 'dark'; applyTheme(th); alert('تم تبديل الثيم إلى: ' + th);
      }
    },
    { id: 'toggleAnimations', text: 'إيقاف/تشغيل الحركة', handler: () => {
        const prefs = loadPrefs(); prefs.animationEnabled = !prefs.animationEnabled; savePrefs(prefs);
        // apply immediately if main window supports api
        if(window._flash_ui && window._flash_ui.setAnimationEnabled){
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          window._flash_ui.setAnimationEnabled(prefs.animationEnabled && !prefersReduced);
        }
        alert('تم ' + (prefs.animationEnabled ? 'تفعيل' : 'تعطيل') + ' الحركة');
      }
    }
  ];

  // يملأ قائمة movedMenu في settings.html أو أي قائمة أخرى حاوية
  function populateMovedMenu(){
    const container = qs('#movedMenu');
    if(!container) return;
    container.innerHTML = '';
    menuActions.forEach(a => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'menu-action'; btn.dataset.action = a.id; btn.textContent = a.text;
      btn.addEventListener('click', () => {
        try{ a.handler(); }catch(e){ console.error('menu action error', e); alert('حدث خطأ أثناء تنفيذ الإجراء'); }
      });
      li.appendChild(btn);
      container.appendChild(li);
    });
  }

  // تهيئة عامة تُستدعى عند DOMContentLoaded
  document.addEventListener('DOMContentLoaded', ()=>{
    // apply saved theme
    applyTheme(currentTheme());

    // populate moved menu if on settings page
    populateMovedMenu();

    // وربط أزرار الإعدادات مع التفضيلات إن وجدت
    const toggleAnim = qs('#toggleAnimation');
    const toggleColor = qs('#toggleColorCycle');
    const prefs = loadPrefs();
    if(toggleAnim){ toggleAnim.checked = !!prefs.animationEnabled; toggleAnim.addEventListener('change', e=>{ prefs.animationEnabled = e.target.checked; savePrefs(prefs); if(window._flash_ui) window._flash_ui.setAnimationEnabled(prefs.animationEnabled); }); }
    if(toggleColor){ toggleColor.checked = !!prefs.colorCycleEnabled; toggleColor.addEventListener('change', e=>{ prefs.colorCycleEnabled = e.target.checked; savePrefs(prefs); if(window._flash_ui) { window._flash_ui.prefs.colorCycleEnabled = prefs.colorCycleEnabled; window._flash_ui.startColorCycle && window._flash_ui.startColorCycle(); } }); }

    // زر إعادة الإعدادات
    const reset = qs('#resetPrefs');
    if(reset){ reset.addEventListener('click', ()=>{ localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(THEME_KEY); location.reload(); }); }

    // إضافة اختصار للمشاركة في الشريط السفلي - لو اعتُبر مناسباً
    // (إن حدث تغيير بالبنية DOM قد لا يجد العناصر)
    const firstNavIcon = qs('.nav-item > div:first-child');
    if(firstNavIcon){ firstNavIcon.classList.add('icon-animated'); }
  });

})();
