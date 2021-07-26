import React, {KeyboardEvent, useState} from 'react';
import styles from './messenger.module.scss';
import {Input} from 'semantic-ui-react';

interface MessageProps {
  onSend: (text: string) => void
}

const MessageInput: React.FC<MessageProps> = ({onSend}) => {
  const [inputText, setInputText] = useState('');

  const send = () => {
    if (inputText.trim() === '') {
      return;
    }
    onSend(inputText);
    setInputText('');
  };

  return (
    <Input
      className={styles.inputField}
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      onKeyPress={(event: KeyboardEvent) => event.charCode === 13 && send()}
      action={{icon: 'send', color: "green", onClick: send}}
      placeholder="your message..."/>
  );
};

export default MessageInput;