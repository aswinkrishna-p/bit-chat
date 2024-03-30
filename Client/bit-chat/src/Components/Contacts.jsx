import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className="grid grid-rows-10-75-15 overflow-hidden bg-[#080420]">
          <div className="flex items-center justify-center">
            <img src={Logo} alt="logo" className="h-8" />
            <h3 className="text-white uppercase">bit-chat</h3>
          </div>
          <div className="flex flex-col items-center overflow-auto scrollbar-thin scrollbar-thumb-[#ffffff39]">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`w-90 bg-[#ffffff34] min-h-[5rem] cursor-pointer rounded-md p-2 flex gap-4 items-center transition duration-500 ${
                  index === currentSelected ? "bg-purple-600" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="w-12">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                    className="h-12"
                  />
                </div>
                <div>
                  <h3 className="text-white">{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-8 bg-[#0d0d30]">
            <div className="w-16">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                className="h-16 max-w-full"
              />
            </div>
            <div>
              <h2 className="text-white">{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
