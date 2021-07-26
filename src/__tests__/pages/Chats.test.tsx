import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {fireEvent, render, wait, waitForElementToBeRemoved} from '@testing-library/react';
import {Provider} from 'react-redux';
import {history, rootReducer, RootState} from '../../store/';
import {configureStore} from "@reduxjs/toolkit";
import mockedState from "../storeState";
import Chats from "../../pages/Chats";
import {ConnectedRouter} from 'connected-react-router';

describe('Chats page component smoke tests', () => {

  beforeEach(() => {
  });

  const createComponent = () => {
    const store = configureStore({
      reducer: rootReducer,
      // @ts-ignore
      preloadedState: mockedState as unknown as RootState,
    });

    const utils = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Chats/>
        </ConnectedRouter>
      </Provider>
    );

    return {
      utils,
    };
  };

  it('Should load and render chats', async () => {
    const {utils} = createComponent();

    const items = utils.getAllByText("Loading...");
    expect(items.length).toBeGreaterThanOrEqual(1);

    await waitForElementToBeRemoved(() => utils.getAllByText("Loading..."), {timeout: 1000});

    const liElements = utils.container.querySelectorAll('.listItem');
    expect(liElements.length).toBeGreaterThanOrEqual(1);

  }, 10 * 1000);

  afterEach(() => {
  });
});


