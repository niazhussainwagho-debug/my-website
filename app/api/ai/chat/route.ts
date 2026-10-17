import { NextResponse } from "next/server";
import { AREA_CODE, MANAGER_NAME, PHONE_DISPLAY, WHATSAPP_NUMBER } from "../../../../lib/contact";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

// State Life Sukkur Area Office 5405 Knowledge Bank
const knowledgeBank = [
  {
    keywords: ["sadabahar", "table 08", "08", "har 4 saal", "anticipated"],
    answer:
      "**Sadabahar Plan (Table 08)** State Life ka sab se maqbool plan hai! Isme policy ke dauran har 4 saal baad aapko guaranteed survival cash installments milti hain taake aapke zaroori akhrajaat poore hote rahein, aur sath hi mukammal life protection bhi barqarar rehti hai. Official schedule jan'ne ke liye Sukkur Area Office 5405 se rabta karein.",
  },
  {
    keywords: ["bachon", "child", "education", "taleem", "shadi", "marriage", "table 12", "table 36"],
    answer:
      "Aulad ke mustaqbil ke liye State Life Sukkur do zabardast plans faraham karta hai:\n1. **Child Education & Marriage Assurance (Table 12):** Bachon ki high school/university taleem ya shadi ke waqt scheduled funds faraham karta hai.\n2. **Education Support Plan (Table 36):** Higher education fees aur academic milestones ke liye tailored plan hai.\nSukkur Area Office team aapse customized tenure discuss kar sakti hai.",
  },
  {
    keywords: ["table 01", "endowment", "01"],
    answer:
      "**Endowment Assurance (Table 01):** Yeh State Life ka bunyadi aur sab se qabil-e-aitmad bachat plan hai. Isme muqarara muddat (e.g. 10, 15, 20, ya 25 saal) ke baad mukammal maturity milti hai, aur doran-e-policy family ko complete financial tahaffuz faraham kiya jata hai.",
  },
  {
    keywords: ["whole life", "table 03", "03", "zindagi bhar"],
    answer:
      "**Whole Life Assurance (Table 03):** Yeh ta-hayat (whole life) tahaffuz ka sovereign plan hai jo family ke dependents ko permanent financial safety faraham karta hai.",
  },
  {
    keywords: ["retirement", "pension", "table 22", "22", "budhapa"],
    answer:
      "**Retirement & Savings Plan (Table 22):** Mulazmat ya business se farigh hone ke baad pur-sukoon zindagi guzarnay ke liye regular income aur financial stability faraham karta hai.",
  },
  {
    keywords: ["office", "location", "address", "kahan", "pata", "branch"],
    answer:
      `**Sukkur Area Office ${AREA_CODE} Location:**\nStation Road / Minara Road Area, Main Branch, Sukkur, Sindh.\n**Timings:** Monday se Friday, subah 9:00 AM se shaam 5:00 PM tak.\nAap direct tashreef la sakte hain ya call/WhatsApp kar sakte hain.`,
  },
  {
    keywords: ["timing", "timings", "waqt", "hours", "open"],
    answer:
      `State Life Sukkur Area Office 5405 ke official timings:\n• **Monday to Friday:** 9:00 AM – 5:00 PM\n• **Saturday & Sunday:** Closed\nWhatsApp helpline 24/7 active hai.`,
  },
  {
    keywords: ["manager", "fayyaz", "head", "rabta", "contact", "phone", "number", "whatsapp"],
    answer:
      `Aap direct Area Manager **${MANAGER_NAME}** se rabta kar sakte hain:\n• **Mobile Hotline:** ${PHONE_DISPLAY}\n• **WhatsApp Direct Desk:** +92 317 0941821\n• **Area Office Code:** ${AREA_CODE} (Sukkur Zone)`,
  },
  {
    keywords: ["agent", "job", "career", "join", "advisor", "kamana", "kam", "earning"],
    answer:
      `State Life Sukkur mein Insurance Agent / Financial Advisor banne ke liye:\n• Unlimited earning potential aur attractive commissions.\n• State Life Zonal Academy se free professional corporate training.\n• Government of Pakistan official agent code allotment.\nAap website ke **Careers** page par pre-registration form submit kar sakte hain!`,
  },
  {
    keywords: ["claim", "claims", "death", "maturity", "settlement"],
    answer:
      "State Life Sukkur Area Office 5405 par Claim Settlement Desk qaim hai. Death claims ya maturity settlements ke liye zaroori dastavez ki attestation aur step-by-step guidance faraham ki jaati hai taake baghair kisi mushkil ke claim process ho sake.",
  },
  {
    keywords: ["premium", "qist", "raqam", "paisa", "returns", "munafa", "profit", "calculation"],
    answer:
      "State Life regulations ke mutabiq har policyholder ka premium aur benefits unki **umar (age), muddat (tenure), aur financial goal** ke hisaab se tay hota hai. Kisi bhi plan ka official schedule hasil karne ke liye apna naam aur phone number batayein ya hamare WhatsApp (+92 317 0941821) par rabta karein.",
  },
];

