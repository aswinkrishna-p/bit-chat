import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="grid items-center grid-cols-1 bg-[#080420] md:grid-cols-5 md:gap-2 px-8 py-4">
      <div className="flex items-center justify-center md:col-span-1">
        <div className="relative">
          <BsEmojiSmileFill
            onClick={handleEmojiPickerhideShow}
            className="text-yellow-300 text-2xl cursor-pointer"
          />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form
        className="md:col-span-4 flex items-center gap-4 w-full bg-[#ffffff34] rounded-full px-4 py-2"
        onSubmit={(event) => sendChat(event)}
      >
        <input
          type="text"
          placeholder="Type your message here"
          className="w-full bg-transparent text-white outline-none placeholder-white"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-purple-600 rounded-full px-4 py-2 text-white hover:bg-purple-700"
        >
          <IoMdSend className="text-2xl" />
        </button>
      </form>
    </div>
  );
}
