export async function health() {
  const res = await fetch('http://localhost:3001/health');
  return res.json();
}
