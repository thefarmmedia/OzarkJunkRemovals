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
}

export const cities: City[] = [
  {
    slug: 'springfield',
    name: 'Springfield',
    county: 'Greene County',
    zips: ['65802', '65803', '65804', '65806', '65807', '65809', '65810'],
    relation: 'Home base',
    status: 'ready',
    primary: true,
    seo: {
      title: 'Local Junk Removal Across Springfield, MO | Ozark Junk Removals',
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

export const cityPath = (slug: string) => `/junk-removal-${slug}-mo/`;
export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
