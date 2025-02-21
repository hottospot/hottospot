import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "../../pages/Map.css";
import { useEffect } from "react";
import { Drawer } from "vaul";

import {
  Circle,
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { Box, Modal, Typography } from "@mui/material";
import AlbumModalSheet from "./AlbumModalSheet";
import HotPinLocate from "../hotMap/HotPinLocate";
import AlbumPinLocate from "./AlbumPinLocate";
import HotModalSheet from "../hotModalSheet/HotModalSheet";
import getAllLocation from "../../firebase/getTable/getAllLocation";

const AlbumMap = ({latitude,longitude,name}) => {
  const [locationData, setLocationData] = useState([]);
  const [isOpen, setIsOpen] = useState(false); //マーカー選択
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
    name: null,
  }); //選択したマーカーの緯度と経度

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLocation();
        console.log("locationData:", data); // デバッグ用
        setLocationData(data || []);
      } catch (error) {
        console.error("Error fetching location data:", error);
        setLocationData([]);
      }
    };

    fetchData();
  }, []); // 初回のみ取得

  if (latitude === null || longitude === null) {
    return <p>現在地を取得中...</p>;
  }

  const center = [latitude, longitude];

  return (
    <div>
      <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
        />
        <Marker position={center} />

        {/* ここをAlbumPinLocateにしたらアルバムの画面に */}
        {locationData && (
          <HotPinLocate
            setIsOpen={setIsOpen}
            setPosition={setPosition}
            locationData={locationData}
          />
        )}
      </MapContainer>

      {/* ここをAlbumModalSheetにしたらアルバムの画面に */}
      <HotModalSheet
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setPosition={setPosition}
        position={position}
      />
    </div>
  );
};

export default AlbumMap;
