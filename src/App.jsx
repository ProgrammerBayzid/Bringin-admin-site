import { RouterProvider } from "react-router-dom";
import { route } from "./Routes/Routes";

function App() {
  
  return (
    <div>
      <div>
        <RouterProvider router={route}></RouterProvider>
      </div>
    </div>
  );
}

export default App;
