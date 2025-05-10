import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add title and description for SEO
const titleElement = document.createElement("title");
titleElement.textContent = "Appuntamenti con Pine";
document.head.appendChild(titleElement);

const descriptionElement = document.createElement("meta");
descriptionElement.setAttribute("name", "description");
descriptionElement.setAttribute("content", "Prenota appuntamenti esclusivi con la personalità più ricercata.");
document.head.appendChild(descriptionElement);

// Add font imports
const fontLink = document.createElement("link");
fontLink.setAttribute("href", "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap");
fontLink.setAttribute("rel", "stylesheet");
document.head.appendChild(fontLink);

createRoot(document.getElementById("root")!).render(<App />);
