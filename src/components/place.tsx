import { FunctionComponent } from "react";

interface PlaceProps {
    place: any;
}

const Place: FunctionComponent<PlaceProps> = ({ place }) => {
    return <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title">{place.name}</h2>

            <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={() => {
                    window.open(`http://maps.google.com/?q=${place.formatted}`, "_blank")
                }}>Open Map</button>
            </div>
        </div>
    </div>
}

export default Place;