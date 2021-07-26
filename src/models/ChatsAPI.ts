import {v4 as uuid} from "uuid";

export interface ChatMessage {
  id: string;
  time: Date | string;
  message: string;
  isOwn?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  avatarId: string; // Multiavatar Id
}

export interface Chat {
  id: string;
  contact: Contact;
  messages: ChatMessage[];
}

export type newMessage = Omit<ChatMessage, 'id'> & { chatId: string };

export class ChatsAPI {
  async loadChats(): Promise<Chat[]> {
    return getMockedChats();
  }

  async putMessage(message: newMessage): Promise<newMessage & { id: string }> {
    return {...message, id: uuid()};
  }

  async getUpdates(): Promise<Chat[]> {
    return [];
  }
}

export default new ChatsAPI();

const getMockedChats = () => [
  {
    id: '1',
    messages: [
      {
        id: '11',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: '2021-07-24T16:12:05Z'
      },
      {
        id: '12',
        message: 'Duis in quam euismod, sodales arcu id, faucibus libero.',
        time: '2021-07-25T18:46:05Z'
      }
    ],
    contact: {
      id: '2',
      name: 'Valyk Domen',
      avatarId: uuid()
    }
  },
  {
    id: '2',
    messages: [
      {
        id: '13',
        message: 'Curabitur in tortor et nunc aliquet volutpat',
        time: '2021-07-25T18:46:05Z'
      }, {
        id: '14',
        message: 'Vestibulum malesuada nibh ut sem condimentum, eget porta diam varius.',
        time: '2021-07-25T18:52:00Z',
        isOwn: true
      }
    ],
    contact: {
      id: '2',
      name: 'Morkes',
      avatarId: uuid()
    }
  },
  {
    id: '3',
    messages: [
      {
        id: '15',
        message: 'Suspendisse id odio quis nulla pulvinar interdum sit amet eget nisi.',
        time: '2021-07-25T18:40:05Z'
      }, {
        id: '16',
        message: 'Phasellus pulvinar est ac iaculis finibus.',
        time: '2021-07-25T18:46:05Z',
        isOwn: true
      }
    ],
    contact: {
      id: '3',
      name: 'Ando Bolver',
      avatarId: uuid()
    }
  }
];