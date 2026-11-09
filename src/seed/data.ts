/**
 * Starting content for drkamol.com, taken from Dr. Kamol's profile and the
 * "About us" page on kamolhospital.com (November 2026). Everything here can be
 * edited in the CMS afterwards. Figures that differ between pages on the
 * hospital site are seeded as *unconfirmed* and stay hidden until an editor
 * confirms them (Profile → Figures).
 */

type L = { en: string; th?: string }

export const profile = {
  name: { en: 'Dr. Kamol Pansritum, M.D.', th: 'นพ.กมล พันธ์ศรีทุม' } as L,
  role: {
    en: 'Plastic & gender-affirming surgeon · Founder, Kamol Cosmetic Hospital',
    th: 'ศัลยแพทย์ตกแต่งและศัลยกรรมยืนยันเพศ · ผู้ก่อตั้งโรงพยาบาลศัลยกรรมตกแต่งกมล',
  } as L,
  headlineA: { en: 'Surgery,', th: 'ศัลยกรรม' } as L,
  headlineB: { en: 'refined to an art.', th: 'ที่ประณีตดุจงานศิลป์' } as L,
  intro: {
    en: 'An internationally recognised plastic and gender-affirming surgeon in Bangkok, combining scientific innovation, artistic technique and compassionate care for patients from around the world.',
    th: 'ศัลยแพทย์ตกแต่งและศัลยกรรมยืนยันเพศที่ได้รับการยอมรับในระดับนานาชาติ ผสานนวัตกรรมทางการแพทย์ ศิลปะการออกแบบ และการดูแลด้วยหัวใจ ให้ผู้ป่วยจากทั่วโลก',
  } as L,
  wordA: { en: 'Precision.', th: 'แม่นยำ' } as L,
  wordB: { en: 'Artistry.', th: 'ประณีต' } as L,
  wordC: { en: 'Dignity.', th: 'ให้เกียรติ' } as L,
  statement: {
    en: 'Techniques refined over more than 25 years of practice, published in international journals and taught on congress stages from Rio de Janeiro to Kyoto.',
    th: 'เทคนิคที่พัฒนาตลอดกว่า 25 ปี ตีพิมพ์ในวารสารนานาชาติ และถ่ายทอดบนเวทีประชุมวิชาการตั้งแต่ริโอเดจาเนโรถึงเกียวโต',
  } as L,
  bio: {
    en: 'Dr. Kamol Pansritum graduated in medicine from Khon Kaen University in 1986 and completed his training in general surgery and plastic surgery at Chulalongkorn University in Bangkok, becoming a Diplomate of the Thai Board of Plastic Surgery in 1997.\n\nAfter years as a surgeon in public hospitals, he founded Kamol Cosmetic Hospital, where he leads a multidisciplinary team dedicated to gender-affirming and aesthetic plastic surgery. His work on facial feminisation, vaginoplasty, metoidioplasty and phalloplasty has been published in international journals and presented at ISAPS, WPATH and EPATH congresses, earning a Gold Medal at the ISAPS Olympiad in Athens in 2023.',
    th: 'นพ.กมล พันธ์ศรีทุม สำเร็จการศึกษาแพทยศาสตรบัณฑิตจากมหาวิทยาลัยขอนแก่นในปี พ.ศ. 2529 และฝึกอบรมศัลยกรรมทั่วไปและศัลยกรรมตกแต่งที่จุฬาลงกรณ์มหาวิทยาลัย ได้รับวุฒิบัตรศัลยกรรมตกแต่งในปี พ.ศ. 2540\n\nหลังจากปฏิบัติงานเป็นศัลยแพทย์ในโรงพยาบาลรัฐหลายปี ท่านได้ก่อตั้งโรงพยาบาลศัลยกรรมตกแต่งกมล และเป็นผู้นำทีมสหสาขาวิชาชีพด้านศัลยกรรมยืนยันเพศและศัลยกรรมตกแต่งความงาม ผลงานด้านการผ่าตัดปรับโครงหน้า การผ่าตัดแปลงเพศชายเป็นหญิงและหญิงเป็นชาย ได้รับการตีพิมพ์ในวารสารนานาชาติและนำเสนอในการประชุม ISAPS, WPATH และ EPATH รวมถึงได้รับเหรียญทอง ISAPS Olympiad ที่กรุงเอเธนส์ในปี 2566',
  } as L,
  philosophy: {
    en: 'Every technique and innovation has been inspired by my own passion and vision. I have dedicated my life to advancing gender-affirming surgery so that it is not only safe and refined, but also empowering — giving each person the confidence to embrace who they truly are.\n\nThis is why I remain here, driven by devotion and love for my work: to help every individual who comes to us discover their true self and begin a new life filled with happiness.',
    th: 'ทุกเทคนิคและนวัตกรรมเกิดจากความมุ่งมั่นและวิสัยทัศน์ของผม ผมอุทิศชีวิตให้กับการพัฒนาศัลยกรรมยืนยันเพศ ให้ไม่เพียงปลอดภัยและประณีต แต่ยังมอบพลังให้ทุกคนมีความมั่นใจที่จะเป็นตัวเองอย่างแท้จริง\n\nนี่คือเหตุผลที่ผมยังทำงานนี้ด้วยความรักและความทุ่มเท เพื่อช่วยให้ทุกคนที่มาหาเราได้ค้นพบตัวตนที่แท้จริง และเริ่มต้นชีวิตใหม่ที่เต็มไปด้วยความสุข',
  } as L,
  quote: {
    en: 'Surgery that is not only safe and refined, but also empowering.',
    th: 'ศัลยกรรมที่ไม่เพียงปลอดภัยและประณีต แต่ยังมอบพลังให้ผู้คนเป็นตัวเอง',
  } as L,
  stats: [
    { value: '25+', label: { en: 'Years of surgical practice', th: 'ปีแห่งประสบการณ์ศัลยกรรม' }, confirmed: true },
    // Conflicting figures on kamolhospital.com — hidden until confirmed by the hospital.
    { value: '5,000+', label: { en: 'Gender-affirming procedures', th: 'เคสผ่าตัดแปลงเพศ' }, confirmed: false },
    { value: '20,000+', label: { en: 'Surgeries performed', th: 'เคสศัลยกรรม' }, confirmed: false },
  ],
  education: [
    { year: '1986', degree: { en: 'Doctor of Medicine (M.D.)', th: 'แพทยศาสตรบัณฑิต' }, institution: { en: 'Khon Kaen University, Thailand', th: 'มหาวิทยาลัยขอนแก่น' } },
    { year: '1992', degree: { en: 'Diplomate, Thai Board of General Surgery', th: 'วุฒิบัตรศัลยกรรมทั่วไป' }, institution: { en: 'Chulalongkorn University', th: 'จุฬาลงกรณ์มหาวิทยาลัย' } },
    { year: '1997', degree: { en: 'Diplomate, Thai Board of Plastic Surgery', th: 'วุฒิบัตรศัลยกรรมตกแต่ง' }, institution: { en: 'Chulalongkorn University', th: 'จุฬาลงกรณ์มหาวิทยาลัย' } },
  ],
  career: [
    { period: '1986–1988', role: { en: 'General Practitioner', th: 'แพทย์ทั่วไป' }, place: { en: 'Udonthani Community Hospital', th: 'โรงพยาบาลชุมชน อุดรธานี' } },
    { period: '1989–1992', role: { en: 'General Surgery Resident', th: 'แพทย์ประจำบ้านศัลยกรรมทั่วไป' }, place: { en: 'Chulalongkorn Hospital', th: 'โรงพยาบาลจุฬาลงกรณ์' } },
    { period: '1992–1994', role: { en: 'General Surgeon', th: 'ศัลยแพทย์ทั่วไป' }, place: { en: 'Internavanakorn Hospital, Bangkok', th: 'โรงพยาบาลอินทรานวนคร กรุงเทพฯ' } },
    { period: '1995–1997', role: { en: 'Plastic Surgery Resident', th: 'แพทย์ประจำบ้านศัลยกรรมตกแต่ง' }, place: { en: 'Chulalongkorn Hospital', th: 'โรงพยาบาลจุฬาลงกรณ์' } },
    { period: '1997–2003', role: { en: 'Plastic Surgeon', th: 'ศัลยแพทย์ตกแต่ง' }, place: { en: 'Ananthamahidol Hospital, Lopburi', th: 'โรงพยาบาลอานันทมหิดล ลพบุรี' } },
    { period: '1997–present', role: { en: 'Founder & Chief Plastic Surgeon', th: 'ผู้ก่อตั้งและหัวหน้าศัลยแพทย์ตกแต่ง' }, place: { en: 'Kamol Cosmetic Hospital, Bangkok', th: 'โรงพยาบาลศัลยกรรมตกแต่งกมล กรุงเทพฯ' } },
  ],
  memberships: [
    { en: 'Society of Plastic and Reconstructive Surgeons of Thailand', th: 'สมาคมศัลยแพทย์ตกแต่งและเสริมสร้างแห่งประเทศไทย' },
    { en: 'Society of Aesthetic Plastic Surgeons of Thailand', th: 'สมาคมศัลยแพทย์ตกแต่งเสริมสวยแห่งประเทศไทย' },
    { en: 'Royal College of Surgeons of Thailand', th: 'ราชวิทยาลัยศัลยแพทย์แห่งประเทศไทย' },
    { en: 'International Society of Aesthetic Plastic Surgery (ISAPS)', th: 'สมาคมศัลยแพทย์ตกแต่งความงามนานาชาติ (ISAPS)' },
    { en: 'World Professional Association for Transgender Health (WPATH)', th: 'สมาคมวิชาชีพสุขภาพคนข้ามเพศโลก (WPATH)' },
  ] as L[],
  license: {
    en: 'Thai Medical Council, full registration licence no. 13427',
    th: 'แพทยสภา ใบอนุญาตประกอบวิชาชีพเวชกรรมเลขที่ 13427',
  } as L,
}

