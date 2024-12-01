// Mock auth service
export const auth = {
  currentUser: null,
  signOut: async () => {
    auth.currentUser = null;
    return Promise.resolve();
  }
};
