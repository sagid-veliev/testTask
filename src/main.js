import { createApp } from 'vue'
import App from './App.vue';
import router from '@/router/router';
import ModalWindow from "@/components/ModalWindow.vue"
import ToDoButton from "@/components/ToDoButton.vue"
import ToDoHeader from "@/components/ToDoHeader.vue"
import ToDoForm from "@/components/ToDoForm.vue"
import ToDoItem from "@/components/ToDoItem.vue"
import ToDoList from "@/components/ToDoList.vue"
import VChange from "@/pages/VChange.vue"
import VMain from "@/pages/VMain.vue"



const app = createApp(App);

app
  .component('ToDoButton', ToDoButton)
  .component('ModalWindow', ModalWindow)
  .component('ToDoHeader', ToDoHeader)
  .component('ToDoForm', ToDoForm)
  .component('ToDoItem', ToDoItem)
  .component('ToDoList', ToDoList)
  .component('VChange', VChange)
  .component('VMain', VMain)

app.use(router);
app.mount('#app')
