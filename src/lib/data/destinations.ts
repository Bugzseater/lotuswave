import type { Destination } from "@/types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

/**
 * Mock collection — replaced by Firestore later; the getter below stays put.
 * Order matters on the home page: the first entry takes the large mosaic tile.
 */
const DESTINATIONS: Destination[] = [
  {
    slug: "sigiriya",
    name: "Sigiriya",
    region: "Cultural Triangle",
    category: "heritage",
    tagline: "A fifth-century fortress on a rock above the jungle",
    image: {
      src: unsplash("1588598198321-9735fd52455b"),
      alt: "Sigiriya rock fortress rising above green jungle plains",
    },
  },
  {
    slug: "ella",
    name: "Ella",
    region: "Uva Province",
    category: "hills",
    tagline: "Nine Arches, misty ridges and the slow blue train",
    image: {
      src: unsplash("1566296314736-6eaac1ca0cb9"),
      alt: "A blue train crossing the stone Nine Arches Bridge through dense forest",
    },
  },
  {
    slug: "nuwara-eliya",
    name: "Nuwara Eliya",
    region: "Central Highlands",
    category: "tea",
    tagline: "Rolling tea estates in the cool hill country",
    image: {
      src: unsplash("1544015759-237f87d55ef3"),
      alt: "Terraced green tea plantations curving over the hills",
    },
  },
  {
    slug: "yala",
    name: "Yala National Park",
    region: "Southern Province",
    category: "wildlife",
    tagline: "Among the highest leopard densities on earth",
    image: {
      src: unsplash("1456926631375-92c8ce872def"),
      alt: "A leopard resting on a fallen tree trunk",
    },
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    region: "South Coast",
    category: "coast",
    tagline: "Palm-topped headlands and whale-watching mornings",
    image: {
      src: unsplash("1580910527739-556eb89f9d65"),
      alt: "Coconut palms on a red-earth headland above a turquoise sea",
    },
  },
  {
    slug: "trincomalee",
    name: "Trincomalee",
    region: "East Coast",
    category: "coast",
    tagline: "Quiet bays and long sunsets on the eastern shore",
    image: {
      src: unsplash("1559494007-9f5847c49d94"),
      alt: "The sun setting over a calm beach under a purple sky",
    },
  },
];

export async function getDestinations(): Promise<Destination[]> {
  return DESTINATIONS;
}
