import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleRank, toggleBowler, four, six } from "../store/store";

function Controller() {
  const showRank = useSelector((state) => state.controller.showRank);
  const showBowler = useSelector((state) => state.controller.showBowler);

  const dispatch = useDispatch();

  return (
    <>
      <div className="bg-gray-300 p-20 rounded-2">
        <div className="flex flex-col gap-3 w-1/4 bg-transparent mx-10 m-10 ">
          <button
            className="border rounded-3 p-2  bg-[#001529] text-white"
            onClick={() => dispatch(toggleRank())}
          >
            {showRank ? "Hide Batters" : "Show Batters"}
          </button>

          <button
            className="border rounded-3 p-2 bg-[#001529] text-white"
            onClick={() => dispatch(toggleBowler())}
          >
            {showBowler ? "Hide Bowlers" : "Show Bowlers"}
          </button>
          <button
            className="border rounded-3 p-2 bg-[#001529] text-white"
            onClick={() => dispatch(four())}
          >
            Four
          </button>
          <button
            className="border rounded-3 p-2 bg-[#001529] text-white"
            onClick={() => dispatch(six())}
          >
            Six
          </button>
        </div>
      </div>
    </>
  );
}

export default Controller;
