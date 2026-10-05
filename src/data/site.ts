import type { L } from '../i18n/ui';

/* ------------------------------------------------------------------
   Treatments. Slugs match the existing dubaismile.com service URLs.
------------------------------------------------------------------- */
export type Treatment = {
  slug: string;
  image: string;
  name: L;
  summary: L;
  goodFor: L[];
};

export const treatments: Treatment[] = [
  {
    slug: 'hollywood-smile',
    image: 'hollywood-smile',
    name: { en: 'Hollywood smile', ar: 'ابتسامة هوليوود' },
    summary: {
      en: 'A complete smile makeover, usually with porcelain veneers or crowns, shaped to suit your face and skin tone.',
      ar: 'تجميل كامل للابتسامة، غالبًا بقشور البورسلين أو التيجان، يُصمَّم ليتناسب مع شكل وجهك ولون بشرتك.',
    },
    goodFor: [
      { en: 'Worn or uneven teeth', ar: 'أسنان متآكلة أو غير متناسقة' },
      { en: 'Stains whitening can’t lift', ar: 'تصبغات لا يزيلها التبييض' },
      { en: 'A full smile redesign', ar: 'إعادة تصميم كاملة للابتسامة' },
    ],
  },
  {
    slug: 'dental-veneers',
    image: 'veneers',
    name: { en: 'Veneers', ar: 'القشور التجميلية (الفينير)' },
    summary: {
      en: 'Thin, custom-made shells bonded to the front of your teeth to correct their colour, shape or spacing.',
      ar: 'قشور رقيقة مصممة خصيصًا تُثبَّت على السطح الأمامي للأسنان لتصحيح لونها أو شكلها أو الفراغات بينها.',
    },
    goodFor: [
      { en: 'Chipped or worn edges', ar: 'حواف مكسورة أو متآكلة' },
      { en: 'Small gaps', ar: 'فراغات صغيرة' },
      { en: 'Stubborn stains', ar: 'بقع عنيدة' },
    ],
  },
  {
    slug: 'teeth-whitening',
    image: 'teeth-whitening',
    name: { en: 'Teeth whitening', ar: 'تبييض الأسنان' },
    summary: {
      en: 'A professional whitening session that lifts built-up coffee, tea and tobacco stains, with results you can see the same day.',
      ar: 'جلسة تبييض احترافية تزيل تصبغات القهوة والشاي والتدخين المتراكمة، بنتيجة تلاحظها في اليوم نفسه.',
    },
    goodFor: [
      { en: 'Yellowing teeth', ar: 'اصفرار الأسنان' },
      { en: 'Coffee and tea stains', ar: 'بقع القهوة والشاي' },
      { en: 'A brighter smile before an event', ar: 'ابتسامة أكثر إشراقًا قبل مناسبة' },
    ],
  },
  {
    slug: 'invisalign',
    image: 'invisalign',
    name: { en: 'Invisalign', ar: 'إنفزلاين' },
    summary: {
      en: 'Clear, removable aligners that straighten teeth gradually. You can take them out to eat, brush and floss.',
      ar: 'مصففات شفافة قابلة للإزالة تقوّم الأسنان تدريجيًا، ويمكنك نزعها أثناء الأكل وتنظيف الأسنان.',
    },
    goodFor: [
      { en: 'Crowded teeth', ar: 'تزاحم الأسنان' },
      { en: 'Gaps between teeth', ar: 'الفراغات بين الأسنان' },
      { en: 'Adults who want discreet treatment', ar: 'البالغون الباحثون عن علاج غير ملحوظ' },
    ],
  },
  {
    slug: 'orthodontic-braces',
    image: 'braces',
    name: { en: 'Orthodontic braces', ar: 'تقويم الأسنان' },
    summary: {
      en: 'Fixed metal or ceramic braces that correct crooked teeth and bite problems with steady, predictable movement.',
      ar: 'تقويم ثابت معدني أو خزفي يصحّح اعوجاج الأسنان ومشكلات الإطباق بحركة ثابتة ومدروسة.',
    },
    goodFor: [
      { en: 'Complex bite problems', ar: 'مشكلات الإطباق المعقدة' },
      { en: 'Severe crowding', ar: 'التزاحم الشديد' },
      { en: 'Teens and adults', ar: 'المراهقون والبالغون' },
    ],
  },
  {
    slug: 'teeth-cleaning',
    image: 'teeth-cleaning',
    name: { en: 'Teeth cleaning', ar: 'تنظيف الأسنان' },
    summary: {
      en: 'A professional scale and polish that removes the plaque and tartar your toothbrush can’t reach, and helps keep gum disease away.',
      ar: 'تنظيف وتلميع احترافي يزيل البلاك والجير الذي لا تصل إليه فرشاة الأسنان، ويساعد على حماية اللثة من الأمراض.',
    },
    goodFor: [
      { en: 'A check-up every six months', ar: 'فحص كل ستة أشهر' },
      { en: 'Bad breath', ar: 'رائحة الفم الكريهة' },
      { en: 'Before whitening', ar: 'قبل التبييض' },
    ],
  },
  {
    slug: 'root-canal',
    image: 'root-canal',
    name: { en: 'Root canal', ar: 'علاج العصب' },
    summary: {
      en: 'Treatment that clears infection from inside a tooth and seals it, relieving pain while saving your natural tooth.',
      ar: 'علاج يزيل الالتهاب من داخل السن ثم يغلقه بإحكام، فيخفف الألم ويحافظ على سنك الطبيعي.',
    },
    goodFor: [
      { en: 'Persistent toothache', ar: 'ألم أسنان مستمر' },
      { en: 'Sensitivity to hot or cold', ar: 'حساسية للساخن أو البارد' },
      { en: 'Deep decay', ar: 'تسوس عميق' },
    ],
  },
  {
    slug: 'gum-disease-treatment',
    image: 'gum-care',
    name: { en: 'Gum disease treatment', ar: 'علاج أمراض اللثة' },
    summary: {
      en: 'Deep cleaning and targeted care for bleeding, swollen or receding gums, before small problems put your teeth at risk.',
      ar: 'تنظيف عميق ورعاية موجهة للثة النازفة أو المتورمة أو المنحسرة، قبل أن تهدد المشكلات الصغيرة أسنانك.',
    },
    goodFor: [
      { en: 'Bleeding gums', ar: 'نزيف اللثة' },
      { en: 'Receding gums', ar: 'انحسار اللثة' },
      { en: 'Loose teeth', ar: 'تخلخل الأسنان' },
    ],
  },
  {
    slug: 'childrens-dentistry',
    image: 'childrens-dentistry',
    name: { en: 'Children’s dentistry', ar: 'طب أسنان الأطفال' },
    summary: {
      en: 'Gentle check-ups, fluoride and fissure sealants for growing smiles, in a calm setting that helps children feel at ease.',
      ar: 'فحوصات لطيفة وفلورايد وحشوات وقائية للأسنان النامية، في أجواء هادئة تساعد الأطفال على الشعور بالراحة.',
    },
    goodFor: [
      { en: 'A first dental visit', ar: 'الزيارة الأولى لطبيب الأسنان' },
      { en: 'Cavity prevention', ar: 'الوقاية من التسوس' },
      { en: 'Nervous little patients', ar: 'الأطفال القلقون' },
    ],
  },
];

