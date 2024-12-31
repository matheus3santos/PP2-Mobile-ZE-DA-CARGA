import { useState, useRef, useEffect } from "react";
import type { UserLocationChangeEvent } from "react-native-maps";
import MapView from "react-native-maps";

const LATITUDE_DELTA = 0.025;
const LONGITUDE_DELTA = 0.005;


export const useMapScreen = () => {
    const mapRef = useRef<MapView>(null);
    const [userLocation, setUserLocation] =
        useState<UserLocationChangeEvent['nativeEvent']['coordinate']>();

        useEffect(() => {
            if (userLocation) {
                mapRef.current?.animateToRegion({
                    longitude: userLocation.longitude,
                    latitude: userLocation.latitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                });
            }
        }, [userLocation]);




    const handleUserLocationChange = ({
        nativeEvent: { coordinate },
    }: UserLocationChangeEvent) => {
        setUserLocation(coordinate)
    };

    return {
        models: {
            mapRef,
        },
        operations: {
            handleUserLocationChange,
        },
    }
};
