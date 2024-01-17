import React from "react";

const Banner = () => {
  return (
    <main className="w-[80%] m-auto flex items-center  justify-between ">
      <div>
        <h1 className="text-[3rem] font-bold text-[teal]" >Online Book </h1>
        <h1 className="text-[3rem] font-bold text-[#3477ab]">  Library</h1>
        <p className="font-semibold text-gray-500" >Good books don't give up all their secrets at once </p>
        
      </div>
      <div>
        <img
          src="https://i.ibb.co/TRRgH98/Screenshot-2024-01-16-150720.png"
          alt=""
        />
      </div>
    </main>
  );
};

export default Banner;
