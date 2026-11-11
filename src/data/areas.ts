/**
 * Extended service area — towns within ~60 miles of Springfield, MO.
 *
 * Each town gets a page at /junk-removal-<slug>-mo/, generated in cities.ts
 * from: its region's content (below), verifiable town facts, and distance /
 * direction computed from coordinates. Keep facts conservative and verified —
 * see docs/LAUNCH-CHECKLIST.md. Coordinates are approximate town centers.
 */

export type RegionKey = 'core' | 'lakes' | 'christian' | 'north' | 'west' | 'east';

export interface TownSeed {
  slug: string;
  name: string;
  county: string;
  zips: string[];
  lat: number;
  lon: number;
  region: Exclude<RegionKey, 'core'>;
  /** Town description (2–3 sentences): location, character, what it means for junk removal. Verify before launch. */
  about: string;
  /** Short unique phrase used in the meta description. */
  angle: string;
}

/** Coordinates for the 8 hand-written core towns (content lives in cities.ts). */
export const coreCoords: Record<string, [number, number]> = {
  springfield: [37.209, -93.292],
  nixa: [37.043, -93.294],
  ozark: [37.021, -93.206],
  republic: [37.12, -93.48],
  battlefield: [37.116, -93.37],
  willard: [37.305, -93.428],
  rogersville: [37.117, -93.056],
  strafford: [37.268, -93.117],
};

export const SPRINGFIELD: [number, number] = coreCoords.springfield;

