import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Connection speed detection for optimization
if ('connection' in navigator) {
  const connection = (navigator as any).connection;
  if (connection && (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
    // Set low-data mode attribute for CSS targeting
    document.documentElement.setAttribute('data-connection', 'slow');
    
    // For slow connections, we can defer non-critical resources
    const style = document.createElement('style');
    style.textContent = `
      img:not([loading="eager"]) {
        content-visibility: auto;
      }
      .low-priority-bg {
        background-image: none !important;
      }
    `;
    document.head.appendChild(style);
  }
}

createRoot(document.getElementById("root")!).render(<App />);
