/**
 * Utility functions for Meta Pixel Advanced Matching
 * These functions help prepare customer data for advanced matching
 */

/**
 * Normalizes email for advanced matching
 * @param email - Raw email address
 * @returns Normalized email (lowercase, trimmed)
 */
export const normalizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

/**
 * Normalizes phone number for advanced matching
 * @param phone - Raw phone number
 * @returns Normalized phone (digits only)
 */
export const normalizePhone = (phone: string): string => {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // If it starts with 212 (Morocco country code), keep it
  // If it starts with 0, replace with 212
  if (cleaned.startsWith('0')) {
    cleaned = '212' + cleaned.substring(1);
  }
  
  return cleaned;
};

/**
 * Normalizes name for advanced matching
 * @param name - Raw name
 * @returns Normalized name (lowercase, trimmed)
 */
export const normalizeName = (name: string): string => {
  return name.toLowerCase().trim();
};

/**
 * Prepares advanced matching data from form data
 * @param formData - Form data containing customer information
 * @returns Advanced matching object for Meta Pixel
 */
export const prepareAdvancedMatching = (formData: {
  email?: string;
  phoneNumber?: string;
  fullName?: string;
}): { em?: string; ph?: string; fn?: string; ln?: string } => {
  const advancedMatching: { em?: string; ph?: string; fn?: string; ln?: string } = {};
  
  // Email
  if (formData.email && formData.email.trim()) {
    advancedMatching.em = normalizeEmail(formData.email);
  }
  
  // Phone
  if (formData.phoneNumber && formData.phoneNumber.trim()) {
    advancedMatching.ph = normalizePhone(formData.phoneNumber);
  }
  
  // Name
  if (formData.fullName && formData.fullName.trim()) {
    const nameParts = formData.fullName.trim().split(' ');
    if (nameParts.length > 0) {
      advancedMatching.fn = normalizeName(nameParts[0]);
    }
    if (nameParts.length > 1) {
      advancedMatching.ln = normalizeName(nameParts[nameParts.length - 1]);
    }
  }
  
  return advancedMatching;
};