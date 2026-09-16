/**
 * Curriculum Data for "MORE ENGLISH MORE LOVE"
 * Supervised and taught by Teacher Jaidaa Saqr (المعلمة جيداء صقر)
 * 
 * Based on Unit 1 (Unité 1) French 3rd Preparatory Curriculum:
 * - Compréhension et interaction orales
 * - Production orale & Conseils
 * - Compréhension de l'écrit & Règles de la classe
 * - La négation (ne...pas, personne, jamais, ni...ni)
 * - Production écrite & Milieu scolaire
 * - Mon projet (Affiche des règles)
 */

export interface CurriculumContentSection {
  id: string;
  num: number;
  titleAr: string;
  titleFr: string;
  subtitleAr: string;
  badge: string;
  pagesRef: string;
  icon: string;
  color: string;
}

export const CURRICULUM_SECTIONS: CurriculumContentSection[] = [
  {
    id: "oral-comprehension",
    num: 1,
    titleAr: "الفهم والتفاعل الشفهي",
    titleFr: "Compréhension et interaction orales",
    subtitleAr: "الاستماع، تحليل مشهد التحرش/التنمر المدرسي، ومفردات الوحدة",
    badge: "الوحدة 1 - ص 6-7",
    pagesRef: "الصفحة 6 و 7",
    icon: "Headphones",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: "oral-production",
    num: 2,
    titleAr: "التعبير الشفهي وبناء النصائح",
    titleFr: "Production orale & Outils de conseil",
    subtitleAr: "صياغة المواقف (ضحية / شاهد) وأدوات تقديم النصائح",
    badge: "الوحدة 1 - ص 8-9",
    pagesRef: "الصفحة 8 و 9",
    icon: "MessageSquareQuote",
    color: "from-emerald-600 to-teal-600",
  },
  {
    id: "written-comprehension",
    num: 3,
    titleAr: "الفهم المكتوب وقواعد الصف",
    titleFr: "Compréhension de l'écrit & Règles de la classe",
    subtitleAr: "قواعد الصف الـ 10، تصريف فعل mettre، والسلوكيات الإيجابية",
    badge: "الوحدة 1 - ص 10-11",
    pagesRef: "الصفحة 10 و 11",
    icon: "BookOpenCheck",
    color: "from-violet-600 to-purple-600",
  },
  {
    id: "grammar-negation",
    num: 4,
    titleAr: "أدوات وقواعد النفي في الفرنسية",
    titleFr: "Mes outils de la langue - La négation",
    subtitleAr: "دراسة شاملة لقواعد (ne...pas, ne...personne, ne...jamais, ni...ni)",
    badge: "الوحدة 1 - ص 12-13",
    pagesRef: "الصفحة 12 و 13",
    icon: "ShieldAlert",
    color: "from-amber-600 to-orange-600",
  },
  {
    id: "written-production",
    num: 5,
    titleAr: "التعبير الكتابي والمناخ المدرسي",
    titleFr: "Production écrite - Le milieu scolaire",
    subtitleAr: "البيئة المدرسية الإيجابية والسلبية وكتابة نصائح ملصق المدرسة",
    badge: "الوحدة 1 - ص 14-15",
    pagesRef: "الصفحة 14 و 15",
    icon: "PenTool",
    color: "from-cyan-600 to-blue-600",
  },
  {
    id: "unit-project",
    num: 6,
    titleAr: "مشروع الوحدة: ملصق القواعد الإعلاني",
    titleFr: "Mon projet - Créer une affiche des règles",
    subtitleAr: "القواعد الذهبية، شعار GROUPE، ومصفوفة حل مشاكل الصف",
    badge: "الوحدة 1 - ص 18",
    pagesRef: "الصفحة 18",
    icon: "Sparkles",
    color: "from-fuchsia-600 to-pink-600",
  },
  {
    id: "worksheets-solutions",
    num: 7,
    titleAr: "أوراق عمل المنهاج والحلول النموذجية",
    titleFr: "7 Curriculum Worksheets & Model Solutions",
    subtitleAr: "أوراق العمل الـ 7 الشاملة للمنهاج مع الحلول التوضيحية المعتمدة",
    badge: "7 أوراق عمل كاملة",
    pagesRef: "المنهاج التفاعلي الكامل",
    icon: "FileCheck2",
    color: "from-amber-500 to-rose-600",
  },
];

// Vocabulary List for Unit 1
export const UNIT1_VOCABULARY = [
  { fr: "Se moquer de quelqu'un", ar: "يسخر من شخص ما", defFr: "Rire de quelqu'un de manière méchante" },
  { fr: "Surnommer", ar: "يلقب / يعطي كنية", defFr: "Donner un autre nom à quelqu'un" },
  { fr: "Le harcèlement", ar: "التحرش / التنمر", defFr: "Action agressive répétée contre quelqu'un" },
  { fr: "Contre quelqu'un", ar: "ضد شخص ما", defFr: "En opposition à une personne" },
  { fr: "Une victime", ar: "ضحية", defFr: "Personne qui subit une agression" },
  { fr: "Un témoin", ar: "شاهد", defFr: "Personne qui voit la scène sans y participer" },
  { fr: "Un harceleur", ar: "متحرش / متنمر", defFr: "Personne qui commet l'agression" },
  { fr: "Porter plainte", ar: "يقدم شكوى رسمية", defFr: "Informer la direction ou les autorités" },
  { fr: "Être ponctuel", ar: "دقيق في مواعيده", defFr: "Arriver exactement à l'heure" },
  { fr: "Mastiquer un chewing-gum", ar: "يمضغ العلكة", defFr: "Mâcher de la gomme en classe" },
];

