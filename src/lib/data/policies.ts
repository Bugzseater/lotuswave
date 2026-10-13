import { COMPANY } from "@/lib/constants";
import type { Policy } from "@/types";

/*
 * !! DRAFT POLICIES — written as a sound starting point, not as legal advice.
 * Before launch, have every page checked by a Sri Lankan lawyer and agree the
 * figures in TERMS with the business. The commitments on the responsible
 * travel page (no elephant rides, no orphanage visits) are proposals too.
 */

/** The commercial figures the policies quote. EVERY VALUE IS A PLACEHOLDER. */
const TERMS = {
  /** Share of the total paid to confirm a booking. */
  depositPercent: 30,
  /** The balance falls due this many days before arrival. */
  balanceDueDays: 60,
  /** A written quote holds its price for this many days. */
  quoteValidDays: 14,
  /** Refunds reach the guest within this many working days of cancellation. */
  refundWorkingDays: 14,
  /** Complaints are accepted in writing up to this many days after return. */
  complaintDays: 28,
  /** Enquiries that never become bookings are deleted after this many years. */
  enquiryRetentionYears: 2,
  /** Charges by notice given. The first band should start at `balanceDueDays`. */
  cancellation: [
    { notice: "60 days or more before arrival", charge: "the deposit" },
    { notice: "59 to 30 days before arrival", charge: "50% of the total price" },
    { notice: "29 to 15 days before arrival", charge: "75% of the total price" },
    { notice: "14 days or fewer before arrival, or no-show", charge: "100% of the total price" },
  ],
};

/** Date of the drafts below. Change per policy on each real revision. */
const DRAFTED = "2026-10-13";

