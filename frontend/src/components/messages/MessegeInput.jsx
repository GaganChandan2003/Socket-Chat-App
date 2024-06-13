import React, { useState } from "react";
import { LuSend } from "react-icons/lu";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

export const MessegeInput = () => {
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("");

  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    setloading(true);
    try {
      await axios
        .post(`/api/messages/send/${selectedConversation?._id}`, {
          message: message.trim(),
        })
        .then((res) => setMessages([...messages, res?.data?.data]));
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setloading(false);
      setmessage("");
    }
  };
  return (
    <form action="" className="px-4 my-3" onSubmit={sendMessage}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Type a messege"
          onChange={(e) => setmessage(e.target.value)}
          value={message}
        />
        <button
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          type="submit"
        >
          {loading ? <div className="loading loading-bars "></div> : <LuSend />}
        </button>
      </div>
    </form>
  );
};
