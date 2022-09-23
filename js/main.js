const navData = [
  {
    link: "./index.html",
    text: "Acceuil",
  },
  {
    link: "./jobPage.html",
    text: "Voir les offres",
  },
];
const generateLayout = () => {
  const NAVBAR = document.createElement("nav");
  const WRAPPER = document.createElement("section");
  WRAPPER.classList.add("wrapper");
  navData.forEach((obj) => {
    const newLink = document.createElement("a");
    newLink.innerText = obj.text;
    newLink.setAttribute("href", obj.link);
    WRAPPER.appendChild(newLink);
  });
  NAVBAR.appendChild(WRAPPER);
  document.body.insertBefore(NAVBAR, document.body.firstChild);
};

const DATA = [
  {
    Job: "test",
    Contrat: "CDD",
    Entreprise: "JohnDoe Inc",
    x: 49.443,
    y: 1.09,
  },
  {
    Job: "test2",
    Contrat: "CDI",
    Entreprise: "XNPS",
    x: 49.5,
    y: 1.09,
  },
  {
    Job: "test3",
    Contrat: "CDI, CDD",
    Entreprise: "Super Entreprise",
    x: 49.2,
    y: 1.08,
  },
];

const JOB_CONTAINER = document.querySelector("[result-container]");

window.onload = () => {
  if (JOB_CONTAINER) {
    var map = L.map("map").setView([49.445, 1.09], 13);
    var marker = L.marker([49.445, 1.09]).addTo(map);
    map.addLayer(marker);
    const generateCard = (object) => {
      const CONTAINER = document.createElement("article");
      CONTAINER.classList.add("job-card");
      const CONTENT = Object.keys(object)
        .map((key, i) => {
          return key === "x" || key === "y"
            ? ""
            : `<span>${key} : ${object[key]}</span>`;
        })
        .join(" ");
      CONTAINER.innerHTML = CONTENT;
      CONTAINER.setAttribute("coordX", object.x);
      CONTAINER.setAttribute("coordY", object.y);
      CONTAINER.addEventListener("click", (e) => {
        map.removeLayer(marker);
        marker = L.marker([object.x, object.y]).addTo(map);
        map.setView([object.x, object.y], 13);
        map.addLayer(marker);
      });
      return CONTAINER;
    };
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    /*     fetch("./../data/data.json")
      .then((res) => res.json())
      .then((res) => {
        res.forEach((obj) => {
          JOB_CONTAINER.appendChild(generateCard(obj));
        });
      }); */
    DATA.forEach((obj) => {
      JOB_CONTAINER.appendChild(generateCard(obj));
    });
  }
};
