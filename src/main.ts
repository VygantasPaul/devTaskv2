import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.css"
import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import './assets/main.css'
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, fab)
dom.watch();

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});
const store = createStore({
  state() {
    return {
      issues: []
    }
  },
  mutations: {
    addTodoTask(state, task) {
      state.issues.push(task)
    },
    removeTodoTask(state,task){
      let tempArray = state.issues
      tempArray.map(item => {
        if (item.id === task.id) {
            let index = state.issues.findIndex(task => task.id == item.id)
            state.issues.splice(index,1);
        }
      }) 
      state.issues = tempArray
    }
    
  },
  
  getters: {
    getTasks: state => { return state.issues },
  },
  actions: {},
  plugins: [vuexLocal.plugin],
})
createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(store).mount('#app')
