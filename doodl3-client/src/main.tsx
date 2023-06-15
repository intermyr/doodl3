import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store";
import Create from "./pages/Create";
import MyDoodl3s from "./pages/MyDoodl3s";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Create />} />
          <Route path="my" element={<MyDoodl3s />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
