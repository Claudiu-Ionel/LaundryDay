import { useState, useEffect } from "react";
import "./background.css";

function Background() {
  // getting current date
  let today = new Date();
  const months = [
    "janiari",
    "februari",
    "mars",
    "april",
    "mai",
    "juni",
    "juli",
    "augusti",
    "september",
    "oktober",
    "november",
    "december",
  ];
  let month = months[today.getMonth()];
  let date =
    "den" + " " + today.getDate() + " " + month + " " + today.getFullYear();

  // getting current time
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    let getTime = setTimeout(function () {
      // polishing hours:
      let hrs = today.getHours();
      if (hrs < 10) {
        setHours("0" + hrs);
      } else {
        setHours(today.getHours());
      }
      // polishing the minutes:
      let mins = today.getMinutes();
      if (mins < 10) {
        setMinutes("0" + mins);
      } else {
        setMinutes(mins);
      }
      // polishing the seconds:
      let secs = today.getSeconds();
      if (secs < 10) {
        setSeconds("0" + secs);
      } else {
        setSeconds(secs);
      }
    }, 1000);
    return () => {
      clearTimeout(getTime);
    };
  }, [today]);

  // changing backgrounds according to seasons:
  const [seasonBackground, setSeasonBackground] = useState("main");

  useEffect(() => {
    if (month === "mars" || month === "april" || month === "mai") {
      setSeasonBackground("spring");
    } else if (month === "juni" || month === "juli" || month === "augusti") {
      setSeasonBackground("summer");
    } else if (
      month === "september" ||
      month === "oktober" ||
      month === "november"
    ) {
      setSeasonBackground("autumn");
    } else {
      setSeasonBackground("winter");
    }
  }, [month]);

  // setting links to background photo authors:
  const authors = [
    {
      season: "winter",
      author: "Aaron Burden",
      link: "https://unsplash.com/@aaronburden",
    },
    {
      season: "spring",
      author: "Ryan Stone",
      link: "https://unsplash.com/@rstone_design",
    },
    {
      season: "summer",
      author: "TJ Holowaychuk",
      link: "https://unsplash.com/@tjholowaychuk",
    },
    {
      season: "autumn",
      author: "Sora Sagano",
      link: "https://unsplash.com/@sorasagano",
    },
  ];

  const [authorName, setAuthorName] = useState(null);
  const [authorLink, setAuthorLink] = useState(null);

  let authorQueries = authors.filter((o) => o.season === seasonBackground);

  useEffect(() => {
    setAuthorName(authorQueries[0]?.author);
    setAuthorLink(authorQueries[0]?.link);
  }, [authorQueries]);

  console.log(hours + ":" + minutes + ":" + "seconds");

  return (
    <div className={seasonBackground}>
      <section className="timeDateLanguageContainer">
        <span class="showTime">
          {hours}:{minutes}:{seconds}
        </span>
        <span class="showDAte">{date}</span>
        <button>EN</button>
      </section>
      <section className="photoAuthorInfo">
        <p>Photo by </p>
        <a href={authorLink}>{authorName}</a>
      </section>
    </div>
  );
}

export default Background;
