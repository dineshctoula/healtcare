/**
 * date.ts
 *
 * Small date utility for the frontend. Nothing fancy — just centralising
 * the bits of date formatting we use in more than one place so we're not
 * copy-pasting new Date().toISOString().split('T')[0] everywhere.
 */

/**
 * Returns today's date as a YYYY-MM-DD string, which is the format
 * expected by the booking API and by <input type="date">.
 */
export function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Formats a YYYY-MM-DD date string into a more human-readable form,
 * e.g. "15 Aug 2026". Falls back to the raw string if parsing fails.
 */
export function formatReadableDate(isoDate: string): string {
  if (!isoDate) return '';
  try {
    return new Date(isoDate).toLocaleDateString('en-AE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    // If the date string is somehow malformed, just return it as-is
    return isoDate;
  }
}

/**
 * Returns true if the given date string is today or later.
 * Used to prevent users from selecting past dates in the booking form.
 */
export function isDateValid(isoDate: string): boolean {
  if (!isoDate) return false;
  const picked = new Date(isoDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // compare date only, not time
  return picked >= today;
}
