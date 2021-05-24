import { createStore } from 'vuex'

interface UserPorp {
  isLogin: boolean;
  userName?: string;
  id?: number;
}

export interface GlobalDataProps {
  columns: number[];
  posts: string[];
  user: UserPorp;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: { isLogin: false }
  }
})

export default store
