// Normalizes a Brazilian/international phone into wa.me digits. Returns null if invalid.
export function normalizePhone(input: string): string | null {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.length === 10 || d.length === 11) d = "55" + d; // BR local with DDD
  if (d.length < 12 || d.length > 15) return null;
  return d;
}

export function waLink(number: string | null, text: string): string {
  const q = `?text=${encodeURIComponent(text)}`;
  return number ? `https://wa.me/${number}${q}` : `https://wa.me/${q}`;
}