export const awards = [
  { title: { en: 'Gold Medal, ISAPS Olympiad', th: 'เหรียญทอง ISAPS Olympiad' }, detail: { en: '“Rare Complication in Neovaginoplasty” — Athens', th: '“Rare Complication in Neovaginoplasty” — เอเธนส์' }, organization: 'International Society of Aesthetic Plastic Surgery', year: 2023 },
  { title: { en: 'Bronze Medal, ISAPS', th: 'เหรียญทองแดง ISAPS' }, detail: { en: '“Metoidioplasty with Combined Flap Technique”', th: '“Metoidioplasty with Combined Flap Technique”' }, organization: 'International Society of Aesthetic Plastic Surgery', year: 2023 },
  { title: { en: 'Invited Speaker, ISAPS Singapore', th: 'วิทยากรรับเชิญ ISAPS สิงคโปร์' }, organization: 'International Society of Aesthetic Plastic Surgery', year: 2025 },
  { title: { en: 'Invited Speaker, ISAPS World Congress', th: 'วิทยากรรับเชิญ ISAPS World Congress' }, organization: 'International Society of Aesthetic Plastic Surgery', year: 2021 },
  { title: { en: 'Outstanding Alumni, Faculty of Medicine', th: 'ศิษย์เก่าดีเด่น คณะแพทยศาสตร์' }, organization: 'Khon Kaen University', year: 2015 },
] as { title: L; detail?: L; organization: string; year: number }[]

