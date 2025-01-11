import React from "react";

const Element = () => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[393px] h-[852px] relative">
        <img
          className="absolute w-[393px] h-6 top-[61px] left-0"
          alt="Frame"
          src={'/figma/frame28.svg'}
        />

        <img
          className="absolute w-[393px] h-[600px] top-[116px] left-0"
          alt="Frame"
          src={'/figma/frame47.svg'}
        />

        <div className="flex w-[393px] items-center gap-[15px] px-[15px] py-0 absolute top-[734px] left-0">
          <div className="flex flex-wrap w-[174px] h-[69px] items-center justify-center gap-[40px_40px] p-[15px] relative bg-layout-1 rounded-[5px] overflow-hidden">
            <img
              className="relative w-6 h-6"
              alt="Stash question solid"
              src={'/figma/stash_question-solid.svg'}
            />

            <div className="relative w-fit font-medium font-[number:var(--medium-font-weight)] text-layout-3 text-[length:var(--medium-font-size)] tracking-[var(--medium-letter-spacing)] leading-[var(--medium-line-height)] whitespace-nowrap [font-style:var(--medium-font-style)]">
              서비스안내
            </div>
          </div>

          <div className="flex flex-wrap w-[174px] h-[69px] items-center justify-center gap-[40px_40px] p-[15px] relative bg-layout-1 rounded-[5px] overflow-hidden">
            <img
              className="relative w-6 h-[25px]"
              alt="Ri customer service"
              src={'/figma/ri_customer-service-fill.svg'}
            />

            <div className="relative w-fit font-medium font-[number:var(--medium-font-weight)] text-layout-3 text-[length:var(--medium-font-size)] tracking-[var(--medium-letter-spacing)] leading-[var(--medium-line-height)] whitespace-nowrap [font-style:var(--medium-font-style)]">
              고객센터
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Element