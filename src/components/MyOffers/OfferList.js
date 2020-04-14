import React from 'react';
import OfferItem from './OfferItem'
import Slider from "react-slick";

const OfferList = (props) => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };
    return (
      <div className="list">
          <h2>{props.propertyName}</h2>
          <Slider {...settings}>
            {
                props.offerList.map(
                    (offer, index)=> {return <OfferItem key={index} offer={offer}/>}
                )
            }
          </Slider>
      </div>
    );
}

export default OfferList;