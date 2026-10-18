import { NextResponse } from "next/server";
import { AREA_CODE, MANAGER_NAME, PHONE_DISPLAY } from "../../../../lib/contact";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

// ── State Life Sukkur Area Office 5405 – Full Knowledge Bank ──────────────────
const knowledgeBank = [

  // ── State Life History (Official Milestones) ──────────────────────────────
  {
    keywords: [
      "history", "tareekh", "tarikh", "tareeq", "qayam", "qayyam", "established",
      "milestones", "nationalization", "nationalise", "kab bani", "kese bani",
      "kaisy bani", "state life kya hai", "state life kia hai", "state life kya he",
      "state life ke baray", "state life ke bary", "state life about", "about state life",
      "slic history", "intro", "background", "shuruat", "aaghaz", "1972", "bhutto",
    ],
    answer:
      "**State Life Insurance Corporation of Pakistan (SLIC) – Mukammal Tareekh (History)**\n\n" +
      "The State Life Insurance Corporation of Pakistan (SLIC) was officially established on **November 1, 1972**, through the nationalization of private life insurance operations in the country.\n\n" +
      "**Key Historical Milestones:**\n\n" +
      "• **1972 (Nationalization Order):** The government issued the Life Insurance (Nationalization) Order on March 19, 1972, under Prime Minister Zulfikar Ali Bhutto.\n\n" +
      "• **March–October 1972:** Operations of 32 private life insurance companies were taken over and initially grouped into three operating units (\"A\", \"B\", and \"C\").\n\n" +
      "• **November 1, 1972:** These units were officially merged to form SLIC as the state-backed and sole public sector life insurer.\n\n" +
      "• **1975:** Launched its iconic television commercial *\"Ae Khuda Mere Abbu Salamat Rahen\"* (later re-released in 2022).\n\n" +
      "• **2000:** The governance structure transitioned under the Insurance Ordinance 2000, reconstituting the Board of Directors under federal oversight.\n\n" +
      "• **2005:** Introduced bancassurance services and achieved a **AAA rating**.\n\n" +
      "• **2015:** Expanded into Takaful (Islamic insurance) and social micro-insurance programs.\n\n" +
      "• **Present Day:** Operates as Pakistan's largest life and health insurer with assets exceeding **Rs. 1.93 trillion**.\n\n" +
      "Headquarter: Principal Office, Karachi, Sindh.\nSupervision: Ministry of Commerce, Government of Pakistan.",
  },

  // ── CEO / Chairman ────────────────────────────────────────────────────────
  {
    keywords: [
      "ceo", "chairman", "head", "president", "md", "managing director",
      "shoaib javed", "shoaib javed hussain", "state life ceo", "state life chairman",
      "ceo kaun", "chairman kaun", "ceo name", "chairman name",
    ],
    answer:
      "State Life Insurance Corporation of Pakistan ke mojooda CEO:\n\n**Mr. Shoaib Javed Hussain**",
  },

  // ── Office Location (Sukkur) ──────────────────────────────────────────────
  {
    keywords: [
      "sukkur office", "sukkur branch", "location", "address", "pata",
      "kahan hai office", "sukkur kahan", "office kahan", "sukkur address",
    ],
    answer:
      "**State Life Sukkur Area Office 5405**\nStation Road / Minara Road Area, Main Branch, Sukkur, Sindh.\n\nTimings: Monday se Friday — 9:00 AM to 5:00 PM\nHaftah aur Itwaar: Band rehta hai.",
  },

  // ── Office Timings ────────────────────────────────────────────────────────
  {
    keywords: ["timing", "timings", "waqt", "hours", "open", "band", "khula", "time"],
    answer:
      "State Life Sukkur Area Office 5405 ke office timings:\n\nSomwar se Jumma (Mon-Fri): 9:00 AM – 5:00 PM\nHaftah aur Itwaar: Band\n\nKisi bhi din sawal poochne ke liye hum is chat par hazir hain.",
  },

  // ── Branches / Offices List across Pakistan ───────────────────────────────
  {
    keywords: [
      "branches", "branch", "offices", "office list", "offices list",
      "state life branches", "state life offices", "kahan kahan", "kitni branches",
      "branch kahan", "zonal offices", "area offices", "zone", "zones", "network",
      "all branches",
    ],
    answer:
      "State Life ki Pakistan bhar mein **500 se ziyada** branches aur offices hain.\n\n**Pramukh Zonal Offices:**\n- Karachi Zone\n- Lahore Zone\n- Islamabad / Rawalpindi Zone\n- Peshawar Zone\n- Quetta Zone\n- Hyderabad Zone\n- Multan Zone\n- Faisalabad Zone\n- Sukkur Zone (hamara Area Office 5405)\n\nBairoon-e-mulk: UAE (Dubai) mein bhi State Life ki international branch mojud hai.",
  },

  // ── Islamic Finance / Quran o Hadith ──────────────────────────────────────
  {
    keywords: [
      "halal", "haram", "quran", "hadis", "hadees", "hadith",
      "riba", "sood", "interest", "islami", "jaiz", "najaiz",
      "insurance haram", "insurance halal", "bima haram", "bima halal",
      "musalman", "muslim", "shariah", "sharia", "fiqh", "islamic",
    ],
    answer:
      "**State Life ke Paison ka Shar'i Hukum – Quran o Hadith ki Roshni Mein**\n\nYeh ek ahem muamla hai jis mein ulama-e-kiram ke do moqif hain:\n\n**1. Jo Ulama Na-Jaiz farmatay hain:**\n- **Riba (Sood):** Allah Ta'ala ka farman hai: *\"Allah ne tijarat ko halal kiya aur sood ko haram qarar diya\"* (Surah Al-Baqarah: 275).\n- **Gharar:** Nabi Kareem ﷺ ne ghair-yaqeeni muamlat se mana farmaya (Sahih Muslim: 1513).\n- **Maysir (Qimar):** Juway jaisa shuba.\n\n**2. Jo Ulama Jaiz samajhte hain:**\n- **Darurat ka Usool:** Musibat ke waqt ahl-o-ayal ki hifazat (Surah Al-An'am: 119).\n- State Life ek sarkari idara hai aur munafa policyholders ke mutual pool se milta hai.\n\n**Yaqeeni Halal Hal — Family Takaful:**\nState Life ka **Family Takaful** nizam shariat ke mutabiq Mudarabah / Wakalah model par chalta hai jo Sood aur Gharar se pak hai.\n\n*Khas fatwe ke liye kisi mustanad Darul Ifta ya Mufti Sahib se ruju farmaiye.*",
  },

  // ── Takaful (Islamic Alternative) ─────────────────────────────────────────
  {
    keywords: ["takaful", "shariah compliant", "halal insurance", "halal bima", "tabarru"],
    answer:
      "**Family Takaful – Islamic Alternative**\n\nTakaful mein sood (riba) bilkul nahi hota. Yeh baahami imdad (mutual assistance) par mabni hai jahan shuraka Tabarru fund mein hissa daalte hain.\n\n• **Model:** Mudarabah aur Wakalah — poori tarah Shariah compliant.\n• **Quran:** *\"Naiki aur taqwa ke kaamon mein ek doosre ki madad karo\"* (Surah Al-Maidah: 2).\n• **Hadith:** *\"Momin ek doosre ke liye imarat ki tarah hain\"* (Sahih Bukhari: 6011).\n\nTakaful ke shariah approved plans ke liye Sukkur Area Office se rabta farmaiye.",
  },

  // ── Sadabahar (Table 08) ──────────────────────────────────────────────────
  {
    keywords: ["sadabahar", "table 08", "table 8", "har 4 saal", "anticipated"],
    answer:
      "**Sadabahar Plan (Table 08)** State Life ka sab se maqbool plan hai.\n\nHar 4 saal baad guaranteed survival installments milti hain — taake zaroori akhrajaat poore hote rahein. Saath hi mukammal life cover bhi barqarar rehti hai.\n\nIs plan ki tafseel ke liye Sukkur Area Office 5405 se rabta farmaiye.",
  },

  // ── Child Education (Table 12 & 36) ───────────────────────────────────────
  {
    keywords: ["bachon", "child", "education", "taleem", "shadi", "marriage", "table 12", "table 36"],
    answer:
      "Aulad ke mustaqbil ke liye State Life Sukkur ke paas do khaas plans hain:\n\n1. **Child Education & Marriage (Table 12):** Bachon ki taleem ya shadi ke waqt scheduled funds.\n2. **Education Support (Table 36):** Higher education ke liye tailored plan.\n\nCustomized schedule ke liye Sukkur Area Office se rabta karein.",
  },

  // ── Endowment (Table 01) ──────────────────────────────────────────────────
  {
    keywords: ["table 01", "table 1", "endowment"],
    answer:
      "**Endowment Assurance (Table 01):** State Life ka bunyadi savings plan.\n\nMuqarara muddat (10, 15, 20 ya 25 saal) ke baad mukammal maturity milti hai. Doran-e-policy family ko complete financial tahaffuz faraham hota hai.",
  },

  // ── Whole Life (Table 03) ─────────────────────────────────────────────────
  {
    keywords: ["whole life", "table 03", "table 3", "zindagi bhar"],
    answer:
      "**Whole Life Assurance (Table 03):** Yeh ta-hayat tahaffuz ka plan hai.\n\nFamily ke dependents ko permanent financial security milti hai — zindagi bhar.",
  },

  // ── Retirement (Table 22) ─────────────────────────────────────────────────
  {
    keywords: ["retirement", "pension", "table 22", "budhapa"],
    answer:
      "**Retirement & Savings Plan (Table 22):** Nokri ya business se farigh hone ke baad pur-sukoon zindagi ke liye regular income aur financial stability.",
  },

  // ── Contact Manager ───────────────────────────────────────────────────────
  {
    keywords: ["manager", "fayyaz", "contact", "rabta", "phone", "call"],
    answer:
      `Aap Area Manager **${MANAGER_NAME}** se seedha rabta kar sakte hain:\n\nMobile: **${PHONE_DISPLAY}**\nArea Office Code: **${AREA_CODE}** (Sukkur Zone)\n\nOffice waqt mein tashreef la sakte hain ya call kar sakte hain.`,
  },

  // ── Agent Career ──────────────────────────────────────────────────────────
  {
    keywords: ["agent", "job", "career", "join", "advisor", "earning", "kamana", "kam karna"],
    answer:
      "State Life Sukkur mein Financial Advisor banne ke liye:\n\n- Unlimited earning aur attractive commissions\n- Zonal Academy se free professional training\n- Government of Pakistan ka official agent code\n\nWebsite ke Careers page par form submit karein ya office se rabta farmaiye.",
  },

  // ── Claims ────────────────────────────────────────────────────────────────
  {
    keywords: ["claim", "claims", "death", "maturity", "settlement"],
    answer:
      "Sukkur Area Office 5405 mein Claim Settlement Desk qaim hai.\n\nDeath ya maturity claims ke liye zaroori documents ki guidance aur step-by-step madad faraham ki jaati hai. Seedha office tashreef layein.",
  },

  // ── Premium / Profit ──────────────────────────────────────────────────────
  {
    keywords: ["premium", "qist", "returns", "munafa", "profit", "calculation"],
    answer:
      "Har policy ka premium aur faida aapki **umar, muddat aur financial goal** ke mutabiq hota hai.\n\nSahi schedule ke liye apna naam aur phone number office mein ya appointment le kar share farmaiye.",
  },
];

