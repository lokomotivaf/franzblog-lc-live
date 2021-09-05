import { createStore } from 'vuex'

export default createStore({
  state: {
    posts: [
      {title: 'Second post', type: 'Crypto', content: "Something about crypto I GUESS", date: 'Sunday, 5.9.2021 / 13:37'},
      {title: 'About Franz Hirt', type: 'Dev', content: "Hi, my name is Franz Hirt, and I'm a newbie front-end developer. This is my first blog website, I've created it to practise vuex and fetching data and posting to servers, I didnt care that much about the desing, I just wanted to try the tech-side of the thing. I have a lot more projects on my Porftolio, here's a link to it, https://franzhirt.vercel.app/ Thanks for reading. Franz", date: 'Thursday, 19.9.2002 / 12:00' }
    ],
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    all: true,
    dev: false,
    cry: false,
  },
  mutations: {
    //filters
    typesetAll(state) {
      state.all = true
      state.dev = false
      state.cry = false
    },
    typesetDev(state) {
      state.dev = true
      state.all = false
      state.cry = false
    },
    typesetCry(state) {
      state.cry = true
      state.all = false
      state.dev = false
    },
    //locstorage get posts 
    getLSPosts(state){
      let exist = localStorage.getItem('posts')
      if (localStorage.getItem('posts')) {
        console.log('local storage posts exist');
        state.posts = JSON.parse(localStorage.getItem('posts'))
      }
      else {
        console.log('local storage posts DOESNT exist');
        localStorage.setItem("posts", JSON.stringify(state.posts));
      }
    },
    //addingpost
    addPost(state, passedpost) {
      let newpost = {}
      newpost.title = passedpost.title
      newpost.type = passedpost.type
      newpost.content = passedpost.content
      
      //ading date 
      let d = new Date
      //denvtydnu a prevod na text
      let weekday = d.getDay()
      weekday = state.weekdays[weekday]
      let hours = d.getHours()
      let minutes = d.getMinutes()
      minutes < 10 ? minutes = `0${minutes}` : minutes = minutes
      let day = d.getDate()
      let month = d.getMonth() + 1
      let year = d.getFullYear()
      newpost.date = `${weekday}, ${day}.${month}.${year} / ${hours}:${minutes} `
      state.posts = [newpost, ...state.posts]
      console.log(state.posts)
      localStorage.setItem("posts", JSON.stringify(state.posts));
    }
  },
  actions: {
  },
  getters: {
    cryPosts(state) {
      let cryPosts = state.posts.filter(post => post.type == 'Crypto');
      return cryPosts
    },
    devPosts(state) {
      let devPosts = state.posts.filter(post => post.type == 'Dev');
      return devPosts
    }
  },
  modules: {
  }
})
