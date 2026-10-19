import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
};

export default App;
