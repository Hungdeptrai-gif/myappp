export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          🎨 Custom Gift Creator
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Design your perfect personalized gift in 5 easy steps
        </p>
        <div style={{ 
          background: 'white', 
          color: '#374151',
          padding: '2rem',
          borderRadius: '1rem',
          marginTop: '2rem'
        }}>
          <h2>Coming Soon!</h2>
          <p>Our gift customization app is under development.</p>
          <p>Check back soon for the full experience!</p>
        </div>
      </div>
    </div>
  );
}
