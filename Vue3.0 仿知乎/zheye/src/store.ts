import { createStore } from 'vuex'

export interface ResponseType<P> {
  code: number;
  msg: string;
  data: P
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}

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
