<script setup lang="ts">
import { ref } from 'vue';
import { Student, students } from '../Compossible/Data';
import { useRouter } from 'vue-router';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const successMessage = ref('');
const router = useRouter();

const formObject = ref<Student>({
  id: null,
  name: '',
  subject: '',
  cgpa: null
});

function submitForm() {
  
  students.push({ ...formObject.value });
  localStorage.setItem('students', JSON.stringify(students));

  
  formObject.value = {
    id: null,
    name: '',
    subject: '',
    cgpa: null
  };

  
toast.success('✅ Form Submitted Successfully!', {
  autoClose: 100000,
  position: 'bottom-center',
 
  
  
});


 
  setTimeout(() => {
     successMessage.value = '';
     router.push('/data');
  }, 1000);

}
</script>

<template>
  <main>
    <span class="message">Welcome to My Add Data Page</span>

  
    <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>

    <form class="form-container" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="id">ID</label>
        <input type="text" id="id" v-model="formObject.id" required />
      </div>

      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="formObject.name" required />
      </div>

      <div class="form-group">
        <label for="subject">Subject</label>
        <input type="text" id="subject" v-model="formObject.subject" required />
      </div> 

      <div class="form-group">
        <label for="cgpa">CGPA</label>
        <input type="number" id="cgpa" step="any" v-model="formObject.cgpa" required />
      </div>

      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </main>
</template>

<style scoped>
.message {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.success-msg {
  text-align: center;
  color: green;
  font-weight: bold;
  margin-bottom: 1rem;
  transition: opacity 0.5s ease;
}

.form-container {
  max-width: 400px;
  margin: 0 auto;
  background: #fff;
  padding: 20px 25px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #369870;
}
</style>
