/**
 * International Manhattan Buyer Hub — reusable content system.
 * English hub + localized country pages across major markets.
 */

export type InternationalRegion = "Asia" | "Europe" | "Middle East" | "Americas" | "Oceania";

export type InternationalFaq = { q: string; a: string };

export type InternationalNeighborhood = {
  name: string;
  blurb: string;
  typicalBuyer: string;
};

export type InternationalTeamRole = {
  role: string;
  description: string;
};

export type InternationalCountryPage = {
  slug: string;
  countryName: string;
  countryNameNative: string;
  languageCode: string;
  preferredLanguageLabel: string;
  flagEmoji: string;
  region: InternationalRegion;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  introTitle: string;
  introBody: string[];
  faqs: InternationalFaq[];
  neighborhoods: InternationalNeighborhood[];
  processSteps: Array<{ title: string; text: string }>;
  commonMistakes: string[];
  team: InternationalTeamRole[];
  resources: Array<{ label: string; href: string }>;
  formHeadline: string;
  formSubhead: string;
  specialistPromise: string;
  metaTitle: string;
  metaDescription: string;
};

export type InternationalCountrySlug = string;

export const INTERNATIONAL_HUB = {
  path: "/international",
  eyebrow: "International Buyers",
  title: "Buying residential real estate in Manhattan — from anywhere.",
  description:
    "A decision-first resource for international buyers. Understand ownership structures, process, neighborhoods, and financing before you commit — then request a strategy conversation with a specialist who speaks your language.",
  metaTitle: "International Manhattan Buyers",
  metaDescription:
    "Premium guide for international buyers considering Manhattan real estate: FAQs, neighborhoods, process, and a strategy request with multilingual follow-up.",
};

export const INTERNATIONAL_REGIONS: InternationalRegion[] = [
  "Asia",
  "Europe",
  "Middle East",
  "Americas",
  "Oceania",
];

const SHARED_TEAM: InternationalTeamRole[] = [
  {
    role: "Housing Advisor",
    description:
      "Owns the decision framework: purpose, ownership path, neighborhoods, timeline, and next action.",
  },
  {
    role: "Real Estate Attorney",
    description: "Leads New York contract review, entity questions, and closing coordination.",
  },
  {
    role: "Financing Specialist",
    description:
      "Maps cash vs mortgage options and foreign-national lending constraints when financing is relevant.",
  },
  {
    role: "Tax / Structure Counsel",
    description:
      "Coordinates with your advisors on holding structure and cross-border tax questions — referred as needed.",
  },
];

const SHARED_RESOURCES = [
  { label: "International Buyer Decision Brief", href: "/services/foreign-buyers-new-york" },
  { label: "Condo vs Co-op for Foreign Buyers", href: "/services/condo-vs-coop-foreign-buyers-nyc" },
  { label: "Belonging Assessment", href: "/belonging" },
  { label: "Residential Advisory", href: "/advisory" },
] as const;

const SHARED_NEIGHBORHOODS: InternationalNeighborhood[] = [
  {
    name: "Hudson Yards / West Midtown",
    blurb: "Newer inventory and service-oriented buildings — common for international and corporate moves.",
    typicalBuyer: "Executive / pied-à-terre",
  },
  {
    name: "Tribeca",
    blurb: "Quieter streets and high building quality — often chosen for long-term family holds.",
    typicalBuyer: "Family / long-term hold",
  },
  {
    name: "Upper West Side",
    blurb: "Parks, schools, and daily livability — strong for family relocation.",
    typicalBuyer: "Family relocation",
  },
  {
    name: "Financial District",
    blurb: "Relative value and rental flexibility — useful for investment or work-oriented stays.",
    typicalBuyer: "Investment / pied-à-terre",
  },
];

const SHARED_PROCESS = [
  { title: "Clarify purpose & timeline", text: "Primary home, pied-à-terre, investment, family, or relocation — purpose drives structure." },
  { title: "Choose ownership path", text: "Most international buyers evaluate condominiums first; co-ops need a separate diligence track." },
  { title: "Confirm capital path", text: "Cash, financing, or hybrid — plus source-of-funds readiness." },
  { title: "Building diligence", text: "Understand the building before a single apartment becomes emotional." },
  { title: "Contract & close", text: "New York is attorney-led. Timing varies by property type and approvals." },
];

const SHARED_MISTAKES = [
  "Falling in love with a unit before learning co-op or financing constraints",
  "Underestimating closing costs and ongoing carrying costs",
  "Offering without a local attorney and a clear source-of-funds path",
  "Treating \"can buy\" as \"should buy\" — without a written decision framework",
];

type CountrySeed = {
  slug: string;
  countryName: string;
  countryNameNative: string;
  languageCode: string;
  preferredLanguageLabel: string;
  flagEmoji: string;
  region: InternationalRegion;
  heroTitle?: string;
  heroDescription?: string;
  introTitle?: string;
  introBody?: string[];
  formHeadline?: string;
  formSubhead?: string;
  specialistPromise?: string;
  metaTitle?: string;
  metaDescription?: string;
  faqs?: InternationalFaq[];
  neighborhoods?: InternationalNeighborhood[];
  processSteps?: Array<{ title: string; text: string }>;
  commonMistakes?: string[];
  team?: InternationalTeamRole[];
  resources?: Array<{ label: string; href: string }>;
};

