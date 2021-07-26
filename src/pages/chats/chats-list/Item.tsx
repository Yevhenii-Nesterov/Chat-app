import React from 'react';
import styles from './chats-list.module.scss';
import {Chat} from "../../../models/ChatsAPI";
import cx from 'classnames';

interface ItemProps {
  chat: Chat;
  selected?: boolean;
  onSelect: (chatId: Chat['id']) => void
}

const Item: React.FC<ItemProps> = ({selected, chat, onSelect}) => {
  const {contact: {avatarId, name}, messages} = chat;
  const lastMessage = messages[messages.length - 1]?.message ?? '';
  return (
    <div className={cx(styles.listItem, {[styles.selected]: selected})} onClick={() => onSelect(chat.id)}>
      <img className={styles.avatar} src={`https://api.multiavatar.com/${avatarId}.svg`} alt={avatarId}/>
      <div className={styles.contactCaption}>
        <p className={styles.dialogTitle}>{name}</p>
        <p className={styles.dialogSubtitle}>{lastMessage}</p>
      </div>
    </div>
  );
};

export default Item;