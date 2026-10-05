export const languages = { en: 'English', ar: 'العربية' } as const;
export type Lang = keyof typeof languages;

export const dirOf = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');
export const homePath = (lang: Lang) => (lang === 'ar' ? '/ar/' : '/');

/** A string in both languages. */
export type L = { en: string; ar: string };

const ui = {
  meta: {
    title: {
      en: 'Best Dental Clinic in Dubai, Hollywood Smile Makeover Dubai',
      ar: 'أفضل عيادة أسنان في دبي، ابتسامة هوليوود في دبي',
    },
    description: {
      en: 'Visit the best dental clinic in Dubai and experience the transformation for yourself. Your journey to a Hollywood smile begins here.',
      ar: 'زر أفضل عيادة أسنان في دبي واكتشف التحوّل بنفسك. رحلتك نحو ابتسامة هوليوود تبدأ هنا.',
    },
    siteName: { en: 'Dubai Smile Dental Clinic', ar: 'عيادة ابتسامة دبي لطب الأسنان' },
  },
  brand: {
    name: { en: 'Dubai Smile', ar: 'ابتسامة دبي' },
    tagline: { en: 'Cosmetic and Family Dentistry', ar: 'طب الأسنان التجميلي والعائلي' },
    home: { en: 'Dubai Smile home', ar: 'الصفحة الرئيسية لابتسامة دبي' },
  },
  nav: {
    label: { en: 'Main', ar: 'الرئيسية' },
    treatments: { en: 'Treatments', ar: 'العلاجات' },
    results: { en: 'Results', ar: 'النتائج' },
    dentists: { en: 'Dentists', ar: 'الأطباء' },
    clinics: { en: 'Clinics', ar: 'العيادات' },
    faq: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
    openMenu: { en: 'Open menu', ar: 'فتح القائمة' },
    closeMenu: { en: 'Close menu', ar: 'إغلاق القائمة' },
    switchLang: { en: 'Switch to Arabic', ar: 'التبديل إلى الإنجليزية' },
    callUs: { en: 'Call a clinic', ar: 'اتصل بعيادة' },
  },
  skip: { en: 'Skip to content', ar: 'انتقل إلى المحتوى' },
  demo: {
    banner: { en: 'Design preview. Not the live Dubai Smile website.', ar: 'معاينة للتصميم. هذا ليس موقع ابتسامة دبي الرسمي.' },
    form: { en: 'This is a design preview, so requests aren’t sent.', ar: 'هذه معاينة للتصميم، لذا لا تُرسل الطلبات.' },
    submitted: {
      en: 'Design preview: nothing was sent. To book, call {clinic} on {phone}.',
      ar: 'معاينة للتصميم: لم يُرسل أي شيء. للحجز، اتصل بعيادة {clinic} على الرقم {phone}.',
    },
  },
  cta: {
    book: { en: 'Book a consultation', ar: 'احجز استشارة' },
    call: { en: 'Call', ar: 'اتصل' },
    seeResults: { en: 'See results', ar: 'شاهد النتائج' },
    directions: { en: 'Get directions', ar: 'احصل على الاتجاهات' },
    newTab: { en: '(opens in a new tab)', ar: '(يفتح في علامة تبويب جديدة)' },
    close: { en: 'Close', ar: 'إغلاق' },
  },
  hero: {
    eyebrow: { en: 'European standards certified', ar: 'معتمدون وفق المعايير الأوروبية' },
    title: { en: 'We change lives with bolder smiles.', ar: 'نغيّر الحياة بابتسامات أكثر إشراقًا.' },
    sub: {
      en: 'Cosmetic and family dentistry in Dubai, Abu Dhabi and Al Ain, from a routine check-up to a full Hollywood smile.',
      ar: 'طب أسنان تجميلي وعائلي في دبي وأبوظبي والعين، من الفحص الدوري إلى ابتسامة هوليوود الكاملة.',
    },
  },
  compare: {
    before: { en: 'Before', ar: 'قبل' },
    after: { en: 'After', ar: 'بعد' },
    hint: { en: 'Drag to compare', ar: 'اسحب للمقارنة' },
    label: { en: 'Before and after comparison', ar: 'مقارنة قبل العلاج وبعده' },
    sliderLabel: { en: 'Amount of the before photo shown', ar: 'نسبة ظهور صورة ما قبل العلاج' },
  },
  stats: {
    label: { en: 'Dubai Smile in numbers', ar: 'ابتسامة دبي بالأرقام' },
    items: [
      { value: { en: '20+', ar: '20+' }, label: { en: 'Years caring for smiles in the UAE, since 2002', ar: 'عامًا من رعاية الابتسامات في الإمارات منذ 2002' } },
      { value: { en: '50+', ar: '50+' }, label: { en: 'Specialised dentists across the UAE', ar: 'طبيب أسنان متخصص في أنحاء الإمارات' } },
      { value: { en: '300k+', ar: '300 ألف+' }, label: { en: 'Happy patients and counting', ar: 'مريض سعيد والعدد في ازدياد' } },
      { value: { en: '4', ar: '4' }, label: { en: 'Clinics in Dubai, Abu Dhabi and Al Ain', ar: 'عيادات في دبي وأبوظبي والعين' } },
    ],
  },
  treatments: {
    title: { en: 'Treatments for every smile', ar: 'علاجات لكل ابتسامة' },
    sub: {
      en: 'Everything from a gentle clean to a complete smile makeover, planned around your goals.',
      ar: 'كل ما تحتاجه، من تنظيف لطيف إلى تجميل كامل للابتسامة، بخطة تناسب أهدافك.',
    },
    listLabel: { en: 'Choose a treatment', ar: 'اختر علاجًا' },
    goodFor: { en: 'Often chosen for', ar: 'يُختار عادةً في حالات' },
    also: { en: 'Also available', ar: 'متوفر أيضًا' },
    askAbout: { en: 'Book a consultation about', ar: 'احجز استشارة بخصوص' },
  },
  results: {
    eyebrow: { en: 'Smile gallery', ar: 'معرض الابتسامات' },
    title: { en: 'See the difference for yourself', ar: 'شاهد الفرق بنفسك' },
    sub: {
      en: 'Drag the slider to compare this patient’s smile before and after treatment at Dubai Smile.',
      ar: 'اسحب المؤشر لمقارنة ابتسامة هذا المريض قبل العلاج في ابتسامة دبي وبعده.',
    },
    note: {
      en: 'Every result is different. Your dentist will talk you through what’s realistic for your smile.',
      ar: 'تختلف النتائج من شخص لآخر، وسيشرح لك طبيبك ما يمكن تحقيقه لابتسامتك.',
    },
    alt: {
      aBefore: { en: 'A patient’s smile before treatment', ar: 'ابتسامة مريض قبل العلاج' },
      aAfter: { en: 'The same patient’s smile after treatment at Dubai Smile', ar: 'ابتسامة المريض نفسه بعد العلاج في ابتسامة دبي' },
      bBefore: { en: 'A patient with worn, discoloured teeth before treatment', ar: 'مريض بأسنان متآكلة ومتصبغة قبل العلاج' },
      bAfter: { en: 'The same patient with a full, even smile after treatment', ar: 'المريض نفسه بابتسامة كاملة ومتناسقة بعد العلاج' },
    },
  },
  founder: {
    quote: { en: 'We want you to smile a little longer.', ar: 'نريدك أن تبتسم لفترة أطول.' },
    body: {
      en: 'Dubai Smile brings premium service and specialist dental care together under one roof. Every treatment is planned around your needs, your goals and your comfort.',
      ar: 'تجمع ابتسامة دبي بين الخدمة المتميزة ورعاية الأسنان المتخصصة تحت سقف واحد، ونخطط كل علاج وفق احتياجاتك وأهدافك وراحتك.',
    },
    name: { en: 'Dr. Ahmed Al Shagran', ar: 'د. أحمد الشقران' },
    role: { en: 'Founder, Dubai Smile', ar: 'مؤسس ابتسامة دبي' },
    signature: { en: 'Signature of Dr. Ahmed Al Shagran', ar: 'توقيع د. أحمد الشقران' },
  },
  why: {
    title: { en: 'Why patients choose Dubai Smile', ar: 'لماذا يختار المرضى ابتسامة دبي' },
    global: {
      title: { en: 'Specialists from around the world', ar: 'أطباء متخصصون من حول العالم' },
      body: {
        en: 'Our dentists bring training and experience from across the globe to every treatment plan.',
        ar: 'يجلب أطباؤنا خبرات وتدريبًا من مختلف أنحاء العالم إلى كل خطة علاج.',
      },
      alt: { en: 'Two Dubai Smile dentists smiling', ar: 'طبيبا أسنان من ابتسامة دبي يبتسمان' },
    },
    years: {
      value: { en: '2002', ar: '2002' },
      title: { en: 'Over two decades of care', ar: 'أكثر من عقدين من الرعاية' },
      body: {
        en: 'Families across the UAE have trusted us with their smiles since 2002.',
        ar: 'تثق بنا العائلات في الإمارات للعناية بابتساماتها منذ عام 2002.',
      },
    },
    language: {
      title: { en: 'Care in your language', ar: 'رعاية بلغتك' },
      body: {
        en: 'Our multilingual team explains every step clearly, so you always know what comes next.',
        ar: 'يشرح فريقنا متعدد اللغات كل خطوة بوضوح، لتعرف دائمًا ما هي الخطوة التالية.',
      },
    },
    lab: {
      title: { en: 'An in-house laboratory', ar: 'مختبر داخل العيادة' },
      body: {
        en: 'Crowns and veneers are crafted in our own on-site laboratory.',
        ar: 'نصنع التيجان والقشور التجميلية في مختبرنا الخاص داخل العيادة.',
      },
    },
    plans: {
      title: { en: 'Plans made for you', ar: 'خطط مصممة لك' },
      body: {
        en: 'No two smiles are the same, so every treatment plan starts with your goals.',
        ar: 'لا تتشابه ابتسامتان، لذلك تبدأ كل خطة علاج بأهدافك أنت.',
      },
    },
  },
  dentists: {
    eyebrow: { en: 'Our team', ar: 'فريقنا' },
    title: { en: 'Meet your dentists', ar: 'تعرّف على أطبائك' },
    sub: {
      en: 'Eleven dental specialists caring for patients across our UAE clinics.',
      ar: 'أحد عشر طبيب أسنان متخصصًا يعتنون بالمرضى في عياداتنا في الإمارات.',
    },
    prev: { en: 'Show previous dentists', ar: 'عرض الأطباء السابقين' },
    next: { en: 'Show more dentists', ar: 'عرض المزيد من الأطباء' },
    listLabel: { en: 'Dentists', ar: 'الأطباء' },
  },
  reviews: {
    title: { en: 'What our patients say', ar: 'ماذا يقول مرضانا' },
    translated: { en: '', ar: 'التقييمات مترجمة من الإنجليزية.' },
  },
  clinics: {
    title: { en: 'Four clinics across the UAE', ar: 'أربع عيادات في أنحاء الإمارات' },
    sub: { en: 'Visit us in Dubai, Abu Dhabi, Al Bahia or Al Ain.', ar: 'زورونا في دبي أو أبوظبي أو الباهية أو العين.' },
    hours: { en: 'Opening hours', ar: 'ساعات العمل' },
    sunThu: { en: 'Sunday to Thursday', ar: 'الأحد إلى الخميس' },
    fri: { en: 'Friday', ar: 'الجمعة' },
    sat: { en: 'Saturday', ar: 'السبت' },
    closed: { en: 'Closed', ar: 'مغلق' },
    to: { en: 'to', ar: 'إلى' },
    callAria: { en: 'Call the {name} clinic', ar: 'اتصل بعيادة {name}' },
    callSr: { en: 'the {name} clinic on', ar: 'بعيادة {name} على الرقم' },
    directionsAria: { en: 'Get directions to the {name} clinic', ar: 'احصل على الاتجاهات إلى عيادة {name}' },
    status: {
      openUntil: { en: 'Open now, until {time}', ar: 'مفتوح الآن حتى {time}' },
      closingSoon: { en: 'Closing soon, at {time}', ar: 'يغلق قريبًا، الساعة {time}' },
      closedOpens: { en: 'Closed, opens {day} at {time}', ar: 'مغلق، يفتح {day} الساعة {time}' },
      today: { en: 'today', ar: 'اليوم' },
      tomorrow: { en: 'tomorrow', ar: 'غدًا' },
    },
  },
  faq: {
    eyebrow: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
    title: { en: 'Questions, answered', ar: 'إجابات عن أسئلتكم' },
    sub: {
      en: 'Can’t find what you’re looking for? Our team is happy to help.',
      ar: 'لم تجد ما تبحث عنه؟ يسعد فريقنا بمساعدتك.',
    },
  },
  book: {
    title: { en: 'Book a consultation', ar: 'احجز استشارة' },
    sub: {
      en: 'Leave your details and our team will call you to confirm a time at your chosen clinic.',
      ar: 'اترك بياناتك وسيتصل بك فريقنا لتأكيد موعد في العيادة التي تختارها.',
    },
    name: { en: 'Full name', ar: 'الاسم الكامل' },
    phone: { en: 'Phone number', ar: 'رقم الهاتف' },
    phoneHint: { en: 'We’ll only use this to arrange your visit.', ar: 'نستخدمه فقط لترتيب زيارتك.' },
    phonePlaceholder: { en: '+971 50 123 4567', ar: '+971 50 123 4567' },
    clinic: { en: 'Clinic', ar: 'العيادة' },
    clinicPlaceholder: { en: 'Choose a clinic', ar: 'اختر عيادة' },
    treatment: { en: 'Treatment', ar: 'العلاج' },
    optional: { en: 'Optional', ar: 'اختياري' },
    notSure: { en: 'Not sure yet', ar: 'لست متأكدًا بعد' },
    time: { en: 'Best time to call', ar: 'أفضل وقت للاتصال' },
    morning: { en: 'Morning', ar: 'صباحًا' },
    afternoon: { en: 'Afternoon', ar: 'بعد الظهر' },
    evening: { en: 'Evening', ar: 'مساءً' },
    message: { en: 'Anything we should know?', ar: 'هل هناك ما يجب أن نعرفه؟' },
    submit: { en: 'Send request', ar: 'أرسل الطلب' },
    consent: {
      en: 'By sending this form, you agree to be contacted about your appointment.',
      ar: 'بإرسال هذا النموذج، توافق على أن نتواصل معك بشأن موعدك.',
    },
    errors: {
      name: { en: 'Enter your full name', ar: 'أدخل اسمك الكامل' },
      phone: {
        en: 'Enter a phone number with at least 9 digits, for example +971 50 123 4567',
        ar: 'أدخل رقم هاتف من 9 أرقام على الأقل، مثل \u2066+971 50 123 4567\u2069',
      },
      clinic: { en: 'Choose the clinic you’d like to visit', ar: 'اختر العيادة التي تودّ زيارتها' },
      summary: { en: 'Check the highlighted fields and try again.', ar: 'راجع الحقول المحددة وحاول مرة أخرى.' },
    },
    success: {
      title: { en: 'Request sent', ar: 'تم إرسال الطلب' },
      body: {
        en: 'Thank you, {name}. Our {clinic} team will call you on {phone} during clinic hours.',
        ar: 'شكرًا لك يا {name}. سيتصل بك فريق عيادة {clinic} على الرقم {phone} خلال ساعات العمل.',
      },
      again: { en: 'Send another request', ar: 'أرسل طلبًا آخر' },
    },
    failure: {
      en: 'Unable to send your request online. Call {clinic} on {phone} and we’ll book you in.',
      ar: 'تعذّر إرسال طلبك عبر الإنترنت. اتصل بعيادة {clinic} على الرقم {phone} وسنحجز لك موعدًا.',
    },
    direct: { en: 'Prefer to talk? Call a clinic directly.', ar: 'تفضّل التحدث؟ اتصل بإحدى العيادات مباشرة.' },
  },
  footer: {
    about: {
      en: 'Dubai Smile is a cosmetic and family dental clinic with branches in Dubai, Abu Dhabi, Al Bahia and Al Ain.',
      ar: 'ابتسامة دبي عيادة أسنان تجميلية وعائلية لها فروع في دبي وأبوظبي والباهية والعين.',
    },
    clinics: { en: 'Clinics', ar: 'العيادات' },
    treatments: { en: 'Treatments', ar: 'العلاجات' },
    explore: { en: 'Explore', ar: 'استكشف' },
    follow: { en: 'Follow Dubai Smile', ar: 'تابع ابتسامة دبي' },
    language: { en: 'Language', ar: 'اللغة' },
    rights: {
      en: '© {year} Dubai Smile Dental Clinic. All rights reserved.',
      ar: '© {year} عيادة ابتسامة دبي لطب الأسنان. جميع الحقوق محفوظة.',
    },
  },
} as const;

export default ui;

export function useT(lang: Lang) {
  return (s: L, vars?: Record<string, string>) => {
    let out: string = s[lang];
    if (vars) for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, v);
    return out;
  };
}
