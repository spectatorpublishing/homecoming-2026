import './NavBar.css';

function NavBar() {
    return (
        <>
            <img
                className="logo"
                src="/MastHead.png"
                alt="Spectator MastHead"
            />

            <div className="header1">
                <h1>HOMECOMING 2026: TITLE</h1>
            </div>

            <div className="bar">
                {/* //replace these with the actual link when given */}
                <a href="#home">Home</a>
                <a href="#photos">Photos</a>
                <a href="#section1">Section</a>
                <a href="#section2">Section</a>
                <a href="#section3">Section</a>
                <a href="#section4">Section</a>
            </div>
        </>
    );
}

export default NavBar;