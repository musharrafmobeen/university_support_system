import React from 'react';
import MuiImageSlider from 'mui-image-slider';
import IIUI_1 from '../../resources/design-images/IIUI_BG_IMGS/IIUI_1.jpg';
import IIUI_2 from '../../resources/design-images/IIUI_BG_IMGS/IIUI_2.jfif';
import IIUI_3 from '../../resources/design-images/IIUI_BG_IMGS/IIUI_3.jpg';

const Slideshow = () => {
    const images = [
        IIUI_1,
        IIUI_2,
        IIUI_3
    ];
    return (
        // <div className="slide-container">
        //     <div className="each-slide">
        //         <div style={{ 
        //             'backgroundImage': `url(${IIUI_1})` ,
        //             height:"30%"
        //             }}>
        //             <span>Slide 1</span>
        //         </div>
        //     </div>
        //     <div className="each-slide">
        //         <div style={{ 'backgroundImage': `url(${IIUI_2})` }}>
        //             <span>Slide 2</span>
        //         </div>
        //     </div>
        //     <div className="each-slide">
        //         <div style={{ 'backgroundImage': `url(${IIUI_3})` }}>
        //             <span>Slide 3</span>
        //         </div>
        //     </div>
        // </div>
        // <div>
        //     <ul id="all_slides">
        //         <li class="slide active"></li>
        //         <li class="slide"></li>
        //         <li class="slide"></li>
        //     </ul>
        //     <script src="./main.js"></script>
        // </div>
        <div>
            <MuiImageSlider
                images={images}
                autoPlay
            />
        </div>
    )
}

export default Slideshow;