function buildCountry(seed: CountrySeed): InternationalCountryPage {
  const name = seed.countryName;
  return {
    slug: seed.slug,
    countryName: seed.countryName,
    countryNameNative: seed.countryNameNative,
    languageCode: seed.languageCode,
    preferredLanguageLabel: seed.preferredLanguageLabel,
    flagEmoji: seed.flagEmoji,
    region: seed.region,
    heroEyebrow: `${seed.countryNameNative} · ${seed.countryName}`,
    heroTitle:
      seed.heroTitle ??
      `Buying in Manhattan from ${name} — clarity before the search.`,
    heroDescription:
      seed.heroDescription ??
      `A decision-first guide for buyers from ${name}: ownership structures, process, neighborhoods, and financing — then a strategy request. After you submit, a specialist who speaks your language will get in touch.`,
    introTitle: seed.introTitle ?? "Why Manhattan is different for international buyers",
    introBody: seed.introBody ?? [
      "Manhattan real estate is organized around buildings and ownership structures — not just listings. International buyers often start with visa and citizenship questions. In New York, U.S. citizenship is generally not required to purchase residential property; co-op boards, financing, and source-of-funds documentation usually matter more than your passport.",
      "Agent Kammer works as a decision advisor first: clarify whether to buy, which ownership path fits, which neighborhoods match your life, and what timeline is realistic — then execute.",
    ],
    faqs:
      seed.faqs ??
      [
        {
          q: `Can citizens of ${name} buy residential property in Manhattan?`,
          a: "Yes. U.S. citizenship is generally not required. Constraints usually come from property type (especially co-ops), financing, board approval, and documentation — not from nationality alone.",
        },
        {
          q: `Can I buy remotely from ${name}?`,
          a: "Many steps can be remote — video tours, attorneys, contracts, and capital arrangements. What should not be remote is judgment: building diligence and a written strategy before you offer.",
        },
        {
          q: `Condo vs co-op for buyers from ${name}?`,
          a: "Condos are typically more accessible for international buyers. Co-ops require board approval and can be stricter for foreign nationals, financing, or investment use. Decide structure before falling in love with a unit.",
        },
        {
          q: "Is financing available?",
          a: "Yes, but with fewer options than for U.S. buyers. Many international buyers proceed with cash or hybrid structures. Confirm financing feasibility before you offer.",
        },
        {
          q: "What costs should I budget beyond purchase price?",
          a: "Closing costs, possible transfer taxes, ongoing taxes and carrying costs, and tax consequences on a future sale. Exact figures belong in a written strategy for your case.",
        },
      ],
    neighborhoods: seed.neighborhoods ?? SHARED_NEIGHBORHOODS,
    processSteps: seed.processSteps ?? SHARED_PROCESS,
    commonMistakes: seed.commonMistakes ?? SHARED_MISTAKES,
    team: seed.team ?? SHARED_TEAM,
    resources: seed.resources ?? [...SHARED_RESOURCES],
    formHeadline: seed.formHeadline ?? "Request your Manhattan strategy",
    formSubhead:
      seed.formSubhead ??
      `Tell us your situation. After you submit, a specialist who speaks ${seed.preferredLanguageLabel} will get in touch with the right next step.`,
    specialistPromise:
      seed.specialistPromise ??
      `After you submit, a specialist who speaks your preferred language (${seed.preferredLanguageLabel}) will get in touch to review your goals and recommend the next step — the start of a consultation, not an automated sales pitch.`,
    metaTitle: seed.metaTitle ?? `Manhattan Real Estate for Buyers from ${name}`,
    metaDescription:
      seed.metaDescription ??
      `Guide for buyers from ${name} considering Manhattan: eligibility, condo vs co-op, remote purchase, costs, and neighborhoods. Strategy request with language-matched follow-up.`,
  };
}

