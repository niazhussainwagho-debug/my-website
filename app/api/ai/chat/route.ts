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
      "CEO ki mojooda maloomat ke liye official website statelife.com.pk dekhein.",
  },

  // ── Office Location (Sukkur) ──────────────────────────────────────────────
  {
    keywords: [
      "sukkur office", "sukkur branch", "location", "address", "pata",
      "kahan hai office", "sukkur kahan", "office kahan", "sukkur address",
    ],
    answer:
      "**State Life Sukkur Area Office 5405**\nShahlimar Road, near Session Court, Sukkur, Sindh.\n\nTimings: Monday se Friday — 9:00 AM to 5:00 PM\nHaftah aur Itwaar: Band rehta hai.",
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
      "Branches ki list ke liye statelife.com.pk dekhein ya Area Office se poochhein.",
  },

  // ── Islamic Finance / Halal Haram ─────────────────────────────────────────
  {
    keywords: [
      "halal", "haram", "quran", "hadis", "hadees", "hadith",
      "riba", "sood", "interest", "islami", "jaiz", "najaiz",
      "insurance haram", "insurance halal", "bima haram", "bima halal",
      "musalman", "muslim", "shariah", "sharia", "fiqh", "islamic",
    ],
    answer:
      "Shar'i hukm ka jawab ulama ya Shariah Advisor behtar dete hain. State Life ka Takaful plan Shariah Advisor se certified hai. Mazeed tafseel ke liye Area Manager se rabta karein.",
  },

  // ── Takaful Child Education & Marriage (Checked before generic child/takaful) ──
  {
    keywords: ["takaful child", "takaful education", "takaful marriage"],
    answer:
      "Takaful Child Education & Marriage Plan (Shariah-compliant, unit-linked): payer ki umar 18 se 57 saal, bache ki umar 1 se 15 saal, muddat 10 se 30 saal. Kam az kam contribution: saalana Rs 15,000, ya chhe mahine ki Rs 10,000. Participant ki wafat par aainda contributions maaf ho jati hain. Investment risk participant ka hota hai, maturity value kam ya zyada ho sakti hai. Munafa pakka nahi hai. Tafseel ke liye Area Office ya Takaful toll free 051-111-777-542 par rabta karein.",
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

  // ── Child Education (Table 75 & 76) ───────────────────────────────────────
  {
    keywords: ["bachon", "child", "education", "taleem", "shadi", "marriage", "table 75", "table 76"],
    answer:
      "State Life ke Child Education & Marriage plans: Table 75 (FIB ke saath) aur Table 76 (bina FIB ke). Bache ke 18, 21 ya 25 saal ke hone par lump sum milta hai. Tafseel aur quotation ke liye Area Office se rabta karein.",
  },

  // ── Endowment (Table 03) ──────────────────────────────────────────────────
  {
    keywords: ["table 03", "table 3", "endowment"],
    answer:
      "**Endowment Assurance (Table 03):** State Life ka bunyadi savings plan.\n\nMuqarara muddat (10, 15, 20 ya 25 saal) ke baad mukammal maturity milti hai. Doran-e-policy family ko complete financial tahaffuz faraham hota hai.",
  },

  // ── Whole Life ────────────────────────────────────────────────────────────
  {
    keywords: ["whole life", "zindagi bhar"],
    answer:
      "**Whole Life Assurance:** Yeh ta-hayat tahaffuz ka plan hai.\n\nFamily ke dependents ko permanent financial security milti hai — zindagi bhar.",
  },

  // ── Retirement ────────────────────────────────────────────────────────────
  {
    keywords: ["retirement", "pension", "budhapa"],
    answer:
      "**Retirement & Savings Plan:** Nokri ya business se farigh hone ke baad pur-sukoon zindagi ke liye regular income aur financial stability.",
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
- If asked about CEO, direct them to official website statelife.com.pk for current information.
- If asked ONLY about history, give ONLY history. Nothing else.
- If asked about branches, direct them to statelife.com.pk or Area Office.
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
- CEO: For current CEO information, refer visitor to official website statelife.com.pk.
- HQ: Principal Office, Karachi, Sindh, Pakistan
- Rating: AAA (Pakistan's highest rated life insurer)
- Ownership: Fully government-owned, under Ministry of Commerce, Government of Pakistan
- Products: Individual Life, Group Life, Health Insurance, Pensions, Annuities, Family Takaful (Islamic), Bancassurance
- Sukkur Area Office ${AREA_CODE}: Shahlimar Road, near Session Court, Sukkur, Mon-Fri 9am-5pm

ISLAMIC FINANCE:
- Shar'i hukm guidance should be referred to Ulama or Shariah Advisor.
- State Life Takaful plan is certified by Shariah Advisor. For more details, consult Area Manager.

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
