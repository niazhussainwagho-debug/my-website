import { NextResponse } from "next/server";
import { AREA_CODE, MANAGER_NAME, PHONE_DISPLAY } from "../../../../lib/contact";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

// ── State Life Sukkur Area Office 5405 – Full Knowledge Bank ──────────────────
const knowledgeBank = [

  // ── State Life History ────────────────────────────────────────────────────
  {
    keywords: [
      "state life kya hai", "state life kia hai", "state life history",
      "state life ka bani", "state life kaisy bani", "state life ki history",
      "state life ke baray", "state life ke bary", "state life about",
      "state life corporation", "slicop", "slic", "state life intro",
      "state life information", "state life info", "state life kab bani",
    ],
    answer:
      "**State Life Insurance Corporation of Pakistan (SLIC) – Mukhtasar Tarikh**\n\n" +
      "Qayyam: 1 November 1972 — Wazeer-e-Azam Zulfikar Ali Bhutto ki hukumat ne Life Insurance (Nationalisation) Order 1972 ke tahat tamam niji life insurance companies nationalize ki.\n\n" +
      "Ibtida: Pehle 32 alag alag private companies ko teen Beema Units (A, B aur C) mein iktatha kiya gaya, phir 1 November 1972 ko SLIC ka baaqaida qayyam hua.\n\n" +
      "Headquarter: Karachi, Sindh, Pakistan.\n\n" +
      "Haisiyat: Pakistan ki sab se bari AAA-rated life aur health insurance company — Hukumat-e-Pakistan ki malkaiyat mein.\n\n" +
      "Khasoosiyaat:\n" +
      "- Lakhon policyholders ko life cover, savings aur pension plans faraham karta hai\n" +
      "- Family Takaful (Islamic) plans bhi available hain\n" +
      "- Pakistan ke andar aur Dubai mein bhi offices hain\n" +
      "- National development projects mein bade paymane par investment karta hai\n\n" +
      "Ministry of Commerce, Government of Pakistan ke nizaam-e-idara mein kaam karta hai.",
  },

  // ── CEO / Chairman ────────────────────────────────────────────────────────
  {
    keywords: [
      "ceo", "chairman", "head", "president", "md", "managing director",
      "state life ceo", "state life chairman", "state life ka head",
      "state life ka ceo", "state life ka saddar",
    ],
    answer:
      "State Life Insurance Corporation of Pakistan ke mojooda CEO:\n\n**Mr. Shoaib Javed Hussain**",
  },

  // ── Branches / Offices ────────────────────────────────────────────────────
  {
    keywords: [
      "branches", "branch", "offices", "office list", "offices list",
      "state life branches", "state life offices", "state life kahan hai",
      "state life kahan kahan", "kitni branches", "branch kahan",
      "zonal offices", "area offices", "zone", "zones",
    ],
    answer:
      "State Life ki Pakistan mein **500 se ziyada** branches hain.\n\nPramukh Zonal Offices:\n- Karachi Zone\n- Lahore Zone\n- Islamabad / Rawalpindi Zone\n- Peshawar Zone\n- Quetta Zone\n- Hyderabad Zone\n- Multan Zone\n- Faisalabad Zone\n- Sukkur Zone (hamara Area Office 5405)\n\nHar zone mein kai Area Offices aur Sales Offices hain jo awaam ki khidmat par mamooor hain.",
  },

  // ── Sadabahar ─────────────────────────────────────────────────────────────
  {
    keywords: ["sadabahar", "table 08", "har 4 saal", "anticipated"],
    answer:
      "**Sadabahar Plan (Table 08)** State Life ka sab se maqbool plan hai.\n\nHar 4 saal baad guaranteed survival installments milti hain — taake zaroori akhrajaat poore hote rahein. Saath hi mukammal life cover bhi barqarar rehti hai.\n\nIs plan ki tafseel ke liye Sukkur Area Office 5405 se rabta farmaiye.",
  },

  // ── Child Education ───────────────────────────────────────────────────────
  {
    keywords: ["bachon", "child", "education", "taleem", "shadi", "marriage", "table 12", "table 36"],
    answer:
      "Aulad ke mustaqbil ke liye State Life Sukkur ke paas do khaas plans hain:\n\n1. **Child Education & Marriage (Table 12):** Bachon ki taleem ya shadi ke waqt scheduled funds.\n2. **Education Support (Table 36):** Higher education ke liye tailored plan.\n\nCustomized schedule ke liye Sukkur Area Office se rabta karein.",
  },

  // ── Endowment ─────────────────────────────────────────────────────────────
  {
    keywords: ["table 01", "endowment"],
    answer:
      "**Endowment Assurance (Table 01):** State Life ka bunyadi savings plan.\n\nMuqarara muddat (10, 15, 20 ya 25 saal) ke baad mukammal maturity milti hai. Doran-e-policy family ko complete financial tahaffuz faraham hota hai.",
  },

  // ── Whole Life ────────────────────────────────────────────────────────────
  {
    keywords: ["whole life", "table 03", "zindagi bhar"],
    answer:
      "**Whole Life Assurance (Table 03):** Yeh ta-hayat tahaffuz ka plan hai.\n\nFamily ke dependents ko permanent financial security milti hai — zindagi bhar.",
  },

  // ── Retirement ────────────────────────────────────────────────────────────
  {
    keywords: ["retirement", "pension", "table 22", "budhapa"],
    answer:
      "**Retirement & Savings Plan (Table 22):** Nokri ya business se farigh hone ke baad pur-sukoon zindagi ke liye regular income aur financial stability.",
  },

  // ── Location ──────────────────────────────────────────────────────────────
  {
    keywords: ["sukkur office", "sukkur branch", "location", "address", "kahan hai office", "pata"],
    answer:
      "**State Life Sukkur Area Office 5405**\nStation Road / Minara Road Area, Main Branch, Sukkur, Sindh.\n\nTimings: Monday se Friday — 9:00 AM to 5:00 PM\nHaftah aur Itwaar band rehta hai.",
  },

  // ── Timings ───────────────────────────────────────────────────────────────
  {
    keywords: ["timing", "waqt", "hours", "open", "band", "time"],
    answer:
      "State Life Sukkur Area Office 5405 ke office timings:\n\nSomwar se Jumma: 9:00 AM – 5:00 PM\nHaftah aur Itwaar: Band\n\nKisi bhi din sawal poochne ke liye hum is chat par hazir hain.",
  },

  // ── Contact Manager ───────────────────────────────────────────────────────
  {
    keywords: ["manager", "fayyaz", "contact", "rabta", "phone", "call"],
    answer:
      `Aap Area Manager **${MANAGER_NAME}** se seedha rabta kar sakte hain:\n\nMobile: **${PHONE_DISPLAY}**\nArea Office Code: **${AREA_CODE}** (Sukkur Zone)\n\nOffice waqt mein tashreef la sakte hain ya call kar sakte hain.`,
  },

  // ── Agent Career ──────────────────────────────────────────────────────────
  {
    keywords: ["agent", "job", "career", "join", "advisor", "earning", "kamana"],
    answer:
      "State Life Sukkur mein Financial Advisor banne ke liye:\n\n- Unlimited earning aur attractive commissions\n- Zonal Academy se free professional training\n- Government of Pakistan ka official agent code\n\nWebsite ke Careers page par form submit karein ya office se rabta farmaiye.",
  },

  // ── Claims ────────────────────────────────────────────────────────────────
  {
    keywords: ["claim", "claims", "death", "maturity", "settlement"],
    answer:
      "Sukkur Area Office 5405 mein Claim Settlement Desk qaim hai.\n\nDeath ya maturity claims ke liye zaroori documents ki guidance aur step-by-step madad faraham ki jaati hai. Seedha office tashreef layein.",
  },

  // ── Premium ───────────────────────────────────────────────────────────────
  {
    keywords: ["premium", "qist", "returns", "munafa", "profit", "calculation"],
    answer:
      "Har policy ka premium aur faida aapki **umar, muddat aur financial goal** ke mutabiq hota hai.\n\nSahi schedule ke liye apna naam aur phone number office mein ya appointment le kar share farmaiye.",
  },

  // ── Islamic Finance ───────────────────────────────────────────────────────
  {
    keywords: [
      "halal", "haram", "quran", "hadis", "hadees", "hadith",
      "riba", "sood", "interest", "islami", "jaiz", "najaiz",
      "insurance haram", "insurance halal", "bima haram", "bima halal",
      "musalman", "muslim", "shariah", "sharia", "fiqh",
    ],
    answer:
      "**State Life ke Paison ka Shar'i Hukum – Quran o Hadith ki Roshni Mein**\n\nYeh ek sensitive sawal hai jis mein ulama ka ikhtilaaf hai. Dono paksh suniye:\n\n**Jo Ulama Na-Jaiz kehte hain:**\n- Riba (Sood): \"Allah ne sood haram kiya\" (Al-Baqarah: 275)\n- Gharar: \"Nabi ﷺ ne ghair-yaqeeni muamlay se mana farmaya\" (Muslim: 1513)\n- Maysir: Juway jaisi soorat\n\n**Jo Ulama Jaiz kehte hain:**\n- Darurat ka usool: \"Jo haram hai wo zaroorat mein jaiz ho jaata hai\" (Al-An'am: 119)\n- State Life sarkari idara hai, faida policyholders ka apna fund hai\n\n**Yaqeeni Halal Rasta:**\nFamily Takaful plan available hai jo riba se bilkul pak hai — Mudarabah model par mabni.\n\nApni khaas soorat-e-haal ke liye kisi Mufti Sahib se zaroor masla poochein.",
  },

  // ── Takaful ───────────────────────────────────────────────────────────────
  {
    keywords: ["takaful", "shariah compliant", "halal insurance", "halal bima"],
    answer:
      "**Family Takaful – Islamic Alternative**\n\nTakaful mein sood (riba) bilkul nahi hota. Sab log milkar ek Tabarru fund mein daalte hain, zaroorat par madad milti hai.\n\nModel: Mudarabah ya Wakalah — poori tarah shariah ke mutabiq.\n\nQuran: \"Naiki aur taqwa mein ek doosre ka saath do\" (Al-Maidah: 2)\nHadith: \"Musalman ek jism ki tarah hain\" (Bukhari: 6011)\n\nTakaful plan ke baray mein Sukkur Area Office se rabta farmaiye.",
  },
];

