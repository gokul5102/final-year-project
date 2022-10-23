import React, { useRef, useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  FeatureGroup,
  Circle,
  Rectangle,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Mixin } from "leaflet";
import axios from "axios";
import { EditControl } from "react-leaflet-draw";
import swal from "sweetalert";
import {
  polygon,
  rectangle,
  polygon1,
  polygon2,
  polygon3,
  polygon4,
  polygon5,
  // rectangle1,
  // rectangle2,
  // rectangle3,
  // rectangle4,
  // rectangle5,
  // rectangle6,
} from "./coordinates";
import * as turf from "@turf/turf";
import booleanOverlap from "@turf/boolean-overlap";
const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});

const marker = L.icon({
  iconUrl: "./marker.png",
  iconSize: [38, 38],
});

const position = [51.505, -0.09];

function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectPosition]);

  return null;
}

const mapToArray = (arr = []) => {
  const res = [];
  arr.forEach(function (obj, index) {
    const key = Object.keys(obj)[0];
    const value = parseInt(key, 10);
    res.push([value, obj[key]]);
  });
  return res;
};

function isMarkerInsidePolygon(poly) {
  // var inside = false;
  // console.log("15", poly.map(Object.values));
  var a = [];
  a.push(poly.map(Object.values));
  a[0].push(a[0][0]);
  var b = polygon;
  b[0].push(b[0][0]);
  var c = polygon1;
  c[0].push(c[0][0]);
  var d = polygon2;
  d[0].push(d[0][0]);
  var e = polygon3;
  e[0].push(e[0][0]);
  var f = polygon4;
  f[0].push(f[0][0]);
  var g = polygon5;
  g[0].push(g[0][0]);
  var poly1 = turf.polygon(a);
  var poly2 = turf.polygon(b);
  var poly3 = turf.polygon(c);
  var poly4 = turf.polygon(d);
  var poly5 = turf.polygon(b);
  var poly6 = turf.polygon(e);
  var poly7 = turf.polygon(f);
  var poly8 = turf.polygon(g);

  console.log("1111", turf.booleanOverlap(poly1, poly2));
  return (
    turf.booleanOverlap(poly1, poly2) ||
    turf.booleanOverlap(poly1, poly3) ||
    turf.booleanOverlap(poly1, poly3) ||
    turf.booleanOverlap(poly1, poly4) ||
    turf.booleanOverlap(poly1, poly5) ||
    turf.booleanOverlap(poly1, poly6) ||
    turf.booleanOverlap(poly1, poly7) ||
    turf.booleanOverlap(poly1, poly8)
  );
}

