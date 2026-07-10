# ⚡ FLASH V - تطبيق التواصل الاحترافي

![FLASH V](https://img.shields.io/badge/FLASH-V-red?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active%20Development-blue?style=for-the-badge)

## 📋 نظرة عامة

**FLASH V** هو تطبيق ويب احترافي للتواصل والدردشة، مستوحى من Telegram، مع واجهة مستخدم عصرية وتجربة سلسة.

### ✨ المميزات الرئيسية
- 💬 **نظام دردشة فوري** مع رسائل حقيقية الوقت
- 👥 **إدارة المستخدمين** والحسابات الآمنة
- 🎨 **واجهة ديناميكية** مع 4 ثيمات ملونة
- 👻 **وضع الشبح** (Ghost Mode) الحصري
- 📊 **لوحة معلومات** مع إحصائيات
- 🔔 **نظام تنبيهات ذكية**
- 📱 **Responsive Design** - يعمل على جميع الأجهزة
- 🌐 **دعم اللغة العربية** (RTL)

---

## 🏗️ هيكل المشروع

```
flash/
├── docs/                 # التوثيق
│   └── CONTRIBUTING.md   # إرشادات المساهمة
├── src/                  # الكود المصدري
│   ├── css/              # ملفات الأنماط
│   │   ├── styles.css
│   │   ├── themes.css
│   │   └── responsive.css
│   ├── js/               # ملفات JavaScript
│   │   ├── app.js
│   │   ├── chat.js
│   │   ├── auth.js
│   │   └── utils.js
│   └── assets/           # الملفات الثابتة
│       ├── icons/
│       └── images/
├── index.html            # الصفحة الرئيسية
├── .gitignore            # ملف تجاهل Git
├── README.md             # هذا الملف
├── package.json          # إدارة الحزم (اختياري)
└── LICENSE               # الترخيص

```

---

## 🚀 البدء السريع

### المتطلبات
- متصفح ويب حديث (Chrome, Firefox, Safari, Edge)
- محرر نصوص (VS Code موصى به)
- Git مثبت على جهازك

### التثبيت والتشغيل

```bash
# استنساخ المستودع
git clone https://github.com/f5-oss/flash.git
cd flash

# فتح الملف في المتصفح
# لـ macOS:
open index.html

# لـ Windows:
start index.html

# لـ Linux:
xdg-open index.html
```

### أو استخدم خادم محلي:

```bash
# باستخدام Python 3
python -m http.server 8000

# ثم افتح: http://localhost:8000
```

---

## 📚 كيفية المساهمة

نرحب بمساهماتك! اتبع هذه الخطوات:

### 1️⃣ إنشاء فرع جديد
```bash
git checkout -b feature/your-feature-name
# أو
git checkout -b fix/your-bug-fix
```

### 2️⃣ العمل على الفرع
```bash
# قم بالتعديلات وحفظها
git add .
git commit -m "وصف التغيير بالعربية أو الإنجليزية"
```

### 3️⃣ رفع التغييرات
```bash
git push origin feature/your-feature-name
```

### 4️⃣ فتح Pull Request
ادخل على GitHub وستجد زر أخضر "Compare & pull request" - اضغط عليه واملأ البيانات.

---

## 🎨 الثيمات المتاحة

| الثيم | الألوان | الاستخدام |
|------|--------|---------|
| 🌙 **Dark** | أسود وأرجواني | الوضع الليلي |
| ☀️ **Light** | رمادي فاتح | الوضع النهاري |
| 🔵 **Blue** | أزرق داكن | ثيم بارد |
| 🟣 **Purple** | بنفسجي | ثيم ملكي |

---

## 🔐 الأمان والخصوصية

- كل البيانات محفوظة محلياً (localStorage)
- لا يتم إرسال بيانات شخصية دون موافقة
- اتبع معايير الأمان في عند التطوير

---

## 📋 خارطة الطريق (Roadmap)

- [x] واجهة المستخدم الأساسية
- [x] نظام الثيمات
- [ ] نظام المصادقة (Authentication)
- [ ] قاعدة البيانات (Backend)
- [ ] نظام الإشعارات الحقيقية
- [ ] المكالمات الصوتية والفيديو
- [ ] التطبيقات الأصلية (Mobile Apps)

---

## 🐛 الإبلاغ عن الأخطاء

وجدت مشكلة؟ افتح issue جديدة:
1. اذهب إلى [Issues](../../issues)
2. اضغط "New Issue"
3. صف المشكلة بالتفصيل

---

## 📄 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE)

---

## 👥 المساهمون

شكراً لجميع المساهمين الذين ساعدوا في تطوير هذا المشروع!

---

## 📞 التواصل

- 📧 البريد الإلكتروني: [eroukf15@gmail.com](mailto:eroukf15@gmail.com)
- 🐙 GitHub: [@f5-oss](https://github.com/f5-oss)

---

## 🌟 دعم المشروع

إذا أعجبك المشروع، لا تنسى:
- ⭐ إضافة Star للمستودع
- 🔄 المشاركة مع أصدقائك
- 💬 إرسال آرائك واقتراحاتك

---

**صُنع بـ ❤️ من قبل فريق FLASH V**