const pubmed = (title: string) => `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(title)}`

export const publications = [
  {
    title: 'The Challenge of Peritoneal Vaginoplasty in Transgender Women: Review Literature and Personal Perspectives',
    journal: 'International Journal of Transplantation & Plastic Surgery',
    year: 2025,
    kind: 'review',
    featured: true,
  },
  {
    title: 'Decadal Outcomes of Prefabricated Urethral Reconstruction in Phalloplasty',
    journal: 'International Journal of Transplantation & Plastic Surgery, 8(2): 000186',
    year: 2024,
    kind: 'article',
    authors: 'Pansritum K, et al.',
    featured: true,
  },
  {
    title: 'Nipple reduction using the mushroom flap technique for male transgender',
    journal: 'JPRAS Open, 41: 320–325',
    year: 2024,
    kind: 'article',
    url: pubmed('Nipple reduction using the mushroom flap technique for male transgender'),
    featured: true,
  },
  {
    title: 'Urethral reconstruction with peritoneal graft in phalloplasty for male transgender',
    journal: 'Journal of Plastic, Reconstructive & Aesthetic Surgery',
    kind: 'article',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35599225/',
    featured: true,
  },
  {
    title: 'A Rectoprostatic Fascia Reinforcement Flap for the Treatment of Intraoperative Rectal Injury and Recto-Neovaginal Fistula in Gender Affirmation Surgery for Trans Women',
    journal: 'Plastic and Reconstructive Surgery',
    kind: 'article',
    url: pubmed('Rectoprostatic Fascia Reinforcement Flap Rectoneovaginal Fistula Gender-Affirmation Surgery'),
  },
  {
    title: 'Forehead and Hairline Surgery for Gender Affirmation',
    journal: 'Plastic and Reconstructive Surgery – Global Open',
    kind: 'article',
    doi: '10.1097/GOX.0000000000003486',
  },
  {
    title: 'Neovaginal Cavity Dissection for Gender Affirmation Surgery in Trans Female: Assisted Endoscopic Light Guide Method',
    journal: 'International Journal of Transplantation & Plastic Surgery',
    kind: 'article',
    doi: '10.23880/IJTPS-16000153',
  },
  {
    title: 'Laparoscopic Ascending Colon Neovagina Reconstruction for Severe Stricture of the Sigmoid Neovagina in a Transgender Woman: A Case Report',
    journal: 'International Journal of Transplantation & Plastic Surgery',
    kind: 'case-report',
    doi: '10.23880/ijtps-16000144',
  },
  { title: 'Craniosynostosis', journal: 'The Thai Journal of Surgery', year: 1996, kind: 'article' },
] as {
  title: string
  journal: string
  year?: number
  kind: 'article' | 'case-report' | 'review' | 'chapter'
  doi?: string
  url?: string
  authors?: string
  featured?: boolean
}[]

