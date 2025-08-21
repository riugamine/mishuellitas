/**
 * Utility functions for generating URL-friendly slugs
 */

/**
 * Generate a URL-friendly slug from a string
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace spaces and special characters with hyphens
    .replace(/[\s\W-]+/g, '-')
    // Remove accented characters and convert to ASCII
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Ensure it's not empty
    || 'categoria';
}

/**
 * Generate a unique slug by appending a number if needed
 * @param baseSlug - The base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

/**
 * Validate if a slug is valid
 * @param slug - The slug to validate
 * @returns Whether the slug is valid
 */
export function isValidSlug(slug: string): boolean {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug) && slug.length > 0 && slug.length <= 100;
}
