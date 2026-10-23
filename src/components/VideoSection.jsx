import { useEffect } from 'react';
import './VideoSection.css';

const EMBED_SCRIPT = 'https://www.instagram.com/embed.js';

// Instagram's embed.js turns each <blockquote class="instagram-media"> into an
// iframe. Load it once, then ask it to re-scan whenever the reels change.
function processEmbeds() {
    if (window.instgrm) {
        window.instgrm.Embeds.process();
        return;
    }
    if (document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) return;
    const script = document.createElement('script');
    script.src = EMBED_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
}

function VideoSection({id, sectionTitle, reels}) {
    useEffect(() => {
        processEmbeds();
    }, [reels]);

    return (
        <section id={id} className="section-container">
            <h2 className="section-title">{sectionTitle}</h2>
            <div className="video-section">
            {reels.map((url) => (
                <div key={url} className="video-section__item">
                    <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={"https://www.instagram.com/p/DeSFC1QCqu3/"}
                        data-instgrm-version="14"
                    >
                        <a href={"https://www.instagram.com/p/DeSFC1QCqu3/"} target="_blank" rel="noreferrer">
                            View this reel on Instagram
                        </a>
                    </blockquote>
                </div>
            ))}
            </div>
        </section>
    );
}

export default VideoSection;
