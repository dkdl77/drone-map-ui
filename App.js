import React, { useEffect, useRef } from "react";

// 예시: 드론이 특정 조건 만족시(신뢰도 0.9 이상)만 지도에 마커 표시
const detectedObjects = [
  {
    id: 1,
    type: "person",
    confidence: 0.92, // 조건 충족
    lat: 37.5665,
    lng: 126.978,
    label: "사람"
  },
  {
    id: 2,
    type: "car",
    confidence: 0.75, // 조건 미충족 (마커 안 뜸)
    lat: 37.5651,
    lng: 126.9895,
    label: "자동차"
  }
];

export default function App() {
  const mapRef = useRef(null);

  useEffect(() => {
    // 구글 지도 띄우기
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.5665, lng: 126.978 },
      zoom: 14
    });

    // 조건(신뢰도 0.9 이상) 만족 객체만 마커로 표시
    detectedObjects
      .filter(obj => obj.confidence >= 0.9)
      .forEach(obj => {
        new window.google.maps.Marker({
          position: { lat: obj.lat, lng: obj.lng },
          map,
          title: `${obj.label} (${obj.type})`
        });
      });
  }, []);

  return (
    <div>
      <h2>드론 객체 탐지 지도 (신뢰도 0.9 이상만 표시)</h2>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}
      />
    </div>
  );
}
