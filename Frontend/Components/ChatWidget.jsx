
import React, { useState } from "react";
import { MessageSquare } from "lucide-react"; 

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Icon Button */}
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#0a3d62",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            maxHeight: "400px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            overflow: "hidden",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "10px",
              backgroundColor: "#0a3d62",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Chat with us
          </div>
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            <p>Hello! How can we help you?</p>
            {/* Here you can integrate real chat messages */}
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            style={{
              border: "none",
              borderTop: "1px solid #ddd",
              padding: "10px",
              outline: "none",
            }}
          />
        </div>
      )}
    </>
  );
};

export default ChatWidget;
