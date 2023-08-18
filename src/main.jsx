import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import Context from "./Components/Context/Context.jsx";
import { ToastContainer } from "react-toastify";
ReactDOM.createRoot(document.getElementById("root")).render(
 
      <Context>
            <ToastContainer position="top-center" />
            <App />
      </Context>
    
 
);