const COUNTRY_SEEDS: CountrySeed[] = [
  {
    slug: "china",
    countryName: "China",
    countryNameNative: "中国",
    languageCode: "zh-CN",
    preferredLanguageLabel: "中文 (Mandarin)",
    flagEmoji: "🇨🇳",
    region: "Asia",
    heroTitle: "在曼哈顿购置住宅：清晰决策，而非冲动搜索。",
    heroDescription:
      "为来自中国的买家准备的曼哈顿购房指南：外国人能否购买、公寓与合作公寓、远程签约、税务与流程——先理解，再行动。提交后，会有能用中文沟通的顾问与您联系。",
    introTitle: "为什么曼哈顿对国际买家不同",
    introBody: [
      "曼哈顿市场以建筑与所有权结构为核心，而不是以“房源列表”为核心。国际买家常先问签证与国籍——在纽约，购买住宅物业通常不要求美国公民身份，但合作公寓（co-op）董事会审批、融资路径与税务规划会显著改变可行方案。",
      "Agent Kammer 以决策顾问方式工作：先判断买或不买、买哪种产权、在哪个社区、以何种时间表推进——再进入执行。",
    ],
    faqs: [
      {
        q: "中国公民可以在曼哈顿买房吗？",
        a: "可以。购买住宅物业一般不要求美国公民身份或绿卡。关键限制通常来自物业类型（尤其是 co-op）、融资、资金来源证明，以及董事会审批——而不是护照本身。",
      },
      {
        q: "可以远程购买吗？",
        a: "许多环节可以远程完成（视频看房、律师、合同、资金安排）。关键决策仍建议有清晰的建筑尽职调查与书面策略，避免仅凭线上图片下定。",
      },
      {
        q: "Condo 和 Co-op 有什么区别？",
        a: "Condo（公寓产权）对国际买家通常更友好。Co-op（合作公寓）需要董事会审批，对融资、投资用途与外国人买家可能更严格。策略上应先确定产权结构再谈具体单位。",
      },
      {
        q: "外国人能贷款吗？",
        a: "可以，但选择比现金买家少。许多国际买家以现金或混合方案推进。融资可行性应在出价前与顾问、贷款人一起核实。",
      },
      {
        q: "需要担心哪些税费？",
        a: "除购房价外，还需预算成交成本、可能的转让税、年度地税/物业费，以及未来出售时的税务后果。具体数字取决于物业类型与结构——应在书面策略中单独列出。",
      },
    ],
    neighborhoods: [
      { name: "Hudson Yards / West Midtown", blurb: "新盘与服务式住宅较多，对国际与公司迁居买家常见。", typicalBuyer: "Executive / pied-à-terre" },
      { name: "Tribeca", blurb: "低层住宅与高净值家庭需求，强调安静与建筑品质。", typicalBuyer: "Family / long-term hold" },
      { name: "Upper West Side", blurb: "生活感强、学区与公园逻辑清晰，适合家庭长期居住。", typicalBuyer: "Family relocation" },
      { name: "Financial District", blurb: "相对价值与租赁弹性，适合投资或工作导向的居住。", typicalBuyer: "Investment / pied-à-terre" },
    ],
    processSteps: [
      { title: "明确用途与时间表", text: "自住、子女就学、投资还是跳板——用途决定产权与社区。" },
      { title: "确定产权结构", text: "多数国际买家优先评估 condo；co-op 需单独尽职。" },
      { title: "资金路径", text: "现金、融资或混合；同步准备资金来源与合规文件。" },
      { title: "建筑尽职调查", text: "在心动某套房之前，先理解建筑财务、规则与转售逻辑。" },
      { title: "合同与成交", text: "纽约买卖由律师主导；成交周期因物业与审批而异。" },
    ],
    commonMistakes: [
      "先爱上某套房，再发现 co-op 董事会或融资不可行",
      "低估成交成本与年度持有成本",
      "没有本地律师与清晰的资金合规路径就开始出价",
      "把“能买”当成“应该买”——缺少书面决策框架",
    ],
    team: [
      { role: "住房顾问", description: "负责决策框架：用途、产权路径、社区、时间表与下一步行动。" },
      { role: "房地产律师", description: "主导纽约合同审查、主体结构与成交协调。" },
      { role: "融资专员", description: "在需要贷款时梳理现金与按揭选项，以及外国买家融资限制。" },
      { role: "税务/结构顾问", description: "就持有结构与跨境税务问题与您的顾问协调——按需转介。" },
    ],
    formHeadline: "申请您的曼哈顿购房策略",
    formSubhead: "告诉我们您的情况。提交后，会有能用中文沟通的顾问与您联系，说明合适的下一步。",
    specialistPromise:
      "提交后，一位能用您所选语言（中文）沟通的顾问将与您联系，审核您的目标并建议下一步——这是咨询的开始，不是自动推销。",
    metaTitle: "中国买家购买曼哈顿房产指南",
    metaDescription:
      "为中国买家准备的曼哈顿购房指南：外国人购买资格、Condo 与 Co-op、远程交易、税费与社区。提交策略申请后有中文顾问跟进。",
  },

  {
    slug: "germany",
    countryName: "Germany",
    countryNameNative: "Deutschland",
    languageCode: "de",
    preferredLanguageLabel: "Deutsch",
    flagEmoji: "🇩🇪",
    region: "Europe",
    heroTitle: "Immobilien in Manhattan kaufen — mit Klarheit statt Druck.",
    heroDescription:
      "Leitfaden für Käufer aus Deutschland: Eigentumsformen, Prozess, Finanzierung und typische Fehler. Nach dem Absenden meldet sich ein Berater, der Deutsch spricht.",
    introTitle: "Warum Manhattan anders ist",
    introBody: [
      "Der Manhattan-Markt denkt in Gebäuden und Eigentumsstrukturen — nicht nur in Inseraten. Internationale Käufer fragen oft zuerst nach Visum und Staatsangehörigkeit. In New York ist für den Kauf von Wohnimmobilien in der Regel keine US-Staatsbürgerschaft erforderlich; entscheidend sind eher Condo vs. Co-op, Finanzierung und Due Diligence.",
      "Agent Kammer arbeitet entscheidungsorientiert: erst klären, ob und wie gekauft werden sollte — dann ausführen.",
    ],
    faqs: [
      { q: "Können deutsche Staatsangehörige in Manhattan kaufen?", a: "Ja. Für den Kauf ist in der Regel keine US-Staatsbürgerschaft nötig. Einschränkungen entstehen eher durch Co-op-Boards, Finanzierung und Nachweise zur Mittelherkunft." },
      { q: "Kann man remote kaufen?", a: "Viele Schritte sind remote möglich. Dennoch sollte vor einem Angebot eine klare Gebäude-Due-Diligence und eine schriftliche Strategie stehen." },
      { q: "Condo oder Co-op?", a: "Condos sind für internationale Käufer meist zugänglicher. Co-ops erfordern Board-Genehmigung und können für Ausländer oder Kapitalanlagen strenger sein." },
      { q: "Ist Finanzierung möglich?", a: "Ja, aber mit weniger Optionen als für US-Käufer. Viele internationale Käufer zahlen bar oder hybrid. Finanzierung vor dem Angebot prüfen." },
      { q: "Welche Nebenkosten?", a: "Neben dem Kaufpreis: Closing Costs, mögliche Transfersteuern, laufende Charges/Steuern und spätere Verkaufssteuern. Zahlen gehören in die schriftliche Strategie." },
    ],
    neighborhoods: [
      { name: "Tribeca", blurb: "Ruhige Straßen, hohe Bauqualität — oft für langfristige Familienentscheidungen.", typicalBuyer: "Familie / langfristig" },
      { name: "Upper West Side", blurb: "Parks, Schulen, Alltagstauglichkeit — stark für Relocations mit Kindern.", typicalBuyer: "Familien-Relocation" },
      { name: "Chelsea / West Village", blurb: "Lifestyle und Lage — häufig für Pied-à-terre und Paare.", typicalBuyer: "Pied-à-terre" },
      { name: "Hudson Yards", blurb: "Neuere Gebäude und Servicekultur — häufig bei internationalen und Corporate-Zügen.", typicalBuyer: "Executive" },
    ],
    processSteps: [
      { title: "Zweck und Zeitplan", text: "Eigennutzung, Pied-à-terre, Investment oder Relocation — Zweck steuert alles." },
      { title: "Eigentumsstruktur", text: "Condo zuerst prüfen; Co-op nur mit klarer Board-Strategie." },
      { title: "Kapitalpfad", text: "Cash, Finanzierung oder hybrid — Compliance früh klären." },
      { title: "Gebäude-Due-Diligence", text: "Gebäude verstehen, bevor eine einzelne Wohnung emotional wird." },
      { title: "Vertrag und Closing", text: "In NY führen Anwälte den Prozess; Dauer hängt von Typ und Freigaben ab." },
    ],
    commonMistakes: [
      "Zuerst die Wohnung lieben, dann merken, dass Co-op oder Finanzierung scheitert",
      "Closing Costs und laufende Kosten unterschätzen",
      "Ohne Anwalt und klare Mittelherkunft bieten",
      "„Man darf kaufen“ mit „man sollte kaufen“ verwechseln",
    ],
    team: [
      { role: "Wohnungsberater", description: "Verantwortet den Entscheidungsrahmen: Zweck, Eigentumspfad, Viertel, Zeitplan und nächste Aktion." },
      { role: "Immobilienanwalt", description: "Führt Vertragsprüfung, Strukturfragen und Closing-Koordination in New York." },
      { role: "Finanzierungsspezialist", description: "Klärt Cash- vs. Hypothekenoptionen und Grenzen für ausländische Kreditnehmer." },
      { role: "Steuer- / Strukturberatung", description: "Abstimmung zu Haltungsstruktur und grenzüberschreitenden Steuerfragen — bei Bedarf vermittelt." },
    ],
    formHeadline: "Manhattan-Strategie anfragen",
    formSubhead:
      "Beschreiben Sie Ihre Situation. Nach dem Absenden meldet sich ein Berater, der Deutsch spricht — mit dem passenden nächsten Schritt.",
    specialistPromise:
      "Nach dem Absenden meldet sich ein Spezialist, der Ihre gewählte Sprache (Deutsch) spricht, prüft Ihre Ziele und empfiehlt den nächsten Schritt — der Beginn einer Beratung, kein automatischer Verkaufsdruck.",
    metaTitle: "Manhattan Immobilien für Käufer aus Deutschland",
    metaDescription:
      "Leitfaden für deutsche Käufer in Manhattan: Kaufberechtigung, Condo vs Co-op, Remote-Kauf, Kosten und Stadtteile. Danach Kontakt durch deutschsprachigen Berater.",
  },

  {
    slug: "japan",
    countryName: "Japan",
    countryNameNative: "日本",
    languageCode: "ja",
    preferredLanguageLabel: "日本語",
    flagEmoji: "🇯🇵",
    region: "Asia",
    heroTitle: "マンハッタンで住宅を買う前に、判断を整える。",
    heroDescription:
      "日本からのバイヤー向けガイド。外国人の購入可否、コンドミニアムとコープ、遠隔取引、税金とプロセスを整理します。送信後、日本語で対応できるアドバイザーがご連絡します。",
    introTitle: "マンハッタンが特別な理由",
    introBody: [
      "マンハッタンは「物件一覧」より「建物と所有形態」で決まります。国籍やビザの有無が最初の質問になりがちですが、実際の分岐点はコンドとコープ、資金、デューデリジェンスです。",
      "Agent Kammer は意思決定を先に置きます。買う／待つ／どの所有形態かを明確にしてから、実行に移ります。",
    ],
    faqs: [
      { q: "日本国籍でもマンハッタンで購入できますか？", a: "可能です。米国市民権は通常必須ではありません。制限は主にコープの理事会審査、融資、資金の出所証明などから生じます。" },
      { q: "遠隔で購入できますか？", a: "多くの手続きは遠隔で進められます。ただし契約前に建物デューデリジェンスと書面の戦略があることが重要です。" },
      { q: "コンドとコープの違いは？", a: "国際バイヤーにはコンドの方が一般的に開かれています。コープは理事会承認が必要で、外国人や投資用途に厳しい場合があります。" },
      { q: "融資は可能ですか？", a: "可能ですが、米国内バイヤーより選択肢は限られます。現金またはハイブリッドも多いです。オファー前に確認してください。" },
      { q: "追加でかかる費用は？", a: "クロージング費用、譲渡税の可能性、年間の税金・管理費、将来の売却税など。金額は書面戦略に明記します。" },
    ],
    neighborhoods: [
      { name: "Tribeca", blurb: "静かな街区と建物品質。長期保有・ファミリーに選ばれやすい。", typicalBuyer: "ファミリー / 長期" },
      { name: "Upper West Side", blurb: "公園・学校・生活利便。転勤ファミリーに適合しやすい。", typicalBuyer: "ファミリー転勤" },
      { name: "Midtown East / Midtown", blurb: "アクセスとピエド・ア・テール需要。仕事拠点との両立。", typicalBuyer: "ピエド・ア・テール" },
      { name: "Hudson Yards", blurb: "新しい建物とサービス文化。国際・コーポレート層に多い。", typicalBuyer: "エグゼクティブ" },
    ],
    processSteps: [
      { title: "目的と時期", text: "居住・子女・投資・転勤。目的が所有形態を決める。" },
      { title: "所有形態", text: "まずコンドを検討。コープは別途デューデリ。" },
      { title: "資金", text: "現金・融資・併用。コンプライアンスを早期に。" },
      { title: "建物調査", text: "一室に感情移入する前に建物を理解する。" },
      { title: "契約と決済", text: "NYでは弁護士が中心。期間は案件により異なる。" },
    ],
    commonMistakes: [
      "先に物件に惚れ、後からコープや融資が不可と判明する",
      "クロージング費用と保有コストを過小評価する",
      "弁護士と資金証明なしにオファーする",
      "「買える」と「買うべき」を混同する",
    ],
    team: [
      { role: "住宅アドバイザー", description: "意思決定の枠組みを担当：目的、所有形態、エリア、時期、次のアクション。" },
      { role: "不動産弁護士", description: "ニューヨークの契約レビュー、主体・構造、クロージング調整を主導。" },
      { role: "融資スペシャリスト", description: "現金とローンの選択肢、外国人向け融資の制約を整理。" },
      { role: "税務・ストラクチャー助言", description: "保有形態と国境をまたぐ税務について、必要に応じて専門家を紹介します。" },
    ],
    formHeadline: "マンハッタン戦略のご相談",
    formSubhead:
      "状況をお知らせください。送信後、日本語で対応できるアドバイザーがご連絡し、次の一歩をご案内します。",
    specialistPromise:
      "送信後、ご選択の言語（日本語）で対応できるスペシャリストがご連絡し、目標を確認したうえで次のステップをご提案します。自動的な売り込みではなく、相談の開始です。",
    metaTitle: "日本人バイヤー向けマンハッタン不動産ガイド",
    metaDescription:
      "日本からのバイヤー向け。購入可否、コンドとコープ、遠隔取引、費用、エリア。戦略リクエスト後は日本語対応アドバイザーが連絡します。",
  },
  {
    slug: "korea",
    countryName: "South Korea",
    countryNameNative: "대한민국",
    languageCode: "ko",
    preferredLanguageLabel: "한국어",
    flagEmoji: "🇰🇷",
    region: "Asia",
    heroTitle: "맨해튼 주택 구매: 검색 전에 판단을 정리하세요.",
    formHeadline: "맨해튼 전략 상담 요청",
    specialistPromise: "제출 후, 선택하신 언어(한국어)로 소통 가능한 전문가가 연락드려 목표를 검토하고 다음 단계를 제안합니다. 자동 영업이 아니라 상담의 시작입니다.",
  },  {
    slug: "hong-kong",
    countryName: "Hong Kong",
    countryNameNative: "香港",
    languageCode: "zh-HK",
    preferredLanguageLabel: "繁體中文",
    flagEmoji: "🇭🇰",
    region: "Asia",
    heroTitle: "在曼哈頓置業：先想清楚，再開始搜尋。",
    formHeadline: "申請您的曼哈頓置業策略",
    specialistPromise: "提交後，會有能以繁體中文溝通的顧問與您聯絡，檢視目標並建議下一步——這是諮詢的開始，不是自動推銷。",
  },  {
    slug: "taiwan",
    countryName: "Taiwan",
    countryNameNative: "台灣",
    languageCode: "zh-TW",
    preferredLanguageLabel: "繁體中文",
    flagEmoji: "🇹🇼",
    region: "Asia",
    heroTitle: "在曼哈頓購屋：先做判斷，再看物件。",
    formHeadline: "申請您的曼哈頓購屋策略",
    specialistPromise: "提交後，會有能以繁體中文溝通的顧問與您聯繫，檢視目標並建議下一步——這是諮詢的開始，不是自動推銷。",
  },  {
    slug: "singapore",
    countryName: "Singapore",
    countryNameNative: "Singapore",
    languageCode: "en-SG",
    preferredLanguageLabel: "English",
    flagEmoji: "🇸🇬",
    region: "Asia",
  },  {
    slug: "india",
    countryName: "India",
    countryNameNative: "भारत",
    languageCode: "en-IN",
    preferredLanguageLabel: "English / हिन्दी",
    flagEmoji: "🇮🇳",
    region: "Asia",
    specialistPromise: "After you submit, a specialist who speaks your preferred language (English or Hindi support via our team) will get in touch to review your goals and recommend the next step.",
  },  {
    slug: "vietnam",
    countryName: "Vietnam",
    countryNameNative: "Việt Nam",
    languageCode: "vi",
    preferredLanguageLabel: "Tiếng Việt",
    flagEmoji: "🇻🇳",
    region: "Asia",
    formHeadline: "Yêu cầu chiến lược Manhattan",
    specialistPromise: "Sau khi gửi, một chuyên gia nói tiếng Việt sẽ liên hệ để xem xét mục tiêu và đề xuất bước tiếp theo.",
  },  {
    slug: "thailand",
    countryName: "Thailand",
    countryNameNative: "ประเทศไทย",
    languageCode: "th",
    preferredLanguageLabel: "ภาษาไทย",
    flagEmoji: "🇹🇭",
    region: "Asia",
    formHeadline: "ขอแผนกลยุทธ์แมนฮัตตัน",
    specialistPromise: "หลังจากส่งแบบฟอร์ม ผู้เชี่ยวชาญที่พูดภาษาไทยจะติดต่อกลับเพื่อหารือเป้าหมายและแนะนำขั้นตอนถัดไป",
  },  {
    slug: "indonesia",
    countryName: "Indonesia",
    countryNameNative: "Indonesia",
    languageCode: "id",
    preferredLanguageLabel: "Bahasa Indonesia",
    flagEmoji: "🇮🇩",
    region: "Asia",
    formHeadline: "Minta Strategi Manhattan Anda",
    specialistPromise: "Setelah mengirim, seorang spesialis yang berbicara Bahasa Indonesia akan menghubungi Anda untuk meninjau tujuan dan merekomendasikan langkah berikutnya.",
  },  {
    slug: "malaysia",
    countryName: "Malaysia",
    countryNameNative: "Malaysia",
    languageCode: "ms",
    preferredLanguageLabel: "Bahasa Melayu / English",
    flagEmoji: "🇲🇾",
    region: "Asia",
  },  {
    slug: "france",
    countryName: "France",
    countryNameNative: "France",
    languageCode: "fr",
    preferredLanguageLabel: "Français",
    flagEmoji: "🇫🇷",
    region: "Europe",
    heroTitle: "Acheter à Manhattan depuis la France — la clarté avant la recherche.",
    formHeadline: "Demandez votre stratégie Manhattan",
    formSubhead: "Décrivez votre situation. Après l'envoi, un spécialiste qui parle français vous contactera.",
    specialistPromise: "Après l'envoi, un spécialiste qui parle français vous contactera pour examiner vos objectifs et recommander la prochaine étape — le début d'une consultation, pas une vente automatisée.",
  },  {
    slug: "spain",
    countryName: "Spain",
    countryNameNative: "España",
    languageCode: "es",
    preferredLanguageLabel: "Español",
    flagEmoji: "🇪🇸",
    region: "Europe",
    heroTitle: "Comprar en Manhattan desde España — claridad antes de buscar.",
    formHeadline: "Solicite su estrategia en Manhattan",
    specialistPromise: "Tras enviarlo, un especialista que habla español se pondrá en contacto para revisar sus objetivos y recomendar el siguiente paso — el inicio de una consulta, no una venta automática.",
  },  {
    slug: "italy",
    countryName: "Italy",
    countryNameNative: "Italia",
    languageCode: "it",
    preferredLanguageLabel: "Italiano",
    flagEmoji: "🇮🇹",
    region: "Europe",
    heroTitle: "Comprare a Manhattan dall'Italia — chiarezza prima della ricerca.",
    formHeadline: "Richiedi la tua strategia Manhattan",
    specialistPromise: "Dopo l'invio, uno specialista che parla italiano ti contatterà per esaminare i tuoi obiettivi e consigliare il passo successivo.",
  },  {
    slug: "netherlands",
    countryName: "Netherlands",
    countryNameNative: "Nederland",
    languageCode: "nl",
    preferredLanguageLabel: "Nederlands",
    flagEmoji: "🇳🇱",
    region: "Europe",
    formHeadline: "Vraag uw Manhattan-strategie aan",
    specialistPromise: "Na verzending neemt een specialist die Nederlands spreekt contact met u op om uw doelen te bespreken en de volgende stap aan te bevelen.",
  },  {
    slug: "switzerland",
    countryName: "Switzerland",
    countryNameNative: "Schweiz / Suisse",
    languageCode: "de-CH",
    preferredLanguageLabel: "Deutsch / Français / English",
    flagEmoji: "🇨🇭",
    region: "Europe",
  },  {
    slug: "united-kingdom",
    countryName: "United Kingdom",
    countryNameNative: "United Kingdom",
    languageCode: "en-GB",
    preferredLanguageLabel: "English",
    flagEmoji: "🇬🇧",
    region: "Europe",
  },  {
    slug: "ireland",
    countryName: "Ireland",
    countryNameNative: "Éire",
    languageCode: "en-IE",
    preferredLanguageLabel: "English",
    flagEmoji: "🇮🇪",
    region: "Europe",
  },  {
    slug: "sweden",
    countryName: "Sweden",
    countryNameNative: "Sverige",
    languageCode: "sv",
    preferredLanguageLabel: "Svenska",
    flagEmoji: "🇸🇪",
    region: "Europe",
    formHeadline: "Begär din Manhattan-strategi",
    specialistPromise: "Efter att du skickat formuläret kontaktar en specialist som talar svenska dig för att gå igenom dina mål och föreslå nästa steg.",
  },  {
    slug: "norway",
    countryName: "Norway",
    countryNameNative: "Norge",
    languageCode: "nb",
    preferredLanguageLabel: "Norsk",
    flagEmoji: "🇳🇴",
    region: "Europe",
    formHeadline: "Be om din Manhattan-strategi",
    specialistPromise: "Etter innsending tar en spesialist som snakker norsk kontakt for å gjennomgå målene dine og anbefale neste steg.",
  },  {
    slug: "denmark",
    countryName: "Denmark",
    countryNameNative: "Danmark",
    languageCode: "da",
    preferredLanguageLabel: "Dansk",
    flagEmoji: "🇩🇰",
    region: "Europe",
    formHeadline: "Anmod om din Manhattan-strategi",
    specialistPromise: "Efter indsendelse kontakter en specialist, der taler dansk, dig for at gennemgå dine mål og anbefale næste skridt.",
  },  {
    slug: "finland",
    countryName: "Finland",
    countryNameNative: "Suomi",
    languageCode: "fi",
    preferredLanguageLabel: "Suomi",
    flagEmoji: "🇫🇮",
    region: "Europe",
    formHeadline: "Pyydä Manhattan-strategiasi",
    specialistPromise: "Lähetyksen jälkeen suomea puhuva asiantuntija ottaa yhteyttä, käy läpi tavoitteesi ja ehdottaa seuraavaa askelta.",
  },  {
    slug: "poland",
    countryName: "Poland",
    countryNameNative: "Polska",
    languageCode: "pl",
    preferredLanguageLabel: "Polski",
    flagEmoji: "🇵🇱",
    region: "Europe",
    formHeadline: "Poproś o strategię Manhattan",
    specialistPromise: "Po wysłaniu formularza skontaktuje się z Tobą specjalista mówiący po polsku, aby omówić cele i zaproponować kolejny krok.",
  },  {
    slug: "czechia",
    countryName: "Czechia",
    countryNameNative: "Česko",
    languageCode: "cs",
    preferredLanguageLabel: "Čeština",
    flagEmoji: "🇨🇿",
    region: "Europe",
    formHeadline: "Požádejte o strategii Manhattan",
    specialistPromise: "Po odeslání vás kontaktuje specialista, který mluví česky, projde vaše cíle a doporučí další krok.",
  },  {
    slug: "romania",
    countryName: "Romania",
    countryNameNative: "România",
    languageCode: "ro",
    preferredLanguageLabel: "Română",
    flagEmoji: "🇷🇴",
    region: "Europe",
    formHeadline: "Solicitați strategia Manhattan",
    specialistPromise: "După trimitere, un specialist care vorbește româna vă va contacta pentru a analiza obiectivele și a recomanda următorul pas.",
  },  {
    slug: "hungary",
    countryName: "Hungary",
    countryNameNative: "Magyarország",
    languageCode: "hu",
    preferredLanguageLabel: "Magyar",
    flagEmoji: "🇭🇺",
    region: "Europe",
    formHeadline: "Kérje Manhattan stratégiáját",
    specialistPromise: "Beküldés után egy magyarul beszélő szakértő felveszi Önnel a kapcsolatot, áttekinti a célokat, és javasolja a következő lépést.",
  },  {
    slug: "greece",
    countryName: "Greece",
    countryNameNative: "Ελλάδα",
    languageCode: "el",
    preferredLanguageLabel: "Ελληνικά",
    flagEmoji: "🇬🇷",
    region: "Europe",
    formHeadline: "Ζητήστε τη στρατηγική Manhattan",
    specialistPromise: "Μετά την υποβολή, ένας ειδικός που μιλά ελληνικά θα επικοινωνήσει μαζί σας για να εξετάσει τους στόχους σας και να προτείνει το επόμενο βήμα.",
  },  {
    slug: "portugal",
    countryName: "Portugal",
    countryNameNative: "Portugal",
    languageCode: "pt-PT",
    preferredLanguageLabel: "Português",
    flagEmoji: "🇵🇹",
    region: "Europe",
    formHeadline: "Peça a sua estratégia Manhattan",
    specialistPromise: "Após o envio, um especialista que fala português entrará em contacto para rever os seus objetivos e recomendar o próximo passo.",
  },  {
    slug: "russia",
    countryName: "Russia",
    countryNameNative: "Россия",
    languageCode: "ru",
    preferredLanguageLabel: "Русский",
    flagEmoji: "🇷🇺",
    region: "Europe",
    heroTitle: "Покупка жилья на Манхэттене — ясность до поиска.",
    formHeadline: "Запросите стратегию по Манхэттену",
    specialistPromise: "После отправки с вами свяжется специалист, говорящий по-русски, чтобы обсудить цели и предложить следующий шаг.",
  },  {
    slug: "ukraine",
    countryName: "Ukraine",
    countryNameNative: "Україна",
    languageCode: "uk",
    preferredLanguageLabel: "Українська",
    flagEmoji: "🇺🇦",
    region: "Europe",
    formHeadline: "Запросіть стратегію Manhattan",
    specialistPromise: "Після надсилання з вами зв’яжеться спеціаліст, який говорить українською, щоб обговорити цілі та запропонувати наступний крок.",
  },  {
    slug: "turkey",
    countryName: "Turkey",
    countryNameNative: "Türkiye",
    languageCode: "tr",
    preferredLanguageLabel: "Türkçe",
    flagEmoji: "🇹🇷",
    region: "Europe",
    formHeadline: "Manhattan stratejinizi talep edin",
    specialistPromise: "Gönderimden sonra Türkçe konuşan bir uzman sizinle iletişime geçerek hedeflerinizi gözden geçirecek ve sonraki adımı önerecektir.",
  },  {
    slug: "uae",
    countryName: "United Arab Emirates",
    countryNameNative: "الإمارات",
    languageCode: "ar",
    preferredLanguageLabel: "العربية / English",
    flagEmoji: "🇦🇪",
    region: "Middle East",
    formHeadline: "اطلب استراتيجية مانهاتن",
    specialistPromise: "بعد الإرسال، سيتواصل معك متخصص يتحدث العربية (أو الإنجليزية حسب تفضيلك) لمراجعة أهدافك واقتراح الخطوة التالية.",
  },  {
    slug: "saudi-arabia",
    countryName: "Saudi Arabia",
    countryNameNative: "السعودية",
    languageCode: "ar",
    preferredLanguageLabel: "العربية / English",
    flagEmoji: "🇸🇦",
    region: "Middle East",
    formHeadline: "اطلب استراتيجية مانهاتن",
    specialistPromise: "بعد الإرسال، سيتواصل معك متخصص يتحدث العربية لمراجعة أهدافك واقتراح الخطوة التالية.",
  },  {
    slug: "israel",
    countryName: "Israel",
    countryNameNative: "ישראל",
    languageCode: "he",
    preferredLanguageLabel: "עברית / English",
    flagEmoji: "🇮🇱",
    region: "Middle East",
    formHeadline: "בקשו את אסטרטגיית מנהטן שלכם",
    specialistPromise: "לאחר השליחה, מומחה דובר עברית (או אנגלית) יחזור אליכם כדי לבחון את המטרות ולהמליץ על הצעד הבא.",
  },  {
    slug: "canada",
    countryName: "Canada",
    countryNameNative: "Canada",
    languageCode: "en-CA",
    preferredLanguageLabel: "English / Français",
    flagEmoji: "🇨🇦",
    region: "Americas",
  },  {
    slug: "mexico",
    countryName: "Mexico",
    countryNameNative: "México",
    languageCode: "es-MX",
    preferredLanguageLabel: "Español",
    flagEmoji: "🇲🇽",
    region: "Americas",
    heroTitle: "Comprar en Manhattan desde México — claridad antes de buscar.",
    formHeadline: "Solicite su estrategia en Manhattan",
    specialistPromise: "Después de enviarlo, un especialista que habla español se pondrá en contacto para revisar sus objetivos y recomendar el siguiente paso.",
  },  {
    slug: "brazil",
    countryName: "Brazil",
    countryNameNative: "Brasil",
    languageCode: "pt-BR",
    preferredLanguageLabel: "Português (Brasil)",
    flagEmoji: "🇧🇷",
    region: "Americas",
    heroTitle: "Comprar em Manhattan a partir do Brasil — clareza antes da busca.",
    formHeadline: "Solicite sua estratégia em Manhattan",
    formSubhead: "Conte sua situação. Após o envio, um especialista que fala português entrará em contato.",
    specialistPromise: "Após o envio, um especialista que fala português entrará em contato para revisar seus objetivos e recomendar o próximo passo — o início de uma consultoria, não uma venda automática.",
  },  {
    slug: "argentina",
    countryName: "Argentina",
    countryNameNative: "Argentina",
    languageCode: "es-AR",
    preferredLanguageLabel: "Español",
    flagEmoji: "🇦🇷",
    region: "Americas",
    formHeadline: "Solicite su estrategia en Manhattan",
    specialistPromise: "Tras enviarlo, un especialista que habla español se pondrá en contacto para revisar sus objetivos y recomendar el siguiente paso.",
  },  {
    slug: "colombia",
    countryName: "Colombia",
    countryNameNative: "Colombia",
    languageCode: "es-CO",
    preferredLanguageLabel: "Español",
    flagEmoji: "🇨🇴",
    region: "Americas",
    formHeadline: "Solicite su estrategia en Manhattan",
    specialistPromise: "Tras enviarlo, un especialista que habla español se pondrá en contacto para revisar sus objetivos y recomendar el siguiente paso.",
  },  {
    slug: "chile",
    countryName: "Chile",
    countryNameNative: "Chile",
    languageCode: "es-CL",
    preferredLanguageLabel: "Español",
    flagEmoji: "🇨🇱",
    region: "Americas",
    formHeadline: "Solicite su estrategia en Manhattan",
    specialistPromise: "Tras enviarlo, un especialista que habla español se pondrá en contacto para revisar sus objetivos y recomendar el siguiente paso.",
  },  {
    slug: "australia",
    countryName: "Australia",
    countryNameNative: "Australia",
    languageCode: "en-AU",
    preferredLanguageLabel: "English",
    flagEmoji: "🇦🇺",
    region: "Oceania",
  },  {
    slug: "new-zealand",
    countryName: "New Zealand",
    countryNameNative: "Aotearoa",
    languageCode: "en-NZ",
    preferredLanguageLabel: "English",
    flagEmoji: "🇳🇿",
    region: "Oceania",
  },];

