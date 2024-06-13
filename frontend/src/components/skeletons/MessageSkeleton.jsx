import React from "react";

const MessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 items-center">
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-3 w-20"></div>
          <div className="skeleton h-3 w-28"></div>
        </div>
      </div>
      <div className="flex gap-4 items-center justify-end">
        <div className="flex flex-col gap-2 items-end">
          <div className="skeleton h-3 w-20"></div>
          <div className="skeleton h-3 w-28"></div>
        </div>
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
