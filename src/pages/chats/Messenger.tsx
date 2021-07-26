import React, {useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import styles from "./messenger/messenger.module.scss";
import {Chat, newMessage} from "../../models/ChatsAPI";
import Message from './messenger/Message';
import MessageInput from './messenger/Input';
import {putMessage} from "../../modules/chats";

interface MessengerProps {
  chatId: Chat['id'],
}

const Messenger: React.FC<MessengerProps> = ({chatId}) => {

  const dispatch = useAppDispatch() as (action: any) => Promise<any>;
  const {chats, error, loading} = useAppSelector((state) => state.chats);
  const listRef = useRef(null);

  const currentChat = chats.filter(chat => chat.id === chatId)[0];

  let content: any = loading ? 'Loading...' : 'Please select a chat';

  const send = (text: string) => {
    const message: newMessage = {
      message: text,
      time: new Date().toISOString(),
      isOwn: true,
      chatId: currentChat.id
    };

    dispatch(putMessage(message)).then(() => {
      const el: HTMLElement  = listRef.current!;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
    });
  };

  if (currentChat) {
    const {contact, messages} = currentChat;
    content = (
      <React.Fragment>
        <div className={styles.chatHeader}>
          {contact.name}
        </div>
        <div className={styles.chatArea} ref={listRef}>
          {messages.map((message) => (
            <Message key={message.id} message={message} contact={contact}/>
          ))}
        </div>
        <div className={styles.chatInput}>
          <MessageInput onSend={send}/>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className={styles.messengerColumn}>
      {error ?? content}
    </div>
  );
};

export default Messenger;