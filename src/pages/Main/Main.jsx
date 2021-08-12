import { useState } from "react";
import "./main.css";

const backgrounds = [
  {
    id: 1,
    season: "winter",
    authorName: "Aaron Burden",
    authorLink: "https://unsplash.com/@aaronburden",
  },
  {
    id: 2,
    season: "spring",
    authorName: "Ryan Stone",
    authorLink: "https://unsplash.com/@rstone_design",
  },
  {
    id: 3,
    season: "summer",
    authorName: "TJ Holowaychuk",
    authorLink: "https://unsplash.com/@tjholowaychuk",
  },
  {
    id: 4,
    season: "autumn",
    authorName: "Sora Sagano",
    authorLink: "https://unsplash.com/@sorasagano",
  },
];

const Main = () => {
  return <main className="main"></main>;
};

export default Main;
