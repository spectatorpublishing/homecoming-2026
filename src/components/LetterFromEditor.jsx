import './LetterFromEditor.css';

function LetterFromEditor() {
  return (
    <section className="letter-section">
      <img src="/homecoming_illo.jpeg" alt="Letter from the Editor" className="letter-image" />

      <div className="letter-content">
        <p className="letter-body">Dear reader,</p>
        <p className="letter-body">The hunt is on.</p>
        <p className="letter-body">In 2024, Columbia broke a 63-year curse, winning the Ivy League championship. This time, the wait may not be so long.</p>
        <p className="letter-body">Following a miraculous, last-second victory over Penn, your Columbia Lions enter homecoming with a shot to assert their claim in a wide-open Ivy League season. With a team led by new faces like first-year wide receiver Bryce Coleman, rising stars like sophomore defensive back MD Awe, and veteran leaders including senior quarterback Chase Goodwin, the Light Blue is making noise, and a first Homecoming win since 2021 could be the turning point.</p>
        <p className="letter-body">In this special edition, Spectator Sports covers everything from what’s happening on the field to the sidelines. Our writers are bringing you an introduction to Columbia’s precocious rookies, a look inside head coach Jon Poppe’s process in his third year, and a check-in with team captains senior linebacker Charlie Newton and junior defensive back Caleb Solomon. Beyond the gridiron, we spoke with the pep band, dug into the archives, and caught up with past stars.</p>
        <p className="letter-body">Whether you’re a first-year student making your maiden trek to Baker or an alum who has gone more times than you can count, this year’s Homecoming promises to be special. </p>
        <p className="letter-body">Roar, Lion, Roar.</p>
        <div className="signatures">
          <p className="signature">
            <span className="signature-name">Nicholas Fink</span>
            <span className="signature-title">Sports Editor</span>
          </p>
          <p className="signature">
            <span className="signature-name">Arielle Reider</span>
            <span className="signature-title">Sports Editor</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LetterFromEditor;