function isPointInPoly(pt, poly) {
  poly = poly[0];
  if (poly)
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
      ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) ||
        (poly[j][1] <= pt[1] && pt[1] < poly[i][1])) &&
        pt[0] <
          ((poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1])) /
            (poly[j][1] - poly[i][1]) +
            poly[i][0] &&
        (c = !c);
  if (c) {
    swal({
      title: "Success",
      text: "Your current location lies within the boundaries of Gulmohar Colony",
      icon: "success",
    });
  } else {
    swal({
      title: "Incorrect",
      text: "Your current location does not lie within the boundaries of Gulmohar Colony",
      icon: "error",
    });
  }
}
export default function Maps(props) {
  const { selectPosition } = props;
  const [map, setMap] = useState({ lat: 0, lng: 0 });
  const [checkPointX, setCheckPointX] = useState(null);
  const [checkPointY, setCheckPointY] = useState(null);
  const [mapLayers, setMapLayers] = useState([]);
  const [editableFG, setEditableFG] = useState(null);
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  const purpleOptions = { color: "purple" };
  const blueOptions = { color: "blue" };
  const blackOptions = { color: "black" };
  const yellowOptions = { color: "yellow" };
  const orangeOptions = { color: "orange" };
  const limeOptions = { color: "lime" };
  const mapRef = useRef();

  const MapContent = ({ onDoubleClick }) => {
    const map = useMapEvents({
      dblclick: (event) => {
        onDoubleClick(event);
        setCheckPointX(event.latlng.lat);
        setCheckPointY(event.latlng.lng);
      },
    });
    return null;
  };

  useEffect(() => {
    // console.log("useEffect");
    const CheckDrawnPolygonsOverlap = () => {
      console.log(100, mapLayers.length);
      if (mapLayers.length > 1) {
        const drawnItems = editableFG._layers;
        var n = mapLayers.length;
        // console.log(200, n);
        for (var i = 0; i < n - 1; i++) {
          var m1 = mapLayers[i].latlngs.map(Object.values);
          var a = [];
          a.push(m1);
          a[0].push(a[0][0]);
          for (var j = i + 1; j < n; j++) {
            var m2 = mapLayers[j].latlngs.map(Object.values);
            var b = [];
            b.push(m2);
            b[0].push(b[0][0]);
            var poly1 = turf.polygon(a);
            var poly2 = turf.polygon(b);
            if (turf.booleanOverlap(poly1, poly2) == true) {
              console.log(201, mapLayers[j]);
              const layer = drawnItems[mapLayers[j].id];
              console.log(44, layer);
              editableFG.removeLayer(layer);
              mapLayers.splice(j, 1);
              return true;
              // console.log("Done2!!", mapLayers.length);
            }
          }
        }
      }
      return false;
    };
    if (CheckDrawnPolygonsOverlap() == true) {
      swal({
        title: "Wrong!",
        text: "Your entered locality is invalid!",
        icon: "error",
      });
    }
  }, [mapLayers]);

  useEffect(() => {
    isPointInPoly([checkPointX, checkPointY], polygon);
  }, [checkPointX]);

  const helper = (event) => {
    console.log(event.latlng.lat, event.latlng.lng);
    setMap({ lat: event.latlng.lat, lng: event.latlng.lng });
  };

  const onFeatureGroupReady = (reactFGref) => {
    setEditableFG(reactFGref);
  };

  const _onCreate = (e) => {
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;
      console.log(1, layer.getLatLngs()[0]);
      console.log(2, editableFG);
      const drawnItems = editableFG._layers;
      console.log(3, drawnItems);
      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
      console.log(4, layer.getLatLngs());

      if (isMarkerInsidePolygon(layer.getLatLngs()[0]) == true) {
        swal({
          title: "Wrong!",
          text: "Your entered locality is invalid!",
          icon: "error",
        });
        const layer = drawnItems[_leaflet_id];
        // console.log(4, layer);
        editableFG.removeLayer(layer);
        // console.log(5, mapLayers.length);
        let m = mapLayers.filter((ele) => ele.id != _leaflet_id);
        setMapLayers(m);
        console.log("Done!!");
      }
    }
  };

  const _onEdited = (e) => {
    console.log(e);
    const { layers } = e;
    console.log(layers._layers, Object.keys(layers._layers)[0]);
    const _leaflet_id = Object.keys(layers._layers)[0];
    // console.log(211, layers._layers[_leaflet_id].editing.latlngs[0][0]);
    let arr = layers._layers[_leaflet_id].editing.latlngs[0][0];
    console.log(225, editableFG);
    const drawnItems = editableFG._layers;
    console.log(300, drawnItems);
    if (isMarkerInsidePolygon(arr) == true) {
      const layer = drawnItems[_leaflet_id];
      console.log(400, layer);
      editableFG.removeLayer(layer);
      let m = mapLayers.filter((ele) => ele.id != _leaflet_id);
      setMapLayers(m);
      console.log("Done!!");
    }
  };

  const _onDeleted = (e) => {
    console.log(e);
  };
  return (
    <>
      <MapContainer
        center={position}
        zoom={8}
        style={{ width: "100%", height: "100%" }}
        ref={mapRef}
        onClick={helper}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=mIMLHCmBJULiiogMvjQF"
        />
        <MapContent onDoubleClick={helper} />
        <FeatureGroup>
          <Popup>
            Gulmohar Colony
            <br /> Juhu,Mumbai,Maharashtra,400047.
          </Popup>
          {/* <Rectangle bounds={rectangle} /> */}
          <Polygon pathOptions={purpleOptions} positions={polygon} />
        </FeatureGroup>
        <FeatureGroup>
          <Popup>
            Gulmohar Colony
            <br /> Juhu,Mumbai,Maharashtra,400047.
          </Popup>
          <Polygon pathOptions={limeOptions} positions={polygon1} />
        </FeatureGroup>
        <FeatureGroup>
          <Popup>
            Ghatkopar
            <br />
            Mumbai,Maharashtra,400005.
          </Popup>
          <Polygon pathOptions={blueOptions} positions={polygon2} />
        </FeatureGroup>
        <FeatureGroup>
          <Popup>
            Azad Nagar
            <br /> Andheri West,Mumbai,Maharashtra,400049.
          </Popup>
          <Polygon pathOptions={orangeOptions} positions={polygon3} />
        </FeatureGroup>
        <FeatureGroup>
          <Popup>
            DN Nagar
            <br /> Andheri West,Maharashtra,400003.
          </Popup>
          <Polygon pathOptions={yellowOptions} positions={polygon4} />
        </FeatureGroup>
        <FeatureGroup>
          <Popup>
            Versova
            <br />
            Mumbai,Maharashtra,400001.
          </Popup>
          <Polygon pathOptions={blackOptions} positions={polygon5} />
        </FeatureGroup>

        <FeatureGroup
          ref={(featureGroupRef) => {
            onFeatureGroupReady(featureGroupRef);
          }}
        >
          {editableFG ? (
            <EditControl
              position="topright"
              onCreated={_onCreate}
              onEdited={_onEdited}
              onDeleted={_onDeleted}
              draw={{
                rectangle: false,
                polyline: false,
                circle: false,
                circlemarker: false,
                marker: false,
              }}
            />
          ) : null}
        </FeatureGroup>

        {/* <FeatureGroup pathOptions={purpleOptions}>
        <Popup>Popup in FeatureGroup</Popup>
        <Rectangle bounds={rectangle1} />
      </FeatureGroup>
      <FeatureGroup pathOptions={purpleOptions}>
        <Popup>Popup in FeatureGroup console.log('Hello')</Popup>
        <Rectangle bounds={rectangle2} />
      </FeatureGroup>
      <FeatureGroup pathOptions={purpleOptions}>
        <Popup>Popup in FeatureGroup</Popup>
        <Rectangle bounds={rectangle3} />
      </FeatureGroup>
      <FeatureGroup pathOptions={purpleOptions}>
        <Popup>Popup in FeatureGroup</Popup>
        <Rectangle bounds={rectangle4} />
      </FeatureGroup>
      <FeatureGroup pathOptions={purpleOptions}>
        <Popup>Popup in FeatureGroup</Popup>
        <Rectangle bounds={rectangle5} />
      </FeatureGroup>
      <FeatureGroup pathOptions={purpleOptions}>
        <Popup>Popup in FeatureGroup</Popup>
        <Rectangle bounds={rectangle6} />
      </FeatureGroup> */}
        {selectPosition && (
          <Marker position={locationSelection} icon={icon}>
            <Popup>
              Gulmohar Colony
              <br /> Juhu,Mumbai,Maharashtra,400047.
            </Popup>
          </Marker>
        )}
        <ResetCenterView selectPosition={selectPosition} />
        {map.lat && map.lng && (
          <Marker position={[map.lat, map.lng]} icon={marker}>
            <Popup>
              Lat:{map.lat},Long:{map.lng}
            </Popup>
          </Marker>
        )}
      </MapContainer>
      <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre>
    </>
  );
}
