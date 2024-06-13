import React, { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

export const Messages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const lastMessageRef = useRef();
  useListenMessages();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/messages/${selectedConversation?._id}`
        );
        setMessages(res.data.data);
      } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  useEffect(() => {
    if (messages.length > 0) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedConversation?._id, setMessages, messages]);

  return (
    <div className="px-4 flex-1 no-scrollbar overflow-y-auto">
      {loading && [...Array(5)].map((_, ind) => <MessageSkeleton key={ind} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}

      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};
