import ChatNotice from '../_components/ChatNotice';
import MessagesContainer from '../_components/MessagesContainer';
import Messages from '../_components/Messages';

const ChatDetailPage = () => {
  return (
    <MessagesContainer>
      <ChatNotice />
      <Messages />
    </MessagesContainer>
  );
};

export default ChatDetailPage;