/** Mock collection, in footer order — replaced by Firestore later; the getters below stay put. */
const POLICIES: Policy[] = [
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    group: "legal",
    icon: "terms",
    summary:
      "The terms for using this website. Booking a journey with us is covered separately by our booking conditions.",
    updatedAt: DRAFTED,
    sections: [
      {
        heading: "Who we are",
        body: [
          `This website is run by **${COMPANY.legalName}**, a tour operator registered in Sri Lanka. Our address and contact details are on the [contact page](/contact).`,
        ],
      },
      {
        heading: "Using this website",
        body: [
          "By using this website you agree to these terms. If you do not agree, please do not use the site.",
          "You are welcome to browse, print and share links to our pages for your own, non-commercial use. Please do not copy the site's content in bulk, scrape it, or use it in any way that could damage the site or get in the way of other visitors.",
        ],
      },
      {
        heading: "Booking a journey",
        body: [
          "Nothing on this website is a binding offer. Journeys, itineraries and prices are shown to help you plan. A booking is made only when you accept a written quote and pay the deposit, under our [booking conditions](/booking-conditions), [cancellation and refund policy](/cancellation-refund-policy) and [payment policy](/payment-policy).",
        ],
      },
      {
        heading: "Prices and information",
        body: [
          "We work hard to keep every page accurate, but seasons, opening hours, prices and partner details change. Prices on the site are starting prices per person in US dollars, based on two adults sharing, and are confirmed only in your written quote.",
          "Photographs show the kind of places and experiences we arrange. The rooms, views and activities on your own journey may differ.",
        ],
      },
      {
        heading: "Health and wellness content",
        body: [
          "What we write about Ayurveda, yoga and wellness is general information, not medical advice. Please speak to your own doctor before you travel if you have a medical condition, are pregnant or take regular medication.",
        ],
      },
      {
        heading: "Our content",
        body: [
          `The text, photographs, maps, logos and design of this website belong to ${COMPANY.legalName} or to the people who licensed them to us, and are protected by copyright and trade mark law. Please ask us before reusing any of them.`,
        ],
      },
      {
        heading: "Links to other websites",
        body: [
          "We link to other sites — WhatsApp, social networks, official travel advice — for your convenience. We do not control them and are not responsible for their content or for how they handle your data.",
        ],
      },
      {
        heading: "Our liability",
        body: [
          "We provide this website as it is and cannot promise that it will always be available or free of errors. As far as the law allows, we are not liable for any loss that arises from your use of the website itself. Nothing in these terms limits any liability that cannot be limited by law.",
        ],
      },
      {
        heading: "Your privacy",
        body: [
          "How we handle the details you send us is set out in our [privacy policy](/privacy-policy) and [cookie policy](/cookie-policy).",
        ],
      },
      {
        heading: "Changes and governing law",
        body: [
          "We may update these terms from time to time; the date at the top of this page shows the current version. These terms are governed by the laws of Sri Lanka, and the courts of Sri Lanka have jurisdiction over any dispute about them.",
        ],
      },
    ],
    seo: {
      title: "Website Terms and Conditions",
      description:
        "The terms for using the LotusWave Lanka Tours website: who we are, how our content may be used, links to other sites and the law that applies.",
    },
  },
  {
    slug: "booking-conditions",
    title: "Booking Conditions",
    group: "legal",
    icon: "booking",
    summary:
      "How a booking with us works, from your first enquiry to the day you fly home — and what each of us agrees to along the way.",
    updatedAt: DRAFTED,
    sections: [
      {
        heading: "Your contract with us",
        body: [
          `Your contract is with **${COMPANY.legalName}**, Sri Lanka. These conditions, your written quote, our [cancellation and refund policy](/cancellation-refund-policy) and our [payment policy](/payment-policy) together form the agreement between us. Please read them before you pay.`,
          "The person who makes the booking — the lead traveller — must be 18 or over, and accepts these conditions on behalf of everyone in the party.",
        ],
      },
      {
        heading: "From enquiry to quote",
        body: [
          "Every journey is tailor-made. After you enquire, your travel designer sends a draft itinerary and a written, itemised quote. Planning is free and there is no obligation to book.",
          `A quote holds its price for ${TERMS.quoteValidDays} days. After that, or if your dates, stays or group size change, we re-check availability and prices before confirming.`,
        ],
      },
      {
        heading: "Confirming your booking",
        body: [
          `Your booking is confirmed when you accept the quote in writing and we receive your deposit of ${TERMS.depositPercent}% of the total price. We then send a booking confirmation listing your itinerary, stays, inclusions and the balance due.`,
          `If you book within ${TERMS.balanceDueDays} days of arrival, the full price is payable at booking.`,
        ],
      },
      {
        heading: "Paying the balance",
        body: [
          `The balance is due ${TERMS.balanceDueDays} days before your arrival date. If it has not reached us by then, we may treat the booking as cancelled by you and apply the charges in our [cancellation and refund policy](/cancellation-refund-policy). How to pay is explained in our [payment policy](/payment-policy).`,
        ],
      },
      {
        heading: "Prices",
        body: [
          "Prices are per person in US dollars, based on two adults sharing a room unless your quote says otherwise. They include what your quote lists as included, and nothing else.",
          "Once your booking is confirmed, we will not raise the price unless a government tax or a park or site entrance fee changes after confirmation. If that happens, we will tell you in writing, with the reason, before the balance is due.",
        ],
      },
      {
        heading: "Changes you ask for",
        body: [
          `We are happy to change a confirmed journey wherever we can. We charge no fee of our own for changes made ${TERMS.balanceDueDays} days or more before arrival; any cost a partner passes on, such as a hotel's change fee or a price difference, is added to your balance.`,
          "Closer to arrival, a change that cancels a confirmed service may be charged as a cancellation of that service.",
        ],
      },
      {
        heading: "Changes we have to make",
        body: [
          "Occasionally we need to change part of a journey — a hotel overbooks, a train timetable changes or a road closes. If so, we tell you as soon as we can and replace the service with one of the same or a higher standard, at no extra cost to you.",
          "If we have to make a major change before you travel, such as a significant change of route or a lower standard of accommodation, you can accept it, choose an alternative, or cancel for a full refund of what you have paid us.",
        ],
      },
      {
        heading: "Events beyond anyone's control",
        body: [
          "We are not liable for changes or cancellations caused by events that neither we nor our partners could foresee or avoid — severe weather, flooding, natural disaster, epidemic, civil unrest, or government action or closures. We will help you rearrange your plans and pass on any refund our partners give us. This is why we ask every guest to hold [travel insurance](/travel-insurance).",
        ],
      },
      {
        heading: "Passports, entry and health",
        body: [
          "You are responsible for holding a passport valid for at least six months beyond your departure date, the entry permit Sri Lanka requires for your nationality (usually an electronic travel authorisation, or ETA), and any vaccinations your doctor recommends. We are glad to point you to official guidance, but cannot be responsible if you are refused boarding or entry.",
          "Please tell us about any medical condition, mobility need, dietary requirement or allergy when you book, so we can plan around it. Our [health and safety information](/health-and-safety) has more.",
        ],
      },
      {
        heading: "Travel insurance",
        body: [
          "Comprehensive travel insurance is a condition of booking. It must cover medical treatment, emergency evacuation and repatriation, and cancellation. See [what your policy should cover](/travel-insurance).",
        ],
      },
      {
        heading: "On your journey",
        body: [
          "Your driver-guide and hosts will look after you, and we ask the same respect for them and for the places you visit — see our [responsible travel policy](/responsible-travel-policy). We may end the journey, without refund, of anyone whose behaviour puts others at risk or breaks the law.",
          "Some activities, such as safaris, hikes, cycling and swimming, carry risks of their own. Please follow your guide's instructions; you take part at your own discretion.",
        ],
      },
      {
        heading: "Our responsibility to you",
        body: [
          "We choose every partner with care and arrange your journey with reasonable skill and care, and we are responsible for the services confirmed in your booking. We are not responsible for loss, injury or damage caused by your own actions, by a third party unconnected with the services we provide, or by events beyond anyone's control.",
          "As far as the law allows, our liability for anything other than death or personal injury is limited to the price of your journey.",
        ],
      },
      {
        heading: "If something goes wrong",
        body: [
          `Please tell your driver-guide or call our 24/7 line straight away. Most problems can be put right on the spot, but only if we know about them. If you are still unhappy, write to us within ${TERMS.complaintDays} days of returning home and we will reply in writing.`,
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These conditions are governed by the laws of Sri Lanka, and the courts of Sri Lanka have jurisdiction over any dispute about them.",
        ],
      },
    ],
    seo: {
      title: "Booking Conditions for Sri Lanka Journeys",
      description:
        "How booking a private Sri Lanka journey with LotusWave Lanka Tours works: quotes, deposits, confirmation, changes, travel documents and complaints.",
    },
  },
  {
    slug: "cancellation-refund-policy",
    title: "Cancellation and Refund Policy",
    group: "legal",
    icon: "cancellation",
    summary:
      "What happens if you need to cancel or cut your journey short, how much is refunded and when — and what happens if we have to cancel.",
    updatedAt: DRAFTED,
    sections: [
      {
        heading: "Cancelling your journey",
        body: [
          `To cancel, the lead traveller should write to us at ${COMPANY.email}. The cancellation takes effect on the day we receive it, and we confirm it in writing.`,
        ],
      },
      {
        heading: "Cancellation charges",
        body: ["The charge depends on how much notice you give, counted back from your arrival date:"],
        points: TERMS.cancellation.map(({ notice, charge }) => `**${notice}** — we keep ${charge}.`),
      },
      {
        heading: "Services that cannot be refunded",
        body: [
          "A few services cannot be refunded once booked — some hotels over Christmas and New Year, reserved train seats and certain park permits. If your journey includes any, your quote says so, and their cost is charged in full whenever you cancel.",
        ],
      },
      {
        heading: "When one traveller cancels",
        body: [
          "If someone in your party cancels and the others still travel, the same charges apply to that person's share, and the room or vehicle price for the rest of the party may be recalculated.",
        ],
      },
      {
        heading: "Unused services",
        body: [
          "There is no refund for any part of a journey you choose not to use once it has started, such as a missed night, a skipped activity or an early departure. If you have to cut your journey short for a reason your insurance covers, we will give you the paperwork you need to claim.",
        ],
      },
      {
        heading: "If we cancel",
        body: [
          "We will only cancel your journey for a serious reason. If we do, you can choose a replacement journey of the same standard or a full refund of everything you have paid us.",
          "If the cause is an event beyond anyone's control, as described in our [booking conditions](/booking-conditions), we refund what you have paid us less any costs our partners will not return, which we will show you in writing.",
        ],
      },
      {
        heading: "Weather and seasons",
        body: [
          "Rain is part of Sri Lanka's monsoon seasons, and bad weather alone is not a reason for a refund. Where weather closes a park, a train line or a road, we rearrange that day around it wherever we can.",
        ],
      },
      {
        heading: "How refunds are paid",
        body: [
          `Refunds are paid to the person and by the method that paid us, within ${TERMS.refundWorkingDays} working days of the cancellation being confirmed. Card payments are refunded to the same card. Bank charges and exchange-rate differences on international transfers are outside our control, and we cannot cover them.`,
        ],
      },
      {
        heading: "Insurance",
        body: [
          "Cancellation charges are usually recoverable through travel insurance if you cancel for a reason your policy covers, such as illness. Take out insurance on the day you book, so that it covers you from then. See [what your policy should cover](/travel-insurance).",
        ],
      },
    ],
    seo: {
      title: "Cancellation and Refund Policy",
      description:
        "Cancellation charges, refund timelines and what happens if your Sri Lanka journey is cancelled, by you or by LotusWave Lanka Tours.",
    },
  },
  {
    slug: "payment-policy",
    title: "Payment Policy",
    group: "legal",
    icon: "payment",
    summary: "When payments fall due, the ways you can pay us, and how to make sure every payment is safe.",
    updatedAt: DRAFTED,
    sections: [
      {
        heading: "When to pay",
        body: ["Every payment is set out in your booking confirmation, with its amount and due date."],
        points: [
          `**Deposit** — ${TERMS.depositPercent}% of the total price, to confirm your booking.`,
          `**Balance** — the remaining amount, due ${TERMS.balanceDueDays} days before arrival.`,
          `**Late bookings** — if you book within ${TERMS.balanceDueDays} days of arrival, the full price is due at booking.`,
        ],
      },
      {
        heading: "Currency",
        body: [
          "Our prices are quoted and invoiced in US dollars. If you pay from an account in another currency, your bank or card provider converts it at their own rate.",
        ],
      },
      {
        heading: "Ways to pay",
        body: [],
        points: [
          "**Bank transfer** — to our company account in Sri Lanka. Our bank details appear only on your invoice.",
          "**Debit or credit card** — through a secure online payment link we send you. Card payments may carry a processing fee, which the payment page shows before you pay.",
        ],
      },
      {
        heading: "Bank charges",
        body: [
          "International transfers can carry sending and receiving charges. Please choose the option where you pay all charges (often marked \"OUR\"), so the full amount reaches us. Any shortfall is added to your balance.",
        ],
      },
      {
        heading: "Paying safely",
        body: [
          "Payment fraud often starts with an email that looks like it came from a travel company. Please keep these in mind:",
        ],
        points: [
          "We will never ask for your card number, PIN or online banking password by email, phone, WhatsApp or social media.",
          `Our bank details do not change. If you receive a message saying they have, do not pay — call us on ${COMPANY.phone} to check first.`,
          "Card payments are handled on our payment provider's secure page. We never see or store your full card number.",
        ],
      },
      {
        heading: "Receipts",
        body: [
          "We confirm every payment in writing, with an updated statement showing what has been paid and what remains.",
        ],
      },
      {
        heading: "Spending in Sri Lanka",
        body: [
          "Personal spending once you arrive — drinks, tips, shopping — is paid locally, in Sri Lankan rupees. ATMs are easy to find in towns, and most hotels accept cards.",
        ],
      },
      {
        heading: "Refunds",
        body: [
          "Refunds follow our [cancellation and refund policy](/cancellation-refund-policy) and are paid back by the method you paid with.",
        ],
      },
    ],
    seo: {
      title: "Payment Policy",
      description:
        "How to pay for a LotusWave Lanka Tours journey: deposits, balance dates, accepted payment methods, currency and how to pay safely.",
    },
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    group: "legal",
    icon: "privacy",
    summary:
      "What personal information we collect when you use this website or travel with us, why we need it, who we share it with and the choices you have.",
    updatedAt: DRAFTED,
    sections: [
      {
        heading: "Who we are",
        body: [
          `**${COMPANY.legalName}** is responsible for the personal data described in this policy. You can reach us about privacy at ${COMPANY.email}, or at the address on our [contact page](/contact).`,
        ],
      },
      {
        heading: "What we collect",
        body: ["When you enquire, plan a trip or contact us, you give us:"],
        points: [
          "Your name, email address, phone or WhatsApp number and country",
          "Your travel dates, the number of adults and children, your interests, budget and preferred travel style",
          "Dietary needs, health or mobility information and special occasions, if you choose to share them",
          "Anything you write in a message to us",
        ],
      },
      {
        heading: "When you book and visit",
        body: [
          "When you book, we also collect passport details, flight times and an emergency contact for everyone travelling, because hotels, parks and the authorities require them.",
          "When you visit this website, our hosting provider records technical data such as your IP address, browser and the pages you request, to keep the site running and secure.",
        ],
      },
      {
        heading: "Health information",
        body: [
          "Health details — a medical condition, an allergy, mobility needs — are sensitive. We ask for them only so that your journey is safe and suitable, use them only for that, and share them, with your consent, only with the people who need them, such as your driver-guide, your hotel or an Ayurveda physician.",
        ],
      },
      {
        heading: "How we use it",
        body: [],
        points: [
          "To reply to your enquiry and design your journey",
          "To make and manage your booking with hotels, guides and other partners",
          "To look after you while you travel, including in an emergency",
          "To meet our legal, tax and accounting obligations",
          "To send you travel inspirations by email, only if you ask for them — you can stop at any time",
        ],
      },
      {
        heading: "What we never do",
        body: [
          "We do not sell your personal data, and we do not use it to make automated decisions about you.",
        ],
      },
      {
        heading: "Who we share it with",
        body: ["Only those who need it to deliver your journey or run our business:"],
        points: [
          "The hotels, driver-guides, hosts, activity providers and transport operators on your itinerary",
          "Technology providers that store and process data for us, such as our website host, email service and database",
          "Banks and payment providers, to process your payments",
          "Public authorities, where the law requires it",
        ],
      },
      {
        heading: "Data stored outside Sri Lanka",
        body: [
          "Some of our technology providers store data outside Sri Lanka. We choose providers that protect it with appropriate safeguards and use it only on our instructions.",
          "If you contact us on WhatsApp, your messages are also covered by WhatsApp's own privacy policy. Please do not send passport scans or payment details there.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          `Enquiries that do not lead to a booking are deleted after ${TERMS.enquiryRetentionYears} years. Booking records are kept for as long as Sri Lankan tax and accounting law requires, and then deleted.`,
        ],
      },
      {
        heading: "Your rights",
        body: [
          "Under Sri Lanka's Personal Data Protection Act, No. 9 of 2022 — and the GDPR, if you live in the European Union or the United Kingdom — you can ask us to:",
        ],
        points: [
          "Give you a copy of the personal data we hold about you",
          "Correct anything that is wrong or incomplete",
          "Delete your data, where we no longer need to keep it",
          "Stop or limit how we use it, or withdraw a consent you gave",
          "Send your data to you in a portable format",
        ],
      },
      {
        heading: "How to make a request",
        body: [
          `Write to ${COMPANY.email} and we will reply within one month. If you are not satisfied with our answer, you can complain to the Data Protection Authority of Sri Lanka or to the data-protection regulator where you live.`,
        ],
      },
      {
        heading: "Keeping it safe",
        body: [
          "Access to your data is limited to the people and partners who need it, our systems use encrypted connections, and we ask our partners to protect your information as carefully as we do.",
        ],
      },
      {
        heading: "Children",
        body: [
          "This website is not aimed at children. We collect details about children only from a parent or guardian, as part of a family booking.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "We will update this page whenever our practices change; the date at the top shows the current version. How this site uses cookies is explained in our [cookie policy](/cookie-policy).",
        ],
      },
    ],
    seo: {
      title: "Privacy Policy",
      description:
        "How LotusWave Lanka Tours collects, uses, shares and protects your personal data when you enquire, book or travel with us, and your rights over it.",
    },
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    group: "legal",
    icon: "cookie",
    summary: "What cookies are, which ones this website uses, and how you can control them.",
    updatedAt: DRAFTED,
    // Accurate for the site as built: no analytics, embeds or logins. Revise
    // this page before adding any of them.
    sections: [
      {
        heading: "What cookies are",
        body: [
          "Cookies are small text files that a website saves in your browser. Similar technologies, such as local storage, work in much the same way. They can keep a site working, remember your choices or measure how a site is used.",
        ],
      },
      {
        heading: "Cookies we use",
        body: [
          "This website does not currently set any cookies, and we do not use advertising or tracking cookies. Our enquiry forms work without them.",
          "Our hosting provider may use strictly necessary technical measures to deliver the site securely, such as protecting it from attack. These do not identify you and cannot be switched off.",
        ],
      },
      {
        heading: "If we add analytics",
        body: [
          "If we start measuring how the site is used, we will update this page first, list each cookie and what it does, and ask for your consent before setting any cookie that is not strictly necessary.",
        ],
      },
      {
        heading: "Other websites",
        body: [
          "When you follow a link to WhatsApp, a social network or another website, that site may set its own cookies under its own policy. We do not control them.",
        ],
      },
      {
        heading: "Managing cookies",
        body: [
          "You can see, block and delete cookies in your browser's settings. Blocking cookies will not stop this website from working. Your browser's help pages explain how.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "We will update this page whenever the cookies on our site change. How we handle personal data more generally is set out in our [privacy policy](/privacy-policy).",
        ],
      },
    ],
    seo: {
      title: "Cookie Policy",
      description:
        "Which cookies and similar technologies the LotusWave Lanka Tours website uses, why, and how to manage them in your browser.",
    },
  },
  {
    slug: "responsible-travel-policy",
    title: "Responsible Travel Policy",
    group: "travel",
    icon: "responsible",
    summary:
      "How we make sure the farms, villages, wildlife and places you visit are better off for your being there — and how you can help.",
    updatedAt: DRAFTED,
    sections: [
      {
        heading: "Our approach",
        body: [
          "Our journeys are built around farms, villages and healing traditions, so they only work if the people and places behind them thrive. This policy sets out what we commit to, and what we ask of our guests.",
        ],
      },
      {
        heading: "Local people, fairly paid",
        body: [],
        points: [
          "Farm stays, village lunches and cooking classes are paid to the host families directly, at rates agreed with them in advance.",
          "Our driver-guides, naturalists and historians are Sri Lankan, many of them from the communities around the places you visit.",
          "We choose locally owned hotels, guesthouses and retreats wherever one meets our standard.",
          "Every experience is arranged with the community — never as a stop at a shop that pays commission.",
        ],
      },
      {
        heading: "Wildlife",
        body: [],
        points: [
          "We follow national park rules on distance, speed and noise, and our jeep drivers never crowd a sighting or chase an animal.",
          "We do not offer elephant rides, animal shows or any experience where wild animals are handled, fed or made to perform.",
          "For whale watching, we use an operator that follows the official code of conduct, not the crowded boats.",
        ],
      },
      {
        heading: "Culture and communities",
        body: [],
        points: [
          "Village visits are kept small and arranged with the families, at times that suit them.",
          "We do not include visits to orphanages or children's homes.",
          "Our guides introduce customs and etiquette before each temple and village visit, so guests know what is expected.",
        ],
      },
      {
        heading: "The environment",
        body: [],
        points: [
          "Private, small-group travel keeps our footprint, and the crowds, small.",
          "We plan routes to avoid needless driving and take the train through the hill country wherever we can.",
          "We favour stays that refill drinking water rather than hand out plastic bottles, and ask every guest to bring a refillable bottle.",
        ],
      },
      {
        heading: "How you can help",
        body: [],
        points: [
          "Dress modestly at temples and sacred sites — shoulders and knees covered — and take off your shoes and hat before entering.",
          "Never pose for a photo with your back to a Buddha statue, or touch or climb on religious images. Keep any Buddha tattoo covered; it can cause serious offence.",
          "Ask before photographing people, especially in villages and on the estates.",
          "Keep to paths, take your rubbish with you and never feed wild animals.",
          "Buy crafts and produce directly from the people who make them.",
        ],
      },
      {
        heading: "Holding ourselves to account",
        body: [
          "We review this policy every year with our partners. If you see anything on your journey that falls short of it, please tell your driver-guide or write to us — we want to know.",
        ],
      },
    ],
    seo: {
      title: "Responsible Travel Policy — Sustainable Tourism in Sri Lanka",
      description:
        "LotusWave Lanka Tours' commitments to local communities, fair pay, wildlife, culture and the environment, and how to travel responsibly in Sri Lanka.",
    },
  },
  {
    slug: "health-and-safety",
    title: "Health and Safety Information",
    group: "travel",
    icon: "health",
    summary:
      "Practical advice for staying healthy and safe in Sri Lanka, and how we look after you on the road. It is general guidance, not a substitute for your doctor's advice.",
    updatedAt: DRAFTED,
    sections: [
      {
        heading: "Before you travel",
        body: [],
        points: [
          "See your doctor or a travel clinic six to eight weeks before you leave, to check which vaccinations and medicines you need.",
          "Bring enough of any regular medication for the whole trip, in its original packaging, with a copy of your prescription.",
          "Read your government's latest travel advice for Sri Lanka when you book, and again before you fly.",
          "Tell us about any medical condition, allergy or mobility need, so we can plan around it.",
        ],
      },
      {
        heading: "Mosquitoes",
        body: [
          "Dengue fever is present in Sri Lanka, especially during and after the rains. There is no everyday medicine to prevent it, so avoiding bites is what matters: use repellent, wear long sleeves at dawn and dusk, and sleep under a net or in a screened room where one is provided.",
          "Sri Lanka has been certified malaria-free by the World Health Organization since 2016.",
        ],
      },
      {
        heading: "Sun and heat",
        body: [
          "The sun is strong all year, especially in the dry zone and on the coast. Drink plenty of water, wear a hat and high-factor sun cream, and climb places such as Sigiriya early in the morning — our itineraries are planned that way.",
        ],
      },
      {
        heading: "Food and water",
        body: [
          "Drink bottled or filtered water rather than tap water. Food at the hotels, homes and restaurants we use is freshly cooked. Sri Lankan food can be very spicy, so just say if you would like it mild.",
          "Tell us about food allergies before you travel, so we can let your hosts and kitchens know in advance.",
        ],
      },
      {
        heading: "On the road",
        body: [
          "Sri Lanka's roads are busy and driving styles can be unpredictable. That is why every journey uses a private, air-conditioned vehicle with an experienced driver-guide, and why we keep long drives to a sensible length.",
          "Wear a seat belt wherever one is fitted, and please never ask your driver to go faster than they judge safe.",
        ],
      },
      {
        heading: "Wildlife and nature",
        body: [
          "On safari, stay in the vehicle unless your naturalist says otherwise, and keep your voice low. Never approach or feed elephants, monkeys or other wild animals, even ones that seem tame.",
          "Watch your step on trails and carry a torch after dark. Leech socks are worth packing for rainforest walks in wet weather.",
        ],
      },
      {
        heading: "The sea",
        body: [
          "Currents along Sri Lanka's coasts can be strong, above all in the monsoon months — roughly May to September on the south and west coasts, and November to March on the east. Swim only where locals and lifeguards say it is safe, never alone and never after drinking. A red flag means no swimming.",
        ],
      },
      {
        heading: "Ayurveda and wellness treatments",
        body: [
          "Ayurveda treatments on our journeys are given by qualified practitioners after a consultation. They are restorative, not a replacement for medical care: keep taking any prescribed medication unless your own doctor says otherwise, and tell the physician about any condition, pregnancy or medication. Some herbal treatments are not suitable for everyone.",
        ],
      },
      {
        heading: "Medical care in Sri Lanka",
        body: [
          "There are good private hospitals in Colombo, Kandy, Galle and other large towns; rural areas have simpler clinics. Private treatment usually has to be paid for at the time, which your [travel insurance](/travel-insurance) should cover.",
          "If you fall ill, tell your driver-guide or call our 24/7 line and we will get you to the right place. See our [emergency assistance information](/emergency-assistance).",
        ],
      },
      {
        heading: "Personal safety",
        body: [
          "Sri Lanka is a welcoming country, and serious crime against visitors is rare. Take the usual care: keep valuables in your hotel safe, use ATMs inside banks, and be wary of anyone offering unsolicited tours or gem deals.",
          "Dress modestly away from the beach. Women travelling alone may occasionally receive unwanted attention; your driver-guide is there to help, and you can call us at any time.",
        ],
      },
    ],
    seo: {
      title: "Health and Safety in Sri Lanka — Traveller Information",
      description:
        "Practical health and safety advice for travelling in Sri Lanka: vaccinations, mosquitoes, heat, food and water, roads, wildlife, the sea and Ayurveda treatments.",
    },
  },
  {
    slug: "travel-insurance",
    title: "Travel Insurance",
    group: "travel",
    icon: "insurance",
    summary:
      "Comprehensive travel insurance is required for every guest on every journey. Here is what your policy should cover, and why.",
    updatedAt: DRAFTED,
    sections: [
      {
        heading: "Why we require it",
        body: [
          "Medical treatment, evacuation and last-minute cancellations can cost far more than the journey itself, and no tour operator can absorb them. Insurance protects you, so every guest must hold a policy as a condition of booking.",
          "Take it out on the day you pay your deposit, so that cancellation cover starts straight away.",
        ],
      },
      {
        heading: "What your policy should cover",
        body: [],
        points: [
          "**Medical treatment** in Sri Lanka, including hospital stays, with high limits",
          "**Emergency evacuation and repatriation**, including air ambulance",
          "**Cancellation and curtailment** for the full cost of your journey and flights",
          "**Every activity on your itinerary** — safaris, hiking, cycling, swimming and, where relevant, Ayurveda treatments",
          "**Pre-existing medical conditions**, declared to your insurer",
          "**Personal belongings**, money and travel documents",
          "**Personal liability**, travel delay and missed connections",
        ],
      },
      {
        heading: "Before you buy",
        body: [],
        points: [
          "Read the full policy wording, not just the summary — especially the exclusions for pre-existing conditions, activities and travel against government advice.",
          "Check whether your bank account or credit card already includes travel cover, and what its limits are.",
          "Make sure everyone in your party is covered, including children.",
        ],
      },
      {
        heading: "Send us your policy details",
        body: [
          "Before you travel, send us your insurer's name, your policy number and the insurer's 24-hour emergency phone number. We keep them with your booking so that, if something happens, we can contact your insurer quickly on your behalf.",
        ],
      },
      {
        heading: "If you need to claim",
        body: [
          "Where you can, call your insurer's emergency line before arranging any major treatment. Keep every receipt, medical report and police report. We will provide any letters or booking documents your claim needs.",
        ],
      },
      {
        heading: "We do not sell insurance",
        body: [
          "LotusWave Lanka Tours does not sell insurance or recommend a particular insurer, and we take no commission. Choose a policy from a reputable insurer in your own country that covers everything above.",
        ],
      },
    ],
    seo: {
      title: "Travel Insurance for Sri Lanka — What Your Policy Should Cover",
      description:
        "Why travel insurance is required on every LotusWave Lanka Tours journey, and what your policy should cover for a trip to Sri Lanka.",
    },
  },
  {
    slug: "emergency-assistance",
    title: "Emergency Assistance",
    group: "travel",
    icon: "emergency",
    summary:
      "Who to call if something goes wrong while you are in Sri Lanka, day or night — and what we will do to help.",
    updatedAt: DRAFTED,
    sections: [
      {
        heading: "Our 24/7 line",
        body: [
          `While you are in Sri Lanka, our team answers day and night on **${COMPANY.emergencyPhone}**. Save the number in your phone before you travel.`,
          "Your driver-guide is always your first contact on the ground, and can reach us at any time.",
        ],
      },
      {
        // Checked against Sri Lanka Police's published list, December 2025.
        // Re-check before launch.
        heading: "Emergency numbers in Sri Lanka",
        body: ["If you are in danger or someone is seriously hurt, call the emergency services first, then us."],
        points: [
          "**119** — Police emergency",
          "**1990** — Suwa Seriya, the free national ambulance service",
          "**110** — Fire and rescue",
          "**1912** — Sri Lanka Tourism hotline for visitors",
          "**117** — Disaster Management Centre, for floods and landslides",
        ],
      },
      {
        heading: "If you are ill or injured",
        body: [
          "Call our 24/7 line or tell your driver-guide. We will get you to the nearest suitable hospital or clinic, help you contact your insurer, and keep your family informed if you wish.",
          "Call your insurer's emergency number as soon as you can — most insurers need to approve major treatment in advance.",
        ],
      },
      {
        heading: "If you lose your passport",
        body: [
          "Report the loss at the nearest police station and ask for a written report; you will need it. Then contact your country's embassy or high commission in Colombo for an emergency travel document. We can take you there, help with the paperwork and rearrange your journey around it.",
        ],
      },
      {
        heading: "Theft or loss",
        body: [
          "Report any theft to the police for your insurance claim, and call your bank at once to block lost cards. Then let us know, and we will help with whatever comes next.",
        ],
      },
      {
        heading: "Weather and travel disruption",
        body: [
          "Heavy monsoon rain can bring flooding and landslides, especially in the hill country. We follow the weather and official warnings throughout your journey and will change your route if a road or area becomes unsafe. Always follow the instructions of the local authorities and your driver-guide.",
          "If your flight is cancelled or delayed, tell us — we will rearrange your transfers and help you find a room.",
        ],
      },
      {
        heading: "Before you leave home",
        body: [],
        points: [
          "Save our 24/7 number and your insurer's emergency number in your phone.",
          "Keep photos of your passport, ETA or visa and insurance policy, stored separately from the originals.",
          "Give a family member a copy of your itinerary.",
          "Register with your government's travel registration service, if it has one.",
        ],
      },
    ],
    seo: {
      title: "Emergency Assistance in Sri Lanka — 24/7 Support and Emergency Numbers",
      description:
        "LotusWave Lanka Tours' 24/7 line, Sri Lanka's emergency numbers, and what to do if you are ill, have an accident or lose your passport while travelling.",
    },
  },
];

export async function getPolicies(): Promise<Policy[]> {
  return POLICIES;
}

export async function getPolicyBySlug(slug: string): Promise<Policy | undefined> {
  return POLICIES.find((policy) => policy.slug === slug);
}
