import { User } from "../../models/user";
import { UserList } from "../../static/userList";

export default {
  state:  {
    users: [] as User[]
  },
  getters: {
    getUsers: (state: any) => { return state.users }
  },
  mutations: {
    updateUser(state: any, payload: User) {
      const index = state.users.findIndex((user: User) => user._id === payload._id);
      if(index !== -1)  Object.assign(state.users[index], payload);
    },
    setUsers: (state: any, payload: User[]) => state.users = payload
  },
  actions: {
    getUsers(state: any ) {
      const us = new UserList();
      const users: User[] = us.getUsers();
      state.commit('setUsers', users);
    }
  },
}