export const towns: TownSeed[] = [
  // ── Branson & the lakes ────────────────────────────────────────────────
  { slug: 'branson', name: 'Branson', county: 'Taney County', zips: ['65616'], lat: 36.644, lon: -93.218, region: 'lakes',
    angle: 'homes, condos, nightly rentals and hospitality businesses',
    about: "Branson is the entertainment and tourism center of the Ozarks, set on Lake Taneycomo along US-65 and MO-76. Behind the theaters and attractions is a working town of full-time residents, condo complexes, nightly rentals and hospitality businesses — properties that go through furniture, mattresses and appliances faster than most. Owners and managers call us for replacements, turnovers and full cleanouts." },
  { slug: 'hollister', name: 'Hollister', county: 'Taney County', zips: ['65672'], lat: 36.621, lon: -93.215, region: 'lakes',
    angle: 'homes and rentals just across Lake Taneycomo from Branson',
    about: "Hollister sits just across Lake Taneycomo from downtown Branson, along US-65. Its Tudor-style Downing Street is a local landmark, and the neighborhoods around it mix older homes, newer subdivisions and rentals serving the Branson area. We handle everything from a single couch to a full move-out." },
  { slug: 'kimberling-city', name: 'Kimberling City', county: 'Stone County', zips: ['65686'], lat: 36.634, lon: -93.417, region: 'lakes',
    angle: 'lake homes, condos and cabins on Table Rock Lake',
    about: "Kimberling City sits on the shores of Table Rock Lake along MO-13, reached from the north by the Kimberling Bridge. Lake homes, condos and retirement properties make up much of the town — and many come with steep drives and stairs, which is exactly the heavy lifting our crew is there for." },
  { slug: 'forsyth', name: 'Forsyth', county: 'Taney County', zips: ['65653'], lat: 36.685, lon: -93.12, region: 'lakes',
    angle: 'in-town homes, lake properties and rural acreage',
    about: "Forsyth is the Taney County seat, east of Branson on US-160 near the upper end of Bull Shoals Lake. It's a mix of in-town homes, lake properties and rural acreage — we help with household cleanouts, estate cleanouts and shed or garage clear-outs." },

  // ── Christian County ───────────────────────────────────────────────────
  { slug: 'sparta', name: 'Sparta', county: 'Christian County', zips: ['65753'], lat: 37.001, lon: -93.081, region: 'christian',
    angle: 'rural homes, acreage and a growing commuter town',
    about: "Sparta is a small Christian County city east of Ozark, surrounded by farmland and rural acreage. It has grown as a quieter home base for people who work in Springfield and Ozark, so we see everything from new-home move-in leftovers to old barns that finally need clearing." },
  { slug: 'clever', name: 'Clever', county: 'Christian County', zips: ['65631'], lat: 37.03, lon: -93.473, region: 'christian',
    angle: 'new subdivisions alongside older homes and farms',
    about: "Clever is a small, growing Christian County city southwest of Springfield, between Republic and Billings. New subdivisions have joined the older homes and farms around town, which means plenty of garage cleanouts, furniture swaps and leftover building materials to haul." },

  // ── North of Springfield ───────────────────────────────────────────────
  { slug: 'fair-grove', name: 'Fair Grove', county: 'Greene County', zips: ['65648'], lat: 37.384, lon: -93.151, region: 'north',
    angle: 'homes with acreage and outbuildings northeast of Springfield',
    about: "Fair Grove is a small Greene County city northeast of Springfield, known for the historic Wommack Mill and its annual heritage reunion. Homes in and around town often come with acreage, shops and outbuildings — great for hobbies, and great at collecting junk." },
  { slug: 'bolivar', name: 'Bolivar', county: 'Polk County', zips: ['65613'], lat: 37.614, lon: -93.41, region: 'north',
    angle: 'homes, student rentals and businesses around the square',
    about: "Bolivar is the Polk County seat, north of Springfield on US-13, with a historic downtown square, Southwest Baptist University and Citizens Memorial Hospital. Rentals turn over with the school year, so landlords use us for tenant leave-behinds — alongside the usual household and estate cleanouts." },
  { slug: 'buffalo', name: 'Buffalo', county: 'Dallas County', zips: ['65622'], lat: 37.644, lon: -93.092, region: 'north',
    angle: 'a county-seat town and surrounding farm country on US-65',
    about: "Buffalo is the Dallas County seat, on US-65 north of Springfield, with a courthouse square surrounded by established neighborhoods and farm country. We help with household junk, estate cleanouts and the outbuilding cleanups that come with rural property." },

  { slug: 'ash-grove', name: 'Ash Grove', county: 'Greene County', zips: ['65604'], lat: 37.315, lon: -93.585, region: 'north',
    angle: 'small-town homes and farms in western Greene County',
    about: "Ash Grove is a small city in western Greene County, near the Nathan Boone Homestead State Historic Site. In-town homes, older farmhouses and rural acreage all fall within an easy run for our crew." },

  // ── West of Springfield ────────────────────────────────────────────────
  { slug: 'mount-vernon', name: 'Mount Vernon', county: 'Lawrence County', zips: ['65712'], lat: 37.104, lon: -93.819, region: 'west',
    angle: 'in-town homes, rentals and rural properties on I-44',
    about: "Mount Vernon is the Lawrence County seat, on I-44 west of Springfield, known for its fall Apple Butter Makin' Days on the courthouse square. The town mixes established neighborhoods, rentals and rural properties, and it's an easy interstate run for our trailer." },
  { slug: 'aurora', name: 'Aurora', county: 'Lawrence County', zips: ['65605'], lat: 36.971, lon: -93.718, region: 'west',
    angle: 'an older downtown and established neighborhoods',
    about: "Aurora is one of the larger towns in Lawrence County, southwest of Springfield, with an older downtown and established neighborhoods. Older homes with basements and detached garages make for big cleanouts, and we're glad to take them on." },
  { slug: 'marionville', name: 'Marionville', county: 'Lawrence County', zips: ['65705'], lat: 36.999, lon: -93.638, region: 'west',
    angle: 'the white-squirrel town southwest of Springfield',
    about: "Marionville is a small Lawrence County town southwest of Springfield, famous for its population of white squirrels. It's a close-knit community of older homes and farms, and a short drive for our crew." },
  { slug: 'monett', name: 'Monett', county: 'Barry County', zips: ['65708'], lat: 36.929, lon: -93.928, region: 'west',
    angle: 'homes, rentals and businesses on US-60',
    about: "Monett is the largest city in Barry County, on US-60 southwest of Springfield and stretching into Lawrence County. It has a mix of homes, rental housing and commercial and industrial employers, so we handle residential cleanouts, rental turnovers and business junk removal alike." },
  { slug: 'cassville', name: 'Cassville', county: 'Barry County', zips: ['65625'], lat: 36.677, lon: -93.869, region: 'west',
    angle: 'homes, cabins and lake properties near Roaring River',
    about: "Cassville is the Barry County seat, near Roaring River State Park and the western reaches of Table Rock Lake. Homes in town, rural acreage, cabins and lake properties are all within reach of our crew — just give us a few days' notice for the drive." },

  { slug: 'stockton', name: 'Stockton', county: 'Cedar County', zips: ['65785'], lat: 37.699, lon: -93.796, region: 'west',
    angle: 'lake cabins, seasonal homes and rural properties on Stockton Lake',
    about: "Stockton is the Cedar County seat, on the shores of Stockton Lake — a popular lake for sailing and fishing. Lake cabins, seasonal homes and rural properties are common around town, and many need a reset after years of use." },

  // ── East of Springfield ────────────────────────────────────────────────
  { slug: 'marshfield', name: 'Marshfield', county: 'Webster County', zips: ['65706'], lat: 37.339, lon: -92.907, region: 'east',
    angle: 'a growing commuter town and rural acreage on I-44',
    about: "Marshfield is the Webster County seat, on I-44 northeast of Springfield. It's a growing commuter town with a historic square, newer subdivisions and plenty of rural acreage — we see move-in leftovers, garage cleanouts and farm cleanups in equal measure." },
  { slug: 'seymour', name: 'Seymour', county: 'Webster County', zips: ['65746'], lat: 37.146, lon: -92.769, region: 'east',
    angle: 'farm country on US-60 in eastern Webster County',
    about: "Seymour is in eastern Webster County on US-60, surrounded by farm country and a well-known Amish community. Farmhouses, barns and shops make up a lot of the properties we'd visit here." },
  { slug: 'lebanon', name: 'Lebanon', county: 'Laclede County', zips: ['65536'], lat: 37.681, lon: -92.664, region: 'east',
    angle: 'neighborhoods, rentals and businesses in a regional hub on I-44',
    about: "Lebanon is the Laclede County seat and a regional hub on I-44, northeast of Springfield, with Bennett Spring State Park nearby. Established neighborhoods, rentals, manufacturers and small businesses all keep us busy here — from tenant turnovers to commercial cleanouts." },
  { slug: 'ava', name: 'Ava', county: 'Douglas County', zips: ['65608'], lat: 36.952, lon: -92.66, region: 'east',
    angle: 'homes and acreage surrounded by Mark Twain National Forest',
    about: "Ava is the Douglas County seat, on MO-5 south of US-60 and surrounded by Mark Twain National Forest land. Rural homes, cabins and farm properties are the norm, and we plan trips out here to handle everything in one visit when possible." },
];

/* ── Geometry helpers ────────────────────────────────────────────────────── */

const R_MILES = 3958.8;
const rad = (d: number) => (d * Math.PI) / 180;

export function milesBetween(a: [number, number], b: [number, number]) {
  const dLat = rad(b[0] - a[0]);
  const dLon = rad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R_MILES * Math.asin(Math.sqrt(h));
}

export function compass(from: [number, number], to: [number, number]) {
  const y = Math.sin(rad(to[1] - from[1])) * Math.cos(rad(to[0]));
  const x = Math.cos(rad(from[0])) * Math.sin(rad(to[0])) - Math.sin(rad(from[0])) * Math.cos(rad(to[0])) * Math.cos(rad(to[1] - from[1]));
  const deg = (Math.atan2(y, x) * 180) / Math.PI;
  const dirs = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];
  return dirs[Math.round(((deg + 360) % 360) / 45) % 8];
}
