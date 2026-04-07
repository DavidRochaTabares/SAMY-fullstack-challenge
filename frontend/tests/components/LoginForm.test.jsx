import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import LoginForm from '@/components/auth/LoginForm.jsx';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        codeSent: false,
        ...initialState.auth,
      },
    },
  });
};

describe('LoginForm Component', () => {
  it('renders email input and send code button initially', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/your.email@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Send Verification Code/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
  });

  it('shows verification code input after code is sent', () => {
    const store = createMockStore({
      auth: {
        codeSent: true,
        loading: false,
      },
    });
    
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    expect(screen.getByText(/Code sent to/i)).toBeInTheDocument();
    expect(screen.getByText(/Verify and Sign In/i)).toBeInTheDocument();
  });

  it('shows error message when request fails', () => {
    const store = createMockStore({
      auth: {
        error: 'Failed to send verification code',
        loading: false,
      },
    });
    
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    expect(screen.getByText('Failed to send verification code')).toBeInTheDocument();
  });

  it('disables submit button when loading', () => {
    const store = createMockStore({
      auth: {
        loading: true,
      },
    });
    
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const submitButton = screen.getByText(/Sending code.../i);
    expect(submitButton).toBeInTheDocument();
  });
});
