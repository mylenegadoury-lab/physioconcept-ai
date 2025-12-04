export default function Layout({ children }) {
  return (
    <div style={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      background: "white",
      borderRadius: "10px",
      marginTop: "40px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      {children}
    </div>
  );
}
