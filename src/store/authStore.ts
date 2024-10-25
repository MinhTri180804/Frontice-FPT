import { create } from 'zustand';
import {
  removeAccessToken,
  removeAccount,
  removeRefreshToken,
} from '../utils/localstorage';
import { IProfileEntity } from '../types/entity';

type State = {
  profile: IProfileEntity | null;
  isAuthentication: boolean;
};

type Actions = {
  logout: () => void;
  login: (profile: IProfileEntity | null) => void;
  updateProfile: (profile: IProfileEntity) => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
  profile: null,
  isAuthentication: false,
  isLogOut: true,
  login: (profile) =>
    set(() => ({
      profile: profile,
      isAuthentication: true,
    })),
  logout: () => {
    removeAccessToken();
    removeRefreshToken();
    removeAccount();
    set(() => ({
      isAuthentication: false,
      profile: null,
    }));
  },
  updateProfile: (profile) => {
    set(() => ({
      profile: profile,
    }));
  },
}));
