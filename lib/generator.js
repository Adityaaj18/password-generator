import { NOUNS } from './nouns';

export const SPECIALS = '!@#$%&*?';
export const MIN_LENGTH = 12;
const API_URL = 'https://randomapi.dev/api/words';

function randomInt(max) {
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  let x;
  do { crypto.getRandomValues(buf); x = buf[0]; } while (x >= limit);
  return x % max;
}

const capitalise = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

export async function fetchNouns(count) {
  const params = new URLSearchParams({ type: 'noun', minLength: '7', maxLength: '12', count: String(count) });
  const res = await fetch(`${API_URL}?${params}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const json = await res.json();
  const list = Array.isArray(json) ? json : json.data;
  const words = (list || [])
    .map((item) => (typeof item === 'string' ? item : item.word))
    .filter((w) => typeof w === 'string' && /^[a-zA-Z]+$/.test(w));
  if (words.length === 0) throw new Error('API returned no usable nouns');
  return words;
}

export function buildPassword(noun, { format = 'end', specials = 'random' } = {}) {
  const word = capitalise(noun);
  let digits = '';
  for (let i = 0; i < 4; i++) digits += String(randomInt(10));
  let count = specials === 'random' ? 1 + randomInt(2) : Number(specials);
  if (word.length + 4 + count < MIN_LENGTH) count = 2;
  let special = '';
  for (let i = 0; i < count; i++) special += SPECIALS[randomInt(SPECIALS.length)];
  const fmt = format === 'random' ? (randomInt(2) ? 'end' : 'middle') : format;
  return fmt === 'middle' ? word + special + digits : word + digits + special;
}

export async function generateMany(n, options) {
  let nouns;
  let source = 'api';
  try {
    nouns = await fetchNouns(n);
  } catch (err) {
    console.warn('Noun API failed, using backup list:', err);
    nouns = Array.from({ length: n }, () => NOUNS[randomInt(NOUNS.length)]);
    source = 'fallback';
  }
  const passwords = Array.from({ length: n }, (_, i) => buildPassword(nouns[i % nouns.length], options));
  return { passwords, source };
}
