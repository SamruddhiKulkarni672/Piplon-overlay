import React from "react";
import Lottie from "lottie-react";
import animationData from "/Users/ishwarmundhe/Desktop/Piplon-overlay/src/assets/Animation/FourAnimation.json";

const FourAnimation = () => {
  return (
    <div className="w-80 h-80 mr-[30%]">
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{ width: "300%", height: "300%" }}
      />
    </div>
  );
};

export default FourAnimation;
