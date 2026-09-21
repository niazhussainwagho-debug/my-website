export function cleanPhone(input: string): string | null {
  const cleaned = input.replace(/[\s\-().]/g, "");
  const hasLeadingPlus = cleaned.startsWith("+");
  const digits = cleaned.replace(/\D/g, "");

  if (digits.length < 7 || digits.length > 15) return null;
  return hasLeadingPlus ? `+${digits}` : digits;
}