export const INTERNATIONAL_COUNTRIES: InternationalCountryPage[] = COUNTRY_SEEDS.map(buildCountry);

export const internationalCountryMap = Object.fromEntries(
  INTERNATIONAL_COUNTRIES.map((c) => [c.slug, c]),
) as Record<string, InternationalCountryPage>;

export function isInternationalCountrySlug(slug: string): boolean {
  return slug in internationalCountryMap;
}

export function countriesByRegion(region: InternationalRegion): InternationalCountryPage[] {
  return INTERNATIONAL_COUNTRIES.filter((c) => c.region === region);
}

export const INTERNATIONAL_HUB_FAQS: InternationalFaq[] = [
  {
    q: "Can foreigners buy residential property in Manhattan?",
    a: "Yes. U.S. citizenship is generally not required to purchase. Constraints usually come from property type (especially co-ops), financing, board approval, and documentation — not from your passport alone.",
  },
  {
    q: "Do I need a visa to own?",
    a: "Ownership and immigration status are related but separate questions. Many international buyers own without residing full-time. Your attorney and advisor should align ownership structure with your travel and use plans.",
  },
  {
    q: "Condo vs co-op for international buyers?",
    a: "Condos are typically more accessible. Co-ops require board approval and can be stricter for foreign nationals, financing, or investment use. Decide structure before falling in love with a unit.",
  },
  {
    q: "Can I buy remotely?",
    a: "Much of the process can be remote. What should not be remote is judgment: building diligence, clear budget, and a written next step before you offer.",
  },
  {
    q: "What should I budget beyond purchase price?",
    a: "Closing costs, possible transfer taxes, ongoing taxes and carrying costs, and tax consequences on a future sale. Exact figures belong in a written strategy for your case.",
  },
];

