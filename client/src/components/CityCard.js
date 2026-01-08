function CityCard({ city, onClick }) {
    return (
        <div className="col-md-4 mb-3">
            <div
                className="card h-100 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={onClick}
            >
                {city.image_url && (
                    <img
                        src={city.image_url}
                        className="card-img-top"
                        alt={city.name}
                        style={{ height: "180px", objectFit: "cover" }}
                    />
                )}
                <div className="card-body">
                    <h5 className="card-title">{city.name}</h5>
                </div>
            </div>
        </div>
    );
}

export default CityCard;
