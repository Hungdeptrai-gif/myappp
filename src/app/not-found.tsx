import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Page not found</p>
      <Link 
        href="/" 
        style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#6366f1',
          borderRadius: '0.5rem',
          fontSize: '1.1rem',
          fontWeight: '500'
        }}
      >
        Go home
      </Link>
    </div>
  );
}
