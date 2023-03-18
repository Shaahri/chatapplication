import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { MessageType } from "../types";

interface Props {
  message: MessageType;
}

const Message = ({ message }: Props) => {
  const [user] = useAuthState(auth);

  if (!user) return null;

  return (
    <div className={`chat-bubble ${message.userId === user.uid ? "right" : ""}`}>
      <div className="chat-bubble__right">

      {/* Add properties at some point, username and message */}
        <p className="user-name">{message.userName}</p>
        <p className="user-message">{message.message}
        </p>
      </div>
    </div>
  );
};




export default Message;