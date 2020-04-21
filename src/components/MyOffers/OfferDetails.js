import React from 'react';

const OfferDetails = (props) => {     
    
    return (   
        <div className="offersection">
                <h2>{offersubject}</h2>                
                <div className="offer-code">Offer Code: 
                    <strong> {offerid} </strong> </div>
                <div className="offer-expires">Expires: 
                    <strong>{end}</strong></div>
                <div><strong>Properties:</strong></div>
                    <span>{name}</span>

                <div id="offer-image">
                    <img src="" width="210" alt="offer details image" />
                </div>

                <div className="offer-expires">Description: {offerdescription}</div>
                
        </div>     
        <div id="offerfooter">
            <span><strong>HOW TO REDEEM</strong></span>
            <div>
                <p>To redeem your offer, please follow the instructions on your mail piece or email. A print out of this page is NOT a physical coupon and cannot be used for redemption where a coupon is required and some offers require a physical coupon to redeem.</p>
                <p>If this is a hotel offer and you book it online; you do not need to bring in your physical coupon when you check in.</p>
                <p>It is always best to bring your invite or mail piece with you when you visit.</p>
            </div>
            <span><strong>TERMS &amp; CONDITIONS</strong></span>
			<p>Caesars Rewards offers are non-transferable and non-negotiable. Offer is only valid at specified casinos. Caesars Rewards Card and valid photo ID must be presented upon redemption. Not responsible for lost or stolen vouchers or coupons.  Offers are based upon availability. Effective July 1, 2017, complimentary rooms booked will be subject to a $50 no-show fee, plus tax if the reservation is not canceled by 6pm on the day of arrival. Excludes bookings made for Caesars Windsor. Additional restrictions may apply. Please see your nearest Caesars Rewards Center for more details.</p>
        </div>  
    );
}

export default OfferDetails;