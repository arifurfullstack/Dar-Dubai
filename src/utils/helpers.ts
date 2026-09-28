/**
 * Helper utilities for formatting and data manipulation
 */

export function formatPrice(amount: number, currency: string = 'AED'): string {
  return `${currency} ${amount.toLocaleString('en-US')}`;
}

export function formatCompactPrice(amount: number, currency: string = 'AED'): string {
  if (amount >= 1_000_000) {
    const millions = (amount / 1_000_000).toFixed(1).replace(/\.0$/, '');
    return `${currency} ${millions}M`;
  }
  if (amount >= 1_000) {
    const thousands = (amount / 1_000).toFixed(0);
    return `${currency} ${thousands}K`;
  }
  return `${currency} ${amount.toLocaleString('en-US')}`;
}

export function formatBedrooms(bedrooms: number | 'studio'): string {
  if (bedrooms === 'studio' || bedrooms === 0) return 'Studio';
  if (bedrooms === 1) return '1 Bed';
  return `${bedrooms} Beds`;
}

export function formatBathrooms(bathrooms: number): string {
  if (bathrooms === 1) return '1 Bath';
  return `${bathrooms} Baths`;
}

export function formatArea(sqFt: number): string {
  return `${sqFt.toLocaleString('en-US')} sq ft`;
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  } else {
    // Fallback
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return Promise.resolve(successful);
    } catch {
      document.body.removeChild(textArea);
      return Promise.resolve(false);
    }
  }
}
