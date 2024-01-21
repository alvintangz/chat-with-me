import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log(`
          _       _         _______                  
    /\\   | |     (_)       |__   __|                 
   /  \\  | |_   ___ _ __      | | __ _ _ __   __ _   
  / /\\ \\ | \\ \\ / / | '_ \\     | |/ _\` | '_ \\ / _\` |  
 / ____ \\| |\\ V /| | | | |    | | (_| | | | | (_| |_ 
/_/    \\_\\_| \\_/ |_|_| |_|    |_|\\__,_|_| |_|\\__, (_)
                                               __/ |  
                                              |___/  

Feel free to explore!
`);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