export const lectures = [
  { title: 'Rare Complications in Sex Reassignment Surgery', event: 'ISAPS Congress 2023', city: 'Athens', country: 'Greece', year: 2023, featured: true },
  { title: 'Metoidioplasty: Martius-Ring Flap Technique', event: 'ISAPS Congress 2023', city: 'Athens', country: 'Greece', year: 2023 },
  { title: 'Multiple Procedures for Transgender Surgery in Medical Tourism Perspective', event: '33rd Annual Meeting, Society of Plastic and Reconstructive Surgeons of Thailand', city: 'Bangkok', country: 'Thailand', year: 2023 },
  { title: 'Neovaginal Cavity Creation and Reconstruction in Trans Female', event: 'ISAPS Congress 2022', city: 'Istanbul', country: 'Türkiye', year: 2022, featured: true },
  { title: 'Facial Feminization Surgery', event: 'Competent and Comprehensive Transgender Care (CETH), Faculty of Medicine, Chulalongkorn University', city: 'Bangkok', country: 'Thailand', year: 2022 },
  { title: 'Risks and Management in Private Practice in Plastic Surgery: Personal Experience', event: '31st Annual Meeting, Society of Plastic and Reconstructive Surgeons of Thailand', city: 'Bangkok', country: 'Thailand', year: 2021 },
  { title: 'Genital Surgery for Transgenders', event: 'Annual Meeting of Taiwan Society of Plastic Surgery', city: '', country: 'Taiwan', year: 2020 },
  { title: 'Metoidioplasty: An Extended Labial Flap Technique', event: '30th Annual Meeting, Society of Plastic and Reconstructive Surgeons of Thailand', city: 'Bangkok', country: 'Thailand', year: 2020 },
  { title: 'Facial Feminization Surgery: Aesthetic Concept and Surgical Techniques', event: '24th ISAPS Congress', city: 'Miami', country: 'USA', year: 2018, featured: true },
  { title: 'Anterolateral Thigh Phalloplasty', event: 'EPATH Conference 2017', city: 'Belgrade', country: 'Serbia', year: 2017 },
  { title: 'Laparoscopic Sigmoid Colon Vaginoplasty', event: '18th ASEAN Congress of Plastic Surgery combined with ISAPS Symposium', city: 'Bangkok', country: 'Thailand', year: 2017 },
  { title: 'ALT Phalloplasty', event: '23rd ISAPS Congress', city: 'Kyoto', country: 'Japan', year: 2016, featured: true },
  { title: 'Sex Reassignment Surgery: Medial Scar Technique', event: 'WPATH Symposium 2016', city: 'Amsterdam', country: 'Netherlands', year: 2016 },
  { title: 'Metoidioplasty: An Alternative of Phalloplasty in Female-to-Male Transsexuals', event: 'Thailand–Singapore–Taiwan (TST) Conference 2016', city: 'Hua Hin', country: 'Thailand', year: 2016 },
  { title: 'Augmentation Rhinoplasty with ePTFE: How I Do It', event: '41st Annual Scientific Congress, Royal College of Surgeons of Thailand', city: 'Pattaya', country: 'Thailand', year: 2016 },
  { title: 'Neovaginal Cavity Dissection in Female Transgender', event: 'Global Aesthetic Surgery 2015', city: 'Miami', country: 'USA', year: 2015 },
  { title: 'Sex Reassignment Surgery', event: '16th Research Conference of the GID Society', city: 'Okinawa', country: 'Japan', year: 2014 },
  { title: 'Sex Reassignment Surgery Revision, 13 Years Experience', event: 'WPATH Symposium 2014', city: 'Bangkok', country: 'Thailand', year: 2014, kind: 'poster' },
  { title: 'Metoidioplasty: An Alternative of Phalloplasty in Female-to-Male Transsexuals, Experience and Results', event: '14th International Congress of the Oriental Society of Aesthetic Plastic Surgery (OSAPS)', city: 'Pattaya', country: 'Thailand', year: 2014 },
  { title: 'Complex Surgery for Facial Transition: Surgical Technique and Analysis of Results in 245 Cases', event: '14th International Congress of the Oriental Society of Aesthetic Plastic Surgery (OSAPS)', city: 'Pattaya', country: 'Thailand', year: 2014 },
  { title: 'Fibula: An Excellent Alternative to the Free Radial Forearm Flap in Asian Female-to-Male Transgender Phalloplasty', event: '14th Annual Meeting, Japanese Society of Gender Identity Disorder, Okayama University', city: 'Okayama', country: 'Japan', year: 2012 },
  { title: 'Sex Reassignment Surgery and Facial Feminization Surgery', event: 'II Jornada de Ginecologia e Obstetrícia Estética', city: 'Rio de Janeiro', country: 'Brazil', year: 2010, featured: true },
] as { title: string; event: string; city: string; country: string; year: number; kind?: string; featured?: boolean }[]

