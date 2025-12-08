export default function Layout({ children }) {
  return (
    <>
      <div style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "24px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#1f2937"
      }}>
        {children}
      </div>
      <style>{`
        * {
          box-sizing: border-box;
        }
        
        body {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        h1 {
          font-size: 28px;
          color: #1e293b;
          margin: 0 0 20px 0;
        }
        
        h2 {
          font-size: 20px;
          color: #334155;
          margin: 20px 0 12px 0;
        }
        
        h3 {
          font-size: 18px;
          color: #475569;
          margin: 12px 0 8px 0;
        }
        
        p {
          line-height: 1.6;
          margin: 8px 0;
        }
        
        label {
          display: block;
          margin-top: 12px;
          font-weight: 500;
          color: #374151;
        }
        
        select {
          width: 100%;
          padding: 10px 12px;
          margin: 8px 0 16px 0;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          font-size: 16px;
          background-color: white;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        
        select:hover {
          border-color: #3b82f6;
        }
        
        select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        button {
          padding: 12px 24px;
          margin-top: 20px;
          font-size: 16px;
          font-weight: 600;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
          width: 100%;
        }
        
        button:hover:not(:disabled) {
          background-color: #2563eb;
        }
        
        button:disabled {
          background-color: #93c5fd;
          cursor: not-allowed;
        }
        
        ul {
          margin: 12px 0;
          padding-left: 24px;
        }
        
        li {
          margin: 8px 0;
          line-height: 1.5;
        }
      `}</style>
    </>
  );
}
