import { Fragment, useState, useEffect } from 'react';
import './NavBar.css';
import sections from '../data/index.js';
import videos from '../data/videos.js';
import printEdition from '../data/printEdition.js';

function NavBar() {
    // Only used on mobile, where the bar collapses into a hamburger menu
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!menuOpen) return;
        const closeOnEscape = (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        document.addEventListener('keydown', closeOnEscape);
        return () => document.removeEventListener('keydown', closeOnEscape);
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
        <a href="https://www.columbiaspectator.com/" target="_blank">
            <img
                id="home"
                className="logo"
                src="/MastHead.png"
                alt="Spectator MastHead"
            />
        </a>

            <div className="header1">
                <h1>HOMECOMING 2026</h1>
            </div>

            <button
                className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="site-nav"
            >
                <span />
                <span />
                <span />
            </button>

            <nav id="site-nav" className={`bar ${menuOpen ? 'bar--open' : ''}`}>
                <a href="#home" onClick={closeMenu}>Home</a>
                <a href="#photos" onClick={closeMenu}>Photos</a>
                {sections.map((section) => (
                    <Fragment key={section.id}>
                        <a href={`#${section.id}`} onClick={closeMenu}>
                            {section.navLabel || section.title}
                        </a>
                        {section.id === 'audio' && (
                            <a href={`#${videos.id}`} onClick={closeMenu}>{videos.navLabel}</a>
                        )}
                    </Fragment>
                ))}
                <a href={`#${printEdition.id}`} onClick={closeMenu}>{printEdition.navLabel}</a>
            </nav>
        </>
    );
}

export default NavBar;
