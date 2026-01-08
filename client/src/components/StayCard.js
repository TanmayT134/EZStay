function StayCard({ stay, onClick }) {
    return (
        <div className="col-md-4 mb-3">
            <div
                className="card h-100 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={onClick}
            >
                {stay.image_url && (
                    <img
                        src={stay.image_url}
                        className="card-img-top"
                        alt={stay.title}
                        style={{ height: "180px", objectFit: "cover" }}
                    />
                )}
                <div className="card-body">
                    <h5 className="card-title">{stay.title}</h5>
                    <p className="card-text">₹{stay.price} / night</p>
                </div>
            </div>
        </div>
    );
}

export default StayCard;
