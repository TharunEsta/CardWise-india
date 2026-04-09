import { env } from "@/lib/env";

export const ebookDownloadPath = "/api/ebook/download";
export const ebookSupportEmail = "support@cardwiseindia.com";

export const ebookSections = [
  {
    heading: "1. How credit cards work in India",
    body:
      "A credit card gives you a revolving limit from the issuing bank. If you pay the full statement balance by the due date, you usually avoid interest on retail purchases. If you revolve, interest charges, taxes, and late fees can compound quickly. Understanding the billing cycle, statement date, due date, and minimum due is the foundation for using a card safely.",
    visualTitle: "Billing cycle map",
    visualText: "Statement date, due date, grace period, and interest flow explained for Indian cardholders.",
    panelGradient: "linear-gradient(135deg, rgba(34,211,238,0.38), rgba(56,189,248,0.2), transparent)",
    kicker: "Foundations"
  },
  {
    heading: "2. How to choose the right credit card",
    body:
      "Choose based on your monthly spend pattern first, not on branding alone. The best fit usually depends on where you spend most: online shopping, travel, dining, fuel, utility bills, or a balanced mix. Also compare annual fee, waiver rules, reward caps, app quality, and support experience before applying.",
    visualTitle: "Card-fit matrix",
    visualText: "Match your spending category, fee tolerance, and reward preference before shortlisting a card.",
    panelGradient: "linear-gradient(135deg, rgba(52,211,153,0.32), rgba(45,212,191,0.16), transparent)",
    kicker: "Selection"
  },
  {
    heading: "3. Best cashback credit cards",
    body:
      "Cashback cards work well when you want straightforward value without transfer partners or redemption complexity. Focus on real cashback rate, monthly caps, merchant exclusions, and statement credit timelines. A lower-fee cashback card can outperform a premium rewards card if your spending is mostly e-commerce and bill payments.",
    visualTitle: "Cashback lens",
    visualText: "Evaluate effective cashback after caps, exclusions, and annual fees.",
    panelGradient: "linear-gradient(135deg, rgba(252,211,77,0.3), rgba(251,146,60,0.16), transparent)",
    kicker: "Rewards"
  },
  {
    heading: "4. Best travel credit cards",
    body:
      "Travel cards are strongest when you actually redeem through flights, hotels, airline miles, or partner ecosystems. Compare transfer partners, forex markup, lounge access rules, milestone benefits, and redemption flexibility. The best travel card is not the one with the loudest marketing, but the one that matches how often and where you travel.",
    visualTitle: "Travel value map",
    visualText: "Miles, lounge access, forex markup, and milestone rewards side by side.",
    panelGradient: "linear-gradient(135deg, rgba(129,140,248,0.28), rgba(96,165,250,0.16), transparent)",
    kicker: "Travel"
  },
  {
    heading: "5. Best lounge access cards",
    body:
      "Lounge access should be checked carefully because issuers revise spend thresholds, visit counts, and eligible networks. Always verify whether access is domestic, international, tied to quarterly spend, or limited to certain airports and terminals. Lounge value is useful only when the access terms remain practical for your travel pattern.",
    visualTitle: "Lounge checklist",
    visualText: "Domestic vs international, spend thresholds, network rules, and visit limits.",
    panelGradient: "linear-gradient(135deg, rgba(232,121,249,0.26), rgba(244,114,182,0.16), transparent)",
    kicker: "Airport Value"
  },
  {
    heading: "6. Best lifetime free cards",
    body:
      "Lifetime free cards are useful when you want low-maintenance credit history building, a backup card, or simple everyday rewards without ongoing fee pressure. They become especially strong when they still offer meaningful offers, clean servicing, and decent acceptance. Check whether the card is truly lifetime free or only free after a spend milestone.",
    visualTitle: "Fee-free filter",
    visualText: "Identify genuinely low-maintenance cards without hidden fee triggers.",
    panelGradient: "linear-gradient(135deg, rgba(190,242,100,0.28), rgba(74,222,128,0.14), transparent)",
    kicker: "Low Cost"
  },
  {
    heading: "7. Best beginner credit cards",
    body:
      "For first-time users, approval odds, low downside risk, and billing clarity matter more than premium perks. Beginner cards should help build repayment discipline before pushing the user into high-fee structures. Look for manageable limits, simple rewards, easy fee waiver, and a clear mobile app experience.",
    visualTitle: "Starter profile",
    visualText: "Low-risk cards that support first-time approval and healthy repayment habits.",
    panelGradient: "linear-gradient(135deg, rgba(196,181,253,0.24), rgba(216,180,254,0.14), transparent)",
    kicker: "First Card"
  },
  {
    heading: "8. Best cards by monthly spending habits",
    body:
      "A user spending heavily on travel should not choose the same card as someone spending mostly on grocery, fuel, or online shopping. Segment your budget into stable categories and estimate annual reward value after fees. The right choice becomes clearer when cards are measured against your real monthly routine rather than generic popularity.",
    visualTitle: "Spend pattern board",
    visualText: "Shopping, travel, fuel, dining, and utility-led card fits in one view.",
    panelGradient: "linear-gradient(135deg, rgba(251,113,133,0.26), rgba(248,113,113,0.14), transparent)",
    kicker: "Usage Fit"
  },
  {
    heading: "9. Hidden charges people ignore",
    body:
      "Common misses include finance charges on revolved balances, forex markup, late fee plus GST, dynamic currency conversion traps, reward redemption fees, and cash withdrawal costs. These can quietly erase the value of attractive welcome offers. Reading the fee schedule matters as much as reading the reward headline.",
    visualTitle: "Charge warning sheet",
    visualText: "The fees that usually hurt value the most if you overlook them.",
    panelGradient: "linear-gradient(135deg, rgba(248,113,113,0.32), rgba(251,146,60,0.18), transparent)",
    kicker: "Risk"
  },
  {
    heading: "10. Credit score tips before applying",
    body:
      "Keep utilization reasonable, avoid many hard inquiries in a short window, and pay on time every month. A stronger credit profile improves approval odds and often widens access to better card tiers. Applying strategically matters more than applying frequently.",
    visualTitle: "Approval readiness",
    visualText: "Utilization, repayment behavior, and inquiry timing before you apply.",
    panelGradient: "linear-gradient(135deg, rgba(103,232,249,0.3), rgba(147,197,253,0.16), transparent)",
    kicker: "Approval"
  },
  {
    heading: "11. Mistakes to avoid while choosing a card",
    body:
      "Do not select a card only because it is trending, premium-branded, or recommended without context. The wrong fee structure, reward cap, or redemption ecosystem can leave you paying more while getting little value back. Avoid cards that look impressive but do not align with how you actually spend.",
    visualTitle: "Decision traps",
    visualText: "Common selection mistakes that lead to low real-world value.",
    panelGradient: "linear-gradient(135deg, rgba(214,211,209,0.24), rgba(148,163,184,0.14), transparent)",
    kicker: "Avoid"
  },
  {
    heading: "12. Quick comparison of top Indian credit cards",
    body:
      "The strongest comparison framework is annual value after fees, adjusted for your own usage. Compare reward rates, milestone benefits, exclusions, lounge rules, partner coverage, and support quality together. A structured comparison helps avoid choosing a card for one flashy feature while missing the full cost-benefit picture.",
    visualTitle: "Comparison snapshot",
    visualText: "A high-signal view of reward value, fees, lounge access, and fit.",
    panelGradient: "linear-gradient(135deg, rgba(253,224,71,0.28), rgba(252,211,77,0.16), transparent)",
    kicker: "Compare"
  }
] as const;