export const moreTreatments: { slug: string; icon: string; name: L; summary: L }[] = [
  {
    slug: 'same-day-dental-implants',
    icon: 'tooth',
    name: { en: 'Same-day implants', ar: 'زراعة الأسنان في اليوم نفسه' },
    summary: {
      en: 'Replace a missing tooth with an implant and temporary crown in a single visit, where suitable.',
      ar: 'استبدال السن المفقود بزرعة وتاج مؤقت في زيارة واحدة، عندما تسمح الحالة بذلك.',
    },
  },
  {
    slug: 'composite-bonding',
    icon: 'sparkle',
    name: { en: 'Composite bonding', ar: 'الترميم التجميلي بالكومبوزيت' },
    summary: {
      en: 'Tooth-coloured resin that repairs chips and gaps while keeping as much healthy enamel as possible.',
      ar: 'حشوة بلون الأسنان تُصلح الكسور والفراغات مع الحفاظ على أكبر قدر من المينا السليمة.',
    },
  },
  {
    slug: 'laser-dentistry',
    icon: 'crosshair-simple',
    name: { en: 'Laser dentistry', ar: 'طب الأسنان بالليزر' },
    summary: {
      en: 'Precise laser treatment for gums and soft tissue, often with less bleeding and faster healing.',
      ar: 'علاج دقيق بالليزر للثة والأنسجة الرخوة، غالبًا بنزيف أقل وتعافٍ أسرع.',
    },
  },
  {
    slug: 'full-mouth-rehabilitation',
    icon: 'smiley',
    name: { en: 'Full mouth rehabilitation', ar: 'إعادة تأهيل الفم بالكامل' },
    summary: {
      en: 'A complete plan that restores how every tooth works and looks, combining implants, crowns and more.',
      ar: 'خطة شاملة تعيد وظيفة جميع الأسنان ومظهرها، باستخدام الزراعة والتيجان وغيرها.',
    },
  },
];

