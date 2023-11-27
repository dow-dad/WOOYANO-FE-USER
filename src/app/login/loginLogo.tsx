import Charactor from "@/images/svg_component/charactor";
import React from "react";
import 'src/fonts/line-awesome-1.3.0/css/line-awesome.css'

export default function LoginLogo() {
  return (
      <div className="flex justify-center md:justify-center items-center w-full h-auto mt-16 mb-6 font-semibold text-neutral-900 dark:text-neutral-100">
        <div className="h-auto">
            <Charactor/>
        </div>
        <div className="flex flex-col items-end font-bold">
          <h2 className="text-2xl md:text-3xl leading-[115%] font-medium">
            Welcome To
          </h2>
          <h2 className="text-3xl md:text-5xl leading-[115%]">
            WooYaNo!
          </h2>
        </div>
      </div>
  );
}
