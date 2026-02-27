export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        padding: '10px 16px',
        borderRadius: 8,
        background: '#dfe7ff',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  );
}
