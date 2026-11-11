/**
 * City landing pages → /junk-removal-<slug>-mo/
 *
 * Content rules:
 *  - Only general, verifiable geography (county, highways, ZIPs). No invented
 *    local projects, reviews or "we've served X homes in Y" claims.
 *  - `status: 'expand'` marks pages that need more verified local content
 *    (real job photos, local disposal notes, owner insight) before they are
 *    pushed in ads or link-building. They are still useful and indexable.
 *  - Geography facts here should be double-checked by the owner (see docs/LAUNCH-CHECKLIST.md).
 */
import type { FAQ } from './services';
import { towns, coreCoords, SPRINGFIELD, milesBetween, compass, type RegionKey, type TownSeed } from './areas';

export interface City {
  slug: string;
  name: string;
  county: string;
  zips: string[];
  /** Short direction/distance description from Springfield. */
  relation: string;
  status: 'ready' | 'expand';
  primary?: boolean;
  seo: { title: string; description: string };
  h1: string;
  lead: string;
  body: string[];
  /** "Good to know" local notes — practical, not salesy. */
  localNotes: { title: string; text: string }[];
  /** Service slugs most relevant here, in order. */
  featuredServices: string[];
  /** Neighborhoods / areas — Springfield only. */
  areas?: string[];
  faqs: FAQ[];
  nearby: string[];
  /** Filled in automatically below. */
  region?: RegionKey;
  lat?: number;
  lon?: number;
  distance?: number;
  direction?: string;
  /** One-line description for listings. */
  tagline?: string;
}

