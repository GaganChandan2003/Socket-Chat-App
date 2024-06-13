import React, { useEffect } from "react";
import { Messages } from "./Messages";
import { MessegeInput } from "./MessegeInput";
import { DefaultChat } from "./DefaultChat";
import useConversation from "../../zustand/useConversation";

export const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {selectedConversation ? (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text mr-2">To: </span>
            <span className="text-gray-900 font-bold">
              {selectedConversation?.fullName}
            </span>
          </div>
          <Messages />
          <MessegeInput />
        </>
      ) : (
        <DefaultChat />
      )}
    </div>
  );
};
