import { RouterProvider } from "react-router-dom";
import routes from "./routers/router";

// antd
import 'antd/dist/reset.css';

import "./App.scss";

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