export const ebookApplySteps = [
  {
    title: "1. Shortlist the right card",
    text: "Compare annual fee, rewards, eligibility, lounge access, and partner fit before you apply. Start only after deciding which card actually matches your spending pattern.",
    visual: "Card shortlist board"
  },
  {
    title: "2. Check eligibility and documents",
    text: "Review age, income, city sourcing rules, and KYC requirements on the issuer page. Keep PAN, address proof, and income proof ready before you begin.",
    visual: "Eligibility checklist"
  },
  {
    title: "3. Apply on the official issuer page",
    text: "Use the issuer's official application flow, fill your personal and employment details carefully, and avoid mistakes in mobile number, PAN, or address fields.",
    visual: "Official application form"
  },
  {
    title: "4. Complete KYC and verification",
    text: "Most issuers will ask for Aadhaar-based KYC, video KYC, document upload, or employment verification. Respond quickly so the application does not stall.",
    visual: "KYC verification flow"
  },
  {
    title: "5. Track approval and dispatch",
    text: "After submission, track the application number on the issuer portal. If approved, watch for card dispatch, welcome communication, and activation instructions.",
    visual: "Approval tracker"
  },
  {
    title: "6. Activate and set card controls",
    text: "Set PIN, turn on transaction alerts, understand the billing cycle, and check the first statement carefully so you start using the card correctly from day one.",
    visual: "Activation setup"
  }
] as const;