/** Public patient-story films from the Kamol Hospital YouTube channel. */
export const videos = [
  { youtube: '9lyZXHYkqIw', title: 'Transform your life with SRS PPV surgery at Kamol Hospital', category: 'gender', featured: true, order: 1 },
  { youtube: 'p7OXiFvWrSc', title: 'Jessica Alves — SRS PPV penile-peritoneal vaginoplasty', category: 'gender', order: 2 },
  { youtube: 'PJtm9nm5GL8', title: 'Romy Abergel shares her transformed life', category: 'gender', order: 3 },
  { youtube: 'GTMHWdFGQUg', title: 'Michelle — SRS revision with laparoscopic colon technique', category: 'gender', order: 4 },
  { youtube: '2VHCfcA0cCI', title: 'Sophia — laparoscopic colon vaginoplasty', category: 'gender', order: 5 },
  { youtube: 'NQF0n_4Gjww', title: 'Arielle — 12 days after SRS', category: 'gender', order: 6 },
  { youtube: 'zbDJQoZm4gY', title: 'Jing Jing — skin graft vs. colon graft vaginoplasty', category: 'gender', order: 7 },
  { youtube: 'eS_gqou2ulI', title: 'Kara — skin graft vaginoplasty', category: 'gender', order: 8 },
  { youtube: 'djEAGhG2J00', title: 'Masaki — radial forearm phalloplasty', category: 'gender', order: 9 },
  { youtube: 'jEK4-mbshoY', title: 'Chen Xintao — gender-affirming surgery', category: 'gender', order: 10 },
  { youtube: 'afINXFJf7b0', title: 'Naoki — mastectomy, embracing his true self', category: 'body', order: 11 },
  { youtube: 'Too_9m5a8wE', title: 'Pik — top surgery', category: 'body', order: 12 },
  { youtube: 'YF4ratcRZ4E', title: 'Alessandra Langella — facial feminization', category: 'facial', order: 13 },
  { youtube: 'exVWOaCufVE', title: 'Lia — face feminization', category: 'facial', order: 14 },
  { youtube: 'lTpdhJHpc3I', title: 'Zhao Zheng — forehead contouring and hairline lowering', category: 'facial', order: 15 },
  { youtube: '68VeHy_6_sI', title: 'Techi — tracheal shave', category: 'facial', order: 16 },
  { youtube: 'newXwe1nUyU', title: 'Facial surgery at Kamol Hospital', category: 'facial', order: 17 },
  { youtube: 'w5f9od3ewYs', title: 'Miss Universe Myanmar 2018 at Kamol Cosmetic Hospital', category: 'media', order: 18 },
] as { youtube: string; title: string; category: string; featured?: boolean; order: number }[]