function generateResponse(userQuery: string): string {
  const q = userQuery.toLowerCase().trim();

  // ── Greetings ─────────────────────────────────────────────────────────────
  const greetingWords = [
    "salam", "aoa", "asalam o alaikum", "assalam o alaikum",
    "assalamualaikum", "hello", "hi", "good morning",
    "good afternoon", "good evening",
  ];
  if (greetingWords.some((g) => q === g || q.startsWith(g + " ") || q.startsWith(g + "!"))) {
    return `Walaikum Assalam wa Rahmatullahi wa Barakatuh!\n\nKhush amdeed! Main State Life Sukkur Area Office ${AREA_CODE} ka AI Advisor hoon.\n\nAap mujhse yeh pooch sakte hain:\n- State Life ki history\n- Insurance plans (Sadabahar, Endowment, Child Education)\n- Islamic finance (Halal/Haram, Takaful)\n- Office location aur timings\n- Agent career\n\nFurmaiye, kaise khidmat kar sakta hoon?`;
  }

  // ── Thanks ────────────────────────────────────────────────────────────────
  const thanksWords = ["shukriya", "thank", "thanks", "jazakallah", "jazak allah", "mehrbani", "shukria"];
  if (thanksWords.some((t) => q.includes(t))) {
    return "Jazak Allah Khair! Madad karna mera farz hai.\n\nKoi aur sawal ho to bilkul poochein. Allah aapko khush rakhe. Ameen";
  }

  // ── Keyword Match ─────────────────────────────────────────────────────────
  for (const item of knowledgeBank) {
    if (item.keywords.some((kw) => q.includes(kw))) {
      return item.answer;
    }
  }

  // ── Default ───────────────────────────────────────────────────────────────
  return `Shukriya aapke sawal ke liye.\n\nMain State Life Sukkur Area Office ${AREA_CODE} ke plans, Islamic finance, history, ya career baray mein bata sakta hoon.\n\nKripya apna sawal thoda wazeh kar dein — main poori madad karunga.`;
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
- Founded: 1 November 1972 under Life Insurance (Nationalisation) Order 1972 by PM Zulfikar Ali Bhutto
- Origin: 32 private companies merged into 3 Beema Units (A, B, C), then consolidated into SLIC
- CEO: Mr. Shoaib Javed Hussain (Fellow of Institute of Actuaries UK, MSc Bayes Business School London, appointed March 2021)
- HQ: Karachi, Sindh, Pakistan
- Rating: AAA (Pakistan's highest rated life insurer)
- Ownership: Fully government-owned, under Ministry of Commerce, Government of Pakistan
- Network: Extensive network — multiple zones, area offices across all major cities including international branch in Dubai
- Products: Individual Life, Group Life, Health Insurance, Pensions, Annuities, Family Takaful (Islamic), Bancassurance
- Impact: Major institutional investor in Pakistan's economy (real estate, government securities, national projects)
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
