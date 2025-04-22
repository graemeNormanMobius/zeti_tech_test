import 'mapbox-gl/dist/mapbox-gl.css'
import { useContext, useMemo, useState } from 'react'
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl/mapbox';
import { SubHeader } from "../subHeader.tsx";
import { last10Journeys } from "../../data/mapData.tsx";
import { MAPBOX_API_KEY } from "../../tokens/tokens.tsx";
import { PinIcon } from "../icons.tsx";
import { ThemeContextV2 } from "../../context/themeContext.tsx";

export function MileageTrends() {
    const { isDarkTheme } = useContext(ThemeContextV2);
    const [popupInfo, setPopupInfo] = useState<any>(null);

    const pins = useMemo(
        () =>
            last10Journeys.map((city: any, index: number) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}
                    anchor="bottom"
                    onClick={e => {
                        e.originalEvent.stopPropagation();
                        setPopupInfo(city);
                    }}
                >
                    <PinIcon className={city.base ? "pinBase" : "pin"} />
                </Marker>
            )),
        []
    );

    return (
        <div className="standardCard">
            <SubHeader
                value={'Last 10 journeys'}
                showInfo={true}
                tooltipPlacement={'top'}
                tooltipContent={`A map showing the last 10 journeys completed by cars in your fleet`}
            />
            <div className="mapContainer">
                <Map
                    initialViewState={{
                        latitude: 51.57221810994013,
                        longitude: 0.476782642284334,
                        zoom: 9.5,
                        bearing: 0,
                        pitch: 0
                    }}
                    mapStyle={`mapbox://styles/mapbox/${isDarkTheme ? 'dark-v9' : 'light-v9'}`}
                    style={{ height: '400px', width: '100%' }}

                    mapboxAccessToken={MAPBOX_API_KEY}
                >
                    <GeolocateControl position="top-left" />
                    <FullscreenControl position="top-left" />
                    <NavigationControl position="top-left" />
                    <ScaleControl />

                    {pins}

                    {popupInfo && (
                        <Popup
                            anchor="top"
                            longitude={popupInfo.longitude}
                            latitude={popupInfo.latitude}
                            onClose={() => setPopupInfo(null)}
                        >
                            <div>
                                <span className="bodySmallEmp">City: </span>
                                <span className="bodySmall">{popupInfo.city}</span> <br />
                                <span className="bodySmallEmp">Location: </span>
                                <span className="bodySmall">{popupInfo.locationName}</span> <br />
                            </div>
                        </Popup>
                    )}
                </Map>
            </div>
        </div>
    );
}
