import type { Experience, ImageAsset } from "@/types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

/*
 * Placeholder photography, one entry per picture so the alt text always
 * matches what is actually shown. Swap for R2 photos of the real hosts and
 * places before launch.
 */
const PHOTO = {
  farmland: {
    src: unsplash("1500382017468-9049fed747ef"),
    alt: "Golden farmland glowing under a low morning sun",
  },
  seedlings: {
    src: unsplash("1466692476868-aef1dfb1e735"),
    alt: "Young green seedlings rising from dark soil in a nursery tray",
  },
  homeCooking: {
    src: unsplash("1528712306091-ed0763094c98"),
    alt: "Hands stirring a home-cooked meal in a pan by a sunlit window",
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
  forest: {
    src: unsplash("1441974231531-c6227db76b6e"),
    alt: "Sunlight filtering through tall trees in a green forest",
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

/** Mock collection — replaced by Firestore later; the getters below stay put. */
const EXPERIENCES: Experience[] = [
  // ── Agro ──────────────────────────────────────────────────────────────
  {
    slug: "seed-to-plate-farm-experience",
    title: "Seed-to-Plate Farm Experience",
    category: "agro",
    type: "Farm-to-table",
    promise: "Plant it, pick it, cook it and share it — one full day on a family farm.",
    overview: [
      "Spend a day with a farming family outside Dambulla, following food from the soil to the table. You start in the field while the air is still cool, work alongside your hosts through the morning harvest and finish around their hearth with a lunch you helped grow and cook.",
      "Nothing here is staged. The farm grows rice, vegetables and spices for its own table and the local market, and the day moves at the pace of the work.",
    ],
    activities: [
      "Walk the farm with your host and learn what grows in each season",
      "Prepare a bed and plant seedlings in the home garden",
      "Harvest vegetables, greens and spices for lunch",
      "Cook rice and curry over a wood fire with the family",
      "Share lunch together and take home a packet of seeds from the farm",
    ],
    included: [
      "Private transfer from your hotel in the Cultural Triangle",
      "English-speaking local guide",
      "All farm activities and tools",
      "Farm-cooked lunch, fresh king coconut and herbal tea",
      "Contribution paid directly to the host family",
    ],
    duration: "Full day, about 7 hours",
    location: "Near Dambulla, Cultural Triangle",
    coordinates: { lat: 7.86, lng: 80.65 },
    bestSeason: "All year; planting is liveliest in October–November and April–May",
    suitableFor: "Families, couples and first-time visitors",
    groupSize: "Private for your group, 2–8 guests",
    whatToBring: [
      "Clothes you don't mind getting muddy",
      "Sandals or shoes that can get wet",
      "Hat, sunscreen and insect repellent",
      "A reusable water bottle",
    ],
    safety: [
      "Field work is gentle but involves bending and standing in shallow water — tell us about any mobility needs and we will shape the day around them.",
      "Cooking happens over open fire under your host's supervision.",
      "Lunch can be made vegetarian, vegan or free of common allergens with notice.",
    ],
    impact: [
      "The host family is paid a fair, agreed fee for every visit.",
      "Groups stay small so the farm keeps working normally.",
      "Lunch is grown on the farm or bought from neighbours.",
    ],
    image: PHOTO.farmland,
    gallery: [PHOTO.seedlings, PHOTO.homeCooking, PHOTO.plated],
    relatedJourneys: ["grow-and-heal-sri-lanka", "roots-of-sri-lanka"],
    seo: {
      title: "Seed-to-Plate Farm Experience in Sri Lanka",
      description:
        "Plant, harvest and cook a wood-fire lunch with a farming family near Dambulla — a full-day farm-to-table experience in Sri Lanka.",
    },
  },
  {
    slug: "leaf-to-cup-tea-estate-day",
    title: "Leaf to Cup Tea Estate Day",
    category: "agro",
    type: "Tea journeys",
    promise: "Pluck, wither, roll and taste — the whole life of Ceylon tea in one hill-country day.",
    overview: [
      "Join tea pluckers on the slopes in the cool of the morning, then follow the leaf into a small estate factory to see how it becomes black, green and white tea.",
      "The day ends with a guided tasting on a veranda above the terraces, comparing teas from different elevations.",
    ],
    activities: [
      "Learn the 'two leaves and a bud' plucking technique with estate workers",
      "Follow the leaf through withering, rolling, fermenting and drying",
      "Hand-roll a small batch of your own tea",
      "Guided tasting of high-, mid- and low-grown teas",
    ],
    included: [
      "Estate guide and factory visit",
      "Plucking basket and apron",
      "Guided tea tasting with light refreshments",
      "A pack of the tea you rolled",
    ],
    duration: "Half day, about 5 hours",
    location: "Nuwara Eliya, Central Highlands",
    coordinates: { lat: 6.97, lng: 80.78 },
    bestSeason: "January–April for the clearest mornings; plucking happens all year",
    suitableFor: "All ages, tea lovers and photographers",
    groupSize: "Private for your group, 2–10 guests",
    whatToBring: [
      "A warm layer — mornings in the hills are cool",
      "Comfortable walking shoes with grip",
      "Rain jacket from May to September",
    ],
    safety: [
      "Tea slopes are steep and can be slippery after rain; paths are uneven.",
      "The factory tour is on one level and suits guests who prefer to skip the slopes.",
    ],
    impact: [
      "We work with estates that pay pluckers above the sector minimum.",
      "Part of each booking goes to the estate's community fund.",
    ],
    image: PHOTO.teaTerraces,
    gallery: [PHOTO.cloudPeaks, PHOTO.nineArches, PHOTO.teaTerraces],
    relatedJourneys: ["tea-country-trails", "complete-sri-lanka"],
    seo: {
      title: "Leaf to Cup Tea Estate Experience, Nuwara Eliya",
      description:
        "Pluck tea with estate workers, see it processed in the factory and taste teas from across Sri Lanka's hill country.",
    },
  },

  // ── Wellness ──────────────────────────────────────────────────────────
  {
    slug: "ayurveda-healing-day",
    title: "Ayurveda Healing Day",
    category: "wellness",
    type: "Ayurveda",
    promise: "A day of consultation, treatment and rest, led by a qualified Ayurveda physician.",
    overview: [
      "Begin with a private consultation with a registered Ayurveda physician, who reads your constitution and plans the day's treatments around it.",
      "Treatments take place in a garden setting, with time between each to rest. Lunch is prepared to suit your constitution.",
    ],
    activities: [
      "Private consultation with an Ayurveda physician",
      "A herbal oil treatment chosen for you",
      "Herbal steam and rest in the garden",
      "Ayurvedic lunch and herbal drinks",
      "A short talk on bringing simple practices home",
    ],
    included: [
      "Physician consultation",
      "Two treatments and herbal steam",
      "Ayurvedic lunch and herbal teas",
      "Private return transfer",
    ],
    duration: "Full day, about 6 hours",
    location: "Kandy region, Central Province",
    coordinates: { lat: 7.29, lng: 80.63 },
    bestSeason: "All year",
    suitableFor: "Adults; solo travellers and couples",
    groupSize: "Individual or couple treatments",
    whatToBring: [
      "Loose, comfortable clothing",
      "A change of clothes — oil treatments are generous",
      "Details of any medication or health conditions",
    ],
    safety: [
      "Ayurveda here is a wellness practice, not a replacement for medical care. Please tell the physician about any medical conditions, pregnancy or medication.",
      "Treatment rooms are on the ground floor; let us know about mobility needs in advance.",
    ],
    impact: [
      "Treatments use herbs grown in the centre's garden or bought from local growers.",
      "Our partner centres employ therapists from the surrounding villages.",
    ],
    image: PHOTO.herbalOil,
    gallery: [PHOTO.spa, PHOTO.forest, PHOTO.herbalOil],
    relatedJourneys: ["wellness-reset", "grow-and-heal-sri-lanka"],
    seo: {
      title: "Ayurveda Healing Day in Kandy, Sri Lanka",
      description:
        "A personal Ayurveda consultation, herbal treatments and a constitution-based lunch at a garden wellness centre near Kandy.",
    },
  },
  {
    slug: "sunrise-yoga-and-meditation",
    title: "Sunrise Yoga & Meditation in the Hills",
    category: "wellness",
    type: "Yoga",
    promise: "Breath, movement and stillness as the mist lifts off the hill country.",
    overview: [
      "An unhurried morning session with an experienced local teacher on an open deck above the valley. The practice is gentle and adapted to everyone on the mat.",
      "Afterwards, a guided meditation and a slow breakfast of fruit, herbal porridge and tea.",
    ],
    activities: [
      "Gentle sunrise yoga, suited to all levels",
      "Breathing practice and guided meditation",
      "A short mindful walk through the tea",
      "Healthy breakfast with a view",
    ],
    included: ["Yoga teacher", "Mats and props", "Breakfast and herbal tea"],
    duration: "Morning, about 3 hours",
    location: "Ella, Uva Province",
    coordinates: { lat: 6.87, lng: 81.05 },
    bestSeason: "January–April and July–September",
    suitableFor: "All levels, including complete beginners",
    groupSize: "Private for your group, 1–8 guests",
    whatToBring: ["Comfortable clothing", "A warm layer for the early start"],
    safety: [
      "Every pose has a gentler option; tell your teacher about injuries or pregnancy before you begin.",
      "The deck is reached by a short path with steps.",
    ],
    impact: [
      "Teachers are local and paid directly.",
      "Breakfast is sourced from smallholders around Ella.",
    ],
    image: PHOTO.cloudPeaks,
    gallery: [PHOTO.teaTerraces, PHOTO.nineArches, PHOTO.forest],
    relatedJourneys: ["wellness-reset", "tea-country-trails"],
    seo: {
      title: "Sunrise Yoga & Meditation in Ella, Sri Lanka",
      description:
        "A gentle sunrise yoga and meditation session above the hills of Ella, followed by a healthy breakfast.",
    },
  },

  // ── Culture & Community ───────────────────────────────────────────────
  {
    slug: "a-day-in-village-life",
    title: "A Day in Village Life",
    category: "culture",
    type: "Village life",
    promise: "Spend a day as a guest of a village near Sigiriya, at the village's own pace.",
    overview: [
      "Cross the reservoir by catamaran canoe, walk the paddy bunds and spend the day with a village family — fetching water, grinding coconut and cooking lunch in a clay-walled kitchen.",
      "The visit is run with the village society, so hosts take turns and the income is shared.",
    ],
    activities: [
      "Cross the village reservoir in a traditional canoe",
      "Walk through the paddy fields and chena gardens",
      "Help prepare a village lunch in clay pots",
      "Weave a coconut-leaf mat with the women's society",
    ],
    included: ["Village guide", "Canoe crossing", "Village lunch", "Community fee"],
    duration: "Half day, about 4 hours",
    location: "Hiriwadunna, near Sigiriya",
    coordinates: { lat: 7.93, lng: 80.72 },
    bestSeason: "All year",
    suitableFor: "Families with children, first-time visitors",
    groupSize: "Private for your group, 2–10 guests",
    whatToBring: ["Modest clothing", "Sun protection", "Comfortable sandals"],
    safety: [
      "Life jackets are provided for the canoe crossing.",
      "Paths are flat but unpaved.",
    ],
    impact: [
      "A fixed community fee goes to the village society for every guest.",
      "Host families rotate so income is shared across the village.",
    ],
    image: PHOTO.sigiriya,
    gallery: [PHOTO.homeCooking, PHOTO.farmland, PHOTO.plated],
    relatedJourneys: ["roots-of-sri-lanka", "complete-sri-lanka"],
    seo: {
      title: "Village Life Experience near Sigiriya, Sri Lanka",
      description:
        "Canoe across a village reservoir, walk paddy fields and cook a clay-pot lunch with a village family near Sigiriya.",
    },
  },
  {
    slug: "ancient-cities-with-a-local-historian",
    title: "Ancient Cities with a Local Historian",
    category: "culture",
    type: "Cultural heritage",
    promise: "Two and a half thousand years of history, told by someone who grew up among the ruins.",
    overview: [
      "Explore Sigiriya and the cave temples of Dambulla with a historian from the area, who brings the stories behind the stones to life.",
      "Start early to climb before the heat and the crowds, and end with tea in a village teashop.",
    ],
    activities: [
      "Early climb of Sigiriya rock with your historian",
      "Explore the water gardens and frescoes",
      "Visit the Dambulla cave temples",
      "Tea and conversation in a village teashop",
    ],
    included: ["Local historian guide", "Entrance tickets", "Private transport", "Refreshments"],
    duration: "Full day, about 8 hours",
    location: "Sigiriya and Dambulla, Cultural Triangle",
    coordinates: { lat: 7.96, lng: 80.76 },
    bestSeason: "January–September",
    suitableFor: "History lovers; a good level of fitness for the climb",
    groupSize: "Private for your group, 2–8 guests",
    whatToBring: [
      "Clothing that covers shoulders and knees for the temples",
      "Socks for hot temple floors",
      "Water and sun protection",
    ],
    safety: [
      "The Sigiriya climb has around 1,200 steps and exposed stairways; the gardens and the Dambulla temples can be visited without it.",
    ],
    impact: [
      "Guides are from the surrounding villages.",
      "We visit early to avoid adding to peak-hour crowding.",
    ],
    image: PHOTO.sigiriya,
    gallery: [PHOTO.forest, PHOTO.farmland, PHOTO.sigiriya],
    relatedJourneys: ["roots-of-sri-lanka", "complete-sri-lanka"],
    seo: {
      title: "Sigiriya & Dambulla with a Local Historian",
      description:
        "Climb Sigiriya and explore the Dambulla cave temples with a historian from the Cultural Triangle.",
    },
  },

  // ── Nature & Wildlife ─────────────────────────────────────────────────
  {
    slug: "yala-leopard-safari",
    title: "Yala Leopard Safari",
    category: "nature",
    type: "Safaris",
    promise: "Dawn in leopard country with a naturalist who reads the park like a book.",
    overview: [
      "Enter Yala National Park at first light with a naturalist guide and an experienced tracker, when leopards, elephants and sloth bears are most active.",
      "We choose quieter blocks of the park and keep a respectful distance from wildlife — no chasing, no crowding.",
    ],
    activities: [
      "Morning game drive in an open safari jeep",
      "Leopard, elephant and bird spotting with a naturalist",
      "Picnic breakfast in the park",
    ],
    included: ["Naturalist guide", "Private safari jeep", "Park fees", "Picnic breakfast"],
    duration: "Half day, about 5 hours",
    location: "Yala National Park, Southern Province",
    coordinates: { lat: 6.37, lng: 81.52 },
    bestSeason: "February–July; the park closes for part of September and October",
    suitableFor: "All ages; children must be supervised in the jeep",
    groupSize: "Up to 6 guests per jeep",
    whatToBring: ["Binoculars", "Neutral-coloured clothing", "Hat and sunscreen", "A light jacket for the early start"],
    safety: [
      "Stay seated and inside the jeep at all times.",
      "Tracks are bumpy; let us know about back or neck problems.",
    ],
    impact: [
      "We follow park rules on distance and speed and avoid crowding sightings.",
      "Trackers and drivers come from villages bordering the park.",
    ],
    image: PHOTO.leopard,
    gallery: [PHOTO.forest, PHOTO.sunsetBeach, PHOTO.leopard],
    relatedJourneys: ["wild-sri-lanka", "complete-sri-lanka"],
    seo: {
      title: "Yala Leopard Safari with a Naturalist Guide",
      description:
        "A private dawn safari in Yala National Park to see leopards, elephants and birds with an expert naturalist.",
    },
  },
  {
    slug: "sinharaja-rainforest-walk",
    title: "Sinharaja Rainforest Walk",
    category: "nature",
    type: "Rainforest walks",
    promise: "Endemic birds, giant trees and waterfalls in Sri Lanka's last great rainforest.",
    overview: [
      "Walk into the UNESCO-listed Sinharaja Forest Reserve with a village-born guide who knows every call in the canopy.",
      "The trail winds past streams and a waterfall, with time to watch for mixed bird flocks and rare endemic species.",
    ],
    activities: [
      "Guided walk on rainforest trails",
      "Bird watching for endemic species",
      "Swim at a forest waterfall",
      "Lunch with a family at the forest edge",
    ],
    included: ["Local forest guide", "Reserve fees", "Leech socks", "Home-cooked lunch"],
    duration: "Full day, about 7 hours",
    location: "Sinharaja Forest Reserve, Sabaragamuwa",
    coordinates: { lat: 6.4, lng: 80.45 },
    bestSeason: "January–April and August–September",
    suitableFor: "Walkers with moderate fitness",
    groupSize: "Private for your group, 2–8 guests",
    whatToBring: ["Walking shoes with grip", "Rain jacket", "Swimwear", "Insect repellent"],
    safety: [
      "Trails are muddy and uneven, with stream crossings.",
      "Leeches are common; leech socks are provided.",
    ],
    impact: [
      "Guides come from villages bordering the reserve.",
      "Lunch supports a forest-edge family.",
    ],
    image: PHOTO.forest,
    gallery: [PHOTO.cloudPeaks, PHOTO.teaTerraces, PHOTO.forest],
    relatedJourneys: ["wild-sri-lanka"],
    seo: {
      title: "Sinharaja Rainforest Walk, Sri Lanka",
      description:
        "A guided walk through the UNESCO-listed Sinharaja rainforest for endemic birds, waterfalls and a village lunch.",
    },
  },

  // ── Food ──────────────────────────────────────────────────────────────
  {
    slug: "market-to-table-cooking-class",
    title: "Market-to-Table Cooking Class",
    category: "food",
    type: "Market-to-table",
    promise: "Shop the morning market with a local cook, then cook a feast in her family kitchen.",
    overview: [
      "Meet your cook at Kandy's central market and shop together for vegetables, fish and spices.",
      "Back in her kitchen, learn to make five or six curries, sambols and a coconut roti — then sit down to eat it all.",
    ],
    activities: [
      "Guided walk through Kandy market",
      "Choose produce and spices with your cook",
      "Hands-on cooking class in a family kitchen",
      "Lunch together, with recipes to take home",
    ],
    included: ["Market tour", "All ingredients", "Cooking class", "Lunch", "Printed recipes"],
    duration: "Half day, about 5 hours",
    location: "Kandy, Central Province",
    coordinates: { lat: 7.29, lng: 80.63 },
    bestSeason: "All year",
    suitableFor: "Food lovers, families, all ages",
    groupSize: "Private for your group, 2–8 guests",
    whatToBring: ["An appetite", "A cloth bag for the market"],
    safety: [
      "Spice levels are adjusted for you; vegetarian and vegan menus on request.",
      "Tell us about allergies when you book.",
    ],
    impact: [
      "Ingredients are bought from market traders on the day.",
      "Your cook is paid directly for every class.",
    ],
    image: PHOTO.plated,
    gallery: [PHOTO.homeCooking, PHOTO.seedlings, PHOTO.plated],
    relatedJourneys: ["roots-of-sri-lanka", "grow-and-heal-sri-lanka"],
    seo: {
      title: "Market-to-Table Cooking Class in Kandy",
      description:
        "Shop Kandy market with a local cook and learn to make Sri Lankan rice and curry in her family kitchen.",
    },
  },
  {
    slug: "south-coast-food-trail",
    title: "South Coast Food Trail",
    category: "food",
    type: "Local food trails",
    promise: "Short eats, fresh fish and buffalo curd, tasted along the southern shore.",
    overview: [
      "A slow drive along the south coast with a food-loving guide, stopping at the places locals queue for.",
      "Taste street snacks in Galle, fish fresh off the boats and buffalo curd with treacle from a roadside farm stall.",
    ],
    activities: [
      "Short eats tasting in Galle",
      "Visit a morning fish market",
      "Buffalo curd and kithul treacle at a farm stall",
      "Seafood lunch by the sea",
    ],
    included: ["Food guide", "All tastings", "Seafood lunch", "Private transport"],
    duration: "Half day, about 5 hours",
    location: "Galle to Mirissa, Southern Province",
    coordinates: { lat: 6.03, lng: 80.22 },
    bestSeason: "November–April",
    suitableFor: "Food lovers and curious travellers",
    groupSize: "Private for your group, 2–6 guests",
    whatToBring: ["Sun protection", "Light clothing"],
    safety: [
      "We choose busy, trusted stalls; tell us about allergies or dietary needs in advance.",
    ],
    impact: [
      "Every stop is a small, family-run business.",
      "We buy fish only from day-boat fishermen.",
    ],
    image: PHOTO.palmHeadland,
    gallery: [PHOTO.quietBeach, PHOTO.sunsetBeach, PHOTO.plated],
    relatedJourneys: ["slow-south-coast"],
    seo: {
      title: "South Coast Food Trail, Galle to Mirissa",
      description:
        "Taste Galle's street food, fresh fish and buffalo curd on a guided food trail along Sri Lanka's south coast.",
    },
  },
];

export async function getExperiences(): Promise<Experience[]> {
  return EXPERIENCES;
}

export async function getExperienceBySlug(slug: string): Promise<Experience | undefined> {
  return EXPERIENCES.find((experience) => experience.slug === slug);
}

