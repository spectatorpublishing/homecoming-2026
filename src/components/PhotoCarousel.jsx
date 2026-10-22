import React, { useState } from 'react';
function PhotoCarousel(){
    const IMAGES = [
        'https://picsum.photos/id/1018/800/500',
        'https://picsum.photos/id/1015/800/500',
        'https://picsum.photos/id/1019/800/500',
        'https://picsum.photos/id/1025/800/500',
    ]
    const [currentIndex, setCurrentIndex] = useState(0);
    function ImageClickThrough(direction){
        if(IMAGES.length === 0){
            return;
        }
        if(direction === 'forward'){
            setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
        }
        if(direction === 'backward'){
            setCurrentIndex((prevIndex) => 
                prevIndex === 0 ? IMAGES.length - 1 : prevIndex - 1
            );
        }
    };
    
    const handleNavigate = (direction) => {
        if (direction === 'forward') {
            ImageClickThrough('forward');
        } else if (direction === 'backward') {
            ImageClickThrough('backward');
        }
    }
    return(
        <div style={{ width: '1439px', height: '901px', top: '1270px',margin: '0 auto', backgroundColor: '#E2F0EC', position: 'relative' }}>
            <div style={{width: '1059px', height: '50px', top: '77px', left: '191px', position: 'absolute', angle: '0 deg', opacity: '1', textAlign:'left'}}>
                <h1 style={{ fontFamily: 'Source Serif Pro', fontWeight: 700, fontSize: '40px', lineHeight: '100%', textTransform: 'uppercase', color: '#1D3863' }}>FEATURED PHOTOS</h1>            
            </div>
            <div style={{ 
                textAlign: 'center',
                position: 'absolute',
                top: '204px',
                left: '336px',
                width: '769px',
                height: '541px',
                backgroundColor: '#D9D9D9',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 4px 4px 0px #00000040'
            }}>
                <img 
                    src={IMAGES[currentIndex]} 
                    alt= {`Slide ${currentIndex + 1}`}
                    style={{width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        display: 'block'}}>
                </img>
            </div>
            <div>
                <button onClick={() => handleNavigate('backward')} 
                    style={{
                    width: '60px',
                    height: '60px',
                    top: '438px',
                    left: '224px',
                    position: 'absolute',
                    transform: 'rotate(-90deg)',
                    opacity: 1,
                    cursor: 'pointer',
                    backgroundColor: '#4D95BC', 
                    border: 'none',
                    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', 
                    }}>
                </button>
                <button onClick={() => handleNavigate('forward')} 
                style={{
                    width: '60px', 
                    height: '60px', 
                    position: 'absolute', 
                    top: '438px', 
                    left: '1146px', 
                    transform: 'rotate(90deg)', 
                    opacity: 1, 
                    cursor: 'pointer',
                    backgroundColor: '#4D95BC', 
                    border: 'none', 
                    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', 
                    }}>
                </button>
            </div>
        </div>
    );
}
export default PhotoCarousel;