export const settings = {
  email: 'drkamol@kamolhospital.com',
  phone: '+66 2 559 0155',
  hospitalName: { en: 'Kamol Cosmetic Hospital', th: 'โรงพยาบาลศัลยกรรมตกแต่งกมล' } as L,
  address: { en: '1223 Lat Phrao 94, Inthraphon Rd., Wang Thonglang, Bangkok 10310, Thailand' } as L,
  hospitalUrl: 'https://kamolhospital.com',
  appointmentUrl: 'https://kamolhospital.com',
  youtube: 'https://www.youtube.com/c/Kamolhospital',
  siteTitle: { en: 'Dr. Kamol Pansritum — Plastic & Gender-Affirming Surgeon, Bangkok', th: 'นพ.กมล พันธ์ศรีทุม — ศัลยแพทย์ตกแต่งและศัลยกรรมยืนยันเพศ กรุงเทพฯ' } as L,
  siteDescription: {
    en: 'The surgical and academic work of Dr. Kamol Pansritum: gender-affirming surgery, facial feminisation, publications and international lectures.',
    th: 'ผลงานด้านศัลยกรรมและวิชาการของ นพ.กมล พันธ์ศรีทุม ศัลยกรรมยืนยันเพศ ศัลยกรรมปรับโครงหน้า ผลงานตีพิมพ์ และการบรรยายระดับนานาชาติ',
  } as L,
}
