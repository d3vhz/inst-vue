import type { Session } from '@supabase/supabase-js';
import { defineStore } from 'pinia';

import type { Nullable } from '~/shared/model';

const useAuthStore = defineStore('auth', {
  state: () => ({
    session: null as Nullable<Session>,
  }),
  actions: {
    setSession(session: Nullable<Session>) {
      this.session = session;
    },
  },
  getters: {
    isAuthenticated: (state) => Boolean(state.session),
    user: (state) => ({
      email: state.session?.user.email,
    }),
  },
});

export { useAuthStore };
