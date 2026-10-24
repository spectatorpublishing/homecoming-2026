import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import './PrintEdition.css';

const FLIP_MS = 800;
const MOBILE_QUERY = '(max-width: 767px)';

function useIsMobile() {
    return useSyncExternalStore(
        (onChange) => {
            const mq = window.matchMedia(MOBILE_QUERY);
            mq.addEventListener('change', onChange);
            return () => mq.removeEventListener('change', onChange);
        },
        () => window.matchMedia(MOBILE_QUERY).matches,
        () => false,
    );
}

// Clickable story boxes laid over a page image, linking to the web version
function Hotspots({ stories }) {
    return stories.map((s) => {
        const [left, top, width, height] = s.box;
        return (
            <a
                key={s.url}
                className="print-hotspot"
                href={s.url}
                target="_blank"
                rel="noreferrer"
                style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
            >
                <span className="print-hotspot__tag">Read online ↗</span>
                <span className="visually-hidden">{s.title}</span>
            </a>
        );
    });
}

function Page({ page, index, side, showImage, onZoom }) {
    return (
        <div className={`print-page print-page--${side}`}>
            {showImage && <img src={page.src} alt={page.alt} draggable="false" />}
            <Hotspots stories={page.stories} />
            <button className="print-page__zoom" onClick={() => onZoom(index)} aria-label={`Zoom in on page ${index + 1}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path d="M15.5 15.5 21 21M10.5 7.5v6M7.5 10.5h6" />
                </svg>
            </button>
        </div>
    );
}

// Full-resolution reader; the native <dialog> handles Escape and focus trapping
function ZoomDialog({ pages, index, onChange, onClose }) {
    const dialogRef = useRef(null);
    const scrollRef = useRef(null);
    const isOpen = index !== null;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen && !dialog.open) dialog.showModal();
        if (!isOpen && dialog.open) dialog.close();
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, [index]);

    const page = isOpen ? pages[index] : null;
    return (
        <dialog ref={dialogRef} className="print-zoom" onClose={onClose} aria-label="Print edition page viewer">
            {page && (
                <>
                    <div className="print-zoom__bar">
                        <button onClick={() => onChange(index - 1)} disabled={index === 0} aria-label="Previous page">←</button>
                        <span>Page {index + 1} of {pages.length}</span>
                        <button onClick={() => onChange(index + 1)} disabled={index === pages.length - 1} aria-label="Next page">→</button>
                        <button className="print-zoom__close" onClick={onClose} aria-label="Close">✕</button>
                    </div>
                    <div className="print-zoom__scroll" ref={scrollRef}>
                        <div className="print-zoom__page">
                            <img src={page.zoomSrc} alt={page.alt} />
                            <Hotspots stories={page.stories} />
                        </div>
                    </div>
                </>
            )}
        </dialog>
    );
}

function PrintEdition({ id, sectionTitle, pdf, pages }) {
    const isMobile = useIsMobile();
    const leafCount = Math.ceil(pages.length / 2);

    // Desktop: number of leaves turned (0 = closed on the front page).
    // Mobile: index of the single page on screen.
    const [flipped, setFlipped] = useState(0);
    const [turning, setTurning] = useState(null);
    const [mobilePage, setMobilePage] = useState(0);
    const [zoomIndex, setZoomIndex] = useState(null);
    const touchStartX = useRef(null);

    useEffect(() => {
        if (turning === null) return;
        const t = setTimeout(() => setTurning(null), FLIP_MS);
        return () => clearTimeout(t);
    }, [turning]);

    // Warm the cache for the spread after the next one
    useEffect(() => {
        const ahead = isMobile ? [mobilePage + 1] : [flipped * 2 + 1, flipped * 2 + 2];
        ahead.forEach((i) => {
            if (pages[i]) new Image().src = pages[i].src;
        });
    }, [flipped, mobilePage, isMobile, pages]);

    function turn(direction) {
        if (isMobile) {
            setMobilePage((p) => Math.min(Math.max(p + direction, 0), pages.length - 1));
            return;
        }
        const next = flipped + direction;
        if (next < 0 || next > leafCount) return;
        setTurning(direction > 0 ? flipped : next);
        setFlipped(next);
    }

    function handleKeyDown(e) {
        if (e.key === 'ArrowRight') turn(1);
        if (e.key === 'ArrowLeft') turn(-1);
    }

    function handleTouchEnd(e) {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 40) turn(dx < 0 ? 1 : -1);
    }

    const atStart = isMobile ? mobilePage === 0 : flipped === 0;
    const atEnd = isMobile ? mobilePage === pages.length - 1 : flipped === leafCount;

    let status;
    if (isMobile) status = `Page ${mobilePage + 1} of ${pages.length}`;
    else if (flipped === 0) status = 'Front page';
    else if (flipped === leafCount) status = 'Back page';
    else status = `Pages ${flipped * 2}–${flipped * 2 + 1} of ${pages.length}`;

    const bookState = flipped === 0 ? 'closed-front' : flipped === leafCount ? 'closed-back' : 'open';

    return (
        <section id={id} className="print-edition">
            <div className="print-edition__inner">
                <h2 className="print-edition__heading">{sectionTitle}</h2>
                <p className="print-edition__dek">
                    Flip through the print version of our Homecoming Special Edition!
                </p>

                <div
                    className="print-edition__stage"
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                    onTouchEnd={handleTouchEnd}
                    aria-roledescription="print edition reader"
                    aria-label="Print edition. Use the left and right arrow keys to turn pages."
                >
                    <button
                        className="print-edition__arrow print-edition__arrow--prev"
                        onClick={() => turn(-1)}
                        disabled={atStart}
                        aria-label="Previous page"
                    />

                    {isMobile ? (
                        <div className="print-single">
                            <Page
                                page={pages[mobilePage]}
                                index={mobilePage}
                                side="single"
                                showImage
                                onZoom={setZoomIndex}
                            />
                        </div>
                    ) : (
                        <div className={`print-book print-book--${bookState}`}>
                            {Array.from({ length: leafCount }, (_, i) => {
                                const isFlipped = i < flipped;
                                const frontIndex = i * 2;
                                const backIndex = i * 2 + 1;
                                // Only the two pages facing the reader take clicks and focus
                                const frontVisible = i === flipped;
                                const backVisible = i === flipped - 1;
                                const showImage = Math.abs(i - flipped) <= 2;
                                const z = turning === i ? 100 : isFlipped ? i : leafCount * 2 - i;
                                return (
                                    <div
                                        key={i}
                                        className={`print-leaf ${isFlipped ? 'print-leaf--flipped' : ''}`}
                                        style={{ zIndex: z }}
                                    >
                                        <div className="print-leaf__face print-leaf__face--front" inert={!frontVisible} aria-hidden={!frontVisible}>
                                            <Page page={pages[frontIndex]} index={frontIndex} side="right" showImage={showImage} onZoom={setZoomIndex} />
                                        </div>
                                        {pages[backIndex] && (
                                            <div className="print-leaf__face print-leaf__face--back" inert={!backVisible} aria-hidden={!backVisible}>
                                                <Page page={pages[backIndex]} index={backIndex} side="left" showImage={showImage} onZoom={setZoomIndex} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <button
                        className="print-edition__arrow print-edition__arrow--next"
                        onClick={() => turn(1)}
                        disabled={atEnd}
                        aria-label="Next page"
                    />
                </div>

                <div className="print-edition__footer">
                    <span className="print-edition__status" aria-live="polite">{status}</span>
                    <a className="print-edition__download" href={pdf} download>
                        Download the PDF
                    </a>
                </div>
            </div>

            <ZoomDialog
                pages={pages}
                index={zoomIndex}
                onChange={setZoomIndex}
                onClose={() => setZoomIndex(null)}
            />
        </section>
    );
}

export default PrintEdition;