/** The 8 hand-written core towns. */
const coreCities: City[] = [
  {
    slug: 'springfield',
    name: 'Springfield',
    county: 'Greene County',
    zips: ['65802', '65803', '65804', '65806', '65807', '65809', '65810'],
    relation: 'Home base',
    status: 'ready',
    primary: true,
    seo: {
      title: 'Junk Removal Across Springfield, MO | Ozark Junk Removals',
      description:
        'Local junk removal in every Springfield, MO neighborhood. Furniture, appliances, garage and estate cleanouts and debris — we load it and haul it.',
    },
    h1: 'Junk Removal in Springfield, MO',
    lead: "Springfield is home base. Whether you're in a Rountree bungalow, a Southside subdivision or a rental near campus, our crew comes to you, loads up the junk and hauls it off — so you don't have to rent a trailer or beg a friend with a truck.",
    body: [
      "Springfield has a little bit of everything when it comes to junk: older homes with full basements and attics, fast-turning rentals around the universities, growing subdivisions on the south and west sides, and plenty of small businesses that need a reliable hauler. We built Ozark Junk Removals to handle all of it with one simple process — tell us what needs to go, get a straightforward estimate, and we do the lifting.",
      "Because we're based here, Springfield jobs are the easiest for us to fit into the schedule. Single items, a garage that's gotten out of hand, a full estate, or a contractor's pile of remodel debris are all fair game. We load into a dump trailer or a high-side hauling trailer depending on the material, so heavy debris and bulky furniture both have a place to go.",
      "Landlords and property managers: Springfield's rental market moves fast, especially around semester changes. If you need tenant leave-behinds cleared so a unit can be cleaned and re-rented, we can coordinate access with you.",
    ],
    localNotes: [
      {
        title: 'Household chemicals',
        text: "Paint, solvents and other household chemicals can't go in a junk load. Greene County residents can typically use the City of Springfield's household chemical collection program — check the city's current rules before you go.",
      },
      {
        title: 'Move-out season',
        text: 'Late spring and the start of each semester tend to be busy around the university neighborhoods. If you manage rentals near campus, request your estimate early.',
      },
      {
        title: 'Older homes',
        text: "Many of Springfield's central neighborhoods have basements, narrow stairways and detached garages. Mention stairs or tight access in your request so we plan the right crew.",
      },
    ],
    areas: [
      'Rountree',
      'Phelps Grove',
      'Midtown',
      'Commercial Street',
      'Galloway',
      'Southern Hills',
      'Woodland Heights',
      'Doling Park',
      'Westside',
      'Southeast Springfield',
      'North Springfield',
      'Near Missouri State',
    ],
    featuredServices: [
      'junk-removal',
      'furniture-removal',
      'appliance-removal',
      'estate-property-cleanouts',
      'garage-cleanouts',
      'commercial-junk-removal',
      'construction-debris-removal',
      'hoarder-house-cleanouts',
    ],
    faqs: [
      {
        q: 'Do you cover all of Springfield?',
        a: 'Yes — Springfield is our home base, and every part of the city is inside our normal service area.',
      },
      {
        q: 'Can you clear out a rental between tenants?',
        a: 'Yes. Landlords and property managers can request a tenant-turnover cleanout and coordinate access with us if no one will be on site.',
      },
      {
        q: 'Do you offer same-day junk removal in Springfield?',
        a: 'Sometimes. Same-day or next-day pickup depends on that day\'s schedule and the size of the job. Request a quote and tell us your timing — we\'ll let you know honestly what we can do.',
      },
    ],
    nearby: ['nixa', 'ozark', 'republic', 'battlefield', 'willard', 'strafford'],
  },
  {
    slug: 'nixa',
    name: 'Nixa',
    county: 'Christian County',
    zips: ['65714'],
    relation: 'South of Springfield',
    status: 'ready',
    seo: {
      title: 'Junk Removal Nixa MO | Ozark Junk Removals',
      description:
        'Junk removal in Nixa, MO. Garage cleanouts, furniture and appliance removal, move-out cleanups and yard debris hauling. Free estimates.',
    },
    h1: 'Junk Removal in Nixa, MO',
    lead: "Nixa's neighborhoods are full of busy households — and busy households fill garages fast. We help Nixa homeowners clear out the stuff that's crowding the garage, basement or back yard, without hauling it themselves.",
    body: [
      'A lot of Nixa junk removal calls start with a garage: outgrown kids\' gear, a treadmill nobody uses, boxes that never got unpacked after the last move. We carry it out, load it and haul it away in one visit so you can park inside again.',
      "We also help with moving-day leftovers, furniture swaps, old appliances after a kitchen update and the yard debris that piles up after storm cleanup or a landscaping project. If you're getting a house ready to list, we can clear out what you don't want to move.",
    ],
    localNotes: [
      {
        title: 'Getting ready to move?',
        text: "If you're listing a house in Nixa, clearing junk before photos go up makes rooms look bigger. Book the cleanout before the photographer, not after.",
      },
      {
        title: 'Yard & storm debris',
        text: "Branches, brush and broken fencing load easily into our dump trailer. Let us know if it's bagged, bundled or in a loose pile.",
      },
    ],
    featuredServices: ['garage-cleanouts', 'furniture-removal', 'appliance-removal', 'junk-removal', 'estate-property-cleanouts'],
    faqs: [
      {
        q: 'Is Nixa inside your service area?',
        a: 'Yes. Nixa is one of our regular service areas just south of Springfield.',
      },
      {
        q: 'Can you pick up leftover items after a Nixa garage sale?',
        a: 'Ask about our garage-sale leftover pickup program. Eligibility and scheduling are confirmed for each request.',
      },
    ],
    nearby: ['springfield', 'ozark', 'republic', 'battlefield'],
  },
  {
    slug: 'ozark',
    name: 'Ozark',
    county: 'Christian County',
    zips: ['65721'],
    relation: 'South of Springfield on US-65',
    status: 'ready',
    seo: {
      title: 'Junk Removal Ozark MO | Ozark Junk Removals',
      description:
        'Junk removal in Ozark, MO. Furniture, appliances, garage and shed contents, estate cleanouts and remodel debris across Christian County.',
    },
    h1: 'Junk Removal in Ozark, MO',
    lead: 'Yes, we share a name with the town — and Ozark, Missouri is squarely in our service area. From in-town homes to properties with outbuildings out in Christian County, we load and haul the junk you\'re done with.',
    body: [
      "Ozark homes often come with extra storage: sheds, shops, barns and big garages. That space fills up with years of equipment, furniture and project materials. We'll clear what you want gone, whether it's one shed or the whole property.",
      "As the Christian County seat, Ozark also has its share of estate settlements and property sales. Executors and families who need a house cleared can request an estimate with photos or schedule a walkthrough.",
    ],
    localNotes: [
      {
        title: 'Outbuildings & sheds',
        text: 'Shed and barn contents are a common job here. If a shed itself needs to come down, ask for an assessment — some can be dismantled and hauled.',
      },
      {
        title: 'Rural driveways',
        text: 'If your property has a long gravel drive, a tight turn or a low-hanging tree line, tell us — it helps us decide which trailer to bring.',
      },
    ],
    featuredServices: ['estate-property-cleanouts', 'garage-cleanouts', 'junk-removal', 'construction-debris-removal', 'furniture-removal'],
    faqs: [
      {
        q: 'Do you serve rural properties around Ozark?',
        a: 'Yes, as long as our trailer can safely access the property. Mention long drives, gates or soft ground in your request.',
      },
      {
        q: 'Can you clear out a barn or workshop?',
        a: 'Yes. Equipment, scrap, lumber and stored furniture are all common. Fuel, chemicals and pesticides must be removed separately.',
      },
    ],
    nearby: ['nixa', 'springfield', 'rogersville', 'battlefield'],
  },
  {
    slug: 'republic',
    name: 'Republic',
    county: 'Greene County',
    zips: ['65738'],
    relation: 'Southwest of Springfield on US-60',
    status: 'ready',
    seo: {
      title: 'Junk Removal Republic MO | Ozark Junk Removals',
      description:
        'Junk removal in Republic, MO. Furniture, appliance and mattress pickup, garage cleanouts, move-out cleanups and remodel debris hauling.',
    },
    h1: 'Junk Removal in Republic, MO',
    lead: 'Republic has grown fast, and so have its garages. We help Republic homeowners, landlords and builders get rid of unwanted furniture, appliances and debris — loaded and hauled by our crew.',
    body: [
      'New construction and growing neighborhoods mean lots of moves, furniture swaps and leftover building materials. Whether you just closed on a house and inherited the previous owner\'s junk or you finally finished a basement build-out, we can haul the leftovers.',
      'Landlords with rentals in Republic can also use us for tenant turnovers — we clear out leave-behinds so cleaning and repairs can start.',
    ],
    localNotes: [
      {
        title: 'Just moved in?',
        text: "It's common to find a few items the previous owners left behind. One visit clears them so you can settle in.",
      },
      {
        title: 'Builder & remodel leftovers',
        text: 'Drywall scraps, packaging, lumber and old fixtures load easily into our dump trailer.',
      },
    ],
    featuredServices: ['junk-removal', 'furniture-removal', 'construction-debris-removal', 'garage-cleanouts', 'appliance-removal'],
    faqs: [
      {
        q: 'Do you serve Republic regularly?',
        a: 'Yes. Republic is one of our core service areas southwest of Springfield.',
      },
      {
        q: 'Can you remove junk left by a previous homeowner?',
        a: 'Yes. Send photos of what was left and we will give you an estimate to clear it.',
      },
    ],
    nearby: ['springfield', 'battlefield', 'nixa', 'willard'],
  },
  {
    slug: 'battlefield',
    name: 'Battlefield',
    county: 'Greene County',
    zips: ['65619'],
    relation: 'Just southwest of Springfield',
    status: 'expand',
    seo: {
      title: 'Junk Removal Battlefield MO | Ozark Junk Removals',
      description:
        'Junk removal in Battlefield, MO. Furniture, appliances, garage cleanouts and yard debris hauled away by a local Springfield-area crew.',
    },
    h1: 'Junk Removal in Battlefield, MO',
    lead: "Battlefield sits right next door to Springfield, which makes it an easy stop for our crew. If you've got furniture, appliances or a garage full of stuff that needs to go, we'll load it up and haul it away.",
    body: [
      "Battlefield is mostly residential, so most jobs here are household ones: a garage reset, an old sectional, a fridge that finally quit, or a spare room that became a storage room. Those are exactly the jobs we're built for — quick to quote, quick to load.",
      'Planning a move or a big decluttering weekend? Combine everything into one pickup so you only have to schedule once.',
    ],
    localNotes: [
      {
        title: 'Bundle your pickup',
        text: 'Have a few items in different rooms plus some yard debris? We can take it all in one visit — just list everything in your request.',
      },
    ],
    featuredServices: ['junk-removal', 'garage-cleanouts', 'furniture-removal', 'appliance-removal'],
    faqs: [
      {
        q: 'Is Battlefield in your service area?',
        a: 'Yes. Battlefield borders Springfield and is part of our regular service area.',
      },
    ],
    nearby: ['springfield', 'republic', 'nixa', 'ozark'],
  },
  {
    slug: 'willard',
    name: 'Willard',
    county: 'Greene County',
    zips: ['65781'],
    relation: 'Northwest of Springfield',
    status: 'expand',
    seo: {
      title: 'Junk Removal Willard MO | Ozark Junk Removals',
      description:
        'Junk removal in Willard, MO. Furniture, appliances, shed and garage contents, yard debris and property cleanouts northwest of Springfield.',
    },
    h1: 'Junk Removal in Willard, MO',
    lead: 'From in-town homes to acreage on the edge of Greene County, Willard properties tend to have room to collect things. When it\'s time for that stuff to go, we bring the trailer and the crew.',
    body: [
      'Willard jobs often involve more than one area of the property: the garage, a shed, a carport and a pile behind the barn. We can clear them all in one visit if it fits in the trailer, or plan multiple loads if it doesn\'t.',
      'We also help with standard household removals — furniture, mattresses, appliances and move-out leftovers.',
    ],
    localNotes: [
      {
        title: 'Property with acreage?',
        text: 'Tell us how far items are from the driveway and whether the trailer can pull close. That changes how we plan the job.',
      },
    ],
    featuredServices: ['garage-cleanouts', 'junk-removal', 'estate-property-cleanouts', 'furniture-removal'],
    faqs: [
      {
        q: 'Do you go out to rural properties near Willard?',
        a: 'Yes, as long as the trailer can safely access the property. Let us know about gates, long drives or soft ground.',
      },
    ],
    nearby: ['springfield', 'republic', 'strafford'],
  },
  {
    slug: 'rogersville',
    name: 'Rogersville',
    county: 'Greene & Webster Counties',
    zips: ['65742'],
    relation: 'East of Springfield on US-60',
    status: 'expand',
    seo: {
      title: 'Junk Removal Rogersville MO | Ozark Junk Removals',
      description:
        'Junk removal in Rogersville, MO. Garage and shed cleanouts, furniture and appliance removal and property cleanouts east of Springfield.',
    },
    h1: 'Junk Removal in Rogersville, MO',
    lead: "Rogersville is just east of Springfield along US-60, and it's part of our regular route. Furniture, appliances, garages, sheds — tell us what needs to go and we'll handle the rest.",
    body: [
      'Many Rogersville homes have extra storage space — and extra storage space eventually means extra junk. We help clear garages, sheds and spare rooms in one visit, and we can plan larger property cleanouts across multiple loads.',
      'If you\'re helping a family member downsize or settling an estate, we can coordinate the cleanout around your schedule.',
    ],
    localNotes: [
      {
        title: 'Downsizing help',
        text: 'Moving a parent to a smaller home? We can remove what\'s not making the move once the family has picked out keepsakes.',
      },
    ],
    featuredServices: ['estate-property-cleanouts', 'garage-cleanouts', 'junk-removal', 'appliance-removal'],
    faqs: [
      {
        q: 'Do you serve the Webster County side of Rogersville?',
        a: 'Yes. Rogersville addresses on either side of the county line are within our service area.',
      },
    ],
    nearby: ['springfield', 'strafford', 'ozark'],
  },
  {
    slug: 'strafford',
    name: 'Strafford',
    county: 'Greene County',
    zips: ['65757'],
    relation: 'Northeast of Springfield on I-44',
    status: 'expand',
    seo: {
      title: 'Junk Removal Strafford MO | Ozark Junk Removals',
      description:
        'Junk removal in Strafford, MO. Furniture, appliances, garage and shed cleanouts and property junk removal northeast of Springfield.',
    },
    h1: 'Junk Removal in Strafford, MO',
    lead: "Strafford is a short run up I-44 from Springfield. If you've got junk to clear — a single piece of furniture or a whole outbuilding — our crew will load it and haul it off.",
    body: [
      'Strafford jobs are often a mix of household and property work: a couch and a broken freezer from the house, plus scrap and old equipment from the shop. Put it all in one request and we\'ll plan a single visit if it fits.',
      'Commercial and light industrial properties along the I-44 corridor can also request pallet, fixture and storage-room cleanouts.',
    ],
    localNotes: [
      {
        title: 'Shop & equipment cleanouts',
        text: 'Scrap metal, old equipment and shop junk are welcome. Drain fuel and fluids, and remove chemicals before the crew arrives.',
      },
    ],
    featuredServices: ['junk-removal', 'garage-cleanouts', 'commercial-junk-removal', 'appliance-removal'],
    faqs: [
      {
        q: 'Is Strafford in your service area?',
        a: 'Yes. Strafford is part of our regular service area northeast of Springfield.',
      },
    ],
    nearby: ['springfield', 'willard', 'rogersville'],
  },
];

