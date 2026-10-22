
import "./Credits.css";
import credits from "../data/credits.js";

function Credits() {
  const sections = Object.entries(credits);

  const columns = [[], [], []];
  const columnHeights = [0, 0, 0];

  // Her section'ı en kısa sütuna ekle
  function addSection(sectionData) {
    const section = sectionData[0];
    const people = sectionData[1];

    let shortestColumn = 0;

    for (let i = 1; i < columnHeights.length; i++) {
      if (columnHeights[i] < columnHeights[shortestColumn]) {
        shortestColumn = i;
      }
    }

    columns[shortestColumn].push(sectionData);

    columnHeights[shortestColumn] +=
      people.length * 22.2 + 27.6 + 10 + 30;
  }

  sections.forEach(addSection);

  function renderPerson(person) {
    return (
      <p>
        {person.name}, {person.role}
      </p>
    );
  }

  function renderSection(sectionData) {
    const section = sectionData[0];
    const people = sectionData[1];

    return (
      <div className="credits-sections">
        <h2>{section}</h2>
        {people.map(renderPerson)}
      </div>
    );
  }

  function renderColumn(column) {
    return (
      <div className="credits-column">
        {column.map(renderSection)}
      </div>
    );
  }

  return (
    <section id="credits" className="credits">
      <h1>
        The Columbia Daily Spectator Staff
        <br />
        Who Made This Issue Possible
      </h1>

      <div className="credits-container">
        {columns.map(renderColumn)}
      </div>
    </section>
  );
}

export default Credits;
