//Feature is to be ran in webpage of 5510px height by 1440px width
import { useState, useEffect } from 'react';
import './PhotoCarousel.css';
const RAW_IMAGES = [
    'https://www.columbiaspectator.com/resizer/v2/DYB2N42SDBHB7G2MBC3ZNHHDF4.jpg?auth=84edb205be81de8733fb33f7f090e94743b9ff3b53f5509858f169d208c14e62',
    'https://www.columbiaspectator.com/resizer/v2/G6AS5JL5RJAZHO3BR5YURTLPZE.jpg?auth=9ebecf90c2267afe2e25084440db1b525e95d81c30c1a551a54856710cb30995',
    'https://www.columbiaspectator.com/resizer/v2/BWNKRAT3EVEWHJTK7JN5TM4MJ4.jpg?auth=a14c71cb57091c8a0c819fb2833addcfabe20cf6051e2f11556a13c8f6c715c2',
    'https://www.columbiaspectator.com/resizer/v2/XNFFGGJIKZDSDMSVNA3GXYVV5Q.jpg?auth=feb12b323bc7a35d7b952de6232cc1c8a5e0947992068d2c8cf7152489852571',
    'https://www.columbiaspectator.com/resizer/v2/6LGT2MBKY5BQTGMRQ4NR3X4P4M.jpg?auth=b157209dc758e28b525abc1f5c1f96c56ba9204abd1811c63845a86c5750c84e',
    'https://www.columbiaspectator.com/resizer/v2/SK27DKMU6BDCNA5EMUBAYVZYVY.jpg?auth=3e51a1260a6287da388e640b89b7a1001a84b8cfc180202e9cf43897db3c39aa',
    'https://www.columbiaspectator.com/resizer/v2/24JLTRAC4VDQVNV4YADBJ37V5E.jpg?auth=89cecd28bd5be3ef9387444511a69c51738586eca39abb5b0c18319e79670d76',
    'https://www.columbiaspectator.com/resizer/v2/QSKIZQSHQJAXXI2REWTMWCLLPU.jpg?auth=319469e829f8e814572afb3ad58b11343814652fc13274db9b19160f170a0bef',
    'https://www.columbiaspectator.com/resizer/v2/D6VZ4JBWFRHBRC54Z6FHX5ZGYE.jpg?auth=06b81082a84759110d7a615b7101973a899ede84ed51234feefe0fe855800844',
    'https://www.columbiaspectator.com/resizer/v2/SDD442PDOBEG7A3ZU2CMI7GWQI.jpg?auth=0a54a3aa574cb0e4547627f36eb4de9de3e71dd444b1ce9de94822bab237b3d2',
    'https://www.columbiaspectator.com/resizer/v2/AXDWHUXS7ZCCLHGDP652UDR4E4.jpg?auth=b3e8aad9abfd25382b28d81f0668fd4d926e6313c972e803f1131f7c50d32bcb',
    'https://www.columbiaspectator.com/resizer/v2/ZEHIKWJJCJHM5K3BMH2V3RKU3A.jpg?auth=34ef217d95b1c232d4e6287577aac405b98fe2f877d148bfbfe306a5743009e9',
    'https://www.columbiaspectator.com/resizer/v2/EW3XOMSGI5GPBD7COLGNFBURZM.jpg?auth=1b1e241ed4baeabe61567f68d8d1623e542e97d8355d8cb95703281b911a192c',
    'https://www.columbiaspectator.com/resizer/v2/NMLL57YHHZFIJHPNDR2SH442DM.jpg?auth=ead1572e9fadd6f71659e60fa42ed60d3ae8290768e8dba64403625d3f8db174',
    'https://www.columbiaspectator.com/resizer/v2/GUEBWM5UZBGCXKY24A4CK2FHYQ.jpg?auth=01fc72f4fc860a6d04cfe1e4ad2e7e845d1365e6b24fd5b7a992612b568fee26',
    'https://www.columbiaspectator.com/resizer/v2/UY7U26WXFBE27ASOTDEYKQ2LTI.JPG?auth=3c12760721bd2724aafa08302975cbfe0d33bdae3a605dd96d19e1aee4b29e23',
]
// Ask the Spectator resizer for a 1600px-wide copy (2x the 769px frame)
// instead of the ~1MB originals
const IMAGES = RAW_IMAGES.map((url) => `${url}&width=1600`);

function PhotoCarousel(){
    const [currentIndex, setCurrentIndex] = useState(0);

    // Preload every slide on mount so clicking through shows cached images
    useEffect(() => {
        IMAGES.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);
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
        <div id="photos" className="photo-carousel">
            <div className="photo-carousel__inner">
                <h1 className="photo-carousel__heading">Homecoming past to present</h1>
                <div className="photo-carousel__stage">
                    <button
                        className="photo-carousel__arrow photo-carousel__arrow--prev"
                        onClick={() => handleNavigate('backward')}
                        aria-label="Previous photo"
                    />
                    <div className="photo-carousel__frame">
                        <img
                            src={IMAGES[currentIndex]}
                            alt={`Slide ${currentIndex + 1}`}
                        />
                    </div>
                    <button
                        className="photo-carousel__arrow photo-carousel__arrow--next"
                        onClick={() => handleNavigate('forward')}
                        aria-label="Next photo"
                    />
                </div>
            </div>
        </div>
    );
}
export default PhotoCarousel;