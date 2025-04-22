import React from "react";

const BatSvg = ({ width = "16", height = "16" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={width}
    height={height}
    fill="none"
  >
    <defs>
      <pattern
        id="a"
        width="1"
        height="1"
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#b" transform="scale(.00781)" />
      </pattern>
      <image
        id="b"
        width="128"
        height="128"
        xlinkHref="data:image/png;base64,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"
        preserveAspectRatio="none"
      />
    </defs>
    <path fill="url(#a)" d="M0 0h16v16H0z" transform="matrix(-1 0 0 1 16 0)" />
  </svg>
);

export default BatSvg;
