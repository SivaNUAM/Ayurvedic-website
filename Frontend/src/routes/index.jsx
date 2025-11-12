import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";

import Home from "../pages/Home";
import About from "../pages/About";
import Treatments from "../pages/Treatments";
import Doctors from "../pages/Doctors";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";
import BookAppointment from "../pages/BookAppointment";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "treatments",
        element: <Treatments />,
      },
      {
        path: "doctors",
        element: <Doctors />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "book-appointment",
        element: <BookAppointment />,
      },
      
      // Optional future pages (keep commented for now)
      // {
      //   path: "appointments",
      //   element: <Appointments />,
      // },
      // {
      //   path: "services/:id",
      //   element: <ServiceDetails />,
      // },
      // {
      //   path: "*",
      //   element: <NotFound />,
      // },
    ],
  },
]);