// Conjugation of DEVOIR
export const VERBE_DEVOIR = [
  { pronom: "Je", form: "dois", ar: "أنا يجب علي" },
  { pronom: "Tu", form: "dois", ar: "أنتَ / أنتِ يجب عليك" },
  { pronom: "Il / Elle / On", form: "doit", ar: "هو / هي / نحن يجب عليه/عليها" },
  { pronom: "Nous", form: "devons", ar: "نحن يجب علينا" },
  { pronom: "Vous", form: "devez", ar: "أنتم / أنتن يجب عليكم" },
  { pronom: "Ils / Elles", form: "doivent", ar: "هم / هن يجب عليهم" },
];

// Conjugation of METTRE
export const VERBE_METTRE = [
  { pronom: "Je", form: "mets", ar: "أنا أضع" },
  { pronom: "Tu", form: "mets", ar: "أنت تضع" },
  { pronom: "Il / Elle / On", form: "met", ar: "هو / هي يضع" },
  { pronom: "Nous", form: "mettons", ar: "نحن نضع" },
  { pronom: "Vous", form: "mettez", ar: "أنتم تضعون" },
  { pronom: "Ils / Elles", form: "mettent", ar: "هم يضعون" },
];

// Classroom 10 Rules
export const CLASSROOM_RULES = [
  { num: 1, fr: "J'arrive à l'heure et je ne fais pas de bruit.", ar: "أصل في الوقت المحدد ولا أحدث ضجيجاً." },
  { num: 2, fr: "Je reste poli en classe, c'est-à-dire, je dis « bonjour, merci, etc. »", ar: "أبقى مهذباً في الصف، أي أقول: صباح الخير، شكراً، إلخ." },
  { num: 3, fr: "Je range mes affaires et je ne jette rien par terre.", ar: "أرتب أغراضي ولا ألقي أي شيء على الأرض." },
  { num: 4, fr: "Je lève la main avant de parler.", ar: "أرفع يدي قبل أن أتحدث." },
  { num: 5, fr: "Je ne mâche pas de chewing-gum.", ar: "لا أمضغ العلكة في الصف." },
  { num: 6, fr: "Je ne mets jamais ma bouteille d'eau sur le banc.", ar: "لا أضع أبداً زجاجة الماء الخاصة بي على المقعد." },
  { num: 7, fr: "Je respecte le matériel de classe.", ar: "أحترم أدوات وممتلكات الصف المدرسي." },
  { num: 8, fr: "Je ne parle pas à mes camarades sans demander la permission.", ar: "لا أتحدث مع زملائي بدون استئذان مسبق." },
  { num: 9, fr: "Il ne faut ni manger ni dormir en classe.", ar: "لا يجب الأكل ولا النوم في الحصة الصفية." },
  { num: 10, fr: "Je dois respecter le professeur.", ar: "يجب علي احترام الأستاذ والمعلمة." },
];

// Negation rules explanation
export const NEGATION_RULES = [
  {
    type: "ne ... pas",
    meaningAr: "لا / ليس (النفي العام البسيط)",
    exampleAffirmative: "Simon harcèle son copain.",
    exampleNegative: "Simon ne harcèle pas son copain.",
    explanationAr: "توضع 'ne' قبل الفعل و 'pas' بعد الفعل المصرف.",
  },
  {
    type: "ne ... personne",
    meaningAr: "لا أحد (تنفي الأشخاص)",
    exampleAffirmative: "Marc harcèle quelqu'un / tout le monde.",
    exampleNegative: "Simon ne harcèle personne.",
    explanationAr: "تُستخدم لنفي 'quelqu'un' (شخص ما) أو 'tout le monde' (الجميع).",
  },
  {
    type: "ne ... jamais",
    meaningAr: "لا أبداً (تنفي التكرار والزمان)",
    exampleAffirmative: "Marc harcèle quelquefois / souvent son copain.",
    exampleNegative: "Simon ne harcèle jamais son copain.",
    explanationAr: "تُستخدم لنفي 'quelquefois' (أحياناً)، 'toujours' (دائماً)، 'souvent' (غالباً)، 'parfois'.",
  },
  {
    type: "ni ... ni",
    meaningAr: "لا ... ولا (لنفي المعطوفات)",
    exampleAffirmative: "Marc harcèle son copain et sa copine.",
    exampleNegative: "Simon ne harcèle ni son copain ni sa copine.",
    explanationAr: "تستبدل حرف العطف 'et' بالنفي المزدوج 'ni ... ni'.",
  },
  {
    type: "ne ... rien",
    meaningAr: "لا شيء (تنفي الأشياء)",
    exampleAffirmative: "Je comprends quelque chose.",
    exampleNegative: "Je ne comprends rien.",
    explanationAr: "تُستخدم لنفي 'quelque chose' (شيء ما) أو 'tout' (كل شيء).",
  },
];
