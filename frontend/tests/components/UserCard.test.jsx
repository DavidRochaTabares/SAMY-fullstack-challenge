import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '@/store/slices/usersSlice';
import UserCard from '@/components/users/UserCard.jsx';

jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

const createMockStore = () => {
  return configureStore({
    reducer: {
      users: usersReducer,
    },
    preloadedState: {
      users: {
        reqresUsers: [],
        savedUsers: [],
        currentUser: null,
        loading: false,
        error: null,
        pagination: {
          page: 1,
          totalPages: 1,
          total: 0,
        },
      },
    },
  });
};

const mockUser = {
  id: 1,
  email: 'test@example.com',
  first_name: 'John',
  last_name: 'Doe',
  avatar: 'https://example.com/avatar.jpg',
};

describe('UserCard Component', () => {
  it('renders user information correctly', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <UserCard user={mockUser} isSaved={false} />
      </Provider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    // Avatar muestra iniciales JD
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('shows "Saved locally" badge when user is saved', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <UserCard user={mockUser} isSaved={true} />
      </Provider>
    );

    expect(screen.getByText(/Saved locally/i)).toBeInTheDocument();
  });

  it('shows "Save User" button when user is not saved', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <UserCard user={mockUser} isSaved={false} />
      </Provider>
    );

    expect(screen.getByText('Save User')).toBeInTheDocument();
  });

  it('does not show "Save User" button when user is saved', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <UserCard user={mockUser} isSaved={true} />
      </Provider>
    );

    expect(screen.queryByText('Save User')).not.toBeInTheDocument();
  });

  it('has a link to view user details', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <UserCard user={mockUser} isSaved={false} />
      </Provider>
    );

    const viewLink = screen.getByText('View Details').closest('a');
    expect(viewLink).toHaveAttribute('href', '/users/1');
  });
});
