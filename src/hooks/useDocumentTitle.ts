// Safe hook to set document.title with formatting and sanitization
import { useEffect } from 'react';

function sanitizeTitlePart(part: string) {
  if (!part) return '';
  // Replace newlines and control characters, trim, and collapse spaces
  return part.replace(/[\x00-\x1F\x7F]+/g, ' ').replace(/\s+/g, ' ').trim();
}

type TitleTemplate = string | ((data?: Record<string, string | number | undefined>) => string);

export function formatTitle(template: TitleTemplate, data?: Record<string, string | number | undefined>) {
  if (typeof template === 'function') {
    try {
      const raw = template(data);
      return sanitizeTitlePart(String(raw || ''));
    } catch (e) {
      return '';
    }
  }

  let result = String(template || '');
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), sanitizeTitlePart(String(value ?? '')));
    });
  }
  return sanitizeTitlePart(result);
}

export default function useDocumentTitle(template: TitleTemplate, data?: Record<string, string | number | undefined>) {
  useEffect(() => {
    try {
      const formatted = formatTitle(template, data);
      // If empty, avoid setting an empty title; keep existing title
      if (formatted) {
        document.title = formatted;
      }
    } catch (e) {
      // noop - don't break the app if title formatting fails
    }
    // We only want to update when template or data references change shallowly
  }, [template, JSON.stringify(data || {})]);
}
