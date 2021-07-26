import React, {useEffect, useState} from 'react';
import {getChats} from "../modules/chats";
import {useAppDispatch} from "../store/hooks";
import ChatsList from './chats/ChatsList';
import Messenger from './chats/Messenger';

import styles from './chats/chats.module.scss';
import {Chat} from "../models/ChatsAPI";

// import {Link} from 'react-router-dom';
// import {Button} from 'semantic-ui-react';

const Chats: React.FC<{}> = () => {
  const dispatch = useAppDispatch() as (action: any) => Promise<any>;

  useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  const [chatSelected, setChatSelected] = useState<Chat['id']>('');

  return (
    <div className={styles.container}>
      <ChatsList
        onSelect={(chatId) => setChatSelected(chatId)}
        selectedId={chatSelected}/>
      <Messenger chatId={chatSelected}/>
    </div>
  );
};

export default Chats;