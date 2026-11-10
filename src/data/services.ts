/**
 * Service page content. Each entry renders /services/<slug>/.
 * Copy rules: no prices, no guaranteed turnaround, no licensing/insurance
 * claims, no specialized-waste claims. Keep it human and specific.
 */
import type { IconName } from '@/components/ui/icons';

export interface FAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string;
  /** Used in cards / nav. */
  cardTitle: string;
  cardBlurb: string;
  icon: IconName;
  seo: { title: string; description: string };
  h1: string;
  eyebrow: string;
  lead: string;
  /** Long-form description paragraphs. */
  body: string[];
  itemsHeading: string;
  items: string[];
  process: { title: string; text: string }[];
  benefits: { title: string; text: string }[];
  /** Optional callout box (assessments, limits, respectful notes). */
  notice?: { title: string; text: string };
  faqs: FAQ[];
  related: string[];
  /** Short label for the quote form <select>. */
  formLabel: string;
}

export const services: Service[] = [
  {
    slug: 'junk-removal',
    name: 'Junk Removal',
    cardTitle: 'Junk Removal',
    cardBlurb: 'One bulky item or a whole pile — we load it, haul it and leave the space clear.',
    icon: 'truck',
    formLabel: 'General junk removal',
    seo: {
      title: 'Junk Hauling Service in Springfield, MO | Ozark Junk Removals',
      description:
        'Full-service junk hauling in Springfield, MO. We do the lifting, loading and hauling — furniture, appliances, yard debris and clutter. Free estimates.',
    },
    h1: 'Junk Removal in Springfield, MO',
    eyebrow: 'Full-service junk removal',
    lead: "You point, we lift. Ozark Junk Removals handles the heavy work of getting unwanted stuff out of your home, yard or business — no trailer rental, no borrowing a buddy's truck, no weekend lost to hauling.",
    body: [
      "Most junk doesn't need a dumpster sitting in your driveway for a week. It needs a crew that shows up, loads everything in one visit and takes it away. That's the whole job here: we come to the property, carry items out from wherever they are, load our dump trailer or high-side hauling trailer and handle the disposal run.",
      "Because we load, you aren't stuck guessing how much fits in a rented container or worrying about weight limits on your own vehicle. Tell us what needs to go — photos help a lot — and we'll give you a straightforward estimate before any work starts.",
      'Jobs range from a single couch that won\'t fit through the door anymore to a full basement, shed and garage all in one trip. If it\'s non-hazardous and two people can safely carry it, there\'s a good chance we can take it.',
    ],
    itemsHeading: 'What we commonly haul',
    items: [
      'Couches, sectionals & recliners',
      'Mattresses & box springs',
      'Washers, dryers & refrigerators',
      'Old TVs & electronics',
      'Boxes, bags & household clutter',
      'Exercise equipment',
      'Yard waste & brush piles',
      'Lumber, fencing & remodel scraps',
      'Grills, patio sets & playsets (disassembled)',
      'Tires (ask about quantity)',
      'Carpet & padding',
      'Hot tubs & sheds (assessment required)',
    ],
    process: [
      { title: 'Send the details', text: 'Use the quote form — a few photos and a rough description is plenty.' },
      { title: 'Get your estimate', text: 'We review what you sent and give you a clear, straightforward estimate.' },
      { title: 'We load & haul', text: 'The crew arrives, carries everything out, loads up and handles disposal.' },
    ],
    benefits: [
      { title: 'No heavy lifting', text: 'Items come out of basements, attics and back bedrooms — not just the curb.' },
      { title: 'One visit', text: 'Our high-side and dump trailers are built for volume, so most jobs are done in one trip.' },
      { title: 'Clear estimates', text: 'You know the plan and the estimate before anything gets loaded.' },
      { title: 'Local crew', text: 'Locally operated in the Springfield area, not a call center routing your job.' },
    ],
    faqs: [
      {
        q: 'Do I need to bring things to the curb?',
        a: "No. We pick items up from where they are — inside the house, the garage, the backyard or a storage room — as long as the crew can access them safely. If it's easier for you to stage things, that's fine too.",
      },
      {
        q: 'How is junk removal priced?',
        a: 'Estimates are based mostly on how much space your items take up in the trailer, plus anything that changes the work involved — heavy materials, stairs, long carries or disassembly. Photos let us give a more accurate estimate.',
      },
      {
        q: 'Can you take everything in one trip?',
        a: 'Most residential jobs fit in one load. For large cleanouts we will tell you upfront if it will take multiple loads.',
      },
    ],
    related: ['furniture-removal', 'appliance-removal', 'garage-cleanouts'],
  },
  {
    slug: 'garage-cleanouts',
    name: 'Garage Cleanouts',
    cardTitle: 'Garage Cleanouts',
    cardBlurb: 'Get your parking spot back. We clear years of storage, tools and boxes in one visit.',
    icon: 'garage',
    formLabel: 'Garage cleanout',
    seo: {
      title: 'Garage Cleanouts Springfield MO | Ozark Junk Removals',
      description:
        'Garage cleanouts in Springfield, MO and nearby towns. We haul old furniture, boxes, scrap and clutter so you can park inside again. Free estimates.',
    },
    h1: 'Garage Cleanouts in Springfield, MO',
    eyebrow: 'Garage, shed & storage cleanouts',
    lead: 'If the car has been living in the driveway because the garage is full, this is the service for you. We clear out the stuff you no longer want and haul it away in one trip.',
    body: [
      'Garages collect everything that doesn\'t have a home: furniture "for later," half-finished projects, broken mowers, kids\' bikes, holiday boxes and the paint cans nobody remembers buying. Sorting it is the hard part. Hauling it shouldn\'t be.',
      'You decide what stays and what goes — mark it, point at it or walk through it with the crew. We do the carrying, loading and disposal run. If you want help separating keepers from junk on the day, let us know when you request your estimate so we can plan the time.',
      'Sheds, carports, detached shops and storage areas are part of the same service. If you have a storage unit to empty, we can handle that too.',
    ],
    itemsHeading: 'Typical garage cleanout items',
    items: [
      'Old furniture & mattresses',
      'Broken lawn equipment (fluids drained)',
      'Bikes, toys & sports gear',
      'Shelving, cabinets & workbenches',
      'Scrap metal & lumber',
      'Boxes of household items',
      'Old tools & hardware',
      'Holiday decorations',
      'Exercise equipment',
      'Tires & wheels (ask about quantity)',
    ],
    process: [
      { title: 'Show us the space', text: 'Snap a few wide photos of the garage and any big items.' },
      { title: 'Decide what goes', text: 'Mark keepers or walk through with the crew on arrival.' },
      { title: 'Clear it out', text: 'We load everything that\'s going, then sweep up the area we worked in.' },
    ],
    benefits: [
      { title: 'Park inside again', text: 'Most garages are cleared in a single visit.' },
      { title: 'You stay in control', text: 'Nothing leaves unless you say it goes.' },
      { title: 'Heavy items handled', text: 'Workbenches, safes and old freezers are what our crew is for.' },
      { title: 'Seasonal ready', text: 'A good reset before a move, a sale or a new season.' },
    ],
    notice: {
      title: 'About paint, fuel & chemicals',
      text: 'Garages often hold paint, solvents, fuel and pesticides. These are household hazardous waste and are not loaded with regular junk. We can point you toward local household chemical drop-off options.',
    },
    faqs: [
      {
        q: 'Do I need to sort everything before you arrive?',
        a: 'It helps to have a plan for what you are keeping, but you do not need to box or stage anything. Pointing out keepers during the walkthrough works fine.',
      },
      {
        q: 'Will you take an old lawn mower?',
        a: 'Usually, yes — as long as fuel and oil have been drained. Let us know about engines and fuel tanks when you request your estimate.',
      },
      {
        q: 'Can you clean out a shed or storage unit too?',
        a: 'Yes. Sheds, detached shops, carports and storage units are handled the same way as a garage. Some sheds can also be torn down and removed after an assessment.',
      },
    ],
    related: ['junk-removal', 'furniture-removal', 'estate-property-cleanouts'],
  },
  {
    slug: 'furniture-removal',
    name: 'Furniture Removal',
    cardTitle: 'Furniture Removal',
    cardBlurb: 'Couches, sectionals, mattresses, dressers — carried out from any room.',
    icon: 'couch',
    formLabel: 'Furniture removal',
    seo: {
      title: 'Furniture Removal Springfield MO | Ozark Junk Removals',
      description:
        'Furniture removal in Springfield, MO. Couches, sectionals, mattresses, recliners and dressers carried out from any room and hauled away. Free estimates.',
    },
    h1: 'Furniture Removal in Springfield, MO',
    eyebrow: 'Couch, mattress & furniture pickup',
    lead: "New sofa coming Thursday and the old one has to go? We carry furniture out of any room in the house — upstairs, downstairs, tight hallways — and haul it away.",
    body: [
      'Furniture is the single most common reason people call a junk removal company. It\'s big, awkward and often too heavy to move without scraping walls or hurting a back. Our crew takes it apart when necessary, protects the path out and loads it onto the trailer.',
      'You don\'t need to drag anything to the curb. Point the crew to the couch in the basement or the dresser in the upstairs bedroom and we handle it from there.',
      'For one or two pieces, we can often fit pickup around other jobs on our route. Larger furniture loads — a full apartment, an office or a storage unit — get scheduled as a dedicated visit.',
    ],
    itemsHeading: 'Furniture we remove',
    items: [
      'Sofas, sectionals & sleeper sofas',
      'Recliners & lift chairs',
      'Mattresses & box springs',
      'Bed frames & headboards',
      'Dressers, armoires & chests',
      'Dining tables & chairs',
      'Entertainment centers',
      'Desks & office chairs',
      'Filing cabinets & bookshelves',
      'Patio & outdoor furniture',
      'Cribs & kids\' furniture',
      'Pianos (assessment required)',
    ],
    process: [
      { title: 'Tell us what\'s going', text: 'A photo of each piece and where it is in the house.' },
      { title: 'Confirm the estimate', text: 'You get a clear estimate before we schedule.' },
      { title: 'We carry it out', text: 'Disassembly if needed, careful carry out, loaded and gone.' },
    ],
    benefits: [
      { title: 'Any room, any floor', text: 'Stairs and tight turns are part of the job.' },
      { title: 'Careful with your home', text: 'We plan the route out before we lift.' },
      { title: 'Single items welcome', text: 'You don\'t need a whole houseful to call us.' },
      { title: 'Reuse where practical', text: 'Usable pieces may be set aside for donation when it\'s an option.' },
    ],
    faqs: [
      {
        q: 'Will you take just one couch?',
        a: 'Yes. Single-item pickups are welcome. Send a photo through the quote form and we will give you an estimate.',
      },
      {
        q: 'Do you donate furniture that is still in good shape?',
        a: 'When an item is in usable condition and a local donation option will accept it, we may route it there instead of disposal. Acceptance is up to the receiving organization, so we cannot promise any particular item will be donated.',
      },
      {
        q: 'Can you take a sleeper sofa or a heavy recliner downstairs?',
        a: 'Yes — heavy, awkward pieces and staircases are exactly what the crew is for. Mention stairs and tight turns in your request so we bring the right help.',
      },
    ],
    related: ['junk-removal', 'appliance-removal', 'estate-property-cleanouts'],
  },
  {
    slug: 'appliance-removal',
    name: 'Appliance Removal',
    cardTitle: 'Appliance Removal',
    cardBlurb: 'Fridges, washers, dryers, freezers and water heaters hauled away.',
    icon: 'appliance',
    formLabel: 'Appliance removal',
    seo: {
      title: 'Appliance Removal Springfield MO | Ozark Junk Removals',
      description:
        'Old appliance removal in Springfield, MO: refrigerators, freezers, washers, dryers, stoves and water heaters hauled away. Free estimates.',
    },
    h1: 'Appliance Removal in Springfield, MO',
    eyebrow: 'Old appliance haul-away',
    lead: 'Dead fridge in the garage? Replaced the washer and the old one is still in the laundry room? We carry out heavy appliances and haul them off.',
    body: [
      'Appliances are heavy, awkward and often stuck in the worst possible spot — a basement laundry room, a kitchen with a tight turn or a back-porch chest freezer. They also can\'t just go in the trash. We load them and route them for appropriate disposal or metal recycling where available.',
      'Units need to be disconnected before we arrive. That means water lines shut off and capped, gas lines shut off and capped by a qualified person, and hardwired units disconnected from power. We remove the appliance; we don\'t perform plumbing, gas or electrical work.',
      'Refrigerators and freezers should be emptied of food. If a fridge has been sitting closed and full for a while, let us know in your request so we can plan for it.',
    ],
    itemsHeading: 'Appliances we haul',
    items: [
      'Refrigerators & mini fridges',
      'Chest & upright freezers',
      'Washers & dryers',
      'Stoves, ranges & ovens',
      'Dishwashers',
      'Microwaves',
      'Water heaters (drained)',
      'Window AC units & dehumidifiers',
      'Trash compactors',
      'Grills (propane tanks removed)',
    ],
    process: [
      { title: 'Disconnect it', text: 'Water, gas and power shut off and capped before we arrive.' },
      { title: 'Get your estimate', text: 'Tell us what it is and where it sits in the house.' },
      { title: 'We haul it out', text: 'Dolly, straps and a clear route — out and loaded.' },
    ],
    benefits: [
      { title: 'Heavy-lift ready', text: 'Appliance dollies, straps and enough hands to do it safely.' },
      { title: 'From any room', text: 'Basements, kitchens, garages and porches.' },
      { title: 'Combine items', text: 'Bundle an appliance with other junk in the same visit.' },
      { title: 'Recycling-minded', text: 'Metal appliances are routed to recycling where available.' },
    ],
    notice: {
      title: 'Disconnection is your responsibility',
      text: 'We do not disconnect gas, water or electrical service. Please have a qualified person shut off and cap any lines before the crew arrives.',
    },
    faqs: [
      {
        q: 'Do you disconnect the appliance?',
        a: 'No. Please have water, gas and hardwired electrical connections shut off and capped before we arrive. We handle the carry-out and hauling.',
      },
      {
        q: 'Will you take a refrigerator that still has food in it?',
        a: 'Please empty it first. If that is not possible — for example, after a power outage or in an estate situation — tell us in your request so we can plan for it.',
      },
      {
        q: 'Can you remove an appliance from a basement?',
        a: 'Yes. Mention stairs and the approximate size of the unit so we bring the right equipment.',
      },
    ],
    related: ['junk-removal', 'furniture-removal', 'garage-cleanouts'],
  },
  {
    slug: 'estate-property-cleanouts',
    name: 'Estate & Property Cleanouts',
    cardTitle: 'Estate & Property Cleanouts',
    cardBlurb: 'Whole-house cleanouts for families, executors, landlords and realtors.',
    icon: 'house',
    formLabel: 'Estate / property cleanout',
    seo: {
      title: 'Estate & Property Cleanouts Springfield MO | Ozark Junk',
      description:
        'Estate and property cleanouts in Springfield, MO for families, executors, landlords and realtors. Organized, respectful whole-house junk removal.',
    },
    h1: 'Estate & Property Cleanouts in Springfield, MO',
    eyebrow: 'Estates, rentals & move-outs',
    lead: 'When a whole house needs to be cleared — after a loss, a tenant move-out or before a listing — we bring the crew and trailer capacity to get it done in an organized, respectful way.',
    body: [
      'Estate cleanouts are rarely just about junk. There are family decisions, keepsakes and paperwork mixed in with decades of belongings. We work at your pace: you or your family can set aside what stays, and we remove the rest. If something surprising turns up — documents, photos, cash, jewelry — we stop and set it aside for you.',
      'For landlords and property managers, we clear out what tenants leave behind so the unit can be cleaned, repaired and rented again. For realtors, we help get listings show-ready or clear out a property before closing. We can coordinate access with you when you can\'t be on site.',
      'Larger properties may take more than one load or more than one day. We will tell you that upfront when we put the estimate together.',
    ],
    itemsHeading: 'What a property cleanout can include',
    items: [
      'Full-house furniture & contents',
      'Basements, attics & crawl-space storage',
      'Garages, sheds & outbuildings',
      'Tenant leave-behinds',
      'Appliances & mattresses',
      'Clothing, linens & household goods',
      'Carpet & flooring removal debris',
      'Yard debris & brush',
      'Foreclosure & bank-owned cleanouts',
      'Pre-listing & pre-closing cleanouts',
    ],
    process: [
      { title: 'Walkthrough', text: 'Photos, a video or an on-site visit for larger properties.' },
      { title: 'Plan & estimate', text: 'We agree on what stays, what goes and how many loads to expect.' },
      { title: 'Clear the property', text: 'The crew works room by room and leaves it broom-swept.' },
    ],
    benefits: [
      { title: 'Respectful crews', text: 'We know these jobs can be emotional. We don\'t rush you.' },
      { title: 'Found items set aside', text: 'Papers, photos and valuables go to you, not the trailer.' },
      { title: 'Remote coordination', text: 'Executors and out-of-town families can coordinate access with us.' },
      { title: 'Built for volume', text: 'Dump and high-side trailers for whole-house loads.' },
    ],
    faqs: [
      {
        q: 'Can you clean out a house if I live out of town?',
        a: 'Often, yes. We can coordinate access through a lockbox, a realtor or a family member and send photos when the work is done. Let us know in your request.',
      },
      {
        q: 'What happens to items that are still usable?',
        a: 'When practical, usable items can be set aside for donation, subject to what local organizations will accept. If you want specific items kept for family, mark or remove them before we start.',
      },
      {
        q: 'Do you do the deep cleaning afterward?',
        a: 'Our job is removal and hauling; we leave the cleared areas broom-swept. If you need professional cleaning afterward, plan for a separate cleaning service.',
      },
    ],
    related: ['hoarder-house-cleanouts', 'furniture-removal', 'commercial-junk-removal'],
  },
  {
    slug: 'hoarder-house-cleanouts',
    name: 'Hoarder House Cleanouts',
    cardTitle: 'Hoarding Cleanouts',
    cardBlurb: 'Discreet, judgment-free help clearing heavily cluttered homes.',
    icon: 'heart',
    formLabel: 'Hoarding / heavy clutter cleanout',
    seo: {
      title: 'Hoarder House Cleanout Springfield MO | Ozark Junk Removals',
      description:
        'Discreet, respectful hoarding and heavy-clutter cleanouts in Springfield, MO. Paced to the homeowner, with assessment-based estimates.',
    },
    h1: 'Hoarding & Heavy Clutter Cleanouts in Springfield, MO',
    eyebrow: 'Discreet, judgment-free help',
    lead: 'Reaching out about a heavily cluttered home takes courage — whether it\'s your own home or a loved one\'s. We keep it discreet, respectful and focused on getting the space safe and usable again.',
    body: [
      'Every hoarding situation is different, and the person who lives there deserves dignity throughout the process. Our role is the physical work: carefully clearing items, loading them and hauling them away according to a plan you agree to. We never treat someone\'s home like a dump site.',
      'These jobs start with an assessment so we understand the volume, access, and any safety concerns. Some cleanouts happen in one push; others work better in stages over several visits so the homeowner can stay involved in decisions.',
      'We can work with family members, case workers, property managers and landlords. If papers, photos, cash or keepsakes are found, they are set aside — not thrown out.',
    ],
    itemsHeading: 'What we can help clear',
    items: [
      'Accumulated household items & boxes',
      'Paper, mail & newspapers',
      'Bagged trash & recyclables',
      'Furniture & mattresses',
      'Clothing & textiles',
      'Appliances',
      'Garage, porch & yard accumulation',
      'Outbuilding & shed contents',
    ],
    process: [
      { title: 'Confidential assessment', text: 'Photos or a site visit so we can understand the situation safely.' },
      { title: 'Agree on a plan', text: 'Scope, pace, what to look out for and what must be kept.' },
      { title: 'Clear in stages', text: 'One visit or several — whatever keeps it manageable.' },
    ],
    benefits: [
      { title: 'Discreet', text: 'No judgment, and no unnecessary attention from the neighbors.' },
      { title: 'Paced to the person', text: 'Staged cleanouts are available so decisions don\'t feel rushed.' },
      { title: 'Keepsakes protected', text: 'Important items found during the job are set aside.' },
      { title: 'Works with your team', text: 'Family, caseworkers and property managers can coordinate with us.' },
    ],
    notice: {
      title: 'Assessment required for biohazards & contamination',
      text: 'Situations involving biohazardous material (bodily fluids, sharps, significant animal waste), active pest infestations, mold or hazardous chemicals require an assessment first. Some of these conditions need a licensed remediation or pest-control professional, and we will tell you honestly if a job is outside what we can safely handle.',
    },
    faqs: [
      {
        q: 'Do you handle biohazard cleanup?',
        a: 'Not without an assessment. Biohazards, sharps, heavy animal waste, active infestations and mold often require licensed specialists. We will review the situation and let you know whether we can help with the removal portion, or whether a specialist needs to go first.',
      },
      {
        q: 'Can the cleanout be done over several visits?',
        a: 'Yes. Staged cleanouts often work better for the homeowner. We can plan a schedule that fits.',
      },
      {
        q: 'Will you throw away everything?',
        a: 'No. We follow the plan agreed with you and set aside documents, photos, valuables and anything flagged as a keeper.',
      },
    ],
    related: ['estate-property-cleanouts', 'junk-removal', 'furniture-removal'],
  },
  {
    slug: 'construction-debris-removal',
    name: 'Construction Debris Removal',
    cardTitle: 'Construction Debris',
    cardBlurb: 'Remodel waste, lumber, drywall, flooring and job-site cleanup.',
    icon: 'hammer',
    formLabel: 'Construction / remodel debris',
    seo: {
      title: 'Construction Debris Removal Springfield MO | Ozark Junk',
      description:
        'Construction and remodel debris removal in Springfield, MO: drywall, lumber, flooring, cabinets and job-site cleanup for homeowners and contractors.',
    },
    h1: 'Construction Debris Removal in Springfield, MO',
    eyebrow: 'Remodel & job-site cleanup',
    lead: 'Finished the demo and now there\'s a mountain of drywall and lumber in the driveway? Our dump trailer is built for exactly this kind of heavy, bulky material.',
    body: [
      'Construction debris is heavy and messy, and it rarely fits in a pickup bed. For homeowners doing a DIY remodel, a bathroom gut or a deck tear-off, we load the pile and haul it in one visit — no roll-off sitting on your lawn for a week.',
      'For contractors, we can handle cleanup between phases or at the end of a job so your crew stays focused on the build. Tell us the material type and approximate volume, and send photos if you can.',
      'Heavy materials like concrete, brick, roofing shingles and dirt are priced and loaded differently than general debris because of weight limits. Please mention them specifically in your request.',
    ],
    itemsHeading: 'Debris we haul',
    items: [
      'Drywall & plaster',
      'Lumber, trim & framing scraps',
      'Old cabinets & countertops',
      'Carpet, pad, vinyl & laminate',
      'Tile & flooring debris',
      'Doors, windows & fixtures',
      'Fencing & decking',
      'Siding & gutters',
      'Roofing shingles (ask first — weight)',
      'Concrete, brick & block (ask first — weight)',
    ],
    process: [
      { title: 'Describe the debris', text: 'Material type, rough volume, photos and any weight concerns.' },
      { title: 'Get a quote', text: 'Clear estimate based on volume and material weight.' },
      { title: 'Load & haul', text: 'Dump trailer on site, crew loads it, site left clean.' },
    ],
    benefits: [
      { title: 'Dump trailer capacity', text: 'Made for dense, heavy remodel material.' },
      { title: 'No roll-off rental', text: 'Nothing sitting on your driveway for days.' },
      { title: 'Contractor-friendly', text: 'Phase-by-phase or end-of-job cleanup.' },
      { title: 'We load it', text: 'Your crew keeps building; ours handles the pile.' },
    ],
    notice: {
      title: 'Materials that need special handling',
      text: 'Asbestos-containing materials, lead-paint abatement waste, treated chemicals and other regulated materials are not accepted with general debris. If you suspect asbestos (common in some older flooring, siding and insulation), have it tested before demolition.',
    },
    faqs: [
      {
        q: 'Can you take concrete and shingles?',
        a: 'Often, yes, but heavy materials are limited by trailer weight, so they are estimated separately. Tell us the material and approximate amount when you request a quote.',
      },
      {
        q: 'Do you work with contractors on recurring cleanups?',
        a: 'Yes. Contractors can request cleanup between phases or at the end of a job. Reach out with your typical volume and schedule.',
      },
      {
        q: 'Do you do demolition?',
        a: 'Light tear-outs, such as old sheds, decks or fencing, may be possible after an assessment. Structural demolition is not something we advertise.',
      },
    ],
    related: ['commercial-junk-removal', 'junk-removal', 'garage-cleanouts'],
  },
  {
    slug: 'commercial-junk-removal',
    name: 'Commercial Junk Removal',
    cardTitle: 'Commercial Junk Removal',
    cardBlurb: 'Office, retail, rental and warehouse cleanouts that work around your schedule.',
    icon: 'building',
    formLabel: 'Commercial junk removal',
    seo: {
      title: 'Commercial Junk Removal Springfield MO | Ozark Junk Removals',
      description:
        'Commercial junk removal in Springfield, MO for offices, retail, warehouses and rentals. Furniture, fixtures, e-waste and cleanout hauling.',
    },
    h1: 'Commercial Junk Removal in Springfield, MO',
    eyebrow: 'Offices, retail, rentals & warehouses',
    lead: 'Moving offices, closing a store, turning over a rental or clearing a back warehouse? We haul the furniture, fixtures and accumulated junk so your space is ready for what\'s next.',
    body: [
      'Businesses need junk removal that shows up when expected, works efficiently and doesn\'t disrupt customers or staff. We plan commercial jobs around your access windows and make sure the crew knows exactly what is going before we start.',
      'Common commercial jobs include office furniture and cubicle removal, retail fixtures and shelving, old electronics, break-room appliances, pallets, and leftover inventory or storage. Property managers use us for tenant turnovers and common-area cleanouts.',
      'If you manage multiple properties or need recurring service, tell us about your portfolio so we can talk through how scheduling would work.',
    ],
    itemsHeading: 'Commercial items we remove',
    items: [
      'Desks, chairs & conference tables',
      'Cubicle panels & filing cabinets',
      'Retail shelving, racks & fixtures',
      'Old computers, monitors & printers',
      'Break-room appliances',
      'Pallets & packaging',
      'Warehouse & storage-room junk',
      'Tenant leave-behinds',
      'Signage & display materials',
      'Restaurant furniture (no grease or chemicals)',
    ],
    process: [
      { title: 'Scope the job', text: 'Photos, a list or a site walk for larger spaces.' },
      { title: 'Schedule around you', text: 'Plan access, timing and any building requirements.' },
      { title: 'Clear & haul', text: 'Efficient removal with minimal disruption.' },
    ],
    benefits: [
      { title: 'Planned around access', text: 'We coordinate with your hours and building rules.' },
      { title: 'Turnover-ready', text: 'Faster unit turns for landlords and managers.' },
      { title: 'One point of contact', text: 'Clear communication from estimate to completion.' },
      { title: 'Volume capacity', text: 'Multiple loads planned upfront for big jobs.' },
    ],
    notice: {
      title: 'Data security',
      text: 'We do not provide certified data destruction. Remove or wipe hard drives and any devices that store sensitive data before we haul electronics.',
    },
    faqs: [
      {
        q: 'Can you work outside normal business hours?',
        a: 'Ask us. Scheduling depends on crew availability, and we will tell you honestly which windows we can commit to.',
      },
      {
        q: 'Do you provide a certificate of data destruction?',
        a: 'No. Please remove or wipe hard drives and storage devices before electronics are hauled, or use a certified data-destruction provider.',
      },
      {
        q: 'Do you work with property management companies?',
        a: 'Yes. Tenant turnovers, abandoned-item removal and common-area cleanups are a good fit. Tell us how many properties you manage and how you prefer to handle access.',
      },
    ],
    related: ['construction-debris-removal', 'estate-property-cleanouts', 'furniture-removal'],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Site-wide list of items we never take with regular junk. */
export const notAccepted = [
  'Paint, stains & solvents',
  'Gasoline, oil & automotive fluids',
  'Pesticides & pool chemicals',
  'Propane tanks & compressed gas',
  'Car & lithium batteries (ask)',
  'Asbestos-containing materials',
  'Medical waste & sharps',
  'Explosives, ammunition & fireworks',
];
