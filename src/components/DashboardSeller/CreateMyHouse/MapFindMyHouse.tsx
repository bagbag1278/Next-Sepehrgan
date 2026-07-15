"use client";

import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

interface PropertyMapProps {

    formData: any;

    setFormData: React.Dispatch<
        React.SetStateAction<any>
    >;

}

const LocationMarker = ({
    setFormData,
}: any) => {

    useMapEvents({

        async click(e) {

            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            try {

                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&accept-language=fa&lat=${lat}&lon=${lng}`
                );

                const data = await res.json();

                const address = data.address;

                const shortAddress = [
                    address.city, address.town, address.village, address.road, 
                    address.neighbourhood, address.suburb,
                ]
                    .filter(Boolean)
                    .join(" - ");

                setFormData((prev: any) => ({

                    ...prev,

                    location: {

                        lat,
                        lng,

                        address:
                            shortAddress ||

                            "آدرسی پیدا نشد",

                    },

                }));

            } catch (err) {

                console.log(err);

            }

        },

    });

    return null;

};

const MapFindMyHouse = ({formData,setFormData,}: PropertyMapProps) => {
    return (
        <MapContainer
            center={[35.6892, 51.389]}
            zoom={12}
            className="w-full h-full -5"
        >

            <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker
                setFormData={setFormData}
            />

            {
                formData.location.lat &&
                formData.location.lng && (

                    <Marker
                        position={[
                            formData.location.lat,
                            formData.location.lng,
                        ]}
                    />

                )
            }

        </MapContainer>

    );

};

export default MapFindMyHouse;