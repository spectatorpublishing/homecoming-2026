import './LetterFromEditor.css';

function LetterFromEditor() {
  return (
    <section className="letter-section">
      <img src="/homecoming_illo.jpeg" alt="Letter from the Editor" className="letter-image" />

      <div className="letter-content">
        <p className="letter-body">Dear Reader,</p>
        <p className="letter-body">[NOT REAL TEXT] Welcome to Columbia! As you immerse yourself in the University community and settle into your new home, you will encounter a campus facing a pivotal moment in its history as you, too, undergo significant change. You probably have lots of lingering questions about what the years ahead will look like and how to navigate all of Columbia's different facets. Inside this special issue, you will find everything we at Spectator think first-year students should know as you acquaint yourself with campus life.</p>
        <p className="letter-body">Spectator is a financially independent nonprofit organization and the largest student-run news media group on campus, serving tens of thousands of readers across Columbia, Morningside Heights, and West Harlem. We have a 148-year tradition of documenting history as it unfolds through in-depth, well-reported stories that hold institutional power to account.</p>
        <p className="letter-body">Joining Spec is one of the best ways to kick off your four years at Columbia. When you become a member of the Spec family, nestled in our office in Riverside Church, you step into a community of sharp and passionate students who care deeply about the work they do. Joining Spec is one of the best ways to kick off your four years at Columbia. When you become a member of the Spec family, nestled in our office in Riverside Church. Joining Spec is one of the best ways to kick off your four years at Columbia. When you become a member of the Spec family, nestled in our office in Riverside Church, you step into a community of sharp and passionate students who care deeply about the work they do. Joining Spec is one of the best ways to kick off your four years at Columbia. When you become a member of the Spec family, nestled in our office in Riverside Church.</p>
        <div className="signatures">
          <p className="signature">
            <span className="signature-name">First Last</span>
            <span className="signature-title">Editor in Chief</span>
          </p>
          <p className="signature">
            <span className="signature-name">First Last</span>
            <span className="signature-title">Managing Editor</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LetterFromEditor;