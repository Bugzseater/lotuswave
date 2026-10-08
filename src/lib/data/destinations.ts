import type { Destination, ImageAsset, MonthRating } from "@/types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

/*
 * Placeholder photography, one entry per picture so the alt text always
 * matches what is actually shown. Several destinations borrow a nearby or
 * generic image for now — swap every one for an R2 photo of the place itself
 * before launch.
 */
const PHOTO = {
  sigiriya: {
    src: unsplash("1588598198321-9735fd52455b"),
    alt: "Sigiriya rock fortress rising above green jungle plains",
  },
  nineArches: {
    src: unsplash("1566296314736-6eaac1ca0cb9"),
    alt: "A blue train crossing the stone Nine Arches Bridge through dense forest",
  },
  teaTerraces: {
    src: unsplash("1544015759-237f87d55ef3"),
    alt: "Terraced green tea plantations curving over the hills",
  },
  leopard: {
    src: unsplash("1456926631375-92c8ce872def"),
    alt: "A leopard resting on a fallen tree trunk",
  },
  palmHeadland: {
    src: unsplash("1580910527739-556eb89f9d65"),
    alt: "Coconut palms on a red-earth headland above a turquoise sea",
  },
  sunsetBeach: {
    src: unsplash("1559494007-9f5847c49d94"),
    alt: "The sun setting over a calm beach under a purple sky",
  },
  quietBeach: {
    src: unsplash("1507525428034-b723cf961d3e"),
    alt: "Clear turquoise water washing onto a quiet sandy beach",
  },
  // The ID shows wet leaves, not the hammock its old caption described.
  rainLeaves: {
    src: unsplash("1518173946687-a4c8892bbd9f"),
    alt: "Raindrops glistening on green leaves in soft light",
  },
  riceAndCurry: {
    src: unsplash("1585937421612-70a008356fbe"),
    alt: "Small dishes of rice, greens and curry laid out on a table",
  },
  seedlings: {
    src: unsplash("1466692476868-aef1dfb1e735"),
    alt: "Young green seedlings rising from dark soil in a nursery tray",
  },
  farmland: {
    src: unsplash("1500382017468-9049fed747ef"),
    alt: "Golden farmland glowing under a low morning sun",
  },
  forest: {
    src: unsplash("1441974231531-c6227db76b6e"),
    alt: "Sunlight filtering through tall trees in a green forest",
  },
  cloudPeaks: {
    src: unsplash("1506905925346-21bda4d32df4"),
    alt: "Mountain peaks rising above a sea of morning cloud",
  },
} satisfies Record<string, ImageAsset>;

const RATING = { B: "best", G: "good", O: "off" } as const;

/** Twelve space-separated letters, January first: B best, G good, O off. */
function months(pattern: string): MonthRating[] {
  return pattern.split(" ").map((letter) => RATING[letter as keyof typeof RATING]);
}

/** The south-west monsoon pattern shared by the west and south coasts. */
const SOUTH_WEST_COAST = months("B B B G O O O O O G G B");

/**
 * Mock collection — replaced by Firestore later; the getters below stay put.
 * Order matters on the home page: the first six fill the mosaic, and the
 * first entry takes its large tile.
 */
