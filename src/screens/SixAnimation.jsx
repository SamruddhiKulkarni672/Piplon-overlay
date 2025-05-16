import React from "react";
import Lottie from "lottie-react";
import animationData from "/Users/ishwarmundhe/Desktop/Piplon-overlay/src/assets/Animation/SixAnimation.json";

const SixAnimation = () => {
  return (
    <div className="w-64 h-64 mr-[40%] mt-[10%]">
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{ width: "300%", height: "300%" }}
      />
    </div>
  );
};

export default SixAnimation;
