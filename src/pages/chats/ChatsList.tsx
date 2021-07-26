import React from 'react';
import {useAppSelector} from "../../store/hooks";
import styles from './chats-list/chats-list.module.scss';
import ListItem from './chats-list/Item';
import {Chat} from "../../models/ChatsAPI";


interface ChatsListProps {
  onSelect: (chatId: Chat['id']) => void,
  selectedId: Chat['id'],
}

const ChatsList: React.FC<ChatsListProps> = (props) => {

  const {chats, error, loading} = useAppSelector((state) => state.chats);

  const {onSelect, selectedId} = props;

  const content = loading ? 'Loading...' : chats.map(chat => {
    return (
      <ListItem
        key={chat.id}
        chat={chat}
        selected={selectedId === chat.id}
        onSelect={onSelect}
      />
    );
  });

  return (
    <div className={styles.listColumn}>
      {error ?? content}
    </div>
  );
};

export default ChatsList;