export const INTERNATIONAL_PROCESS = [
  { title: "Clarify purpose & timeline", text: "Primary home, pied-à-terre, investment, family, or relocation — purpose drives structure." },
  { title: "Choose ownership path", text: "Most international buyers evaluate condominiums first; co-ops need a separate diligence track." },
  { title: "Confirm capital path", text: "Cash, financing, or hybrid — plus source-of-funds readiness." },
  { title: "Building diligence", text: "Understand the building before a single apartment becomes emotional." },
  { title: "Contract & close", text: "New York is attorney-led. Timing varies by property type and approvals." },
];

export const BUYING_GOALS = [
  "Primary residence",
  "Pied-à-terre",
  "Investment property",
  "Executive relocation",
  "Family relocation",
  "Buying for a child",
  "Second home",
  "Still exploring",
] as const;

export const BUDGET_BANDS = [
  "Under $1M",
  "$1M–$3M",
  "$3M–$5M",
  "$5M–$10M",
  "$10M+",
] as const;

export const TIMELINE_OPTIONS = [
  "Ready now",
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "More than one year",
  "Just researching",
] as const;

export const FINANCING_OPTIONS = ["Cash purchase", "Financing", "Both options", "Unsure"] as const;

export const CONTACT_METHODS = ["Email", "WhatsApp", "WeChat", "Phone", "Video Call"] as const;

export const MANHATTAN_NEIGHBORHOOD_OPTIONS = [
  "Hudson Yards",
  "Tribeca",
  "Upper West Side",
  "Upper East Side",
  "Chelsea",
  "West Village",
  "Midtown",
  "Financial District",
  "SoHo / NoHo",
  "Not sure yet",
] as const;