export function getEbookDownloadUrl() {
  return `${env.NEXT_PUBLIC_APP_URL}${ebookDownloadPath}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getEbookHtmlDocument(title: string) {
  const applyMarkup = ebookApplySteps
    .map(
      (step) => `
        <div class="apply-step">
          <div class="apply-visual">
            <div class="visual-label">Reference Step</div>
            <h3>${escapeHtml(step.visual)}</h3>
          </div>
          <div class="apply-copy">
            <h3>${escapeHtml(step.title)}</h3>
            <p>${escapeHtml(step.text)}</p>
          </div>
        </div>
      `
    )
    .join("");

  const contentsMarkup = ebookSections
    .map(
      (section) => `
        <div class="toc-item">
          <span class="toc-index">${escapeHtml(section.kicker)}</span>
          <span>${escapeHtml(section.heading)}</span>
        </div>
      `
    )
    .join("");

  const sectionMarkup = ebookSections
    .map(
      (section, index) => `
        <section class="section ${index % 2 === 0 ? "" : "reverse"}">
          <div class="copy">
            <div class="section-tag">${escapeHtml(section.kicker)}</div>
            <h2>${escapeHtml(section.heading)}</h2>
            <p>${escapeHtml(section.body)}</p>
          </div>
          <aside class="visual">
            <div class="visual-card">
              <div class="visual-glow" style="background: ${escapeHtml(section.panelGradient)};"></div>
              <div class="visual-grid"></div>
              <div class="visual-label">Reference Visual</div>
              <h3>${escapeHtml(section.visualTitle)}</h3>
              <p>${escapeHtml(section.visualText)}</p>
            </div>
          </aside>
        </section>
      `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(title)}</title>
        <style>
          :root {
            color-scheme: dark;
            --panel: rgba(12, 20, 36, 0.9);
            --line: rgba(255, 255, 255, 0.08);
            --text: #f7f9fd;
            --muted: rgba(247, 249, 253, 0.72);
            --soft: rgba(247, 249, 253, 0.48);
            --accent: #8be9fd;
            --accent-2: #ffe38a;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: "Segoe UI", Arial, sans-serif;
            color: var(--text);
            background:
              radial-gradient(circle at top left, rgba(70, 153, 255, 0.26), transparent 24%),
              radial-gradient(circle at 85% 10%, rgba(85, 255, 208, 0.12), transparent 20%),
              radial-gradient(circle at bottom right, rgba(255, 214, 102, 0.14), transparent 24%),
              linear-gradient(180deg, #09101d 0%, #050a12 100%);
          }
          .page {
            max-width: 1180px;
            margin: 0 auto;
            padding: 34px 18px 72px;
          }
          .shell { position: relative; }
          .shell::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 28px 28px;
            mask-image: linear-gradient(180deg, rgba(0,0,0,0.55), transparent 92%);
            pointer-events: none;
          }
          .hero, .toc, .section, .apply, .support {
            position: relative;
            overflow: hidden;
            border: 1px solid var(--line);
            background: var(--panel);
            backdrop-filter: blur(16px);
            border-radius: 30px;
            box-shadow: 0 26px 90px rgba(0, 0, 0, 0.32);
          }
          .hero { padding: 34px; }
          .hero::after {
            content: "";
            position: absolute;
            inset: auto -10% -30% auto;
            width: 300px;
            height: 300px;
            border-radius: 999px;
            background: radial-gradient(circle, rgba(139,233,253,0.18), transparent 62%);
          }
          .eyebrow, .section-tag {
            display: inline-block;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(139, 233, 253, 0.12);
            color: var(--accent);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }
          h1 {
            margin: 18px 0 12px;
            max-width: 760px;
            font-size: clamp(36px, 5vw, 68px);
            line-height: 0.98;
            letter-spacing: -0.04em;
          }
          .lede {
            max-width: 760px;
            color: var(--muted);
            line-height: 1.8;
            font-size: 17px;
          }
          .hero-grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 22px;
            margin-top: 28px;
          }
          .hero-card {
            position: relative;
            overflow: hidden;
            min-height: 240px;
            border-radius: 26px;
            border: 1px solid var(--line);
            background:
              radial-gradient(circle at top left, rgba(255,255,255,0.14), transparent 26%),
              linear-gradient(140deg, rgba(11,18,32,0.96), rgba(20,34,58,0.88));
            padding: 24px;
          }
          .hero-card::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(139,233,253,0.08), transparent 60%);
          }
          .meta, .visual-label {
            position: relative;
            font-size: 11px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: rgba(247, 249, 253, 0.5);
          }
          .hero-card h2 {
            position: relative;
            margin: 10px 0 12px;
            font-size: 26px;
            line-height: 1.1;
          }
          .hero-card p, .hero-card li, .copy p, .support p, .visual-card p {
            color: var(--muted);
            line-height: 1.85;
          }
          .hero-card ul {
            position: relative;
            margin: 14px 0 0;
            padding-left: 18px;
            display: grid;
            gap: 10px;
          }
          .stat-row {
            position: relative;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
            margin-top: 18px;
          }
          .stat {
            border: 1px solid var(--line);
            border-radius: 20px;
            background: rgba(255,255,255,0.03);
            padding: 16px;
          }
          .stat strong {
            display: block;
            font-size: 24px;
            color: var(--accent-2);
          }
          .stat span {
            display: block;
            margin-top: 6px;
            color: var(--soft);
            font-size: 13px;
          }
          .toc {
            margin-top: 22px;
            padding: 26px;
            background:
              linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)),
              var(--panel);
          }
          .toc h2 {
            margin: 0 0 18px;
            font-size: 30px;
          }
          .toc-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }
          .toc-item {
            display: flex;
            gap: 12px;
            align-items: flex-start;
            min-height: 68px;
            border-radius: 20px;
            border: 1px solid var(--line);
            background: rgba(255,255,255,0.03);
            padding: 14px 16px;
            color: var(--muted);
            line-height: 1.45;
          }
          .toc-index {
            min-width: 86px;
            color: var(--accent);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
          }
          .section {
            display: grid;
            grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
            gap: 26px;
            align-items: stretch;
            padding: 26px;
            margin-top: 22px;
          }
          .section.reverse {
            grid-template-columns: minmax(320px, 0.8fr) minmax(0, 1.2fr);
          }
          .section.reverse .copy { order: 2; }
          .section.reverse .visual { order: 1; }
          .copy h2 {
            margin: 14px 0 12px;
            font-size: clamp(26px, 3vw, 38px);
            line-height: 1.05;
            letter-spacing: -0.03em;
          }
          .visual-card {
            position: relative;
            overflow: hidden;
            min-height: 260px;
            border-radius: 26px;
            border: 1px solid var(--line);
            background:
              radial-gradient(circle at top left, rgba(255,255,255,0.16), transparent 28%),
              linear-gradient(145deg, rgba(13,22,41,0.98), rgba(21,35,62,0.86));
            padding: 24px;
          }
          .visual-glow, .visual-grid {
            position: absolute;
            inset: 0;
          }
          .visual-grid {
            background-image:
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 22px 22px;
            mask-image: linear-gradient(180deg, rgba(0,0,0,0.5), transparent 92%);
          }
          .visual-card h3 {
            position: relative;
            margin: 14px 0 10px;
            max-width: 220px;
            font-size: 30px;
            line-height: 1.02;
          }
          .visual-card p {
            position: relative;
            max-width: 260px;
          }
          .apply,
          .support {
            margin-top: 24px;
            padding: 30px;
            background:
              radial-gradient(circle at top right, rgba(255,227,138,0.12), transparent 22%),
              linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)),
              var(--panel);
          }
          .apply h2,
          .support h2 {
            margin: 14px 0 10px;
            font-size: 34px;
            line-height: 1.08;
          }
          .apply-grid {
            display: grid;
            gap: 14px;
            margin-top: 18px;
          }
          .apply-step {
            display: grid;
            grid-template-columns: 260px 1fr;
            gap: 16px;
            border: 1px solid var(--line);
            border-radius: 24px;
            background: rgba(255,255,255,0.03);
            padding: 16px;
          }
          .apply-visual {
            position: relative;
            overflow: hidden;
            min-height: 150px;
            border-radius: 20px;
            border: 1px solid var(--line);
            background:
              radial-gradient(circle at top left, rgba(139,233,253,0.16), transparent 30%),
              linear-gradient(145deg, rgba(10,20,36,0.96), rgba(22,34,58,0.82));
            padding: 18px;
          }
          .apply-visual::after {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 20px 20px;
            mask-image: linear-gradient(180deg, rgba(0,0,0,0.6), transparent 90%);
          }
          .apply-visual h3 {
            position: relative;
            margin: 12px 0 0;
            max-width: 160px;
            font-size: 24px;
            line-height: 1.05;
          }
          .apply-copy h3 {
            margin: 4px 0 8px;
            font-size: 24px;
            line-height: 1.1;
          }
          .apply-copy p {
            margin: 0;
            color: var(--muted);
            line-height: 1.85;
          }
          .support a {
            color: var(--accent);
            text-decoration: none;
            font-weight: 700;
          }
          .footer-note {
            margin-top: 16px;
            color: var(--soft);
            font-size: 13px;
          }
          @media (max-width: 960px) {
            .hero-grid, .toc-grid, .section, .section.reverse, .apply-step {
              grid-template-columns: 1fr;
            }
            .section.reverse .copy, .section.reverse .visual { order: initial; }
          }
          @media (max-width: 640px) {
            .page { padding: 18px 14px 46px; }
            .hero, .toc, .section, .apply, .support { border-radius: 24px; padding: 20px; }
            .hero-card, .visual-card { min-height: 220px; border-radius: 20px; padding: 18px; }
            .apply-visual { min-height: 130px; }
            .stat-row { grid-template-columns: 1fr; }
          }
          @media print {
            body { background: #fff; color: #111827; }
            .page { padding: 0; max-width: none; }
            .shell::before { display: none; }
            .hero, .toc, .section, .apply, .support, .hero-card, .visual-card, .stat, .toc-item, .apply-step, .apply-visual {
              background: #fff;
              color: #111827;
              border: 1px solid #d1d5db;
              box-shadow: none;
              break-inside: avoid;
            }
            .lede, .hero-card p, .hero-card li, .copy p, .support p, .visual-card p, .toc-item { color: #374151; }
            .eyebrow, .section-tag, .toc-index, .visual-label, .meta { color: #0f766e; }
            .support a { color: #0f766e; }
          }
        </style>
      </head>
      <body>
        <main class="page">
          <div class="shell">
            <section class="hero">
              <div class="eyebrow">Free Lead Magnet</div>
              <h1>${escapeHtml(title)}</h1>
              <p class="lede">
                A premium CardWise India ebook for users comparing cashback, travel, lounge, lifetime free, and beginner credit cards.
                Log in to download it instantly and/or receive it by email. No payments or subscriptions are required.
              </p>
              <div class="stat-row">
                <div class="stat"><strong>12</strong><span>Practical sections</span></div>
                <div class="stat"><strong>Free</strong><span>No subscription wall</span></div>
                <div class="stat"><strong>Instant</strong><span>Download or email after login</span></div>
              </div>
              <div class="hero-grid">
                <div class="hero-card">
                  <div class="meta">What this guide covers</div>
                  <h2>Confident card selection without the noise</h2>
                  <ul>
                    <li>How credit cards work in India and how to shortlist the right one</li>
                    <li>Cashback, travel, lounge, lifetime free, and beginner card recommendations</li>
                    <li>Hidden charges, approval tips, comparison logic, and mistakes to avoid</li>
                  </ul>
                </div>
                <div class="hero-card">
                  <div class="meta">How to use it</div>
                  <h2>Read beautifully online or save as PDF</h2>
                  <p>
                    This HTML ebook is designed like an editorial deck so it feels polished on mobile, tablet, laptop, and desktop.
                    You can also print or save it as a PDF from the browser.
                  </p>
                </div>
              </div>
            </section>
            <section class="toc">
              <div class="eyebrow">Inside The eBook</div>
              <h2>What you get in this free guide</h2>
              <div class="toc-grid">${contentsMarkup}</div>
            </section>
            ${sectionMarkup}
            <section class="apply">
              <div class="eyebrow">How To Apply</div>
              <h2>Apply for a credit card step by step</h2>
              <div class="apply-grid">${applyMarkup}</div>
            </section>
            <section class="support">
              <div class="eyebrow">Need More Help?</div>
              <h2>Need more about this? Contact support.</h2>
              <p>
                If you want help choosing the right card, understanding fees, or shortlisting options for your spending pattern,
                contact CardWise India support at <a href="mailto:${escapeHtml(ebookSupportEmail)}">${escapeHtml(ebookSupportEmail)}</a>.
              </p>
              <div class="footer-note">
                This ebook is free and intended as a lead magnet. No payment or subscription is required to access it.
              </div>
            </section>
          </div>
        </main>
      </body>
    </html>
  `;
}