const DESTINATIONS: Destination[] = [
  // ── Home page mosaic ─────────────────────────────────────────────────
  {
    slug: "sigiriya",
    name: "Sigiriya",
    region: "Cultural Triangle",
    area: "ancient",
    category: "heritage",
    tagline: "A fifth-century fortress on a rock above the jungle",
    image: PHOTO.sigiriya,
    coordinates: { lat: 7.957, lng: 80.76 },
    sights: [
      "Sigiriya Rock Fortress",
      "Frescoes and Mirror Wall",
      "Lion's Paw Terraces",
      "Royal Water Gardens",
      "Boulder Gardens",
      "Sigiriya Museum",
      "Moats and Ramparts",
      "Cobra Hood Cave",
      "Pidurangala Rock (nearby)",
      "Village Paddy Fields",
    ],
    facts: [
      { icon: "history", value: "5th c.", label: "Rock palace" },
      { icon: "altitude", value: "200 m", label: "Rock height" },
    ],
    intro:
      "Sigiriya is a 200-metre column of rock with the ruins of a fifth-century palace on its summit, built by King Kashyapa and ringed by water gardens, painted maidens and a mirror wall still scratched with ancient verse.",
    whyVisit: [
      {
        title: "A palace in the sky",
        text: "Climb past the giant Lion's Paws to the summit terraces at first light, with the whole plain below you.",
      },
      {
        title: "Gardens older than Europe's",
        text: "Symmetrical water gardens and fountains among the oldest landscaped gardens in the world — some still run after rain.",
      },
      {
        title: "Village life all around",
        text: "Paddy fields, tank lakes and farming villages begin where the ticket office ends.",
      },
    ],
    bestTime: {
      summary:
        "Dry and bright from February to April and again from June to September. Showers arrive with the north-east monsoon from October to December.",
      months: months("G B B B G B B B G O O G"),
    },
    agro: [
      {
        title: "A Day in Village Life",
        text: "Cross a tank lake by catamaran, work a chena plot and cook lunch over wood fire with a Hiriwadunna family.",
        experienceSlug: "a-day-in-village-life",
      },
      {
        title: "Seed-to-Plate Farm Experience",
        text: "Plant, harvest and cook on a working organic family farm near Dambulla.",
        experienceSlug: "seed-to-plate-farm-experience",
      },
    ],
    wellness: [
      {
        title: "Sunrise meditation facing the rock",
        text: "A quiet guided sitting on Pidurangala as the light reaches Sigiriya's western face.",
      },
      {
        title: "Village Ayurveda massage",
        text: "Herbal oil massage and steam at a small, family-run Ayurveda centre after the climb.",
      },
    ],
    highlights: [
      {
        kind: "culture",
        title: "Sigiriya Rock Fortress",
        text: "Frescoes, the mirror wall and the summit palace — a UNESCO World Heritage Site.",
      },
      {
        kind: "culture",
        title: "Dambulla Cave Temple",
        text: "Five painted caves filled with Buddha statues, a short drive south.",
      },
      {
        kind: "nature",
        title: "Pidurangala Rock",
        text: "A rougher, quieter scramble with the best view of Sigiriya itself.",
      },
      {
        kind: "nature",
        title: "Minneriya's elephant gathering",
        text: "From July to September, herds come together on the drying reservoir bed.",
      },
    ],
    stays: [
      {
        style: "Jungle-edge eco-lodge",
        text: "Low-impact cabins among the trees, often with a view of the rock.",
        priceBand: 2,
      },
      {
        style: "Village homestay",
        text: "A room with a farming family — home cooking and early, easy starts.",
        priceBand: 1,
      },
      {
        style: "Private villa with a pool",
        text: "Space, quiet and a pool looking out over paddy fields.",
        priceBand: 3,
      },
    ],
    relatedJourneys: ["roots-of-sri-lanka", "grow-and-heal-sri-lanka", "complete-sri-lanka"],
    tips: [
      "Start the climb by 7 am — the rock face holds the heat by late morning.",
      "Allow two to three hours and about 1,200 steps; there is no lift.",
      "Keep voices low on the upper stairways, where wild hornets nest.",
      "Cover shoulders and knees for Dambulla and any working temple.",
    ],
    seo: {
      title: "Sigiriya Travel Guide — Rock Fortress, Villages & Best Time to Visit",
      description:
        "Plan a visit to Sigiriya: the rock fortress, village and farm experiences, wellness, where to stay and the best months to go.",
    },
  },
  {
    slug: "ella",
    name: "Ella",
    region: "Uva Province",
    area: "highlands",
    category: "hills",
    tagline: "Nine Arches, misty ridges and the slow blue train",
    image: PHOTO.nineArches,
    coordinates: { lat: 6.867, lng: 81.046 },
    sights: [
      "Nine Arches Bridge",
      "Little Adam's Peak",
      "Ella Rock",
      "Ella Gap Viewpoint",
      "Ravana Falls",
      "Ravana Cave",
      "Demodara Loop",
      "Dowa Rock Temple",
      "Uva Tea Estates",
      "Ella Spice Gardens",
    ],
    facts: [
      { icon: "altitude", value: "1,040 m", label: "Altitude" },
      { icon: "time", value: "~7 hrs", label: "Kandy by train" },
    ],
    intro:
      "Ella is a small hill town on the southern edge of the highlands, ringed by tea estates and waterfalls, with a view straight down the Ella Gap to the plains far below.",
    whyVisit: [
      {
        title: "The train ride",
        text: "The line from Kandy and Nanu Oya to Ella climbs through tea and cloud forest — one of the great rail journeys.",
      },
      {
        title: "Walks from the door",
        text: "Little Adam's Peak, Ella Rock and the Nine Arches Bridge are all walkable from town.",
      },
      {
        title: "A slower pace",
        text: "Cafés, hillside yoga and evenings that cool down enough for a blanket.",
      },
    ],
    bestTime: {
      summary:
        "Clearest from January to March and again in July and August. Expect afternoon mist and rain from October to December.",
      months: months("B B B G G G B B G O O G"),
    },
    agro: [
      {
        title: "Uva tea estate morning",
        text: "Pluck alongside the estate team, then follow the leaf through a working factory to the tasting table.",
      },
      {
        title: "Spice garden and home cooking",
        text: "Pick pepper, cardamom and curry leaves, then cook a rice-and-curry lunch with the family who grows them.",
      },
    ],
    wellness: [
      {
        title: "Sunrise Yoga & Meditation in the Hills",
        text: "A gentle practice on an open deck as the mist lifts from the gap.",
        experienceSlug: "sunrise-yoga-and-meditation",
      },
      {
        title: "Hill-country Ayurveda",
        text: "Warm-oil treatments and herbal baths that suit the cool evenings.",
      },
    ],
    highlights: [
      {
        kind: "culture",
        title: "Nine Arches Bridge",
        text: "A colonial-era stone viaduct curving through the jungle — time a train crossing.",
      },
      {
        kind: "culture",
        title: "Dowa Rock Temple",
        text: "An ancient cave temple with an unfinished Buddha carved into the cliff.",
      },
      {
        kind: "nature",
        title: "Little Adam's Peak",
        text: "An easy hour's walk through tea to a ridge with views on every side.",
      },
      {
        kind: "nature",
        title: "Ravana Falls",
        text: "A tiered waterfall beside the road down the gap, at its fullest after the rains.",
      },
    ],
    stays: [
      {
        style: "Hillside boutique retreat",
        text: "A handful of rooms facing the Ella Gap, with yoga on the deck.",
        priceBand: 2,
      },
      {
        style: "Tea estate bungalow",
        text: "A planter's house on a working estate, a short drive from town.",
        priceBand: 3,
      },
      {
        style: "Family-run guesthouse",
        text: "Simple, warm and walkable to everything.",
        priceBand: 1,
      },
    ],
    relatedJourneys: ["tea-country-trails", "wellness-reset", "complete-sri-lanka"],
    tips: [
      "Reserved train seats sell out weeks ahead — we book them as soon as your dates are set.",
      "Walk Little Adam's Peak early, before the cloud rolls in.",
      "Pack a warm layer; nights in the hills can drop below 15°C.",
      "Ask us for the day's train times if you want to see one cross the Nine Arches.",
    ],
    seo: {
      title: "Ella Travel Guide — Nine Arches, Tea Estates & Hill-Country Yoga",
      description:
        "Plan your time in Ella, Sri Lanka: the scenic train, tea estates, hillside yoga, walks, where to stay and the best time to visit.",
    },
  },
  {
    slug: "nuwara-eliya",
    name: "Nuwara Eliya",
    region: "Central Highlands",
    area: "highlands",
    category: "tea",
    tagline: "Rolling tea estates in the cool hill country",
    image: PHOTO.teaTerraces,
    coordinates: { lat: 6.949, lng: 80.789 },
    sights: [
      "Horton Plains and World's End",
      "Baker's Falls",
      "Pedro Tea Estate",
      "Gregory Lake",
      "Victoria Park",
      "Hakgala Botanical Garden",
      "Seetha Amman Temple",
      "Lover's Leap Waterfall",
      "Red-Brick Post Office",
      "Moon Plains",
    ],
    facts: [
      { icon: "altitude", value: "1,868 m", label: "Altitude" },
      { icon: "temperature", value: "~16°C", label: "Average temp" },
    ],
    intro:
      "At around 1,900 metres, Nuwara Eliya is Sri Lanka's highest town — \"Little England\" to the British planters who built its red-roofed bungalows, and still the heart of high-grown Ceylon tea.",
    whyVisit: [
      {
        title: "The finest tea",
        text: "High-grown estates whose light, bright tea is some of the most prized in the world.",
      },
      {
        title: "Horton Plains",
        text: "A high plateau of grassland and cloud forest that ends at the sheer drop of World's End.",
      },
      {
        title: "Cool, clear air",
        text: "Spring-like days, open fires at night and a town made for slow walks.",
      },
    ],
    bestTime: {
      summary:
        "January to April brings the clearest skies. April is festive and busy; June, July, October and November are the wettest months.",
      months: months("B B B B G O O G G O O G"),
    },
    agro: [
      {
        title: "Leaf to Cup Tea Estate Day",
        text: "Pluck with the estate's own team, follow the leaf through withering and rolling, and taste the result.",
        experienceSlug: "leaf-to-cup-tea-estate-day",
      },
      {
        title: "Hill-country market gardens",
        text: "Visit the terraced vegetable and strawberry farms that supply half the island's kitchens.",
      },
    ],
    wellness: [
      {
        title: "Forest bathing in the cloud forest",
        text: "A slow, guided walk through mossy montane forest, attention on breath and senses.",
      },
      {
        title: "Herbal bath after the cold",
        text: "A warm herbal soak and oil massage to close a cool day in the hills.",
      },
    ],
    highlights: [
      {
        kind: "nature",
        title: "Horton Plains & World's End",
        text: "A morning walk to an 880-metre escarpment and the veil of Baker's Falls.",
      },
      {
        kind: "nature",
        title: "Hakgala Botanical Garden",
        text: "Roses, tree ferns and montane forest on the slopes below Hakgala Rock.",
      },
      {
        kind: "culture",
        title: "Colonial town walk",
        text: "The red-brick post office, Gregory Lake and planters' clubs from the 1800s.",
      },
      {
        kind: "culture",
        title: "Seetha Amman Temple",
        text: "A Hindu temple tied by legend to the Ramayana, beside a mountain stream.",
      },
    ],
    stays: [
      {
        style: "Restored planter's bungalow",
        text: "Fireplaces, butlers and afternoon tea on a working estate.",
        priceBand: 3,
      },
      {
        style: "Heritage hotel in town",
        text: "Colonial-era rooms within walking distance of the lake.",
        priceBand: 2,
      },
      {
        style: "Hillside cottage",
        text: "A simple, cosy cottage among the vegetable terraces.",
        priceBand: 1,
      },
    ],
    relatedJourneys: ["tea-country-trails", "grow-and-heal-sri-lanka", "complete-sri-lanka"],
    tips: [
      "Nights can fall to 10°C — bring a fleece and closed shoes.",
      "Reach Horton Plains by 6.30 am; World's End often clouds over by ten.",
      "Plastic bags are not allowed into Horton Plains, and bags are checked at the gate.",
      "Book well ahead for April, when the town fills for the New Year season.",
    ],
    seo: {
      title: "Nuwara Eliya Travel Guide — Tea Estates, Horton Plains & Where to Stay",
      description:
        "A guide to Nuwara Eliya: tea estate experiences, Horton Plains, wellness in the hills, planter's bungalows and the best months to visit.",
    },
  },
  {
    slug: "yala",
    name: "Yala National Park",
    region: "Southern Province",
    area: "wild",
    category: "wildlife",
    tagline: "Among the highest leopard densities on earth",
    image: PHOTO.leopard,
    coordinates: { lat: 6.372, lng: 81.517 },
    sights: [
      "Yala Block I Safari",
      "Yala Coastal Lagoons",
      "Sithulpawwa Rock Temple",
      "Bundala National Park",
      "Kataragama Sacred City",
      "Tissa Wewa",
      "Kirinda Rock Temple",
    ],
    facts: [
      { icon: "area", value: "979 km²", label: "Park area" },
      { icon: "wildlife", value: "200+", label: "Bird species" },
    ],
    intro:
      "Yala's scrub, lagoons and granite outcrops along the south-east coast hold one of the highest densities of leopards in the world — along with elephants, sloth bears, crocodiles and more than 200 kinds of bird.",
    whyVisit: [
      {
        title: "Leopards",
        text: "Few places on earth give you a better chance of seeing one in the wild.",
      },
      {
        title: "Lagoons full of birds",
        text: "Painted storks, flamingos in season and waterbirds on every tank.",
      },
      {
        title: "Ancient ground",
        text: "Hermitage caves and the rock monastery of Sithulpawwa sit inside the wild.",
      },
    ],
    bestTime: {
      summary:
        "February to July is driest, with animals gathered at the waterholes. The main block usually closes from September to mid-October.",
      months: months("G B B B B B B G O O G G"),
    },
    agro: [
      {
        title: "Buffalo curd and treacle",
        text: "Meet a Tissamaharama family who make clay-pot curd, served with kithul palm treacle they tap themselves.",
      },
      {
        title: "Paddy and lotus-lake village",
        text: "A morning with farmers on the ancient tank lakes that have watered these fields for two thousand years.",
      },
    ],
    wellness: [
      {
        title: "Sunset by Tissa Wewa",
        text: "A quiet evening sitting by the old reservoir as the egrets come in to roost.",
      },
      {
        title: "Bush camp, no screens",
        text: "Lantern-lit nights at the park edge — the simplest digital detox there is.",
      },
    ],
    highlights: [
      {
        kind: "nature",
        title: "Yala Leopard Safari",
        text: "Dawn and dusk game drives with a naturalist who knows the territories.",
      },
      {
        kind: "nature",
        title: "Bundala wetlands",
        text: "A protected wetland of lagoons and salt pans, among the island's best for birds.",
      },
      {
        kind: "culture",
        title: "Sithulpawwa Rock Temple",
        text: "A monastery on a granite rock that has housed monks for over two millennia.",
      },
      {
        kind: "culture",
        title: "Kataragama",
        text: "A sacred town honoured by Buddhists, Hindus and Muslims alike; join the evening puja.",
      },
    ],
    stays: [
      {
        style: "Tented safari camp",
        text: "Canvas suites at the park edge, with nightjars and the odd elephant for company.",
        priceBand: 3,
      },
      {
        style: "Lakeside eco-lodge",
        text: "A calm base on the Tissa lakes, close to the park gate.",
        priceBand: 2,
      },
      {
        style: "Village guesthouse",
        text: "Simple rooms with a family who also run the safari jeeps.",
        priceBand: 1,
      },
    ],
    relatedJourneys: ["wild-sri-lanka", "complete-sri-lanka"],
    tips: [
      "Morning drives leave around 5.30 am — the first hours are the best.",
      "Wear muted colours and bring a hat; jeeps are open-topped.",
      "Leopards are never guaranteed; quieter blocks often mean better sightings.",
      "We use drivers who keep their distance and switch off for animals.",
    ],
    seo: {
      title: "Yala National Park Guide — Leopard Safaris, Best Season & Stays",
      description:
        "Plan a Yala safari in Sri Lanka: leopards and birdlife, when the park closes, village experiences nearby and where to stay.",
    },
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    region: "South Coast",
    area: "coast",
    category: "coast",
    tagline: "Palm-topped headlands and whale-watching mornings",
    image: PHOTO.palmHeadland,
    coordinates: { lat: 5.946, lng: 80.459 },
    sights: [
      "Coconut Tree Hill",
      "Parrot Rock",
      "Secret Beach",
      "Whale Watching from Mirissa Harbour",
      "Weligama Surf Bay",
      "Stilt Fishermen at Koggala",
      "Dondra Head Lighthouse",
      "Weherahena Temple",
      "Polhena Reef",
    ],
    facts: [
      { icon: "wildlife", value: "Dec–Apr", label: "Whale season" },
      { icon: "distance", value: "2.5 hrs", label: "From Colombo" },
    ],
    intro:
      "Mirissa is a crescent bay of palms and soft sand on the far south coast, known for the blue whales that pass offshore each winter and a headland that turns gold at sunset.",
    whyVisit: [
      {
        title: "Blue whales",
        text: "From December to April, the largest animals on earth feed a few miles off this coast.",
      },
      {
        title: "Coconut Tree Hill",
        text: "The palm-topped headland at the east end of the bay, best at sunrise.",
      },
      {
        title: "Beach days done slowly",
        text: "Calm swimming in season, surf breaks next door at Weligama and seafood on the sand.",
      },
    ],
    bestTime: {
      summary:
        "December to March is calm and sunny, with whales offshore. The south-west monsoon brings rough seas from May to September.",
      months: SOUTH_WEST_COAST,
    },
    agro: [
      {
        title: "Cinnamon estate visit",
        text: "Watch true Ceylon cinnamon peeled and quilled by hand on a family estate inland.",
      },
      {
        title: "Kithul and coconut tappers",
        text: "Meet the tappers who climb palms for sap, and taste fresh treacle and jaggery.",
      },
    ],
    wellness: [
      {
        title: "Sea-view yoga",
        text: "Morning classes on a breezy deck above the bay.",
      },
      {
        title: "Beachside Ayurveda",
        text: "Restorative oil treatments and herbal steam a few steps from the sand.",
      },
    ],
    highlights: [
      {
        kind: "nature",
        title: "Whale watching",
        text: "A morning at sea with an operator who keeps a respectful distance.",
      },
      {
        kind: "nature",
        title: "Secret Beach",
        text: "A small rocky cove over the hill, quiet even in high season.",
      },
      {
        kind: "culture",
        title: "Stilt fishermen",
        text: "Fishermen perched on poles in the surf at Koggala and Ahangama.",
      },
      {
        kind: "culture",
        title: "Dondra Head lighthouse",
        text: "Sri Lanka's tallest lighthouse, on the island's southernmost point.",
      },
    ],
    stays: [
      {
        style: "Beachfront boutique villa",
        text: "A few rooms, a pool and the bay at the bottom of the garden.",
        priceBand: 3,
      },
      {
        style: "Clifftop eco-retreat",
        text: "Cabins in the palms with long views over the ocean.",
        priceBand: 2,
      },
      {
        style: "Surf-and-yoga guesthouse",
        text: "Easy-going, social and close to the breaks.",
        priceBand: 1,
      },
    ],
    relatedJourneys: ["slow-south-coast", "complete-sri-lanka"],
    tips: [
      "Whale boats leave around 6.30 am; take seasickness tablets before you board.",
      "Swim only where the locals do — currents are strong in the monsoon.",
      "Bring cash for small beach restaurants and tuk-tuks.",
      "Ask before photographing the stilt fishermen; most expect a small tip.",
    ],
    seo: {
      title: "Mirissa Travel Guide — Whale Watching, Beaches & Coastal Wellness",
      description:
        "Plan your stay in Mirissa: blue whale season, beaches, cinnamon estates, sea-view yoga, where to stay and when to go.",
    },
  },
  {
    slug: "east-coast",
    name: "East Coast",
    region: "Eastern Province",
    area: "coast",
    category: "coast",
    tagline: "Quiet bays and long sunrises on the eastern shore",
    image: PHOTO.sunsetBeach,
    coordinates: { lat: 7.93, lng: 81.56 },
    sights: [
      "Pigeon Island National Park",
      "Koneswaram Temple",
      "Fort Frederick",
      "Kanniya Hot Wells",
      "Nilaveli and Uppuveli Beaches",
      "Marble Beach",
      "Pasikudah Bay",
      "Batticaloa Fort and Lagoon",
      "Arugam Bay",
      "Kumana National Park",
    ],
    facts: [
      { icon: "nature", value: "3", label: "Beach bases" },
      { icon: "distance", value: "~6 hrs", label: "From Colombo" },
    ],
    intro:
      "The east coast runs from the deep natural harbour at Trincomalee, through the shallow, glassy bay at Pasikudah, down to the surf at Arugam Bay — quiet, sunlit and at its best just when the south-west is wet.",
    whyVisit: [
      {
        title: "The other season",
        text: "Sunny and calm from May to September, when the south and west take the monsoon.",
      },
      {
        title: "Coral and turtles",
        text: "Snorkel the reefs of Pigeon Island among blacktip reef sharks and turtles.",
      },
      {
        title: "Room to breathe",
        text: "Long empty beaches, small fishing towns and few crowds.",
      },
    ],
    bestTime: {
      summary:
        "May to September is the east's dry season. The north-east monsoon brings rain and rough seas from November to January.",
      months: months("O G G G B B B B B G O O"),
    },
    agro: [
      {
        title: "Lagoon and paddy country",
        text: "A morning with Batticaloa farmers and lagoon fishers, ending with a home-cooked lunch.",
      },
      {
        title: "Palmyra crafts and toddy",
        text: "See how the palmyra palm becomes baskets, sugar and sweet sap in an eastern village.",
      },
    ],
    wellness: [
      {
        title: "Sunrise beach yoga",
        text: "The east faces the morning sun — practise as it lifts out of the sea.",
      },
      {
        title: "Kanniya hot wells",
        text: "Seven ancient warm springs near Trincomalee, each a slightly different temperature.",
      },
    ],
    highlights: [
      {
        kind: "nature",
        title: "Pigeon Island National Park",
        text: "Shallow coral gardens a short boat ride off Nilaveli.",
      },
      {
        kind: "nature",
        title: "Kumana National Park",
        text: "Wild, little-visited wetlands south of Arugam Bay, rich in birds.",
      },
      {
        kind: "culture",
        title: "Koneswaram Temple",
        text: "A Hindu temple on Swami Rock, high above the Trincomalee harbour.",
      },
      {
        kind: "culture",
        title: "Batticaloa Fort",
        text: "A small Dutch fort on the lagoon, in a town few travellers reach.",
      },
    ],
    stays: [
      {
        style: "Bay-front resort in Pasikudah",
        text: "Calm, shallow water and a long, gentle beach.",
        priceBand: 3,
      },
      {
        style: "Boutique stay near Trincomalee",
        text: "A small hotel on the Nilaveli or Uppuveli sands.",
        priceBand: 2,
      },
      {
        style: "Surf lodge in Arugam Bay",
        text: "Cabanas, board racks and a relaxed crowd.",
        priceBand: 1,
      },
    ],
    relatedJourneys: [],
    tips: [
      "Pair the east with the hills or the Cultural Triangle in summer, when the south is wet.",
      "Pigeon Island closes in the monsoon; we check boat conditions on the day.",
      "Dress modestly away from the beach — many eastern towns are conservative.",
      "Arugam Bay's surf season runs from about May to October.",
    ],
    seo: {
      title: "Sri Lanka East Coast Guide — Trincomalee, Pasikudah & Arugam Bay",
      description:
        "Plan a trip to Sri Lanka's east coast: the May–September beach season, snorkelling, temples, village experiences and where to stay.",
    },
  },

  // ── The rest, in no particular order ─────────────────────────────────
  {
    slug: "colombo-negombo",
    name: "Colombo & Negombo",
    region: "Western Province",
    area: "coast",
    category: "city",
    tagline: "Markets, seafront sunsets and an easy first night",
    image: PHOTO.riceAndCurry,
    coordinates: { lat: 7.07, lng: 79.86 },
    sights: [
      "Gangaramaya Temple",
      "Seema Malaka on Beira Lake",
      "Galle Face Green",
      "Pettah Market",
      "Old Dutch Hospital",
      "Independence Memorial Hall",
      "National Museum",
      "Muthurajawela Marsh",
      "Negombo Dutch Canal",
      "Negombo Lagoon",
    ],
    facts: [
      { icon: "distance", value: "30 min", label: "Airport–Negombo" },
      { icon: "heritage", value: "Pettah", label: "Bazaar quarter" },
    ],
    intro:
      "Colombo is where most journeys begin and end — a quick, friendly capital of markets, colonial streets and seafront sunsets. Negombo, close to the airport, is a fishing town on a lagoon and the easiest first or last night on the island.",
    whyVisit: [
      {
        title: "The food",
        text: "Street hoppers, kottu and seafood curries — the island's best eating in one city.",
      },
      {
        title: "A gentle arrival",
        text: "Negombo is about half an hour from the airport, so you rest before the road.",
      },
      {
        title: "Old and new side by side",
        text: "Dutch canals, Buddhist temples and modern galleries within a few streets.",
      },
    ],
    bestTime: {
      summary:
        "December to March is driest. Colombo works all year as a city stop; expect heavy showers from May to June and again in October and November.",
      months: months("B B B G O O G G G O O G"),
    },
    agro: [
      {
        title: "Pettah spice-market trail",
        text: "Follow cinnamon, cardamom and pepper through the wholesale lanes of the old bazaar.",
      },
      {
        title: "Negombo fish market at dawn",
        text: "Watch the night's catch come in and fish dried on the sand, the way it has been for generations.",
      },
    ],
    wellness: [
      {
        title: "Ayurveda after the flight",
        text: "A gentle treatment to ease jet lag before your journey starts.",
      },
      {
        title: "Sunset on Galle Face Green",
        text: "A slow seafront walk among families, kites and street-food carts.",
      },
    ],
    highlights: [
      {
        kind: "culture",
        title: "Gangaramaya Temple",
        text: "A Colombo temple overflowing with gifts from across Asia, by Beira Lake.",
      },
      {
        kind: "culture",
        title: "Negombo's Dutch canal",
        text: "A canal built in the colonial era, still used by fishing boats.",
      },
      {
        kind: "nature",
        title: "Muthurajawela wetland",
        text: "A boat ride through mangroves and marsh, rich in birds, between the two towns.",
      },
      {
        kind: "nature",
        title: "Negombo lagoon",
        text: "Outrigger canoes, mangrove islands and still evening water.",
      },
    ],
    stays: [
      {
        style: "Colonial townhouse hotel",
        text: "Characterful rooms in a restored Colombo mansion.",
        priceBand: 3,
      },
      {
        style: "Lagoon-side hotel",
        text: "Quiet rooms on the Negombo lagoon, close to the airport.",
        priceBand: 2,
      },
      {
        style: "Design guesthouse",
        text: "Small, stylish and well placed for the city's cafés.",
        priceBand: 1,
      },
    ],
    relatedJourneys: ["complete-sri-lanka"],
    tips: [
      "Plan a Negombo night for late arrivals instead of driving inland in the dark.",
      "Tuk-tuks with meters, or ride-hailing apps, keep city fares simple.",
      "Many shops and offices close early on Poya (full moon) days.",
      "Leave a spare half-day in Colombo before a flight home.",
    ],
    seo: {
      title: "Colombo & Negombo Guide — Markets, Food & Your First Night in Sri Lanka",
      description:
        "Colombo and Negombo travel guide: food and spice markets, lagoon life, Ayurveda after the flight, where to stay and the best season.",
    },
  },
  {
    slug: "cultural-triangle",
    name: "Cultural Triangle",
    region: "North Central & Central",
    area: "ancient",
    category: "heritage",
    tagline: "Royal cities, cave temples and farming villages",
    image: PHOTO.seedlings,
    coordinates: { lat: 7.86, lng: 80.55 },
    sights: [
      "Sigiriya Rock Fortress",
      "Dambulla Cave Temple",
      "Polonnaruwa Ancient City",
      "Anuradhapura Sacred City",
      "Minneriya National Park",
      "Kaudulla National Park",
      "Hurulu Eco Park",
      "Aukana Buddha",
      "Ritigala Forest Monastery",
      "Nalanda Gedige",
    ],
    facts: [
      { icon: "heritage", value: "5", label: "UNESCO sites" },
      { icon: "history", value: "2,000 yrs", label: "Village farming" },
    ],
    intro:
      "Between Kandy, Anuradhapura and Polonnaruwa lies the Cultural Triangle — the island's dry-zone heartland, with five UNESCO World Heritage Sites and the farming villages that have fed its kingdoms for two thousand years.",
    whyVisit: [
      {
        title: "Heritage at its densest",
        text: "Sigiriya, Dambulla and two ancient capitals, each within a couple of hours of the next.",
      },
      {
        title: "Our home ground for agro",
        text: "Family farms, paddy fields and spice gardens are where our agro journeys begin.",
      },
      {
        title: "Elephant country",
        text: "Minneriya, Kaudulla and Hurulu Eco Park bring elephants within easy reach.",
      },
    ],
    bestTime: {
      summary:
        "Driest from February to September. The north-east monsoon brings rain from October to December, though mornings are often clear.",
      months: months("G B B B G B B B G O O G"),
    },
    agro: [
      {
        title: "Seed-to-Plate Farm Experience",
        text: "A full day on an organic family farm — plant, harvest and cook what you picked.",
        experienceSlug: "seed-to-plate-farm-experience",
      },
      {
        title: "Paddy planting with a farming family",
        text: "Wade into the fields in season and learn how rice is grown here by hand.",
      },
    ],
    wellness: [
      {
        title: "Ayurveda by the tank",
        text: "Herbal treatments at a retreat beside an ancient reservoir.",
      },
      {
        title: "Meditation with a monk",
        text: "A short teaching and sitting at a forest monastery, arranged with respect.",
      },
    ],
    highlights: [
      {
        kind: "culture",
        title: "Ancient Cities with a Local Historian",
        text: "Sigiriya and Dambulla explained by someone who grew up among them.",
      },
      {
        kind: "culture",
        title: "Aukana Buddha",
        text: "A 12-metre standing Buddha cut from a single rock face.",
      },
      {
        kind: "nature",
        title: "Minneriya National Park",
        text: "Home of the late-summer elephant gathering on the reservoir.",
      },
      {
        kind: "nature",
        title: "Ritigala forest monastery",
        text: "Ruined meditation platforms in strict-nature forest on a lonely mountain.",
      },
    ],
    stays: [
      {
        style: "Working farm stay",
        text: "Sleep on the farm, eat from its fields and wake with the family.",
        priceBand: 1,
      },
      {
        style: "Eco-lodge by a reservoir",
        text: "Thatched villas on the water, ideal between site visits.",
        priceBand: 2,
      },
      {
        style: "Luxury jungle resort",
        text: "Spacious villas and a spa in the forest near Habarana.",
        priceBand: 3,
      },
    ],
    relatedJourneys: ["grow-and-heal-sri-lanka", "roots-of-sri-lanka", "complete-sri-lanka"],
    tips: [
      "A base near Habarana or Sigiriya keeps all the sites within an hour or two.",
      "Shoes come off at temples — bring socks for hot stone in the afternoon.",
      "Visit ancient sites early and late; rest in the middle of the day.",
      "Paddy planting depends on the season — we tell you what will be happening in the fields.",
    ],
    seo: {
      title: "Cultural Triangle Sri Lanka — Ancient Cities, Farm Stays & Best Time",
      description:
        "Explore Sri Lanka's Cultural Triangle: Sigiriya, Dambulla and the ancient capitals, family farm stays, wellness, elephants and when to go.",
    },
  },
  {
    slug: "anuradhapura",
    name: "Anuradhapura",
    region: "North Central Province",
    area: "ancient",
    category: "heritage",
    tagline: "The first great capital, among stupas and tank lakes",
    image: PHOTO.farmland,
    coordinates: { lat: 8.311, lng: 80.403 },
    sights: [
      "Sri Maha Bodhi",
      "Ruwanwelisaya",
      "Jetavanaramaya",
      "Abhayagiri Dagoba",
      "Thuparamaya",
      "Isurumuniya Rock Temple",
      "Twin Ponds (Kuttam Pokuna)",
      "Samadhi Buddha Statue",
      "Mihintale",
      "Tissa Wewa",
    ],
    facts: [
      { icon: "history", value: "2,300 yrs", label: "Bodhi tree" },
      { icon: "heritage", value: "1,400 yrs", label: "As a capital" },
    ],
    intro:
      "Anuradhapura was Sri Lanka's capital for well over a thousand years, and it is still one of Buddhism's most sacred cities. Its ruins are among the greatest in South Asia — vast stupas, carved moonstones and reservoirs still watering the fields today.",
    whyVisit: [
      {
        title: "A living sacred city",
        text: "Pilgrims still dress in white to visit the Sri Maha Bodhi, the oldest documented planted tree in the world.",
      },
      {
        title: "The sacred city by bicycle",
        text: "Pedal flat, shaded lanes between great stupas, monastery ruins and bathing ponds.",
      },
      {
        title: "Ancient engineering",
        text: "Tank lakes like Tissa Wewa and Nuwara Wewa still irrigate the paddy around them.",
      },
    ],
    bestTime: {
      summary:
        "Dry and hot from May to September; February to April is pleasant too. October to December is wettest.",
      months: months("G B B G B B B B G O O G"),
    },
    agro: [
      {
        title: "Tank-village farming",
        text: "Spend a morning in a village where fields, forest and reservoir work as one system, as they have for centuries.",
      },
      {
        title: "Curd and honey with a farming family",
        text: "Taste buffalo curd and wild forest honey at a small family farm outside the city.",
      },
    ],
    wellness: [
      {
        title: "Evening at the Sri Maha Bodhi",
        text: "Join white-clad pilgrims for the quiet of the evening offering.",
      },
      {
        title: "Ayurveda by the lake",
        text: "A herbal oil massage at a retreat beside an ancient reservoir.",
      },
    ],
    highlights: [
      {
        kind: "culture",
        title: "Ruwanwelisaya stupa",
        text: "A great white dome ringed by a wall of carved elephants.",
      },
      {
        kind: "culture",
        title: "Jetavanaramaya",
        text: "A colossal brick stupa, once among the tallest structures in the ancient world.",
      },
      {
        kind: "culture",
        title: "Mihintale",
        text: "The hill where Buddhism is said to have come to Sri Lanka, reached by stone stairs.",
      },
      {
        kind: "nature",
        title: "Tissa Wewa",
        text: "An ancient reservoir beside the sacred city, beautiful at sunset.",
      },
    ],
    stays: [
      {
        style: "Lakeside heritage hotel",
        text: "Calm rooms on the shore of an ancient tank.",
        priceBand: 2,
      },
      {
        style: "Village homestay",
        text: "A family home on the edge of the paddy.",
        priceBand: 1,
      },
      {
        style: "Boutique villa in the countryside",
        text: "A pool, a garden and quiet nights just outside the sacred city.",
        priceBand: 3,
      },
    ],
    relatedJourneys: ["complete-sri-lanka"],
    tips: [
      "Hire bicycles — the sacred city is flat and widely spread out.",
      "Wear white or light clothing that covers shoulders and knees at sacred sites.",
      "Never pose with your back to a Buddha statue for a photo.",
      "Buy the site ticket early; it covers the main ruins and the museum.",
    ],
    seo: {
      title: "Anuradhapura Travel Guide — Sri Lanka's Ancient Sacred City",
      description:
        "A guide to Anuradhapura: the Sri Maha Bodhi, great stupas, tank-village farming, wellness, where to stay and the best months to visit.",
    },
  },
  {
    slug: "kandy",
    name: "Kandy",
    region: "Central Province",
    area: "highlands",
    category: "heritage",
    tagline: "The last royal capital, around a lake in the hills",
    image: PHOTO.forest,
    coordinates: { lat: 7.291, lng: 80.635 },
    sights: [
      "Temple of the Sacred Tooth Relic",
      "Kandy Lake",
      "Royal Botanic Gardens, Peradeniya",
      "Udawattakele Forest Reserve",
      "Bahirawakanda Buddha Statue",
      "Kandyan Dance Performance",
      "Kandy Central Market",
      "Embekke Devalaya",
      "Lankatilaka Temple",
      "Matale Spice Gardens",
    ],
    facts: [
      { icon: "altitude", value: "500 m", label: "Altitude" },
      { icon: "history", value: "1592", label: "Royal capital" },
    ],
    intro:
      "Kandy, the last capital of the Sinhalese kings, sits around a lake in a bowl of forested hills. It is home to the Temple of the Sacred Tooth Relic and the gateway to the hill country.",
    whyVisit: [
      {
        title: "The Temple of the Tooth",
        text: "Sri Lanka's most revered shrine, alive with drums and offerings at puja time.",
      },
      {
        title: "Ayurveda heartland",
        text: "Some of the island's best-known Ayurveda physicians and retreats are in these hills.",
      },
      {
        title: "Gardens and forest",
        text: "The Royal Botanic Gardens at Peradeniya and forest reserves right above town.",
      },
    ],
    bestTime: {
      summary:
        "January to April is driest. Kandy is pleasant most of the year; October and November bring the heaviest rain. The Esala Perahera falls in July or August.",
      months: months("B B B G G G G G G O O G"),
    },
    agro: [
      {
        title: "Spice garden at Matale",
        text: "Walk among nutmeg, clove and vanilla vines with a grower north of Kandy.",
      },
      {
        title: "Market-to-Table Cooking Class",
        text: "Shop Kandy market with a local cook, then make a full rice and curry.",
        experienceSlug: "market-to-table-cooking-class",
      },
    ],
    wellness: [
      {
        title: "Ayurveda Healing Day",
        text: "Consultation with a physician, then treatments and a meal chosen for you.",
        experienceSlug: "ayurveda-healing-day",
      },
      {
        title: "Forest walk in Udawattakele",
        text: "A quiet, shaded loop through the old royal forest above the lake.",
      },
    ],
    highlights: [
      {
        kind: "culture",
        title: "Temple of the Sacred Tooth Relic",
        text: "Visit for the evening puja, when drummers fill the halls.",
      },
      {
        kind: "culture",
        title: "Kandyan dance",
        text: "Whirling dancers and fire-walkers at a traditional evening performance.",
      },
      {
        kind: "nature",
        title: "Royal Botanic Gardens, Peradeniya",
        text: "Avenues of palms, giant bamboo and a famous orchid house.",
      },
      {
        kind: "nature",
        title: "Kandy Lake",
        text: "An easy walk around the water at dusk.",
      },
    ],
    stays: [
      {
        style: "Ayurveda retreat in the hills",
        text: "A small retreat with a resident physician and treatment rooms.",
        priceBand: 2,
      },
      {
        style: "Hilltop boutique hotel",
        text: "Valley views a short drive from the lake.",
        priceBand: 3,
      },
      {
        style: "Colonial bungalow guesthouse",
        text: "A family-run bungalow with a garden and home cooking.",
        priceBand: 1,
      },
    ],
    relatedJourneys: ["wellness-reset", "grow-and-heal-sri-lanka", "roots-of-sri-lanka"],
    tips: [
      "Visit the Temple of the Tooth for the evening puja, and dress in white or light colours.",
      "Town traffic is slow at rush hour — stay just outside for calm evenings.",
      "Book well ahead if you are travelling during the Esala Perahera.",
      "The train to the hills leaves from Kandy or nearby Peradeniya.",
    ],
    seo: {
      title: "Kandy Travel Guide — Temple of the Tooth, Ayurveda & Spice Gardens",
      description:
        "Plan a stay in Kandy, Sri Lanka: the Temple of the Tooth, Ayurveda retreats, spice gardens, cooking classes, where to stay and when to go.",
    },
  },
  {
    slug: "knuckles",
    name: "Knuckles",
    region: "Central Province",
    area: "highlands",
    category: "hills",
    tagline: "Cloud forest, ridge trails and remote villages",
    image: PHOTO.cloudPeaks,
    coordinates: { lat: 7.45, lng: 80.8 },
    sights: [
      "Pitawala Pathana (Mini World's End)",
      "Corbet's Gap",
      "Meemure Village",
      "Bambarakiri Ella",
      "Sera Ella",
      "Riverston",
      "Nitro Cave",
      "Knuckles Peak Trail",
    ],
    facts: [
      { icon: "altitude", value: "1,906 m", label: "Highest peak" },
      { icon: "heritage", value: "UNESCO", label: "World Heritage" },
    ],
    intro:
      "The Knuckles Mountain Range, part of a UNESCO World Heritage Site, is a wild, folded massif north-east of Kandy — cloud forest, grassland and waterfalls, with small villages reachable only on foot.",
    whyVisit: [
      {
        title: "Real trekking",
        text: "Ridge walks and village trails for every level, far from the busier hills.",
      },
      {
        title: "Untouched villages",
        text: "Meet families in remote valleys such as Meemure, where life follows the season.",
      },
      {
        title: "Biodiversity",
        text: "Many plants, frogs and lizards here are found nowhere else on earth.",
      },
    ],
    bestTime: {
      summary:
        "Best from January to April, when trails are dry and views open. The north-east monsoon makes paths slippery from October to December.",
      months: months("B B B G G G G G G O O O"),
    },
    agro: [
      {
        title: "Mountain village farming",
        text: "Join a Knuckles family in their terraced paddy and cardamom plots.",
      },
      {
        title: "Kithul treacle making",
        text: "See sap tapped from the kithul palm and slowly boiled into treacle over wood fire.",
      },
    ],
    wellness: [
      {
        title: "Forest bathing in the cloud forest",
        text: "Slow, mindful walking under moss-hung trees.",
      },
      {
        title: "River bathing and rest",
        text: "Cool natural pools and long, unplugged afternoons at a mountain lodge.",
      },
    ],
    highlights: [
      {
        kind: "nature",
        title: "Pitawala Pathana",
        text: "A windswept grassland plateau with a sheer drop known as Mini World's End.",
      },
      {
        kind: "nature",
        title: "Bambarakiri Ella",
        text: "A waterfall with a hanging footbridge in the lower valleys.",
      },
      {
        kind: "culture",
        title: "Meemure village",
        text: "One of the most remote villages in Sri Lanka, at the foot of Lakegala peak.",
      },
      {
        kind: "nature",
        title: "Corbet's Gap",
        text: "A mountain pass with long views across the whole range.",
      },
    ],
    stays: [
      {
        style: "Mountain eco-lodge",
        text: "Solar power, river views and home-grown food.",
        priceBand: 2,
      },
      {
        style: "Village homestay",
        text: "A simple room with a family in a remote valley.",
        priceBand: 1,
      },
      {
        style: "Estate bungalow on the foothills",
        text: "A comfortable colonial bungalow on the edge of the range.",
        priceBand: 3,
      },
    ],
    relatedJourneys: [],
    tips: [
      "Trekking here needs a licensed local guide — we arrange one for every walk.",
      "Bring leech socks in the wetter months.",
      "Weather turns quickly; carry a rain shell even on clear mornings.",
      "Roads to the villages are rough — expect a slow, bumpy final hour.",
    ],
    seo: {
      title: "Knuckles Mountain Range Guide — Trekking, Villages & Cloud Forest",
      description:
        "Plan a trip to the Knuckles Range in Sri Lanka: treks, remote villages, mountain farming, forest bathing, eco-lodges and the best season.",
    },
  },
  {
    slug: "udawalawe",
    name: "Udawalawe",
    region: "Sabaragamuwa & Uva",
    area: "wild",
    category: "wildlife",
    tagline: "Open grassland and the island's surest elephant herds",
    image: PHOTO.farmland,
    coordinates: { lat: 6.474, lng: 80.888 },
    sights: [
      "Udawalawe Safari",
      "Elephant Transit Home",
      "Udawalawe Reservoir",
      "Sankapala Rajamaha Viharaya",
      "Ratnapura Gem Mines",
    ],
    facts: [
      { icon: "area", value: "308 km²", label: "Park area" },
      { icon: "wildlife", value: "1995", label: "Transit Home" },
    ],
    intro:
      "Udawalawe National Park is open grassland and scrub around a great reservoir, below the southern edge of the hills. It is the most reliable place in Sri Lanka to see wild elephants, often in family herds of dozens.",
    whyVisit: [
      {
        title: "Elephants on almost every drive",
        text: "Hundreds live in the park, often gathered in family herds near the water.",
      },
      {
        title: "The Elephant Transit Home",
        text: "Watch orphaned calves being fed before they are returned to the wild.",
      },
      {
        title: "A good season all year",
        text: "Less affected by the monsoons than most parks — easy to fit into any route.",
      },
    ],
    bestTime: {
      summary:
        "Rewarding all year. December to March is most comfortable; the dry months bring animals close to the reservoir.",
      months: months("B B B G G G G G G G G B"),
    },
    agro: [
      {
        title: "Banana and paddy farmers",
        text: "Visit the irrigated farms that grow on the plains below the reservoir.",
      },
      {
        title: "Village honey and curd",
        text: "Taste wild honey and buffalo curd with a family on the edge of the park.",
      },
    ],
    wellness: [
      {
        title: "Morning birdsong walk",
        text: "A slow guided walk around a quiet tank, listening before looking.",
      },
      {
        title: "Camp-edge evenings",
        text: "No signal, a fire and the sound of elephants moving in the dark.",
      },
    ],
    highlights: [
      {
        kind: "nature",
        title: "Udawalawe safari",
        text: "Herds, water buffalo, crocodiles and birds of prey on open plains.",
      },
      {
        kind: "nature",
        title: "Elephant Transit Home",
        text: "A rehabilitation centre that raises orphaned calves for release.",
      },
      {
        kind: "nature",
        title: "Udawalawe Reservoir",
        text: "A wide, still lake framed by the hills, beautiful at dusk.",
      },
      {
        kind: "culture",
        title: "Village gem pits",
        text: "Traditional gem mining in the Ratnapura countryside, nearby.",
      },
    ],
    stays: [
      {
        style: "Safari tented camp",
        text: "Spacious tents near the park boundary, with a campfire each night.",
        priceBand: 3,
      },
      {
        style: "Riverside eco-lodge",
        text: "Cabins by the water, a short drive from the gate.",
        priceBand: 2,
      },
      {
        style: "Family guesthouse",
        text: "Simple rooms and home-cooked dinners.",
        priceBand: 1,
      },
    ],
    relatedJourneys: ["wild-sri-lanka", "complete-sri-lanka"],
    tips: [
      "The Transit Home feeds calves at set times — we plan your day around them.",
      "Afternoon drives are hot but the light is soft from around 4 pm.",
      "Never feed elephants at the park fence, however hopeful they look.",
      "Udawalawe sits neatly between the hills and the south coast.",
    ],
    seo: {
      title: "Udawalawe National Park Guide — Elephant Safaris & Where to Stay",
      description:
        "Plan a safari at Udawalawe, Sri Lanka's best park for wild elephants: the Transit Home, village farms, stays and the best time to go.",
    },
  },
  {
    slug: "sinharaja",
    name: "Sinharaja",
    region: "Sabaragamuwa Province",
    area: "wild",
    category: "rainforest",
    tagline: "The island's last great lowland rainforest",
    image: PHOTO.forest,
    coordinates: { lat: 6.4, lng: 80.45 },
    sights: [
      "Kudawa Forest Trails",
      "Pitadeniya Entrance Trails",
      "Sinhagala Peak",
      "Moulawella Viewpoint",
      "Duwili Ella",
      "Forest-Edge Tea Villages",
    ],
    facts: [
      { icon: "nature", value: "60%+", label: "Endemic trees" },
      { icon: "heritage", value: "1988", label: "UNESCO listed" },
    ],
    intro:
      "Sinharaja Forest Reserve is Sri Lanka's last large stretch of primary lowland rainforest and a UNESCO World Heritage Site — a dense, dripping world where more than half the trees and many of the birds are found nowhere else.",
    whyVisit: [
      {
        title: "A living museum",
        text: "Endemic trees, frogs and butterflies on almost every walk.",
      },
      {
        title: "Mixed bird flocks",
        text: "Feeding flocks of many species move through the canopy together — a famous sight.",
      },
      {
        title: "Tea at the forest edge",
        text: "Small low-grown tea gardens line the villages around the reserve.",
      },
    ],
    bestTime: {
      summary:
        "Driest from January to April and in August and September. This is one of the wettest places on the island, so expect a shower in any month.",
      months: months("B B B G O O O G G O O G"),
    },
    agro: [
      {
        title: "Smallholder tea garden",
        text: "Pick low-grown tea with a family who sell to the local factory.",
      },
      {
        title: "Kithul and spice homestead",
        text: "Treacle, pepper and cinnamon from a forest-edge home garden.",
      },
    ],
    wellness: [
      {
        title: "Rainforest sound bath",
        text: "Sit still by a stream inside the forest and simply listen.",
      },
      {
        title: "Herbal knowledge walk",
        text: "A villager shows the forest plants used in traditional medicine.",
      },
    ],
    highlights: [
      {
        kind: "nature",
        title: "Sinharaja Rainforest Walk",
        text: "A guided walk under the canopy with a village naturalist.",
      },
      {
        kind: "nature",
        title: "Endemic birds",
        text: "Blue magpies, red-faced malkohas and green-billed coucals.",
      },
      {
        kind: "nature",
        title: "Forest streams and waterfalls",
        text: "Clear pools and small falls along the trails.",
      },
      {
        kind: "culture",
        title: "Forest-edge villages",
        text: "Communities who have lived beside — and protected — the reserve for generations.",
      },
    ],
    stays: [
      {
        style: "Rainforest eco-lodge",
        text: "Cabins at the forest edge, built to disturb as little as possible.",
        priceBand: 2,
      },
      {
        style: "Village homestay",
        text: "A family home where meals come from the garden.",
        priceBand: 1,
      },
      {
        style: "Boutique tea-estate retreat",
        text: "Comfort and views on a nearby estate.",
        priceBand: 3,
      },
    ],
    relatedJourneys: ["wild-sri-lanka"],
    tips: [
      "Wear leech socks — they are part of the rainforest experience.",
      "Bring a dry bag for your camera and phone.",
      "Walks start early, when birds are most active.",
      "Entry is with a registered guide only; we use naturalists from the villages.",
    ],
    seo: {
      title: "Sinharaja Rainforest Guide — Walks, Endemic Birds & Eco-Lodges",
      description:
        "Plan a visit to Sinharaja Forest Reserve: rainforest walks, endemic birds, village tea gardens, eco-lodges and the best months to go.",
    },
  },
  {
    slug: "galle",
    name: "Galle",
    region: "Southern Province",
    area: "coast",
    category: "heritage",
    tagline: "A walled fort town above the Indian Ocean",
    image: PHOTO.quietBeach,
    coordinates: { lat: 6.033, lng: 80.217 },
    sights: [
      "Galle Fort Ramparts",
      "Galle Lighthouse",
      "Dutch Reformed Church",
      "Maritime Museum",
      "Flag Rock Bastion",
      "Japanese Peace Pagoda",
      "Jungle Beach",
      "Unawatuna Beach",
      "Koggala Lake",
      "Handunugoda Tea Estate",
    ],
    facts: [
      { icon: "history", value: "17th c.", label: "Dutch ramparts" },
      { icon: "heritage", value: "1988", label: "UNESCO listed" },
    ],
    intro:
      "Galle Fort is a walled town on a headland, built by the Portuguese and rebuilt by the Dutch in the seventeenth century. Inside the ramparts are quiet lanes of villas, churches, cafés and galleries — a UNESCO World Heritage Site that is still a living town.",
    whyVisit: [
      {
        title: "The fort at dusk",
        text: "Walk the ramparts as the sun drops into the ocean beside the lighthouse.",
      },
      {
        title: "A food and craft town",
        text: "Small kitchens, lace-makers and jewellers in centuries-old houses.",
      },
      {
        title: "Beaches on both sides",
        text: "Unawatuna, Jungle Beach and Koggala are all within a short tuk-tuk ride.",
      },
    ],
    bestTime: {
      summary:
        "December to March is dry and calm. The south-west monsoon brings showers from May to September, though the fort is good in any weather.",
      months: SOUTH_WEST_COAST,
    },
    agro: [
      {
        title: "Cinnamon island",
        text: "Take a boat on the Madu Ganga or Koggala Lake to a family that peels cinnamon by hand.",
      },
      {
        title: "South Coast Food Trail",
        text: "Street food, buffalo curd and day-boat fish from Galle to Mirissa.",
        experienceSlug: "south-coast-food-trail",
      },
    ],
    wellness: [
      {
        title: "Ayurveda in a garden villa",
        text: "Traditional treatments in a quiet villa in the hills behind the coast.",
      },
      {
        title: "Rampart yoga at sunrise",
        text: "A small, early session on the fort walls before the town wakes.",
      },
    ],
    highlights: [
      {
        kind: "culture",
        title: "Galle Fort",
        text: "Ramparts, the lighthouse and the old Dutch Reformed Church.",
      },
      {
        kind: "culture",
        title: "Lacemaking and crafts",
        text: "Beeralu lace and handmade jewellery in small family workshops.",
      },
      {
        kind: "nature",
        title: "Jungle Beach",
        text: "A sheltered cove at the foot of Rumassala hill.",
      },
      {
        kind: "nature",
        title: "Koggala Lake",
        text: "Islands, mangroves and herons by boat.",
      },
    ],
    stays: [
      {
        style: "Boutique hotel inside the fort",
        text: "A restored Dutch house steps from the ramparts.",
        priceBand: 3,
      },
      {
        style: "Hillside villa above the coast",
        text: "Rooms in a garden looking over the palms to the sea.",
        priceBand: 2,
      },
      {
        style: "Fort guesthouse",
        text: "A simple room with a family who have lived inside the walls for generations.",
        priceBand: 1,
      },
    ],
    relatedJourneys: ["slow-south-coast", "complete-sri-lanka"],
    tips: [
      "Walk the ramparts at sunset, when the cricket and kite-flyers come out.",
      "Stay inside the fort to enjoy it after the day visitors leave.",
      "Galle is about two hours from Colombo on the expressway.",
      "Cover shoulders and knees inside the churches, mosque and temples.",
    ],
    seo: {
      title: "Galle Travel Guide — Galle Fort, Cinnamon & South Coast Stays",
      description:
        "A guide to Galle, Sri Lanka: the fort, food trails, cinnamon islands, Ayurveda, beaches nearby, where to stay and the best time to visit.",
    },
  },
  {
    slug: "bentota",
    name: "Bentota",
    region: "South-West Coast",
    area: "coast",
    category: "coast",
    tagline: "A river, a lagoon and long golden sands",
    image: PHOTO.rainLeaves,
    coordinates: { lat: 6.425, lng: 79.996 },
    sights: [
      "Lunuganga Estate",
      "Brief Garden",
      "Madu Ganga River Safari",
      "Kosgoda Turtle Hatchery",
      "Bentota Beach",
      "Galapatha Raja Maha Viharaya",
      "Induruwa Beach",
    ],
    facts: [
      { icon: "distance", value: "90 min", label: "From Colombo" },
      { icon: "nature", value: "Lunuganga", label: "Bawa's garden" },
    ],
    intro:
      "Bentota is where a river meets the sea on the south-west coast — wide beaches, a calm lagoon and some of the island's most beautiful gardens, a little over an hour from Colombo.",
    whyVisit: [
      {
        title: "Gardens by Bawa",
        text: "Lunuganga and Brief, the country gardens of Geoffrey Bawa and his brother Bevis.",
      },
      {
        title: "River life",
        text: "Glide up the Bentota Ganga through mangroves and village landings.",
      },
      {
        title: "An easy beach",
        text: "Close to Colombo and the airport — a gentle start or end to a journey.",
      },
    ],
    bestTime: {
      summary:
        "December to March brings calm seas and sunshine. The south-west monsoon arrives in May and lasts to September.",
      months: SOUTH_WEST_COAST,
    },
    agro: [
      {
        title: "Coconut and toddy village",
        text: "Meet tappers who walk ropes between palm tops, and see coir made from husks.",
      },
      {
        title: "Cinnamon on the Madu Ganga",
        text: "A boat to a small island where a family harvests and peels cinnamon.",
      },
    ],
    wellness: [
      {
        title: "Beachfront Ayurveda",
        text: "The coast here has several established Ayurveda resorts for longer programmes.",
      },
      {
        title: "Lagoon kayak at sunrise",
        text: "A quiet paddle on still water before the day begins.",
      },
    ],
    highlights: [
      {
        kind: "culture",
        title: "Lunuganga",
        text: "Geoffrey Bawa's country estate and garden, shaped over fifty years.",
      },
      {
        kind: "culture",
        title: "Kosgoda turtle conservation",
        text: "A hatchery that protects nesting turtles along this beach.",
      },
      {
        kind: "nature",
        title: "Madu Ganga",
        text: "A mangrove estuary of small islands, rich in birds.",
      },
      {
        kind: "nature",
        title: "Bentota beach",
        text: "A long sweep of sand between the river mouth and the sea.",
      },
    ],
    stays: [
      {
        style: "Bawa-designed hotel",
        text: "Tropical-modern architecture that blurs inside and out.",
        priceBand: 3,
      },
      {
        style: "Riverside villa",
        text: "A private villa on the Bentota river with a pool.",
        priceBand: 2,
      },
      {
        style: "Beach guesthouse",
        text: "A family-run house a few steps from the sand.",
        priceBand: 1,
      },
    ],
    relatedJourneys: [],
    tips: [
      "Book a Lunuganga visit or stay in advance — tours run at set times.",
      "Choose turtle hatcheries that release hatchlings promptly; we only visit those.",
      "The sea is rough from May to September — swim in the lagoon then.",
      "Bentota is an easy first stop after landing, without a long drive.",
    ],
    seo: {
      title: "Bentota Travel Guide — Beaches, Bawa Gardens & Ayurveda",
      description:
        "Plan a Bentota stay: beaches, the Madu Ganga, Geoffrey Bawa's Lunuganga, coconut villages, Ayurveda resorts and the best time to go.",
    },
  },
];

export async function getDestinations(): Promise<Destination[]> {
  return DESTINATIONS;
}

export async function getDestinationBySlug(slug: string): Promise<Destination | undefined> {
  return DESTINATIONS.find((destination) => destination.slug === slug);
}