/* ------------------------------------------------------------------
   Dentists. Order and photos follow the current site.
   Arabic spellings marked `verify` need confirming with the clinic.
------------------------------------------------------------------- */
export type Dentist = { slug: string; name: L; female: boolean; verify?: boolean };

export const dentists: Dentist[] = [
  { slug: 'yoge-shan', name: { en: 'Dr. Yoge Shan', ar: 'د. يوجي شان' }, female: false, verify: true },
  { slug: 'manal-chbael', name: { en: 'Dr. Manal Chbael', ar: 'د. منال شبعال' }, female: true, verify: true },
  { slug: 'asmaa-mohammed', name: { en: 'Dr. Asmaa Mohammed', ar: 'د. أسماء محمد' }, female: true },
  { slug: 'khalil-al-rouh', name: { en: 'Dr. Khalil Al Rouh', ar: 'د. خليل الروح' }, female: false, verify: true },
  { slug: 'salsabil-al-behairy', name: { en: 'Dr. Salsabil Al Behairy', ar: 'د. سلسبيل البحيري' }, female: true },
  { slug: 'mohammed-saad', name: { en: 'Dr. Mohammed Saad', ar: 'د. محمد سعد' }, female: false },
  { slug: 'tamara-nemar', name: { en: 'Dr. Tamara Nemar', ar: 'د. تمارا نمر' }, female: true, verify: true },
  { slug: 'ibrahim-abu-abbas', name: { en: 'Dr. Ibrahim Abu Abbas', ar: 'د. إبراهيم أبو عباس' }, female: false },
  { slug: 'ashraf-muhsen', name: { en: 'Dr. Ashraf Muhsen', ar: 'د. أشرف محسن' }, female: false },
  { slug: 'farouk-aboulnaser-lutfi', name: { en: 'Dr. Farouk Aboulnaser Lutfi', ar: 'د. فاروق أبو النصر لطفي' }, female: false },
  { slug: 'baraa-amer-chami', name: { en: 'Dr. Baraa Amer Chami', ar: 'د. براء عامر شامي' }, female: false },
];

export const dentistRole = { male: { en: 'Dentist', ar: 'طبيب أسنان' }, female: { en: 'Dentist', ar: 'طبيبة أسنان' } };

/* ------------------------------------------------------------------
   Clinics. Hours are 24h "HH:MM" in Asia/Dubai time.
   Week index follows JS getDay(): 0 = Sunday ... 6 = Saturday.
------------------------------------------------------------------- */
export type Clinic = {
  id: string;
  name: L;
  address: L;
  phone: string;
  mapsQuery: string;
  hours: { weekdays: [string, string]; friday: [string, string] };
};

export const clinics: Clinic[] = [
  {
    id: 'dubai',
    name: { en: 'Dubai', ar: 'دبي' },
    address: { en: 'Wasl Road, next to City Walk, Dubai', ar: 'شارع الوصل، بجوار سيتي ووك، دبي' },
    phone: '+971 4 380 8988',
    mapsQuery: 'Dubai Smile Dental Clinic, Al Wasl Road, Dubai',
    hours: { weekdays: ['10:00', '19:00'], friday: ['10:00', '15:00'] },
  },
  {
    id: 'abu-dhabi',
    name: { en: 'Abu Dhabi', ar: 'أبوظبي' },
    address: { en: 'Delma Street, Al Nahyan, Abu Dhabi', ar: 'شارع دلما، آل نهيان، أبوظبي' },
    phone: '+971 2 665 0555',
    mapsQuery: 'Dubai Smile Dental Clinic, Delma Street, Al Nahyan, Abu Dhabi',
    hours: { weekdays: ['09:00', '20:00'], friday: ['09:00', '15:00'] },
  },
  {
    id: 'al-bahia',
    name: { en: 'Al Bahia', ar: 'الباهية' },
    address: { en: 'Global Mall Al Bahia, next to Ramz Mall, Abu Dhabi', ar: 'جلوبال مول الباهية، بجوار رمز مول، أبوظبي' },
    phone: '+971 2 566 8002',
    mapsQuery: 'Dubai Smile Dental Clinic, Global Mall, Al Bahia, Abu Dhabi',
    hours: { weekdays: ['11:00', '20:00'], friday: ['09:00', '15:00'] },
  },
  {
    id: 'al-ain',
    name: { en: 'Al Ain', ar: 'العين' },
    address: {
      en: 'Hamdan Bin Zayed Al Awwal Street, behind Jimi Mall, Al Ain',
      ar: 'شارع حمدان بن زايد الأول، خلف الجيمي مول، العين',
    },
    phone: '+971 3 763 4445',
    mapsQuery: 'Dubai Smile Dental Clinic, Hamdan Bin Zayed Al Awwal Street, Al Ain',
    hours: { weekdays: ['09:00', '20:00'], friday: ['09:00', '15:00'] },
  },
];

