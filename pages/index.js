import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import { generateMany } from '../lib/generator';

export default function Home() {
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState('end');
  const [specials, setSpecials] = useState('random');
  const [passwords, setPasswords] = useState([]);
  const [copied, setCopied] = useState(null);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState(null);

  const generate = useCallback(async () => {
    setLoading(true);
    setCopied(null);
    const result = await generateMany(count, { format, specials });
    setPasswords(result.passwords);
    setSource(result.source);
    setLoading(false);
  }, [count, format, specials]);

  useEffect(() => { generate(); }, [generate]);

  const copy = async (text, i) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      <Head>
        <title>Noun Password Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="container">
        <h1>Noun Password Generator</h1>
        <p className="subtitle">Noun + 4 digits + special characters · minimum 12 characters</p>

        <div className="options">
          <label>
            Format
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
              <option value="end">Autumn2026!!</option>
              <option value="middle">Riverbed@1896</option>
              <option value="random">Random</option>
            </select>
          </label>
          <label>
            Special characters
            <select value={specials} onChange={(e) => setSpecials(e.target.value)}>
              <option value="random">1 or 2</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </label>
          <label>
            How many
            <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </label>
        </div>

        <button className="generate" onClick={generate} disabled={loading}>
          {loading ? 'Generating…' : 'Generate'}
        </button>

        <ul className="list">
          {passwords.map((p, i) => (
            <li key={i}>
              <code>{p}</code>
              <span className="len">{p.length}</span>
              <button className="copy" onClick={() => copy(p, i)}>
                {copied === i ? 'Copied!' : 'Copy'}
              </button>
            </li>
          ))}
        </ul>

        {source === 'fallback' && (
          <p className="warn">Couldn't reach the noun API, so a backup word list was used.</p>
        )}
        <p className="note">Nouns from randomapi.dev · numbers and symbols are generated on your device.</p>
      </main>
    </>
  );
}
