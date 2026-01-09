function SkeletonCard() {
    return (
        <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">

                {/* Fake image */}
                <div
                    style={{
                        height: "180px",
                        backgroundColor: "#e9ecef"
                    }}
                ></div>

                {/* Fake text */}
                <div className="card-body">
                    <div
                        style={{
                            height: "20px",
                            width: "70%",
                            backgroundColor: "#e9ecef",
                            marginBottom: "10px"
                        }}
                    ></div>

                    <div
                        style={{
                            height: "14px",
                            width: "40%",
                            backgroundColor: "#e9ecef"
                        }}
                    ></div>
                </div>

            </div>
        </div>
    );
}

export default SkeletonCard;
