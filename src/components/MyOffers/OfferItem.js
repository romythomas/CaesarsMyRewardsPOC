import React from "react";

function myOfferDetails() {
    alert("TODO!");
}
const OfferItem = (props) => {
    const { offer } = props;
    return (
        <div className="item">
            <p className="type">{offer.type}</p>
            <p className="title">{offer.title}</p>
            <p className="code">{offer.id}</p>
            <p className="validity">{new Date(offer.start).toLocaleDateString()} - {new Date(offer.end).toLocaleDateString()}</p>
            <button className="myrewards-button" onClick={myOfferDetails}>
                Details
            </button>
        </div>
    );
};

export default OfferItem;
