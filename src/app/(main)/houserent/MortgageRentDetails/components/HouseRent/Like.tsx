import { Heart } from "lucide-react";
import React, { useState } from "react";

const Like = () => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="w-8 h-8 bg-[#F5F5F5] rounded-lg flex items-center justify-center  border border-blue-400transition-all active:scale-90"
      >
        <Heart
          size={24}
          className={`transition-colors duration-300 ${
            isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>
    </div>
  );
};

export default Like;
