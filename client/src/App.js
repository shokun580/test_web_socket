import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');


function App() {
  const [counts, setCounts] = useState({ A: 0, B: 0, C: 0, D: 0 });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Socket connect error:', err.message);
    });

    socket.on('update', (data) => {
      setCounts(data);
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('update');
    };
  }, []);

  const handleClick = (key) => {
    socket.emit('press', key);
  };
  const handleReset = () => {
    socket.emit('reset');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔘 ระบบนับปุ่มแบบ Real-time</h1>

      <div style={styles.buttonGroup}>
        <button onClick={() => handleClick('A')} style={styles.button}>
          ปุ่ม A
        </button>
        <button onClick={() => handleClick('B')} style={styles.button}>
          ปุ่ม B
        </button>
        <button onClick={() => handleClick('C')} style={styles.button}>
          ปุ่ม C
        </button>
        <button onClick={() => handleClick('D')} style={styles.button}>
          ปุ่ม D
        </button>
      </div>
      {/* <div style={styles.buttonGroup}>
        {['A', 'B', 'C', 'D'].map((key) => (
          <button
            key={key}
            onClick={() => handleClick(key)}
            style={styles.button}
          >
            ปุ่ม {key}
          </button>
        ))}
      </div> */}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ปุ่ม</th>
            <th style={styles.th}>จำนวนที่กด</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(counts).map(([key, value]) => (
            <tr key={key}>
              <td style={styles.td}>{key}</td>
              <td style={styles.td}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.resetContainer}>
        <button onClick={handleReset} style={styles.resetButton}>
          🔄 รีเซ็ตค่าทั้งหมด
        </button>
      </div>
    </div>
  );
}

const styles = {
  resetContainer: {
    marginTop: '20px',
  },
  resetButton: {
    padding: '10px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  container: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    padding: '40px 20px',
    background: '#f0f4f8',
    minHeight: '100vh',
  },
  title: {
    color: '#333',
    fontSize: '2rem',
    marginBottom: '30px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '30px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #007bff',
    backgroundColor: '#fff',
    color: '#007bff',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  table: {
    margin: '0 auto',
    borderCollapse: 'collapse',
    width: '320px',
    background: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  th: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    fontSize: '15px',
    color: '#333',
  },
};

export default App;