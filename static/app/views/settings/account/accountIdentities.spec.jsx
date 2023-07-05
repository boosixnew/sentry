import {
  render,
  renderGlobalModal,
  screen,
  userEvent,
} from 'sentry-test/reactTestingLibrary';

import AccountIdentities from 'sentry/views/settings/account/accountIdentities';

const ENDPOINT = '/users/me/user-identities/';

describe('AccountIdentities', function () {
  beforeEach(function () {
    MockApiClient.clearMockResponses();
  });

  it('renders empty', function () {
    MockApiClient.addMockResponse({
      url: ENDPOINT,
      method: 'GET',
      body: [],
    });

    const {container} = render(<AccountIdentities />);
    expect(container).toSnapshot();
  });

  it('renders list', function () {
    MockApiClient.addMockResponse({
      url: ENDPOINT,
      method: 'GET',
      body: [
        {
          category: 'social-identity',
          id: '1',
          provider: {
            key: 'github',
            name: 'GitHub',
          },
          status: 'can_disconnect',
          organization: null,
        },
      ],
    });

    const {container} = render(<AccountIdentities />);
    expect(container).toSnapshot();
  });

  it('disconnects identity', async function () {
    MockApiClient.addMockResponse({
      url: ENDPOINT,
      method: 'GET',
      body: [
        {
          category: 'social-identity',
          id: '1',
          provider: {
            key: 'github',
            name: 'GitHub',
          },
          status: 'can_disconnect',
          organization: null,
        },
      ],
    });

    render(<AccountIdentities />);

    const disconnectRequest = {
      url: `${ENDPOINT}social-identity/1/`,
      method: 'DELETE',
    };

    const mock = MockApiClient.addMockResponse(disconnectRequest);

    expect(mock).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button', {name: 'Disconnect'}));

    renderGlobalModal();
    await userEvent.click(screen.getByTestId('confirm-button'));

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith(
      `${ENDPOINT}social-identity/1/`,
      expect.objectContaining({
        method: 'DELETE',
      })
    );
  });
});
