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
  { slug: 'branson-west', name: 'Branson West', county: 'Stone County', zips: ['65737'], lat: 36.697, lon: -93.371, region: 'lakes',
    angle: 'vacation homes, cabins and rentals near Table Rock Lake',
    about: "Branson West is a small Stone County city on MO-76, between Branson and Table Rock Lake and close to Silver Dollar City. Many properties here are vacation homes, cabins and rentals tied to the lake and tourist traffic, so furniture swaps and turnover cleanouts are common requests." },
  { slug: 'kimberling-city', name: 'Kimberling City', county: 'Stone County', zips: ['65686'], lat: 36.634, lon: -93.417, region: 'lakes',
    angle: 'lake homes, condos and cabins on Table Rock Lake',
    about: "Kimberling City sits on the shores of Table Rock Lake along MO-13, reached from the north by the Kimberling Bridge. Lake homes, condos and retirement properties make up much of the town — and many come with steep drives and stairs, which is exactly the heavy lifting our crew is there for." },
  { slug: 'reeds-spring', name: 'Reeds Spring', county: 'Stone County', zips: ['65737'], lat: 36.748, lon: -93.381, region: 'lakes',
    angle: 'hillside homes and wooded acreage on MO-13',
    about: "Reeds Spring is a hillside town on MO-13, on the route between Springfield and Table Rock Lake. The area mixes older in-town homes with wooded rural acreage, sheds and outbuildings — the kind of property where a garage or barn cleanout can fill a trailer fast." },
  { slug: 'galena', name: 'Galena', county: 'Stone County', zips: ['65656'], lat: 36.805, lon: -93.461, region: 'lakes',
    angle: 'river cabins, rural homes and farm properties',
    about: "Galena is the Stone County seat, a small river town on the James River along MO-13. The James is a popular float stream, and the area around town is mostly rural homes, river cabins and farmland. We haul furniture, appliances and outbuilding junk from in town and the surrounding countryside." },
  { slug: 'forsyth', name: 'Forsyth', county: 'Taney County', zips: ['65653'], lat: 36.685, lon: -93.12, region: 'lakes',
    angle: 'in-town homes, lake properties and rural acreage',
    about: "Forsyth is the Taney County seat, east of Branson on US-160 near the upper end of Bull Shoals Lake. It's a mix of in-town homes, lake properties and rural acreage — we help with household cleanouts, estate cleanouts and shed or garage clear-outs." },
  { slug: 'rockaway-beach', name: 'Rockaway Beach', county: 'Taney County', zips: ['65740'], lat: 36.699, lon: -93.16, region: 'lakes',
    angle: 'lakefront cabins, motels and seasonal homes',
    about: "Rockaway Beach is a small resort town on Lake Taneycomo, northeast of Branson. Its lakefront cabins, small motels and seasonal homes cycle through furniture and furnishings regularly, and owners often need old pieces gone before new ones arrive." },
  { slug: 'merriam-woods', name: 'Merriam Woods', county: 'Taney County', zips: ['65740'], lat: 36.714, lon: -93.169, region: 'lakes',
    angle: 'lake cottages and homes on wooded lots',
    about: "Merriam Woods is a small residential community near Lake Taneycomo, a few miles northeast of Branson. Homes range from lake cottages to newer houses on wooded lots, and many have sheds, carports and crawl spaces that collect years of storage." },

  // ── Christian County ───────────────────────────────────────────────────
  { slug: 'sparta', name: 'Sparta', county: 'Christian County', zips: ['65753'], lat: 37.001, lon: -93.081, region: 'christian',
    angle: 'rural homes, acreage and a growing commuter town',
    about: "Sparta is a small Christian County city east of Ozark, surrounded by farmland and rural acreage. It has grown as a quieter home base for people who work in Springfield and Ozark, so we see everything from new-home move-in leftovers to old barns that finally need clearing." },
  { slug: 'clever', name: 'Clever', county: 'Christian County', zips: ['65631'], lat: 37.03, lon: -93.473, region: 'christian',
    angle: 'new subdivisions alongside older homes and farms',
    about: "Clever is a small, growing Christian County city southwest of Springfield, between Republic and Billings. New subdivisions have joined the older homes and farms around town, which means plenty of garage cleanouts, furniture swaps and leftover building materials to haul." },
  { slug: 'billings', name: 'Billings', county: 'Christian County', zips: ['65610'], lat: 37.067, lon: -93.552, region: 'christian',
    angle: 'farms, pasture and properties with barns and shops',
    about: "Billings is a small Christian County town west of Clever on MO-14, surrounded by farms and pasture. Properties here often include barns, sheds and shops alongside the house — we can clear the whole place in one planned visit." },
  { slug: 'highlandville', name: 'Highlandville', county: 'Christian County', zips: ['65669'], lat: 36.939, lon: -93.28, region: 'christian',
    angle: 'quiet rural acreage south of Nixa',
    about: "Highlandville is a quiet, rural Christian County town south of Nixa, on the way toward the lakes. Most properties are homes on acreage, often with an outbuilding or two that has become long-term storage." },
  { slug: 'fremont-hills', name: 'Fremont Hills', county: 'Christian County', zips: ['65714'], lat: 37.066, lon: -93.272, region: 'christian',
    angle: 'single-family homes on larger lots between Springfield and Nixa',
    about: "Fremont Hills is a small residential city tucked between Springfield and Nixa, made up largely of single-family homes on larger lots. It's a quick trip for our crew, and most jobs here are garage cleanouts, furniture removal and old appliances." },

  // ── North of Springfield ───────────────────────────────────────────────
  { slug: 'fair-grove', name: 'Fair Grove', county: 'Greene County', zips: ['65648'], lat: 37.384, lon: -93.151, region: 'north',
    angle: 'homes with acreage and outbuildings northeast of Springfield',
    about: "Fair Grove is a small Greene County city northeast of Springfield, known for the historic Wommack Mill and its annual heritage reunion. Homes in and around town often come with acreage, shops and outbuildings — great for hobbies, and great at collecting junk." },
  { slug: 'pleasant-hope', name: 'Pleasant Hope', county: 'Polk County', zips: ['65725'], lat: 37.46, lon: -93.27, region: 'north',
    angle: 'rural homes, barns and acreage in southern Polk County',
    about: "Pleasant Hope is a small rural town in southern Polk County, north of Springfield. Many properties have acreage, barns and outbuildings, and we're often asked to clear a house, a shop and a scrap pile all in the same trip." },
  { slug: 'morrisville', name: 'Morrisville', county: 'Polk County', zips: ['65710'], lat: 37.477, lon: -93.427, region: 'north',
    angle: 'farmland and rural homes north of Springfield',
    about: "Morrisville is a small Polk County community surrounded by farmland and rural homes, north of Springfield. Farm cleanouts, old appliances and estate cleanouts are the most common jobs out here." },
  { slug: 'bolivar', name: 'Bolivar', county: 'Polk County', zips: ['65613'], lat: 37.614, lon: -93.41, region: 'north',
    angle: 'homes, student rentals and businesses around the square',
    about: "Bolivar is the Polk County seat, north of Springfield on US-13, with a historic downtown square, Southwest Baptist University and Citizens Memorial Hospital. Rentals turn over with the school year, so landlords use us for tenant leave-behinds — alongside the usual household and estate cleanouts." },
  { slug: 'humansville', name: 'Humansville', county: 'Polk County', zips: ['65674'], lat: 37.794, lon: -93.578, region: 'north',
    angle: 'farms and small-town homes in northern Polk County',
    about: "Humansville is a small farming town in northern Polk County, near the northern edge of our service area. Jobs here tend to be bigger — whole-house, barn and shop cleanouts — so we plan them as a dedicated trip." },
  { slug: 'buffalo', name: 'Buffalo', county: 'Dallas County', zips: ['65622'], lat: 37.644, lon: -93.092, region: 'north',
    angle: 'a county-seat town and surrounding farm country on US-65',
    about: "Buffalo is the Dallas County seat, on US-65 north of Springfield, with a courthouse square surrounded by established neighborhoods and farm country. We help with household junk, estate cleanouts and the outbuilding cleanups that come with rural property." },
  { slug: 'walnut-grove', name: 'Walnut Grove', county: 'Greene County', zips: ['65770'], lat: 37.411, lon: -93.548, region: 'north',
    angle: 'farms and acreage homes in northwest Greene County',
    about: "Walnut Grove is a small town in northwest Greene County, a short drive north of Ash Grove. It's a rural community of farms and acreage homes where barns, sheds and equipment lots tend to be part of every cleanout." },
  { slug: 'ash-grove', name: 'Ash Grove', county: 'Greene County', zips: ['65604'], lat: 37.315, lon: -93.585, region: 'north',
    angle: 'small-town homes and farms in western Greene County',
    about: "Ash Grove is a small city in western Greene County, near the Nathan Boone Homestead State Historic Site. In-town homes, older farmhouses and rural acreage all fall within an easy run for our crew." },

  // ── West of Springfield ────────────────────────────────────────────────
  { slug: 'mount-vernon', name: 'Mount Vernon', county: 'Lawrence County', zips: ['65712'], lat: 37.104, lon: -93.819, region: 'west',
    angle: 'in-town homes, rentals and rural properties on I-44',
    about: "Mount Vernon is the Lawrence County seat, on I-44 west of Springfield, known for its fall Apple Butter Makin' Days on the courthouse square. The town mixes established neighborhoods, rentals and rural properties, and it's an easy interstate run for our trailer." },
  { slug: 'miller', name: 'Miller', county: 'Lawrence County', zips: ['65707'], lat: 37.215, lon: -93.841, region: 'west',
    angle: 'a farming community north of Mount Vernon',
    about: "Miller is a small farming community in northern Lawrence County, north of Mount Vernon. Most jobs here involve rural property — farmhouses, barns, equipment and scrap — and we plan them to finish in as few trips as possible." },
  { slug: 'aurora', name: 'Aurora', county: 'Lawrence County', zips: ['65605'], lat: 36.971, lon: -93.718, region: 'west',
    angle: 'an older downtown and established neighborhoods',
    about: "Aurora is one of the larger towns in Lawrence County, southwest of Springfield, with an older downtown and established neighborhoods. Older homes with basements and detached garages make for big cleanouts, and we're glad to take them on." },
  { slug: 'marionville', name: 'Marionville', county: 'Lawrence County', zips: ['65705'], lat: 36.999, lon: -93.638, region: 'west',
    angle: 'the white-squirrel town southwest of Springfield',
    about: "Marionville is a small Lawrence County town southwest of Springfield, famous for its population of white squirrels. It's a close-knit community of older homes and farms, and a short drive for our crew." },
  { slug: 'monett', name: 'Monett', county: 'Barry County', zips: ['65708'], lat: 36.929, lon: -93.928, region: 'west',
    angle: 'homes, rentals and businesses on US-60',
    about: "Monett is the largest city in Barry County, on US-60 southwest of Springfield and stretching into Lawrence County. It has a mix of homes, rental housing and commercial and industrial employers, so we handle residential cleanouts, rental turnovers and business junk removal alike." },
  { slug: 'pierce-city', name: 'Pierce City', county: 'Lawrence County', zips: ['65723'], lat: 36.946, lon: -94.0, region: 'west',
    angle: 'a historic railroad town west of Monett',
    about: "Pierce City is a historic railroad town in western Lawrence County, just west of Monett. Older homes and outbuildings are common, and we're happy to make the trip for estate cleanouts, garages and bulky items." },
  { slug: 'cassville', name: 'Cassville', county: 'Barry County', zips: ['65625'], lat: 36.677, lon: -93.869, region: 'west',
    angle: 'homes, cabins and lake properties near Roaring River',
    about: "Cassville is the Barry County seat, near Roaring River State Park and the western reaches of Table Rock Lake. Homes in town, rural acreage, cabins and lake properties are all within reach of our crew — just give us a few days' notice for the drive." },
  { slug: 'crane', name: 'Crane', county: 'Stone County', zips: ['65633'], lat: 36.905, lon: -93.571, region: 'west',
    angle: 'farmland and rural homes on MO-413',
    about: "Crane is a small Stone County town on MO-413, southwest of Springfield and surrounded by farmland and rural homes. Barn, shed and garage cleanouts are common here, along with old appliances and furniture." },
  { slug: 'greenfield', name: 'Greenfield', county: 'Dade County', zips: ['65661'], lat: 37.415, lon: -93.841, region: 'west',
    angle: 'a county-seat town surrounded by farmland',
    about: "Greenfield is the Dade County seat, northwest of Springfield — a small courthouse town surrounded by farmland. We help with household junk, estate cleanouts and the farm and outbuilding cleanups that come with rural property." },
  { slug: 'lockwood', name: 'Lockwood', county: 'Dade County', zips: ['65682'], lat: 37.389, lon: -93.954, region: 'west',
    angle: 'a farming community on the western edge of our area',
    about: "Lockwood is a small Dade County farming community west of Greenfield, near the western edge of our service area. Larger jobs — whole houses, barns, equipment and scrap — make the most of the trip out." },
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
  { slug: 'fordland', name: 'Fordland', county: 'Webster County', zips: ['65652'], lat: 37.158, lon: -92.941, region: 'east',
    angle: 'a small town just off US-60 east of Rogersville',
    about: "Fordland is a small Webster County town just off US-60, between Rogersville and Seymour. It's a short run from Springfield for furniture, appliances and garage or outbuilding cleanouts." },
  { slug: 'niangua', name: 'Niangua', county: 'Webster County', zips: ['65713'], lat: 37.389, lon: -92.831, region: 'east',
    angle: 'rural properties near I-44 between Marshfield and Conway',
    about: "Niangua is a small town in northeastern Webster County, near I-44 between Marshfield and Conway. Rural properties with barns, sheds and equipment are typical, and we can clear several buildings in one planned visit." },
  { slug: 'conway', name: 'Conway', county: 'Laclede County', zips: ['65632'], lat: 37.502, lon: -92.821, region: 'east',
    angle: 'a small I-44 town between Marshfield and Lebanon',
    about: "Conway is a small Laclede County town on I-44 between Marshfield and Lebanon. Interstate access makes it an easy trip for our trailer, whether it's a single appliance or a whole-house cleanout." },
  { slug: 'lebanon', name: 'Lebanon', county: 'Laclede County', zips: ['65536'], lat: 37.681, lon: -92.664, region: 'east',
    angle: 'neighborhoods, rentals and businesses in a regional hub on I-44',
    about: "Lebanon is the Laclede County seat and a regional hub on I-44, northeast of Springfield, with Bennett Spring State Park nearby. Established neighborhoods, rentals, manufacturers and small businesses all keep us busy here — from tenant turnovers to commercial cleanouts." },
  { slug: 'mansfield', name: 'Mansfield', county: 'Wright County', zips: ['65704'], lat: 37.107, lon: -92.581, region: 'east',
    angle: 'a historic small town on US-60 in Wright County',
    about: "Mansfield is a small Wright County town on US-60, best known as the home of Laura Ingalls Wilder, who wrote the Little House books at her farm here. Older homes and rural properties make up most of the area, and estate and farm cleanouts are common requests." },
  { slug: 'hartville', name: 'Hartville', county: 'Wright County', zips: ['65667'], lat: 37.251, lon: -92.511, region: 'east',
    angle: 'a rural county-seat town in Wright County',
    about: "Hartville is the Wright County seat, a small rural town north of US-60. Most properties here are homes on acreage with outbuildings, so cleanouts often cover more than just the house." },
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
