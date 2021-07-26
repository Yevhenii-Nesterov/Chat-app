import React from 'react';
import styles from './messenger.module.scss';
import cx from 'classnames';
import {ChatMessage, Contact} from "../../../models/ChatsAPI";
import moment from "moment";
import {Label, Message as SemanticMessage} from 'semantic-ui-react';

interface MessageProps {
  message: ChatMessage
  contact: Contact
}

const Message: React.FC<MessageProps> = ({message: {message, id, isOwn = false, time}, contact}) => {
  return (
    <SemanticMessage key={id} className={cx(styles.message, {[styles.own]: isOwn})} color={isOwn ? "green" : "yellow"}>
      {isOwn ? '' : <SemanticMessage.Header>{contact.name}</SemanticMessage.Header>}
      <p>{message}</p>
      <Label size="mini">{moment(time).format("lll")}</Label>
    </SemanticMessage>
  );
};

export default Message;