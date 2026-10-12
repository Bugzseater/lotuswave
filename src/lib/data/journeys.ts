import type { Faq, ImageAsset, Journey, MonthRating } from "@/types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

/*
 * Placeholder photography, one entry per picture so the alt text always
 * matches what is actually shown. Swap for R2 photos of the real routes and
 * stays before launch.
 */
const PHOTO = {
  seedlings: {
    src: unsplash("1466692476868-aef1dfb1e735"),
    alt: "Young green seedlings rising from dark soil in a nursery tray",
  },
  farmland: {
    src: unsplash("1500382017468-9049fed747ef"),
    alt: "Golden farmland glowing under a low morning sun",
  },
  homeCooking: {
    src: unsplash("1528712306091-ed0763094c98"),
    alt: "Hands stirring a home-cooked meal in a pan by a sunlit window",
  },
  riceAndCurry: {
    src: unsplash("1585937421612-70a008356fbe"),
    alt: "Small dishes of rice, greens and curry laid out on a table",
  },
  plated: {
    src: unsplash("1504674900247-0877df9cc836"),
    alt: "A freshly cooked dish served on a plate",
  },
  teaTerraces: {
    src: unsplash("1544015759-237f87d55ef3"),
    alt: "Terraced green tea plantations curving over the hills",
  },
  cloudPeaks: {
    src: unsplash("1506905925346-21bda4d32df4"),
    alt: "Mountain peaks rising above a sea of morning cloud",
  },
  nineArches: {
    src: unsplash("1566296314736-6eaac1ca0cb9"),
    alt: "A blue train crossing the stone Nine Arches Bridge through dense forest",
  },
  herbalOil: {
    src: unsplash("1544161515-4ab6ce6db874"),
    alt: "A therapist pouring warm herbal oil for a traditional Ayurveda massage",
  },
  spa: {
    src: unsplash("1540555700478-4be289fbecef"),
    alt: "A calm spa setting prepared for a restorative treatment",
  },
  yoga: {
    src: unsplash("1506126613408-eca07ce68773"),
    alt: "A person holding a seated yoga pose on a mat at first light",
  },
  meditation: {
    src: unsplash("1474418397713-7ede21d49118"),
    alt: "Hands resting open in the lap during quiet meditation",
  },
  forest: {
    src: unsplash("1441974231531-c6227db76b6e"),
    alt: "Sunlight filtering through tall trees in a green forest",
  },
  rainLeaves: {
    src: unsplash("1518173946687-a4c8892bbd9f"),
    alt: "Raindrops glistening on green leaves in soft light",
  },
  sigiriya: {
    src: unsplash("1588598198321-9735fd52455b"),
    alt: "Sigiriya rock fortress rising above green jungle plains",
  },
  leopard: {
    src: unsplash("1456926631375-92c8ce872def"),
    alt: "A leopard resting on a fallen tree trunk",
  },
  palmHeadland: {
    src: unsplash("1580910527739-556eb89f9d65"),
    alt: "Coconut palms on a red-earth headland above a turquoise sea",
  },
  quietBeach: {
    src: unsplash("1507525428034-b723cf961d3e"),
    alt: "Clear turquoise water washing onto a quiet sandy beach",
  },
  sunsetBeach: {
    src: unsplash("1559494007-9f5847c49d94"),
    alt: "The sun setting over a calm beach under a purple sky",
  },
} satisfies Record<string, ImageAsset>;

const RATING = { B: "best", G: "good", O: "off" } as const;

/** Twelve space-separated letters, January first: B best, G good, O off. */
const months = (pattern: string): MonthRating[] =>
  pattern.split(" ").map((letter) => RATING[letter as keyof typeof RATING]);

/* Place coordinates shared by several routes. */
const AT = {
  negombo: { lat: 7.209, lng: 79.838 },
  dambulla: { lat: 7.86, lng: 80.651 },
  sigiriya: { lat: 7.957, lng: 80.76 },
  kandy: { lat: 7.291, lng: 80.635 },
  nuwaraEliya: { lat: 6.949, lng: 80.789 },
  hatton: { lat: 6.891, lng: 80.596 },
  ella: { lat: 6.867, lng: 81.046 },
  udawalawe: { lat: 6.474, lng: 80.888 },
  yala: { lat: 6.372, lng: 81.517 },
  tissa: { lat: 6.283, lng: 81.287 },
  tangalle: { lat: 6.024, lng: 80.795 },
  galle: { lat: 6.033, lng: 80.217 },
  mirissa: { lat: 5.946, lng: 80.459 },
};

/* Lines every journey shares. Journey-specific lines go first. */
const TRANSPORT_BASE = [
  "Private air-conditioned car or van with an English-speaking driver-guide for the whole journey",
  "Airport meet-and-greet and transfers on arrival and departure",
  "Fuel, parking, highway tolls and your driver-guide's meals and lodging",
];

const INCLUDED_BASE = [
  "All accommodation as listed, in double or twin rooms",
  "Meals as listed in the itinerary",
  "Private driver-guide and vehicle throughout",
  "Government taxes and service charges",
  "A 24/7 local support line while you travel",
];

const NOT_INCLUDED_BASE = [
  "International flights",
  "Sri Lanka electronic travel authorisation (ETA)",
  "Travel insurance — required for every guest",
  "Meals not listed in the itinerary, and all drinks",
  "Tips for guides, drivers and hotel staff",
  "Personal expenses such as laundry, phone calls and shopping",
];

const FAQS_BASE: Faq[] = [
  {
    question: "Can we change this itinerary?",
    answer:
      "Yes. Every journey on this site is a starting point. Add or drop days, swap a stay or move the order around — your travel designer reshapes it around your dates and interests before you commit to anything.",
  },
  {
    question: "Is the price per person?",
    answer:
      "Yes — the starting price is per person, based on two adults sharing a room. The final figure depends on your travel dates, group size and the stays you choose, and your quote shows exactly what it includes.",
  },
  {
    question: "How do we book?",
    answer:
      "Send an enquiry from this page or message us on WhatsApp. A travel designer replies personally, usually within one working day, with a tailored itinerary and quote. Planning is free and there is no obligation to book.",
  },
];

