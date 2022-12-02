<template>
  <div class="content" ref="top">
    <div class="container pb-3 pb-sm=4 pb-xl-5">
      <div class="row">
        <form @submit.prevent="submit">
          <div class="mb-3">
            <label for="InputTaskname" class="form-label">Task name</label>
            <input type="text" v-model="name" class="form-control" id="InputTaskname">
          </div>
          <div class="mb-3">
            <label for="InputTaskdescription" class="form-label">Task Description</label>
            <textarea type="text" v-model="description" class="form-control" id="InputTaskdescription"></textarea>
          </div>
          <div class="mb-3">
            <select class="form-control" v-model="selectedStatus">
              <option v-for="(status, key) in statuses" :value="key" :key="key">
                {{ status }}
              </option>
            </select>
          </div>
          <div v-if="(message.length > 0)">
            <div class="alert alert-danger">
              {{ message }}
            </div>
          </div>
          <button type="submit" class="btn btn-outline-primary btn-lg">Save</button>
        </form>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-lg-start  text-xl-left">
        <div class="col-12" v-if="!tasks.length">
            <p>No Tasks!</p>
      </div>
        <div class="col-12 col-sm-6 col-xl-4 pb-3" v-for="(item, index) in tasks" :key="index">
          <div class="card">
            <div class="card-body text-xl-left">
              <div class="h4 d-flex justify-content-between">
                <div>
                  <h5 class="card-title d-inline-block ">{{ item.name }} </h5>
                </div>
                <div class="w-100"></div>
                <div class="px-3 "><span class="badge" :class="{
              'bg-success': item.status === 'Done',
              'bg-dark': item.status === 'Opened',
              'bg-warning': item.status === 'Closed',
              'bg-info': item.status === 'Inprogress'}">{{ item.status }} </span></div>
                <div class="me-2"> <font-awesome-icon @click.prevent="editTask(index),goto('top')" icon="fa-regular fa-pen-to-square" /> </div>
                <div> <font-awesome-icon  @click.prevent="removeTask(item.id)" icon="fa-regular fa-circle-xmark" /> </div>

              </div>
              <div>
                <div class="border-bottom pb-2">
                  <h5><font-awesome-icon icon="fa-regular fa-clock" /> {{ item.createdAt }}</h5>
                </div>
                <div class="pt-3">
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
       
        </div>
      
      </div>
    </div>
  </div>

  <div class="footer py-4 border-top" v-if="tasks.length > 0">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-12">
          <h3 >Current <span class="badge bg-warning "> {{ tasks.length }}</span> tasks</h3>
        </div>
      </div>
    </div>
  </div>

</template>


<script lang="ts">

import { faL } from '@fortawesome/free-solid-svg-icons';
import { mapGetters } from 'vuex'
export default {
  name: 'HomeView',
  data() {
    return {
      editedTask: null,
      selectedStatus: 'Done',
      statuses: {
        "Done": "Done",
        "Inprogress": "In progress",
        "Opened": "Opened",
        "Closed": "Closed"

      },
      name: '',
      message: '',
      description: '',
      status: '',
      createdAt: '',
      id: Math.floor(900000 * Math.random()) + 100000,
    }
  },
  computed: {
    ...mapGetters({
      tasks: 'getTasks',

    })
  },
  methods: {
    goto(refName) {
        var element = this.$refs[refName];
        var top = element.offsetTop;
        window.scrollTo(0, top);
    },
    submit() {
      if (this.editedTask != null) {

        this.tasks[this.editedTask].name = this.name;
        this.tasks[this.editedTask].description = this.description;
        this.tasks[this.editedTask].status = this.selectedStatus;
        
       
        this.name = ''
        this.description = ''
        if (this.tasks[this.editedTask].name == '' && this.tasks[this.editedTask].description == '') {
          this.message = 'Please enter empty fields';
        }

      } else {
        if (this.name === '' || this.description === '') {
          this.message = 'Please enter empty fields';
        } else {
          this.$store.commit('addTodoTask', {
            name: this.name,
            description: this.description,
            status: this.selectedStatus,
            createdAt:new Date().getFullYear() +  ' '  + String(new Date().getMonth()+1).padStart(2, '0') + ' '  + String(new Date().getDay()).padStart(2, '0') + ' ' + new Date().getHours() + ':' + new Date().getMinutes(),
            id: this.id,

          })
        }
  
        this.name = ''
        this.status = ''
        this.description = ''
        this.id = Math.floor(900000 * Math.random()) + 100000
      }
   
    },

   
    editTask(task: any) {
      this.name = this.tasks[task].name;
      this.description = this.tasks[task].description;
      this.selectedStatus = this.tasks[task].status;
      this.editedTask = task;

    },
    removeTask(task) {
      this.$store.commit('removeTodoTask', {
        id: task,
      })
    },

  },

}


</script>