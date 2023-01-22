import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Headers';
import Home from "./pages/Home";
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