/* ──────────────────────────────────────────────────────────────────────────
 *  EXTENDED SERVICE AREA (60-mile radius) — generated pages
 *  Each region has its own copy, tips, services and FAQs. Town pages combine
 *  region content + town facts + real distance/direction + nearest towns.
 * ────────────────────────────────────────────────────────────────────────── */

interface RegionContent {
  label: string;
  blurb: string;
  intros: string[];
  more: string;
  notes: { title: string; text: string }[];
  featured: string[];
  faqs: FAQ[];
}

export const regions: Record<Exclude<RegionKey, 'core'>, RegionContent> = {
  lakes: {
    label: 'Branson & the Lakes',
    blurb: 'Table Rock Lake, Lake Taneycomo and the Branson area — homes, cabins, condos and nightly rentals.',
    intros: [
      'Lake-country properties in and around {town} work hard. Full-time homes, weekend cabins, condos and nightly rentals all collect worn-out furniture, old appliances and leftover project debris. We make the trip down from Springfield, carry it out and haul it away.',
      "Whether it's a lake house that needs a reset, a rental between guests or a garage that's finally getting cleared, junk removal in {town} works just like it does in Springfield: tell us what needs to go, get a straightforward estimate, and our crew handles the lifting and hauling.",
    ],
    more: "Owners and property managers in the lake area often need furniture swaps and turnover cleanouts on a tight timeline. If you can't be on site, we can coordinate access with you and send photos when the job is done.",
    notes: [
      { title: 'Steep drives & tight lots', text: 'Many lake-area properties have steep driveways, stairs or narrow roads. Tell us about access when you request your estimate so we bring the right trailer.' },
      { title: 'Rental turnovers', text: "Replacing furniture or mattresses in a nightly rental? Send photos and your checkout window and we'll plan around it." },
    ],
    featured: ['furniture-removal', 'estate-property-cleanouts', 'junk-removal', 'appliance-removal', 'commercial-junk-removal'],
    faqs: [
      { q: 'Do you serve rental properties in {town}?', a: "Yes. Owners and property managers can request furniture removal and turnover cleanouts, and we can coordinate access if you won't be on site." },
      { q: 'How far ahead should I book in {town}?', a: "{town} is about {dist} miles from our Springfield base, so a few days' notice helps us plan the trip. Tell us your timing in the request and we'll be honest about availability." },
    ],
  },
  christian: {
    label: 'Christian County',
    blurb: 'The fast-growing towns just south of Springfield — subdivisions, farmhouses and acreage.',
    intros: [
      '{town} is part of the fast-growing stretch of Christian County just south of Springfield — newer subdivisions, older farmhouses and plenty of acreage in between. Our crew handles the garage cleanouts, furniture swaps and outbuilding cleanups that come with all of it.',
      "From move-in leftovers in a new subdivision to a shed that hasn't been cleared in years, junk removal in {town} is a short trip for our Springfield-based crew. We load it, haul it and leave the space clear.",
    ],
    more: "Building or remodeling? Our dump trailer is made for drywall, lumber, flooring and other renovation debris, so you don't need a roll-off sitting in the driveway for a week.",
    notes: [
      { title: 'New-build leftovers', text: "Packaging, scrap lumber and the previous owner's leftovers can all go in one load. Send a photo of the pile." },
      { title: 'Acreage & outbuildings', text: 'Barns, sheds and shops collect years of equipment and scrap. Let us know how close the trailer can get.' },
    ],
    featured: ['garage-cleanouts', 'construction-debris-removal', 'junk-removal', 'furniture-removal', 'appliance-removal'],
    faqs: [
      { q: 'Is {town} in your regular service area?', a: 'Yes. {town} is about {dist} miles {dir} of Springfield — an easy run for our crew.' },
      { q: 'Can you haul remodel debris in {town}?', a: 'Yes. Drywall, lumber, cabinets, flooring and fencing load straight into our dump trailer. Heavy materials like concrete or shingles are estimated separately because of weight, so mention them in your request.' },
    ],
  },
  north: {
    label: 'North of Springfield',
    blurb: 'Western Greene, Polk and Dallas Counties — small towns, farms and rural acreage north of Springfield.',
    intros: [
      'North of Springfield, towns like {town} mix in-town homes with farms and rural acreage. That usually means more than one area to clear — a house, a garage, a barn, a fence line. We can take it all in one planned visit or schedule multiple loads.',
      '{town} homeowners and landowners call us for the jobs that are too big for a pickup truck: whole-house cleanouts, outbuildings, old appliances and scrap piles. Our crew brings the trailer and does the loading.',
    ],
    more: "Settling an estate or helping family downsize? We work at your pace, set aside papers and keepsakes we find, and haul away what isn't staying.",
    notes: [
      { title: 'Farm & outbuilding junk', text: 'Old equipment, scrap metal, fencing and lumber are welcome. Drain fuel and fluids and remove chemicals before the crew arrives.' },
      { title: 'Rural access', text: 'Long drives, gates and soft ground matter for a loaded trailer. Mention them in your request so we can plan.' },
    ],
    featured: ['estate-property-cleanouts', 'garage-cleanouts', 'junk-removal', 'appliance-removal', 'furniture-removal'],
    faqs: [
      { q: 'Do you go out to rural properties near {town}?', a: 'Yes, as long as our trailer can safely reach the property. Tell us about gates, long drives or soft ground when you request your estimate.' },
      { q: 'Can you clear a whole property around {town} in one trip?', a: "Often, yes. {town} is about {dist} miles from Springfield, so we plan bigger jobs to minimize trips. If it will take more than one load, we'll tell you upfront." },
    ],
  },
  west: {
    label: 'West of Springfield',
    blurb: 'Lawrence, Barry and Cedar Counties — towns along I-44 and US-60, out to Cassville and Stockton Lake.',
    intros: [
      "{town} is one of the small towns west of Springfield where many homes come with basements, detached garages and outbuildings. When it's time to clear them out, we bring the crew and the trailer.",
      "Junk removal in {town} doesn't have to mean renting a trailer and making three trips yourself. Tell us what needs to go, and our Springfield-based crew loads it and hauls it away.",
    ],
    more: 'We also help landlords and small businesses in {county} clear out rentals, storage rooms and shop spaces.',
    notes: [
      { title: 'Plan the trip', text: '{town} is about {dist} miles from our base. Send photos and list everything — house, garage and yard — so we can handle it in one visit when possible.' },
      { title: 'Shop & storage cleanouts', text: 'Storage rooms, shops and small commercial spaces are welcome. Remove chemicals and drain any fuel first.' },
    ],
    featured: ['estate-property-cleanouts', 'junk-removal', 'garage-cleanouts', 'commercial-junk-removal', 'appliance-removal'],
    faqs: [
      { q: 'Do you really come out to {town}?', a: 'Yes. {town} is within our 60-mile service radius, about {dist} miles {dir} of Springfield. Request an estimate and tell us your timing.' },
      { q: 'Can you clean out a rental or storage space in {town}?', a: "Yes. Landlords and businesses can request cleanouts of rentals, storage rooms and shop spaces. We can coordinate access if you can't be there." },
    ],
  },
  east: {
    label: 'East of Springfield',
    blurb: 'Webster, Laclede and Douglas Counties — Marshfield, Seymour, Lebanon and Ava.',
    intros: [
      'East of Springfield, {town} and the surrounding countryside have plenty of farms, acreage and older homes. We handle the big cleanouts — houses, barns, sheds — and single bulky items too.',
      'Need junk gone in {town}? Our crew comes out from Springfield, loads everything from wherever it sits and hauls it off — no trailer rental, no borrowed truck, no weekend lost.',
    ],
    more: "Downsizing a family farmhouse or clearing a property for sale? We'll work through it room by room and building by building, and set aside anything important we find.",
    notes: [
      { title: 'Bundle everything', text: 'Since {town} is about {dist} miles out, list every item and area in one request — house, garage, barn, yard — so we can plan a single trip when it fits.' },
      { title: 'Scrap & equipment', text: 'Old mowers, tillers, fencing and scrap metal are welcome once fuel and fluids are drained.' },
    ],
    featured: ['estate-property-cleanouts', 'garage-cleanouts', 'junk-removal', 'appliance-removal', 'construction-debris-removal'],
    faqs: [
      { q: 'Is {town} too far for junk removal?', a: "No. {town} is about {dist} miles {dir} of Springfield, inside our 60-mile service area. A few days' notice helps us plan the trip." },
      { q: 'Can you clean out a farmhouse or barn near {town}?', a: 'Yes. Whole-house and outbuilding cleanouts are a big part of what we do. Fuel, chemicals and pesticides must be removed separately.' },
    ],
  },
};

