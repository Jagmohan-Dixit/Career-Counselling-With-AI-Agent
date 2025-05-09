'use client';
import * as React from "react"

const Map = (address) => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
      <iframe
        title="Tejas Networks Office"
        src="https://www.google.com/maps?q=Tejas+Networks+Bangalore&output=embed"
        width="100%"
        height="100%"
        loading="lazy"
        style={{ border: 0 }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Map;