export const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, '')}`;
export const mapsHref = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

/* ------------------------------------------------------------------
   Reviews (verbatim from the current site, lightly trimmed)
------------------------------------------------------------------- */
export const reviews: { name: L; female: boolean; quote: L; featured?: boolean }[] = [
  {
    name: { en: 'Najla Atiq', ar: 'نجلاء عتيق' },
    female: true,
    featured: true,
    quote: {
      en: 'As far as any visit to a dentist can be described as pleasant, these folks go out of their way to make that possible.',
      ar: 'بقدر ما يمكن وصف زيارة طبيب الأسنان بأنها ممتعة، فإن هذا الفريق يبذل كل جهده ليجعلها كذلك.',
    },
  },
  {
    name: { en: 'Daniel Brown', ar: 'دانيال براون' },
    female: false,
    quote: {
      en: 'Same day availability and fantastic customer service! I recommend Zoom teeth whitening from Dubai Smile to anybody thinking about it.',
      ar: 'مواعيد متاحة في اليوم نفسه وخدمة عملاء رائعة! أنصح كل من يفكر في تبييض الأسنان بتقنية زوم بتجربته في ابتسامة دبي.',
    },
  },
  {
    name: { en: 'Mahdi A. Razeq', ar: 'مهدي عبد الرازق' },
    female: false,
    quote: {
      en: 'The best dentist I’ve ever dealt with, with very fair treatment prices. Expert doctors.',
      ar: 'أفضل طبيب أسنان تعاملت معه، وأسعار العلاج مناسبة جدًا. أطباء خبراء.',
    },
  },
];
export const reviewRole = { male: { en: 'Patient', ar: 'مريض' }, female: { en: 'Patient', ar: 'مريضة' } };

/* ------------------------------------------------------------------
   FAQ (rewritten from the current site for clarity)
------------------------------------------------------------------- */
export const faqs: { q: L; a: L }[] = [
  {
    q: { en: 'Why choose Dubai Smile?', ar: 'لماذا أختار ابتسامة دبي؟' },
    a: {
      en: 'Since 2002 we’ve helped patients across the UAE get healthier, more confident smiles, with specialist dentists, modern technology and care planned around you.',
      ar: 'منذ عام 2002 نساعد المرضى في أنحاء الإمارات على الحصول على ابتسامات أكثر صحة وثقة، مع أطباء متخصصين وتقنيات حديثة ورعاية مصممة حولك.',
    },
  },
  {
    q: { en: 'Are your dentists qualified?', ar: 'هل أطباؤكم مؤهلون؟' },
    a: {
      en: 'Yes. Our team is made up of qualified dentists and specialists, many with decades of hands-on experience.',
      ar: 'نعم. يضم فريقنا أطباء أسنان واختصاصيين مؤهلين، يتمتع كثير منهم بخبرة عملية تمتد لعقود.',
    },
  },
  {
    q: { en: 'Can I get a personalised treatment plan?', ar: 'هل يمكنني الحصول على خطة علاج مخصصة؟' },
    a: {
      en: 'Absolutely. Every plan starts with a consultation, where your dentist listens to your goals and designs treatment around your needs.',
      ar: 'بالتأكيد. تبدأ كل خطة باستشارة يستمع فيها طبيبك إلى أهدافك ويصمم العلاج وفق احتياجاتك.',
    },
  },
  {
    q: { en: 'Do you offer smile makeovers?', ar: 'هل تقدمون خدمة تجميل الابتسامة؟' },
    a: {
      en: 'Yes. Our smile makeovers, including the Hollywood smile, combine treatments such as veneers, whitening and bonding to transform how your smile looks.',
      ar: 'نعم. تجمع خدمات تجميل الابتسامة لدينا، ومنها ابتسامة هوليوود، بين علاجات مثل القشور التجميلية والتبييض والترميم لتغيير مظهر ابتسامتك.',
    },
  },
  {
    q: { en: 'Which cosmetic treatments do you offer?', ar: 'ما العلاجات التجميلية التي تقدمونها؟' },
    a: {
      en: 'Smile makeovers, teeth whitening, veneers, composite bonding and more. Book a consultation to find out which option suits you.',
      ar: 'تجميل الابتسامة وتبييض الأسنان والقشور التجميلية والترميم بالكومبوزيت وغيرها. احجز استشارة لتعرف الخيار الأنسب لك.',
    },
  },
  {
    q: { en: 'Do you use advanced technology?', ar: 'هل تستخدمون تقنيات حديثة؟' },
    a: {
      en: 'Yes. Our clinics are equipped with modern dental technology for precise, comfortable treatment.',
      ar: 'نعم. عياداتنا مجهزة بأحدث تقنيات طب الأسنان لعلاج دقيق ومريح.',
    },
  },
  {
    q: { en: 'Do you have other branches in the UAE?', ar: 'هل لديكم فروع أخرى في الإمارات؟' },
    a: {
      en: 'Yes. Alongside our Dubai clinic on Wasl Road, you can visit us in Abu Dhabi, Al Bahia and Al Ain.',
      ar: 'نعم. إلى جانب عيادتنا في شارع الوصل بدبي، يمكنك زيارتنا في أبوظبي والباهية والعين.',
    },
  },
  {
    q: { en: 'How do I book an appointment?', ar: 'كيف أحجز موعدًا؟' },
    a: {
      en: 'Call your nearest clinic or send a request with the booking form on this page. Our team will confirm a time that suits you.',
      ar: 'اتصل بأقرب عيادة أو أرسل طلبًا عبر نموذج الحجز في هذه الصفحة، وسيؤكد فريقنا موعدًا يناسبك.',
    },
  },
  {
    q: { en: 'Do you offer emergency dental care?', ar: 'هل تقدمون رعاية الأسنان الطارئة؟' },
    a: {
      en: 'Yes. If you’re in pain or have damaged a tooth, call your nearest clinic and our team will arrange to see you as soon as possible.',
      ar: 'نعم. إذا كنت تشعر بألم أو تعرض سنك لضرر، اتصل بأقرب عيادة وسيرتب فريقنا لاستقبالك في أقرب وقت ممكن.',
    },
  },
  {
    q: { en: 'Can my whole family come to Dubai Smile?', ar: 'هل يمكن لعائلتي بأكملها زيارة ابتسامة دبي؟' },
    a: {
      en: 'Yes. We care for patients of every age, from a child’s first check-up to complete restorative treatment for adults.',
      ar: 'نعم. نعتني بالمرضى من جميع الأعمار، من أول فحص للطفل إلى علاجات الترميم الكاملة للبالغين.',
    },
  },
  {
    q: { en: 'What payment options are available?', ar: 'ما خيارات الدفع المتاحة؟' },
    a: {
      en: 'We offer flexible financing options to make treatment more affordable. Ask our team about the plans available at your clinic.',
      ar: 'نقدم خيارات تمويل مرنة لتسهيل تكلفة العلاج. اسأل فريقنا عن الخطط المتاحة في عيادتك.',
    },
  },
  {
    q: { en: 'Can I have a virtual consultation?', ar: 'هل يمكنني الحصول على استشارة عن بُعد؟' },
    a: {
      en: 'Yes. Call us to book a virtual consultation and talk through your dental health with a dentist from home.',
      ar: 'نعم. اتصل بنا لحجز استشارة عن بُعد وناقش صحة أسنانك مع طبيب الأسنان من منزلك.',
    },
  },
];

export const socials = [
  { name: 'Instagram', icon: 'instagram-logo', href: 'https://www.instagram.com/dubaismile_dubai/' },
  { name: 'Facebook', icon: 'facebook-logo', href: 'https://www.facebook.com/DXBDubaiSmile' },
  { name: 'YouTube', icon: 'youtube-logo', href: 'https://youtube.com/@SmileArtDentalClinicDubai' },
  { name: 'LinkedIn', icon: 'linkedin-logo', href: 'https://www.linkedin.com/company/dubai-smile-dental-clinic/' },
];