export const regionOrder: Exclude<RegionKey, 'core'>[] = ['christian', 'lakes', 'north', 'west', 'east'];

const fill = (t: string, v: Record<string, string>) => t.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? `{${k}}`);

function buildTown(t: TownSeed, i: number): City {
  const pos: [number, number] = [t.lat, t.lon];
  const dist = Math.round(milesBetween(SPRINGFIELD, pos));
  const dir = compass(SPRINGFIELD, pos);
  const r = regions[t.region];
  const v = { town: t.name, county: t.county, dist: String(dist), dir };
  // Unique town description first, then region context.
  const body = [t.about, fill(r.intros[i % r.intros.length], v), fill(r.more, v)];

  const desc = `Junk removal in ${t.name}, MO — ${t.angle}. Our Springfield crew does the lifting and hauling. Free estimates.`;
  return {
    slug: t.slug,
    name: t.name,
    county: t.county,
    zips: t.zips,
    relation: `${dist} mi ${dir} of Springfield`,
    status: 'expand',
    seo: {
      title: `Junk Removal ${t.name} MO | Ozark Junk Removals`,
      description: desc.length <= 160 ? desc : `Junk removal in ${t.name}, MO — ${t.angle}. Free estimates from our Springfield crew.`,
    },
    h1: `Junk Removal in ${t.name}, MO`,
    lead: `Serving ${t.name} and the rest of ${t.county}, about ${dist} miles ${dir} of Springfield. Tell us what needs to go — our crew does the lifting, loading and hauling.`,
    body,
    localNotes: r.notes.map((n) => ({ title: n.title, text: fill(n.text, v) })),
    featuredServices: r.featured,
    faqs: r.faqs.map((f) => ({ q: fill(f.q, v), a: fill(f.a, v) })),
    nearby: [],
    region: t.region,
    tagline: t.angle.charAt(0).toUpperCase() + t.angle.slice(1),
    lat: t.lat,
    lon: t.lon,
    distance: dist,
    direction: dir,
  };
}

