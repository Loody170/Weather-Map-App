import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Root";
import Home from "./Home";
import WeatherMap from "./WeatherMap";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home />},
      {path: "live-radar", element: <WeatherMap />},
      {},
    ],
  }
]);
  

function App() {
  return (

<RouterProvider router={router} />

  );
}

export default App;
