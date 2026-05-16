import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Services from "../pages/Services";
import Providers from "../pages/Providers";
import Profile from "../pages/Profile";
import ServiceDetail from "../pages/ServiceDetails";
import ProviderRegister from "../pages/ProviderRegister";
import BookingSuccess from "../pages/BookingSuccess";
import ProviderSuccess from "../pages/ProviderSuccess";
import Auth from "../pages/Auth";
import ProtectedRoute from "../components/ProtectedRoute";
import GoogleSuccess from "../pages/GoogleSuccess";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
    <Route path="/services" element={<Services />} />
        <Route path="/services/:category" element={<ServiceDetail />} />
        <Route path="/providers" element={<Providers />} />
        <Route
  path="/provider/register"
  element={
    <ProtectedRoute>
      <ProviderRegister />
    </ProtectedRoute>
  }
/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/provider-success" element={<ProviderSuccess />} />
        <Route path="/auth" element={<Auth />} />
        <Route
  path="/google-success"
  element={<GoogleSuccess />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;