const regionCounters: Record<string, number> = {};
const generated = towns.map((t) => buildTown(t, (regionCounters[t.region] = (regionCounters[t.region] ?? -1) + 1)));

const coreTaglines: Record<string, string> = {
  springfield: 'Home base — every neighborhood and ZIP code',
  nixa: 'Busy family neighborhoods and full garages',
  ozark: 'Christian County seat with sheds, shops and acreage',
  republic: 'Fast-growing neighborhoods and new construction',
  battlefield: 'Residential streets right next to Springfield',
  willard: 'In-town homes and acreage northwest of Springfield',
  rogersville: 'Homes and outbuildings east on US-60',
  strafford: 'Homes, shops and businesses along I-44',
};

for (const c of coreCities) {
  c.tagline = coreTaglines[c.slug];
  const [lat, lon] = coreCoords[c.slug];
  Object.assign(c, {
    region: 'core' as RegionKey,
    lat,
    lon,
    distance: Math.round(milesBetween(SPRINGFIELD, [lat, lon])),
    direction: c.primary ? '' : compass(SPRINGFIELD, [lat, lon]),
  });
}

/** All service-area towns: core first, then extended towns by distance. */
export const cities: City[] = [...coreCities, ...generated.sort((a, b) => a.distance! - b.distance!)];

// Nearest neighbors for generated pages (core pages keep their hand-picked lists).
for (const c of generated) {
  c.nearby = cities
    .filter((o) => o.slug !== c.slug)
    .map((o) => ({ slug: o.slug, d: milesBetween([c.lat!, c.lon!], [o.lat!, o.lon!]) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 6)
    .map((o) => o.slug);
}

/** The 8 core towns (used for menus, footer and the homepage map). */
export const coreAreaCities = coreCities;
export const SERVICE_RADIUS_MILES = 60;

export const cityPath = (slug: string) => `/junk-removal-${slug}-mo/`;
export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