function generateResponse(userQuery: string): string {
  const queryLower = userQuery.toLowerCase().trim();

  // Greetings
  if (
    queryLower === "salam" ||
    queryLower === "aoa" ||
    queryLower === "asalam o alaikum" ||
    queryLower === "hello" ||
    queryLower === "hi"
  ) {
    return `Walaikum Assalam! Khush Amdeed. Main State Life Sukkur Area Office ${AREA_CODE} ka AI Advisor hoon. Main aapko policy plans, claims support, branch guidance, ya career opportunities ke baray mein bata sakta hoon. Aap kis baray mein janna chahte hain?`;
  }

  // Match keyword in knowledge bank
  for (const item of knowledgeBank) {
    const isMatch = item.keywords.some((kw) => queryLower.includes(kw));
    if (isMatch) {
      return item.answer;
    }
  }

  // Default intelligent helpful response
  return `Sukkur Area Office ${AREA_CODE} (State Life) ke paas mukhtalif family aur savings plans mojood hain jaise **Sadabahar (Table 08)**, **Child Education (Table 12)**, aur **Endowment (Table 01)**.\n\nAap kisi specific plan ke mutaliq janna chahte hain, ya Area Manager ${MANAGER_NAME} se direct WhatsApp (+92 317 0941821) par rabta karna chahte hain?`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!messages.length) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";

    // 1. Check if external Gemini API key is configured
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = `You are the official AI Insurance Advisor for State Life Insurance Corporation of Pakistan, Sukkur Area Office ${AREA_CODE}, led by Area Manager ${MANAGER_NAME}.
Your role is to guide visitors respectfully in Roman Urdu (or Urdu/English if they ask) about life insurance, savings plans (Table 01 Endowment, Table 08 Sadabahar 4-year periodic survival payout, Table 12 Child Education, Table 03 Whole Life, Table 22 Retirement), branch assistance, and agent careers.
CRITICAL MANDATE: Never quote exact speculative return percentages or invent return amounts. Instead explain policy purposes and invite them to connect via WhatsApp (${WHATSAPP_NUMBER}) or Sukkur branch on Station Road. Keep answers concise, clear, and trustworthy.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemPrompt}\n\nVisitor Message: ${lastUserMessage}` }],
                },
              ],
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
        console.warn("Gemini fetch failed, falling back to built-in knowledge engine:", geminiError);
      }
    }

    // 2. High-speed built-in State Life Knowledge Engine response
    const reply = generateResponse(lastUserMessage);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI Chat API error:", error);
    return NextResponse.json(
      { reply: "Salam! Sukkur Area Office 5405 AI Advisor service is active. Aap direct hamare WhatsApp (+92 317 0941821) par bhi rabta kar sakte hain." },
      { status: 200 }
    );
  }
}
