import { create } from "zustand";

export const useAdminStore = create((set) => ({
  playgrounds: [],
  playgroundsCount: 0,
  templates: [],
  templatesCount: 0,
  users: [],
  usersCount: 0,
  setAdmin: (data : {
    playgrounds: any;
    playgrounds_count: number;
    templates: any;
    templates_count: number;
    users: any;
    users_count: number;
  }) =>
    set((state: any) => ({
      playgrounds: data.playgrounds.data,
      playgroundsCount: data.playgrounds_count,
      templates: data.templates,
      templatesCount: data.templates_count,
      users: data.users,
      usersCount: data.users_count,
    })),
}));