function generateResponse(userQuery: string): string {
  const q = userQuery.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

  // ── Greetings ─────────────────────────────────────────────────────────────
  const greetingWords = [
    "salam", "aoa", "asalam o alaikum", "assalam o alaikum",
    "assalamualaikum", "hello", "hi", "good morning",
    "good afternoon", "good evening",
  ];
  if (greetingWords.some((g) => q === g || q.startsWith(g + " ") || q.startsWith(g + "!"))) {
    return `Walaikum Assalam wa Rahmatullahi wa Barakatuh!\n\nKhush amdeed! Main State Life Sukkur Area Office ${AREA_CODE} ka AI Advisor hoon.\n\nAap mujhse yeh pooch sakte hain:\n- State Life ki history (Tareekh)\n- State Life ka CEO\n- Insurance plans (Sadabahar, Endowment, Child Education)\n- Islamic finance (Halal/Haram, Takaful)\n- Office location aur timings\n- Agent career\n\nFarmaiye, main aapki kya madad kar sakta hoon?`;
  }

  // ── Thanks ────────────────────────────────────────────────────────────────
  const thanksWords = ["shukriya", "thank", "thanks", "jazakallah", "jazak allah", "mehrbani", "shukria"];
  if (thanksWords.some((t) => q.includes(t))) {
    return "Jazak Allah Khair! Madad karna mera farz hai.\n\nKoi aur sawal ho to bila-jhijhak poochein. Allah aapko khush rakhe. Ameen!";
  }

  // ── Keyword Match ─────────────────────────────────────────────────────────
  for (const item of knowledgeBank) {
    if (item.keywords.some((kw) => q.includes(kw))) {
      return item.answer;
    }
  }

  // ── Default ───────────────────────────────────────────────────────────────
  return `Janab, main State Life Sukkur Area Office ${AREA_CODE} ka AI Advisor hoon.\n\nAap mujhse State Life ki tareekh (history), CEO ka naam, insurance plans (Sadabahar, Child Education, Endowment), Islamic finance (Halal/Haram ya Takaful), branches, ya Sukkur office ke baray mein pooch sakte hain.\n\nFarmaiye, main kis cheez mein aapki rehnumai karoon?`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!messages.length) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = `You are the official AI Advisor for State Life Insurance Corporation of Pakistan, Sukkur Area Office ${AREA_CODE}, led by Area Manager ${MANAGER_NAME}.

PERSONALITY:
- Speak softly and gently like a respectful elder or trusted friend.
- Be warm, patient, and never rush. Use "Janab", "Aap", "Farmaiye" to address visitors respectfully.
- Do NOT share any WhatsApp number in responses. Instead say: "Office se rabta farmaiye" or "Seedha tashreef layein".

LANGUAGE: Roman Urdu by default. Switch only if visitor uses English or Urdu script.

FOCUS RULE (Very Important):
- If asked ONLY about CEO, give ONLY the CEO name. Nothing else.
- If asked ONLY about history, give ONLY history. Nothing else.
- If asked ONLY about branches, give ONLY branch list. Nothing else.
- Answer exactly what is asked. Do NOT add unsolicited details.
- Keep answers short and to the point.

STATE LIFE KNOWLEDGE (Verified & Accurate):
- Full Name: State Life Insurance Corporation of Pakistan (SLIC)
- Founded: 1 November 1972 through nationalization of private life insurance operations under Life Insurance (Nationalization) Order (March 19, 1972) by Prime Minister Zulfikar Ali Bhutto.
- Milestones:
  * 1972 (Nationalization Order): Issued March 19, 1972.
  * March–October 1972: 32 private companies merged into 3 Beema Units (A, B, C).
  * November 1, 1972: Merged to form SLIC as sole public sector life insurer.
  * 1975: Iconic commercial "Ae Khuda Mere Abbu Salamat Rahen" launched.
  * 2000: Governance under Insurance Ordinance 2000.
  * 2005: Bancassurance services & AAA rating.
  * 2015: Expanded into Takaful (Islamic insurance) and micro-insurance.
  * Present Day: Pakistan's largest life & health insurer with assets exceeding Rs. 1.93 trillion.
- CEO: Mr. Shoaib Javed Hussain (Fellow of Institute of Actuaries UK, MSc Bayes Business School London, appointed March 2021)
- HQ: Principal Office, Karachi, Sindh, Pakistan
- Rating: AAA (Pakistan's highest rated life insurer)
- Ownership: Fully government-owned, under Ministry of Commerce, Government of Pakistan
- Network: 500+ branches, multiple zones across Pakistan and UAE Dubai branch
- Products: Individual Life, Group Life, Health Insurance, Pensions, Annuities, Family Takaful (Islamic), Bancassurance
- Sukkur Area Office ${AREA_CODE}: Station Road / Minara Road, Mon-Fri 9am-5pm

ISLAMIC FINANCE:
- Conventional insurance may have Riba (Al-Baqarah:275), Gharar (Muslim:1513), Maysir — many ulama consider impermissible.
- Some allow under darurat (Al-An'am:119).
- Family Takaful (Mudarabah/Wakalah model) is the shariah-compliant alternative — State Life offers it.
- Always advise consulting a qualified Mufti for personal fatwa.
- Never say conventional insurance is 100% halal.

CRITICAL RULES:
- NEVER share any WhatsApp or phone number.
- NEVER quote exact premium amounts or return percentages.
- NEVER add unnecessary topics. Answer only what is asked.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\nVisitor: ${lastUserMessage}` }] }],
            }),
          }
        );

        if (response.ok) {
          const geminiData = await response.json();
          const replyText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || generateResponse(lastUserMessage);
          return NextResponse.json({ reply: replyText });
        }
      } catch (geminiError) {
        console.warn("Gemini failed, using built-in engine:", geminiError);
      }
    }

    const reply = generateResponse(lastUserMessage);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI Chat API error:", error);
    return NextResponse.json(
      { reply: "Shukriya aapke rabta karne ka. Kisi masle ki soorat mein Sukkur Area Office 5405 tashreef layein." },
      { status: 200 }
    );
  }
}