/** Mock collection — replaced by Firestore later; the getters below stay put. */
const JOURNEYS: Journey[] = [
  {
    slug: "grow-and-heal-sri-lanka",
    title: "Grow & Heal Sri Lanka",
    durationDays: 10,
    bestFor: "Couples and curious travellers",
    promise: "Plant it, pick it, cook it — then let the hills restore you.",
    summary:
      "Farm stays and paddy fields in the heartland, then restorative Ayurveda days in the hills — our signature blend of land and healing.",
    description:
      "Ten days that join the two sides of Sri Lanka we love most: hands-on days with farming families in the Cultural Triangle, followed by a gentle Ayurveda programme in the green, cool hill country.",
    overview: [
      "The first half is about the land. You stay on a working family farm near Dambulla, wade into the paddy at planting time, walk the spice gardens of Matale and cook lunch with the vegetables you picked that morning.",
      "The second half is about rest. After a consultation with a qualified Ayurveda physician in Kandy, you ride the hill-country train to a small retreat above Ella for three slow days of treatments, yoga and nourishing food.",
    ],
    highlights: [
      "Three nights on a working family farm near Dambulla",
      "Paddy planting, spice-garden walks and village cooking",
      "Tea-country stay with daily Ayurveda treatments",
      "Private driver-guide throughout",
    ],
    whoFor: [
      "Couples who want both an active and a restful holiday",
      "Travellers curious about where their food comes from",
      "Anyone wanting a first taste of Ayurveda without a full retreat",
      "Moderate fitness — farm days are hands-on but unhurried",
    ],
    startingPrice: 1890,
    theme: "agro",
    categories: ["signature", "agro", "wellness"],
    travelStyles: ["agro", "wellness", "culture"],
    comfort: "premium",
    groupTypes: ["couple", "small-group"],
    featured: true,
    image: PHOTO.seedlings,
    route: [
      {
        id: "dambulla",
        name: "Dambulla",
        coordinates: AT.dambulla,
        nights: 3,
        stay: "Family-run farm lodge among the paddy fields",
        destinationSlug: "cultural-triangle",
      },
      {
        id: "kandy",
        name: "Kandy",
        coordinates: AT.kandy,
        nights: 2,
        stay: "Boutique hotel in the hills above the lake",
        destinationSlug: "kandy",
      },
      {
        id: "ella",
        name: "Ella",
        coordinates: AT.ella,
        nights: 3,
        stay: "Small Ayurveda retreat with tea-country views",
        destinationSlug: "ella",
      },
      {
        id: "negombo",
        name: "Negombo",
        coordinates: AT.negombo,
        nights: 1,
        stay: "Quiet beach hotel close to the airport",
        destinationSlug: "colombo-negombo",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive and drive to the farm",
        text: "Your driver-guide meets you at the airport for the four-hour drive north into the dry-zone farmland. Settle into the farm lodge and meet the family over a home-cooked dinner.",
        overnight: "Farm lodge, Dambulla",
        meals: ["dinner"],
      },
      {
        day: 2,
        title: "Seed to plate on the farm",
        text: "A full day on the land: plant rice in the paddy, harvest vegetables and greens, then cook lunch with the family over a wood fire. The afternoon is yours to rest or walk the field bunds at sunset.",
        overnight: "Farm lodge, Dambulla",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 3,
        title: "Village life and Sigiriya",
        text: "Spend the morning in a neighbouring village — the well, the temple, the weaver's veranda — then climb Sigiriya rock in the softer late-afternoon light.",
        overnight: "Farm lodge, Dambulla",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 4,
        title: "Spice gardens to Kandy",
        text: "Drive south through Matale, stopping at a family spice garden to see cinnamon peeled and pepper dried. Reach Kandy in time for the evening ceremony at the Temple of the Tooth.",
        overnight: "Boutique hotel, Kandy",
        meals: ["breakfast"],
      },
      {
        day: 5,
        title: "Ayurveda consultation and market cooking",
        text: "Meet an Ayurveda physician for a personal consultation that shapes the rest of your journey. Later, shop the central market with a local cook and make lunch together.",
        overnight: "Boutique hotel, Kandy",
        meals: ["breakfast", "lunch"],
      },
      {
        day: 6,
        title: "The hill-country train",
        text: "Board the famous blue train for one of the world's most beautiful rail journeys, climbing through tea estates and cloud forest to Ella. Your driver meets you at the station.",
        overnight: "Ayurveda retreat, Ella",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 7,
        toDay: 8,
        title: "Healing days in the hills",
        text: "Two unhurried days built around your consultation: sunrise yoga, a daily treatment, herbal steam and Ayurvedic meals. Walk to Little Adam's Peak or the Nine Arches Bridge if you feel like it — or don't.",
        overnight: "Ayurveda retreat, Ella",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 9,
        title: "Down to the coast",
        text: "A long, scenic drive down from the hills to Negombo, with stops for tea and a roadside fruit stall. A quiet last evening by the sea.",
        overnight: "Beach hotel, Negombo",
        meals: ["breakfast"],
      },
      {
        day: 10,
        title: "Departure",
        text: "A short transfer to the airport for your flight home.",
        overnight: null,
        meals: ["breakfast"],
      },
    ],
    accommodation:
      "A mix chosen for the journey's two halves: a simple, spotless farm lodge where the family lives on site, then a boutique hotel in Kandy and a small Ayurveda retreat with its own physician and treatment rooms.",
    experiences: [
      "seed-to-plate-farm-experience",
      "a-day-in-village-life",
      "ayurveda-healing-day",
      "market-to-table-cooking-class",
      "sunrise-yoga-and-meditation",
    ],
    meals:
      "Farm meals are cooked by your host family from what grows there. At the retreat, every meal is prepared for your Ayurvedic constitution.",
    transport: [
      ...TRANSPORT_BASE,
      "Reserved-seat train tickets from Kandy to Ella",
    ],
    included: [
      ...INCLUDED_BASE,
      "Ayurveda consultation and daily treatments in Ella",
      "Entrance to Sigiriya and the Temple of the Tooth",
      "All farm, village and cooking experiences listed",
    ],
    notIncluded: NOT_INCLUDED_BASE,
    upgrades: [
      {
        title: "Extend the retreat",
        text: "Add three or four more nights in Ella for a deeper Ayurveda programme.",
      },
      {
        title: "Sunrise hot-air balloon",
        text: "Float over the Dambulla paddy fields at dawn, seasonal from December to April.",
      },
      {
        title: "Beach finish",
        text: "Swap the night in Negombo for three nights on the south coast.",
      },
    ],
    bestTime: {
      summary:
        "Good almost all year. January to March is dry and green in both regions; October and November bring the heaviest inter-monsoon rain.",
      months: months("B B B G G G G G G O O G"),
    },
    impact: [
      "Your farm stay is paid directly to the host family and supports a second income beside the harvest.",
      "Spice-garden and village visits are arranged with the community, never as a shop stop.",
      "The retreat employs local therapists and buys its herbs from smallholders around Ella.",
    ],
    gallery: [PHOTO.farmland, PHOTO.homeCooking, PHOTO.sigiriya, PHOTO.herbalOil, PHOTO.nineArches],
    faqs: [
      {
        question: "Do I need farming experience?",
        answer:
          "Not at all. The family shows you everything, and you join in as much or as little as you like. Wear clothes you don't mind getting muddy in the paddy.",
      },
      {
        question: "Can the Ayurveda part suit a medical condition?",
        answer:
          "Tell us about any condition when you enquire. The physician tailors treatments at your consultation, but Ayurveda here is restorative, not a replacement for your own doctor's care.",
      },
      ...FAQS_BASE,
    ],
    seo: {
      title: "Grow & Heal Sri Lanka — 10-Day Agro & Wellness Journey",
      description:
        "A 10-day Sri Lanka journey combining family farm stays, village cooking and restorative Ayurveda in the hill country.",
    },
  },
  {
    slug: "roots-of-sri-lanka",
    title: "Roots of Sri Lanka",
    durationDays: 7,
    bestFor: "First-time visitors and families",
    promise: "The island's story, told by the people who live it.",
    summary:
      "Ancient cities, village kitchens and tea country in one unhurried week — Sri Lanka's story told by the people who live it.",
    description:
      "A week through the island's heritage and everyday life: royal cities and rock temples, village homes and markets, and the hill-country estates where Ceylon tea began.",
    overview: [
      "Start among the kingdoms of the north, where a local historian brings Sigiriya and the Dambulla cave temples to life, and an afternoon by bicycle in Polonnaruwa ends with lunch in a village home.",
      "Then climb into the hills — a morning at Kandy's market and cooking class, the slow train into tea country, and a day on an estate with the families who pick and process the leaf.",
    ],
    highlights: [
      "Sigiriya, Dambulla and the ancient city of Polonnaruwa",
      "Cooking lunch in a village home",
      "Scenic hill-country train ride",
      "Tea-estate visit and tasting",
    ],
    whoFor: [
      "First-time visitors who want the essentials without rushing",
      "Families with children from about six upwards",
      "Travellers who prefer people and stories to sightseeing lists",
    ],
    startingPrice: 1250,
    theme: "agro",
    categories: ["signature", "agro", "family"],
    travelStyles: ["culture", "agro"],
    comfort: "comfort",
    groupTypes: ["family", "couple", "small-group"],
    featured: true,
    image: PHOTO.homeCooking,
    route: [
      {
        id: "sigiriya",
        name: "Sigiriya",
        coordinates: AT.sigiriya,
        nights: 3,
        stay: "Eco-lodge at the edge of the jungle",
        destinationSlug: "sigiriya",
      },
      {
        id: "kandy",
        name: "Kandy",
        coordinates: AT.kandy,
        nights: 2,
        stay: "Family-friendly hotel with a pool",
        destinationSlug: "kandy",
      },
      {
        id: "nuwara-eliya",
        name: "Nuwara Eliya",
        coordinates: AT.nuwaraEliya,
        nights: 1,
        stay: "Tea-estate bungalow",
        destinationSlug: "nuwara-eliya",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive and head north",
        text: "Meet your driver-guide at the airport and drive to Sigiriya, arriving in time to settle in and swim before dinner.",
        overnight: "Eco-lodge, Sigiriya",
        meals: ["dinner"],
      },
      {
        day: 2,
        title: "Sigiriya and Dambulla with a historian",
        text: "Climb Sigiriya early, before the heat, with a local historian who knows its kings and its frescoes. In the afternoon, the painted cave temples of Dambulla.",
        overnight: "Eco-lodge, Sigiriya",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 3,
        title: "Polonnaruwa by bicycle, lunch in a village",
        text: "Cycle between the ruins of Polonnaruwa's palaces and stupas, then join a village family to cook and share a rice-and-curry lunch.",
        overnight: "Eco-lodge, Sigiriya",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 4,
        title: "Spice gardens to Kandy",
        text: "Drive into the hills via a family spice garden in Matale. Evening visit to the Temple of the Tooth.",
        overnight: "Hotel, Kandy",
        meals: ["breakfast"],
      },
      {
        day: 5,
        title: "Market morning and cooking class",
        text: "Shop Kandy's market with a local cook and make lunch together. The afternoon is free — the botanical gardens at Peradeniya are close by.",
        overnight: "Hotel, Kandy",
        meals: ["breakfast", "lunch"],
      },
      {
        day: 6,
        title: "Train to tea country",
        text: "Take the scenic train from Kandy to Nanu Oya, then spend the afternoon on a tea estate — plucking, the factory floor and a tasting with the estate team.",
        overnight: "Tea-estate bungalow, Nuwara Eliya",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 7,
        title: "Departure",
        text: "Drive down from the hills to the airport for your flight home.",
        overnight: null,
        meals: ["breakfast"],
      },
    ],
    accommodation:
      "Comfortable, characterful places with room for families: an eco-lodge near Sigiriya with a pool, a friendly hotel in Kandy and a night in a colonial-era tea bungalow.",
    experiences: [
      "ancient-cities-with-a-local-historian",
      "a-day-in-village-life",
      "market-to-table-cooking-class",
      "leaf-to-cup-tea-estate-day",
    ],
    meals:
      "Breakfast every day, plus the village lunch, the cooking-class lunch and dinners where restaurants are few.",
    transport: [
      ...TRANSPORT_BASE,
      "Bicycles and helmets in Polonnaruwa",
      "Reserved-seat train tickets from Kandy to Nanu Oya",
    ],
    included: [
      ...INCLUDED_BASE,
      "Entrance to Sigiriya, Dambulla, Polonnaruwa and the Temple of the Tooth",
      "Local historian for Sigiriya and Dambulla",
      "All village, cooking and tea experiences listed",
    ],
    notIncluded: NOT_INCLUDED_BASE,
    upgrades: [
      {
        title: "Elephant safari at Minneriya",
        text: "An afternoon jeep safari to see the great elephant gathering, July to October.",
      },
      {
        title: "Extra night in the hills",
        text: "Add a night in Ella and walk to the Nine Arches Bridge.",
      },
    ],
    bestTime: {
      summary:
        "January to April is dry across the whole route. The north stays good through the summer, while the hills are greener and mistier.",
      months: months("B B B B G G G G G O O G"),
    },
    impact: [
      "Village lunches and cooking classes pay the host families directly.",
      "Our historians are local guides from the communities around the sites.",
      "Tea-estate visits include time with the workers' families, arranged with the estate.",
    ],
    gallery: [PHOTO.sigiriya, PHOTO.riceAndCurry, PHOTO.teaTerraces, PHOTO.nineArches],
    faqs: [
      {
        question: "Is Sigiriya too hard a climb for children?",
        answer:
          "Most children from about six manage it happily, with stops. It is around 1,200 steps; we start early to avoid the heat, and anyone who prefers can wait in the water gardens below.",
      },
      ...FAQS_BASE,
    ],
    seo: {
      title: "Roots of Sri Lanka — 7-Day Culture & Village Journey",
      description:
        "A 7-day Sri Lanka itinerary through ancient cities, village kitchens and hill-country tea estates.",
    },
  },
  {
    slug: "wellness-reset",
    title: "Wellness Reset",
    durationDays: 7,
    bestFor: "Solo travellers and anyone needing rest",
    promise: "One quiet place, one week, and nothing to do but heal.",
    summary:
      "A quiet week of Ayurveda, yoga and nourishing food, shaped around your own consultation with a physician.",
    description:
      "Seven days to slow right down. Your programme is built after a consultation with a qualified Ayurveda physician, with daily treatments, yoga and meals prepared for your constitution.",
    overview: [
      "There is no touring on this journey. You stay in one small garden retreat in the hills outside Kandy, and every day follows the rhythm the physician sets for you: treatments in the morning, rest and reading at midday, yoga as the light goes.",
      "Meals are cooked for your constitution from the retreat's own garden. Your driver-guide stays nearby if you want a short outing to the botanical gardens or a temple, but most guests find they don't.",
    ],
    highlights: [
      "Personal consultation and tailored treatment plan",
      "Daily herbal therapies and yoga",
      "Ayurvedic meals prepared for you",
      "Stay in a small garden retreat",
    ],
    whoFor: [
      "Solo travellers — the retreat is small and welcoming",
      "Anyone recovering from burnout or simply needing rest",
      "Guests new to Ayurveda as well as returning ones",
    ],
    startingPrice: null,
    theme: "wellness",
    categories: ["wellness"],
    travelStyles: ["wellness"],
    comfort: "premium",
    groupTypes: ["couple", "small-group"],
    featured: true,
    image: PHOTO.herbalOil,
    route: [
      {
        id: "kandy-hills",
        name: "Kandy hills",
        coordinates: { lat: 7.33, lng: 80.69 },
        nights: 6,
        stay: "Small garden retreat with its own Ayurveda physician",
        destinationSlug: "kandy",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive and settle in",
        text: "A gentle three-hour drive from the airport to the retreat. Herbal tea on arrival, a light dinner and an early night.",
        overnight: "Garden retreat, Kandy hills",
        meals: ["dinner"],
      },
      {
        day: 2,
        title: "Consultation and your plan",
        text: "Meet the physician for a full consultation — pulse reading, questions about sleep, diet and stress — and agree the programme for your week. First treatment in the afternoon.",
        overnight: "Garden retreat, Kandy hills",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 3,
        toDay: 6,
        title: "Daily programme",
        text: "Each day brings a morning treatment, herbal steam or bath, yoga at dawn or dusk, and three Ayurvedic meals. Short guided walks through the garden and village are there if you want them.",
        overnight: "Garden retreat, Kandy hills",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 7,
        title: "Closing consultation and departure",
        text: "A last session with the physician to take home diet and routine advice, then the drive back to the airport.",
        overnight: null,
        meals: ["breakfast"],
      },
    ],
    accommodation:
      "One stay for the whole week: a small retreat of a dozen garden rooms, with its own physician, treatment rooms, yoga pavilion and kitchen.",
    experiences: ["ayurveda-healing-day"],
    meals:
      "All meals from the first dinner to the last breakfast, cooked for your constitution. The retreat serves no alcohol.",
    transport: TRANSPORT_BASE,
    included: [
      ...INCLUDED_BASE,
      "Opening and closing consultations with an Ayurveda physician",
      "Daily treatments, herbal steam and yoga sessions",
      "Herbal medicines used during your stay",
    ],
    notIncluded: [...NOT_INCLUDED_BASE, "Herbal medicines to take home"],
    upgrades: [
      {
        title: "Go deeper — 14 or 21 days",
        text: "Longer stays allow a full panchakarma programme, which can't be done properly in a week.",
      },
      {
        title: "Garden suite",
        text: "A larger room with a private veranda over the valley.",
      },
    ],
    bestTime: {
      summary:
        "Ayurveda works in any season, and the hills around Kandy are mild all year. October and November are the wettest months.",
      months: months("G B B G G G G G G G O G"),
    },
    impact: [
      "The retreat is locally owned and staffed by therapists trained in the area.",
      "Herbs are grown in its garden or bought from smallholders nearby.",
      "Plastic-free rooms and refillable water throughout.",
    ],
    gallery: [PHOTO.spa, PHOTO.yoga, PHOTO.meditation, PHOTO.rainLeaves],
    faqs: [
      {
        question: "Why is there no fixed price?",
        answer:
          "Your treatments are set by the physician after your consultation, and rooms vary, so we quote once we know your dates and needs.",
      },
      {
        question: "Is the retreat suitable for solo travellers?",
        answer:
          "Very. It is small and quiet, and many of its guests come alone. Ask about single-room rates when you enquire.",
      },
      ...FAQS_BASE,
    ],
    seo: {
      title: "Wellness Reset — 7-Day Ayurveda Retreat in Sri Lanka",
      description:
        "A 7-day Ayurveda and yoga retreat in Sri Lanka, tailored after a personal consultation with a physician.",
    },
  },
  {
    slug: "complete-sri-lanka",
    title: "Complete Sri Lanka",
    durationDays: 14,
    bestFor: "Travellers wanting the whole island",
    promise: "Everything the island has, without rushing any of it.",
    summary:
      "Heritage, hill country, wildlife and the south coast — two weeks that take in everything, without rushing any of it.",
    description:
      "Two weeks around the whole island: the Cultural Triangle, misty tea country, a wildlife safari and slow days on the south coast, with farm and wellness experiences woven through.",
    overview: [
      "We built this route so that no day is spent only in a car. Every drive breaks at somewhere worth stopping, and the longest legs are by train through the hills.",
      "Along the way, farm and wellness experiences sit between the sights: a day on a family farm, an Ayurveda morning in Kandy, sunrise yoga in Ella and a food trail through Galle — so you leave knowing the island, not just having seen it.",
    ],
    highlights: [
      "Cultural Triangle and ancient cities",
      "Hill country by scenic train",
      "Safari in Yala National Park",
      "Unhurried final days on the south coast",
    ],
    whoFor: [
      "First-time visitors with two weeks to spare",
      "Families with older children who enjoy variety",
      "Travellers who want a little of everything — culture, nature, beach",
    ],
    startingPrice: 2450,
    theme: "wellness",
    categories: ["signature", "complete", "family"],
    travelStyles: ["culture", "agro", "wellness", "wildlife", "beach"],
    comfort: "premium",
    groupTypes: ["couple", "family", "small-group"],
    featured: true,
    image: PHOTO.cloudPeaks,
    route: [
      {
        id: "negombo",
        name: "Negombo",
        coordinates: AT.negombo,
        nights: 1,
        stay: "Beach hotel close to the airport",
        destinationSlug: "colombo-negombo",
      },
      {
        id: "sigiriya",
        name: "Sigiriya",
        coordinates: AT.sigiriya,
        nights: 3,
        stay: "Boutique lodge facing the rock",
        destinationSlug: "sigiriya",
      },
      {
        id: "kandy",
        name: "Kandy",
        coordinates: AT.kandy,
        nights: 2,
        stay: "Hill-top hotel above the city",
        destinationSlug: "kandy",
      },
      {
        id: "nuwara-eliya",
        name: "Nuwara Eliya",
        coordinates: AT.nuwaraEliya,
        nights: 1,
        stay: "Colonial-era tea-estate bungalow",
        destinationSlug: "nuwara-eliya",
      },
      {
        id: "ella",
        name: "Ella",
        coordinates: AT.ella,
        nights: 2,
        stay: "Boutique hotel with valley views",
        destinationSlug: "ella",
      },
      {
        id: "yala",
        name: "Yala",
        coordinates: AT.tissa,
        nights: 2,
        stay: "Safari lodge near the park gate",
        destinationSlug: "yala",
      },
      {
        id: "galle",
        name: "Galle",
        coordinates: AT.galle,
        nights: 2,
        stay: "Boutique hotel inside the fort walls",
        destinationSlug: "galle",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Negombo",
        text: "Meet your driver-guide at the airport and rest after the flight in a quiet beach hotel twenty minutes away.",
        overnight: "Beach hotel, Negombo",
        meals: ["dinner"],
      },
      {
        day: 2,
        title: "North to Sigiriya, lunch in a village",
        text: "Drive into the dry zone and stop at a village near Sigiriya to cook and share lunch with a local family.",
        overnight: "Boutique lodge, Sigiriya",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 3,
        title: "Sigiriya and Dambulla with a historian",
        text: "An early climb of Sigiriya rock with a local historian, and the painted cave temples of Dambulla in the afternoon.",
        overnight: "Boutique lodge, Sigiriya",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 4,
        title: "A day on the farm",
        text: "Join a farming family near Dambulla: plant in the paddy, pick vegetables and cook lunch over a wood fire.",
        overnight: "Boutique lodge, Sigiriya",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 5,
        title: "Spice gardens to Kandy",
        text: "Drive into the hills via a family spice garden. Evening ceremony at the Temple of the Tooth.",
        overnight: "Hill-top hotel, Kandy",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 6,
        title: "Ayurveda morning and market cooking",
        text: "A morning Ayurveda treatment, then a walk through Kandy's market with a local cook and lunch made together.",
        overnight: "Hill-top hotel, Kandy",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 7,
        title: "Train to tea country",
        text: "The scenic train climbs to Nanu Oya. Spend the afternoon on a tea estate, from plucking to the tasting room.",
        overnight: "Tea-estate bungalow, Nuwara Eliya",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 8,
        title: "Onward to Ella",
        text: "Back on the train for the most beautiful stretch of the line, from Nanu Oya down to Ella.",
        overnight: "Boutique hotel, Ella",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 9,
        title: "Sunrise yoga and the Nine Arches",
        text: "Yoga at first light above the valley, then easy walks to Little Adam's Peak and the Nine Arches Bridge.",
        overnight: "Boutique hotel, Ella",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 10,
        title: "Down to Yala",
        text: "Descend through the Ella gap to the dry south-east, arriving for an afternoon game drive in Yala.",
        overnight: "Safari lodge, Yala",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 11,
        title: "Leopard country",
        text: "A dawn game drive with a naturalist, the best hours for leopard, then a free afternoon at the lodge.",
        overnight: "Safari lodge, Yala",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 12,
        title: "Along the coast to Galle",
        text: "Follow the southern coast west to Galle, and in the evening walk the fort ramparts on a guided food trail.",
        overnight: "Boutique hotel, Galle Fort",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 13,
        title: "A free day by the sea",
        text: "Nothing planned. Swim at Unawatuna, wander the fort's lanes or simply stay by the pool.",
        overnight: "Boutique hotel, Galle Fort",
        meals: ["breakfast"],
      },
      {
        day: 14,
        title: "Departure",
        text: "Two hours on the expressway to the airport for your flight home.",
        overnight: null,
        meals: ["breakfast"],
      },
    ],
    accommodation:
      "Premium boutique hotels and lodges throughout, each chosen for its setting — a view of the rock, a tea-estate bungalow, a safari lodge by the park and a hotel inside Galle's fort.",
    experiences: [
      "a-day-in-village-life",
      "ancient-cities-with-a-local-historian",
      "seed-to-plate-farm-experience",
      "ayurveda-healing-day",
      "market-to-table-cooking-class",
      "leaf-to-cup-tea-estate-day",
      "sunrise-yoga-and-meditation",
      "yala-leopard-safari",
      "south-coast-food-trail",
    ],
    meals:
      "Breakfast every day and most dinners, plus lunches on the farm, village and cooking-class days.",
    transport: [
      ...TRANSPORT_BASE,
      "Reserved-seat train tickets from Kandy to Nanu Oya and Nanu Oya to Ella",
      "Private safari jeep with a naturalist in Yala",
    ],
    included: [
      ...INCLUDED_BASE,
      "Entrance to Sigiriya, Dambulla, the Temple of the Tooth and Yala National Park",
      "Two game drives in Yala",
      "All farm, village, cooking, tea, wellness and food experiences listed",
    ],
    notIncluded: NOT_INCLUDED_BASE,
    upgrades: [
      {
        title: "Luxury stays throughout",
        text: "Upgrade every night to five-star hotels and private villas.",
      },
      {
        title: "Whale watching from Mirissa",
        text: "Add a morning at sea to look for blue whales, December to April.",
      },
      {
        title: "Extra beach days",
        text: "Add two or three nights on the south coast before you fly.",
      },
    ],
    bestTime: {
      summary:
        "December to March is ideal for the whole loop. Yala closes for part of September and October, and the south coast is rougher from May to August.",
      months: months("B B B G O O G G O O G B"),
    },
    impact: [
      "Every region's experiences are hosted by local families, paid directly.",
      "Safari jeeps are run by drivers from the villages around Yala, and we keep to park rules on distance and noise.",
      "Hotels are locally owned wherever we can find one that meets our standard.",
    ],
    gallery: [PHOTO.sigiriya, PHOTO.teaTerraces, PHOTO.nineArches, PHOTO.leopard, PHOTO.quietBeach],
    faqs: [
      {
        question: "Isn't two weeks a lot of driving?",
        answer:
          "Less than you'd think. The longest legs are by train, no day has more than about four hours in the car, and every drive stops somewhere worth seeing.",
      },
      {
        question: "Can we see leopards for certain?",
        answer:
          "No safari can promise it, but Yala has one of the highest leopard densities in the world and two game drives give you a very good chance.",
      },
      ...FAQS_BASE,
    ],
    seo: {
      title: "Complete Sri Lanka — 14-Day Island Journey",
      description:
        "A 14-day Sri Lanka tour covering ancient cities, the hill country, wildlife safaris and the south coast.",
    },
  },
  {
    slug: "tea-country-trails",
    title: "Tea Country Trails",
    durationDays: 5,
    bestFor: "Walkers and tea lovers",
    promise: "Five cool, green days where Ceylon tea begins.",
    summary:
      "Five cool, green days in the hills — estate walks, a morning with the tea pluckers and the slow blue train to Ella.",
    description:
      "A short escape into Sri Lanka's hill country: stays on working tea estates, guided walks between the terraces, a morning plucking and processing tea with the estate's own families, and the famous train ride through the mountains.",
    overview: [
      "Two nights on a working estate near Nuwara Eliya give you time to learn tea properly — out on the slopes with the pluckers, then through withering, rolling and drying in the factory, ending with a tasting.",
      "Then the train carries you on to Ella for two nights of easy walks, sunrise yoga and long views down to the plains.",
    ],
    highlights: [
      "Two nights on a working tea estate near Nuwara Eliya",
      "Tea plucking and a factory visit with the estate team",
      "Scenic train ride from Nanu Oya to Ella",
      "Easy guided walks to Little Adam's Peak and the Nine Arches Bridge",
    ],
    whoFor: [
      "Walkers who like gentle hills and big views",
      "Tea lovers who want to see the whole process",
      "Anyone adding a short escape to a beach stay or business trip",
    ],
    startingPrice: 890,
    theme: "agro",
    categories: ["agro", "short"],
    travelStyles: ["agro", "wellness"],
    comfort: "comfort",
    groupTypes: ["couple", "family", "small-group"],
    featured: true,
    image: PHOTO.teaTerraces,
    route: [
      {
        id: "nuwara-eliya",
        name: "Nuwara Eliya",
        coordinates: AT.nuwaraEliya,
        nights: 2,
        stay: "Bungalow on a working tea estate",
        destinationSlug: "nuwara-eliya",
      },
      {
        id: "ella",
        name: "Ella",
        coordinates: AT.ella,
        nights: 2,
        stay: "Guesthouse with views down the Ella gap",
        destinationSlug: "ella",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Up into the hills",
        text: "From the airport or Colombo, a five-hour drive up through waterfalls and tea country to your estate bungalow.",
        overnight: "Tea-estate bungalow, Nuwara Eliya",
        meals: ["dinner"],
      },
      {
        day: 2,
        title: "Leaf to cup",
        text: "Out on the slopes at first light with the pluckers, then through the factory with the estate team and a tasting of the season's teas.",
        overnight: "Tea-estate bungalow, Nuwara Eliya",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 3,
        title: "The train to Ella",
        text: "Ride the blue train from Nanu Oya to Ella, past terraces, tunnels and cloud forest. Afternoon free in the village.",
        overnight: "Guesthouse, Ella",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 4,
        title: "Sunrise yoga and easy walks",
        text: "Yoga at sunrise, then guided walks to Little Adam's Peak and the Nine Arches Bridge in time for a passing train.",
        overnight: "Guesthouse, Ella",
        meals: ["breakfast"],
      },
      {
        day: 5,
        title: "Departure or onward",
        text: "Drive to the airport, or on to the south coast or Yala if you're continuing your trip.",
        overnight: null,
        meals: ["breakfast"],
      },
    ],
    accommodation:
      "A colonial-era bungalow on a working estate, then a friendly family guesthouse in Ella — simple, warm and with views from the veranda.",
    experiences: ["leaf-to-cup-tea-estate-day", "sunrise-yoga-and-meditation"],
    meals: "Breakfast daily, with lunch and dinner on the estate where there is nowhere else to eat.",
    transport: [...TRANSPORT_BASE, "Reserved-seat train tickets from Nanu Oya to Ella"],
    included: [
      ...INCLUDED_BASE,
      "Tea plucking, factory visit and tasting",
      "Guided walks in Ella",
    ],
    notIncluded: NOT_INCLUDED_BASE,
    upgrades: [
      {
        title: "Horton Plains at dawn",
        text: "An early hike to World's End before the clouds roll in.",
      },
      {
        title: "Continue to the coast",
        text: "Add three nights on the south coast to end with the sea.",
      },
    ],
    bestTime: {
      summary:
        "January to March brings the clearest views. The hills stay walkable most of the year, but October and November are wet.",
      months: months("B B B G O O G G G O O G"),
    },
    impact: [
      "Estate visits are arranged with the estate and include time with the workers' families.",
      "Ella guesthouses are family-run and locally owned.",
      "Walks follow village paths with local guides, not tour-bus routes.",
    ],
    gallery: [PHOTO.cloudPeaks, PHOTO.nineArches, PHOTO.yoga, PHOTO.rainLeaves],
    faqs: [
      {
        question: "How fit do I need to be?",
        answer:
          "The walks are easy to moderate — Little Adam's Peak is about 45 minutes uphill on a good path. Your guide sets the pace.",
      },
      ...FAQS_BASE,
    ],
    seo: {
      title: "Tea Country Trails — 5-Day Hill Country Journey in Sri Lanka",
      description:
        "A 5-day Sri Lanka hill-country journey with tea-estate stays, tea plucking with local families and the scenic train to Ella.",
    },
  },
  {
    slug: "wild-sri-lanka",
    title: "Wild Sri Lanka",
    durationDays: 6,
    bestFor: "Wildlife lovers and photographers",
    promise: "Leopards at dawn, elephants at dusk, birds everywhere between.",
    summary:
      "Leopards in Yala, elephant herds at Udawalawe and birdlife on the wetlands, with nights in quiet bush camps.",
    description:
      "Six days built around the island's wildlife: game drives in Yala and Udawalawe with experienced naturalist guides, wetland birding by boat, and evenings in small camps at the edge of the parks.",
    overview: [
      "Begin in Udawalawe, where herds of elephants graze the grasslands around the reservoir, then move to a small tented camp outside Yala for three nights of dawn and dusk game drives in leopard country.",
      "The journey ends on the coast with the lagoons of Bundala and Kalametiya, explored by boat, where flamingos, storks and painted storks gather in the dry season.",
    ],
    highlights: [
      "Morning and afternoon game drives in Yala National Park",
      "Elephant herds at Udawalawe",
      "Wetland birding by boat",
      "Nights in a small tented bush camp",
    ],
    whoFor: [
      "Wildlife lovers and keen photographers",
      "Families with children who love animals",
      "Travellers adding a safari to a beach holiday",
    ],
    startingPrice: 1390,
    theme: "agro",
    categories: ["short", "family"],
    travelStyles: ["wildlife", "beach"],
    comfort: "comfort",
    groupTypes: ["family", "couple", "small-group"],
    featured: true,
    image: PHOTO.leopard,
    route: [
      {
        id: "udawalawe",
        name: "Udawalawe",
        coordinates: AT.udawalawe,
        nights: 1,
        stay: "Small lodge near the park",
        destinationSlug: "udawalawe",
      },
      {
        id: "yala",
        name: "Yala",
        coordinates: AT.yala,
        nights: 3,
        stay: "Tented bush camp at the edge of the park",
        destinationSlug: "yala",
      },
      {
        id: "tangalle",
        name: "Tangalle",
        coordinates: AT.tangalle,
        nights: 1,
        stay: "Beach guesthouse near the lagoons",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive and drive to Udawalawe",
        text: "Head south on the expressway to Udawalawe, arriving for a late-afternoon game drive among the elephant herds.",
        overnight: "Lodge, Udawalawe",
        meals: ["dinner"],
      },
      {
        day: 2,
        title: "Elephant Transit Home and on to Yala",
        text: "Watch orphaned calves at feeding time at the Elephant Transit Home, then drive east to your bush camp for an evening drive in Yala.",
        overnight: "Bush camp, Yala",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 3,
        toDay: 4,
        title: "Leopard country",
        text: "Two full days in Yala with a naturalist: dawn drives for leopard and sloth bear, long lunches at camp, and afternoon drives as the animals come down to the water.",
        overnight: "Bush camp, Yala",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 5,
        title: "Wetland birding by boat",
        text: "Drive west along the coast to Bundala and Kalametiya. Glide through the lagoons by boat as the birds feed, then settle into a beach guesthouse.",
        overnight: "Beach guesthouse, Tangalle",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 6,
        title: "Departure",
        text: "A morning swim, then the expressway to the airport.",
        overnight: null,
        meals: ["breakfast"],
      },
    ],
    accommodation:
      "Simple, comfortable places close to the wildlife: a small lodge at Udawalawe, a tented camp with proper beds and en-suite bathrooms outside Yala, and a beach guesthouse to finish.",
    experiences: ["yala-leopard-safari"],
    meals:
      "Full board at the bush camp, where meals are cooked over the fire, plus breakfast and dinner elsewhere.",
    transport: [
      ...TRANSPORT_BASE,
      "Private safari jeeps with naturalist guides in Udawalawe and Yala",
      "Boat trip on the Kalametiya lagoon",
    ],
    included: [
      ...INCLUDED_BASE,
      "Park entrance fees for Udawalawe and Yala",
      "Five game drives with a naturalist guide",
      "Lagoon birding boat trip",
    ],
    notIncluded: NOT_INCLUDED_BASE,
    upgrades: [
      {
        title: "Private photography guide",
        text: "A wildlife photographer joins your drives and helps with settings and composition.",
      },
      {
        title: "Sinharaja rainforest",
        text: "Add two nights for guided walks in the island's last great rainforest.",
      },
    ],
    bestTime: {
      summary:
        "February to July is prime time for leopard as water dries up. Yala closes for part of September and October each year.",
      months: months("G B B B B B B G O O G G"),
    },
    impact: [
      "Jeeps and naturalists come from villages around the parks.",
      "We keep to park rules on distance and noise, and never crowd a sighting.",
      "Camps and lodges are small, locally run and staffed from the villages nearby.",
    ],
    gallery: [PHOTO.leopard, PHOTO.forest, PHOTO.farmland, PHOTO.sunsetBeach],
    faqs: [
      {
        question: "Is the bush camp safe for children?",
        answer:
          "Yes. The camp is fenced, staff are on site through the night and children are always escorted after dark. Most children find it the best part of the trip.",
      },
      ...FAQS_BASE,
    ],
    seo: {
      title: "Wild Sri Lanka — 6-Day Wildlife Safari Journey",
      description:
        "A 6-day Sri Lanka wildlife journey with leopard safaris in Yala, elephants at Udawalawe and wetland birding.",
    },
  },
  {
    slug: "slow-south-coast",
    title: "Slow South Coast",
    durationDays: 6,
    bestFor: "Couples and anyone wanting to unwind",
    promise: "Sea, yoga and very little else.",
    summary:
      "Sea-view yoga, Galle Fort's old streets and long lazy afternoons on quiet southern beaches.",
    description:
      "Six unhurried days on the south coast: a small beach stay with morning yoga, a walk through the ramparts and lanes of Galle Fort, a cooking class with a local family and plenty of time to do nothing at all.",
    overview: [
      "Two nights inside Galle Fort let you see the old town properly — early, before the day visitors, and again at sunset from the ramparts — with a food trail through its kitchens and cafés.",
      "Then three nights at a small beach retreat near Mirissa, with yoga each morning over the sea, a cooking class with a coastal family and days left deliberately empty.",
    ],
    highlights: [
      "Morning yoga sessions overlooking the sea",
      "Guided walk through Galle Fort",
      "Home cooking class with a coastal family",
      "Free days on quiet southern beaches",
    ],
    whoFor: [
      "Couples wanting a calm, short break",
      "Anyone ending a longer journey by the sea",
      "Beginners to yoga — every session is open-level",
    ],
    startingPrice: 1090,
    theme: "wellness",
    categories: ["wellness", "short"],
    travelStyles: ["beach", "wellness", "culture"],
    comfort: "premium",
    groupTypes: ["couple"],
    featured: true,
    image: PHOTO.palmHeadland,
    route: [
      {
        id: "galle",
        name: "Galle",
        coordinates: AT.galle,
        nights: 2,
        stay: "Boutique hotel inside the fort walls",
        destinationSlug: "galle",
      },
      {
        id: "mirissa",
        name: "Mirissa",
        coordinates: AT.mirissa,
        nights: 3,
        stay: "Small beach retreat with a yoga shala",
        destinationSlug: "mirissa",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive and drive to Galle",
        text: "Two hours on the coastal expressway to Galle. Watch the sun go down from the fort ramparts.",
        overnight: "Boutique hotel, Galle Fort",
        meals: ["dinner"],
      },
      {
        day: 2,
        title: "Galle Fort on foot",
        text: "An early guided walk through the fort's lanes, churches and ramparts, then a food trail through its kitchens and cafés.",
        overnight: "Boutique hotel, Galle Fort",
        meals: ["breakfast", "lunch"],
      },
      {
        day: 3,
        title: "To the beach",
        text: "A short drive along the coast to your beach retreat. First yoga session at sunset.",
        overnight: "Beach retreat, Mirissa",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 4,
        title: "Cooking with a coastal family",
        text: "Morning yoga over the sea, then cook a fish curry and coconut sambol with a family in their home.",
        overnight: "Beach retreat, Mirissa",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 5,
        title: "A day of nothing",
        text: "Yoga, the beach, a book. Your driver-guide is on call if you want to see somewhere, but there is no plan.",
        overnight: "Beach retreat, Mirissa",
        meals: ["breakfast"],
      },
      {
        day: 6,
        title: "Departure",
        text: "Morning yoga and a last swim before the drive to the airport.",
        overnight: null,
        meals: ["breakfast"],
      },
    ],
    accommodation:
      "Two small, characterful places: a restored merchant's house inside Galle Fort and a beach retreat of a few rooms with its own yoga shala.",
    experiences: ["south-coast-food-trail"],
    meals: "Breakfast daily, with the food-trail lunch, the cooking-class lunch and two dinners.",
    transport: TRANSPORT_BASE,
    included: [
      ...INCLUDED_BASE,
      "Daily yoga at the beach retreat",
      "Guided walk and food trail in Galle Fort",
      "Home cooking class",
    ],
    notIncluded: NOT_INCLUDED_BASE,
    upgrades: [
      {
        title: "Whale watching",
        text: "A morning at sea from Mirissa harbour to look for blue whales, December to April.",
      },
      {
        title: "Ayurveda massage",
        text: "Add a treatment each afternoon at the retreat.",
      },
    ],
    bestTime: {
      summary:
        "The south coast is at its best from December to April, with calm seas and sun. From May to September the sea is rough and swimming is limited.",
      months: months("B B B B O O O O O G G B"),
    },
    impact: [
      "Both stays are locally owned and staffed from nearby villages.",
      "The cooking class is paid to the host family directly.",
      "We avoid the crowded whale-watching operators and use one that follows the official code.",
    ],
    gallery: [PHOTO.quietBeach, PHOTO.sunsetBeach, PHOTO.yoga, PHOTO.plated],
    faqs: [
      {
        question: "Can we travel in the summer months?",
        answer:
          "You can, but the sea on this coast is rough from May to September. We'd suggest the same journey on the east coast instead — ask us about it.",
      },
      ...FAQS_BASE,
    ],
    seo: {
      title: "Slow South Coast — 6-Day Beach & Wellness Journey in Sri Lanka",
      description:
        "A 6-day Sri Lanka south-coast journey with sea-view yoga, Galle Fort and quiet beach days.",
    },
  },
  {
    slug: "ceylon-in-private",
    title: "Ceylon in Private",
    durationDays: 9,
    bestFor: "Couples and families who want the finest stays",
    promise: "The island's quietest luxuries, and every day your own.",
    summary:
      "Private villas, heritage bungalows and Galle Fort — nine days across the island with your own driver-guide and nothing shared.",
    description:
      "Nine days at the top end of Sri Lankan hospitality: a jungle villa facing Sigiriya, a heritage hotel in Kandy, a butler-run tea bungalow and a fort-side suite in Galle, with every experience arranged privately.",
    overview: [
      "Everything on this journey is private — your guides, your village lunch, your Ayurveda day, your evening at the temple. Times move to suit you, and nothing is shared with another group.",
      "The stays are the finest small hotels on the island, chosen for their settings and the people who run them rather than their size.",
    ],
    highlights: [
      "Sunrise at Sigiriya with a private historian",
      "A full Ayurveda day in Kandy",
      "Two nights in a butler-run tea bungalow",
      "A suite inside Galle Fort",
    ],
    whoFor: [
      "Couples celebrating something",
      "Families who want space and flexibility",
      "Travellers who value privacy and service over a packed schedule",
    ],
    startingPrice: 3850,
    theme: "wellness",
    categories: ["luxury"],
    travelStyles: ["culture", "agro", "wellness", "beach"],
    comfort: "luxury",
    groupTypes: ["couple", "family"],
    featured: false,
    image: PHOTO.sigiriya,
    route: [
      {
        id: "sigiriya",
        name: "Sigiriya",
        coordinates: AT.sigiriya,
        nights: 2,
        stay: "Private villa facing the rock",
        destinationSlug: "sigiriya",
      },
      {
        id: "kandy",
        name: "Kandy",
        coordinates: AT.kandy,
        nights: 2,
        stay: "Heritage hotel above the lake",
        destinationSlug: "kandy",
      },
      {
        id: "hatton",
        name: "Hatton",
        coordinates: AT.hatton,
        nights: 2,
        stay: "Butler-run tea-planter's bungalow",
      },
      {
        id: "galle",
        name: "Galle",
        coordinates: AT.galle,
        nights: 2,
        stay: "Suite in a boutique hotel inside the fort",
        destinationSlug: "galle",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive and drive to Sigiriya",
        text: "A private meet-and-greet at the airport and the drive north to your villa, with dinner served on the terrace.",
        overnight: "Private villa, Sigiriya",
        meals: ["dinner"],
      },
      {
        day: 2,
        title: "Sigiriya at first light",
        text: "Climb Sigiriya at opening time with a private historian, then a private lunch cooked by a village family.",
        overnight: "Private villa, Sigiriya",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 3,
        title: "Into the hills to Kandy",
        text: "Drive to Kandy via a spice garden, and attend the evening ceremony at the Temple of the Tooth with your guide.",
        overnight: "Heritage hotel, Kandy",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 4,
        title: "An Ayurveda day",
        text: "A consultation with an Ayurveda physician, two treatments and a herbal lunch, with the afternoon to rest.",
        overnight: "Heritage hotel, Kandy",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 5,
        title: "To the tea bungalow",
        text: "A slow drive up into the tea hills to a planter's bungalow, where your butler pours the estate's own tea on the lawn.",
        overnight: "Tea bungalow, Hatton",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 6,
        title: "On the estate",
        text: "Walk the estate with the manager, see the tea made in the factory, and picnic by a reservoir in the hills.",
        overnight: "Tea bungalow, Hatton",
        meals: ["breakfast", "lunch", "dinner"],
      },
      {
        day: 7,
        title: "Down to Galle",
        text: "Drive down through the hills to the coast and check into your suite inside Galle Fort.",
        overnight: "Boutique hotel, Galle Fort",
        meals: ["breakfast", "dinner"],
      },
      {
        day: 8,
        title: "Galle, your way",
        text: "A private food trail through the fort, then a free afternoon by the pool or on the beach at Unawatuna.",
        overnight: "Boutique hotel, Galle Fort",
        meals: ["breakfast", "lunch"],
      },
      {
        day: 9,
        title: "Departure",
        text: "Private transfer to the airport, with lounge access before your flight.",
        overnight: null,
        meals: ["breakfast"],
      },
    ],
    accommodation:
      "Luxury throughout: a private villa, a heritage hotel, a fully staffed tea bungalow and a fort-side suite. Every stay is small, personally inspected and known to us by name.",
    experiences: [
      "ancient-cities-with-a-local-historian",
      "a-day-in-village-life",
      "ayurveda-healing-day",
      "leaf-to-cup-tea-estate-day",
      "south-coast-food-trail",
    ],
    meals:
      "Breakfast daily and most dinners, plus private lunches on the village, Ayurveda, estate and food-trail days. Full board at the tea bungalow.",
    transport: [
      "Private luxury vehicle with a senior English-speaking driver-guide throughout",
      "VIP airport meet-and-greet and departure lounge access",
      "Fuel, parking, highway tolls and your driver-guide's meals and lodging",
    ],
    included: [
      ...INCLUDED_BASE,
      "Entrance to Sigiriya and the Temple of the Tooth",
      "Private guides for every experience",
      "Ayurveda consultation and treatments in Kandy",
    ],
    notIncluded: NOT_INCLUDED_BASE,
    upgrades: [
      {
        title: "Seaplane or helicopter transfers",
        text: "Cut the long drives with a scenic flight between regions.",
      },
      {
        title: "Private chef dinner",
        text: "A chef cooks a tasting menu at your villa or bungalow.",
      },
      {
        title: "Maldives extension",
        text: "Fly on to the Maldives for a few nights — we arrange the connection.",
      },
    ],
    bestTime: {
      summary:
        "December to April is best for the whole route. The hills and the south coast are wetter from May to September.",
      months: months("B B B G O O G G O O G B"),
    },
    impact: [
      "Private experiences pay local hosts and guides more than a group tour would.",
      "We favour Sri Lankan-owned luxury hotels over international chains.",
      "Estate visits are arranged with the estate and include time with the workers' families.",
    ],
    gallery: [PHOTO.sigiriya, PHOTO.spa, PHOTO.teaTerraces, PHOTO.sunsetBeach],
    faqs: [
      {
        question: "Can the stays be changed?",
        answer:
          "Yes. We hold relationships with several luxury properties in each region and can swap any of them to suit your taste or budget.",
      },
      ...FAQS_BASE,
    ],
    seo: {
      title: "Ceylon in Private — 9-Day Luxury Private Tour of Sri Lanka",
      description:
        "A 9-day luxury private tour of Sri Lanka with villas, a butler-run tea bungalow, Ayurveda in Kandy and Galle Fort.",
    },
  },
];

export async function getJourneys(): Promise<Journey[]> {
  return JOURNEYS;
}

export async function getFeaturedJourneys(): Promise<Journey[]> {
  return JOURNEYS.filter((journey) => journey.featured);
}

export async function getJourneyBySlug(slug: string): Promise<Journey | undefined> {
  return JOURNEYS.find((journey) => journey.slug === slug);
}

/** Journeys in the order the slugs are given; unknown slugs are skipped. */
export async function getJourneysBySlugs(slugs: readonly string[]): Promise<Journey[]> {
  return slugs.flatMap((slug) => JOURNEYS.find((journey) => journey.slug === slug) ?? []);
}
