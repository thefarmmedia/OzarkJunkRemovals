/**
 * CUSTOMER REVIEWS
 *
 * Only add real reviews, quoted word-for-word, with the customer's permission
 * (or copied from a public review platform with a link to the source).
 * The Testimonials component renders nothing while this list is empty.
 * Do NOT add aggregateRating schema based on these.
 */
export interface Review {
  quote: string;
  name: string; // e.g. "Sarah M."
  location?: string; // e.g. "Nixa, MO"
  source?: { label: string; url: string }; // e.g. Google review link
  service?: string;
}

export const reviews: Review[] = [];
