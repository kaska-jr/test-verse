import React from "react";

function Loader() {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center overflow-hidden">
      <div className="px-4 py-12">
        <div className="flex flex-col gap-4 items-center justify-center">
          <span className="page-loader"></span>
          <p className="text-primary font-serif">Teslaverse</p>
        </div>
      </div>
    </div>
  );
}

export default Loader;
