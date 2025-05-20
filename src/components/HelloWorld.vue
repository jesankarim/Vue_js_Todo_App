<script setup lang="ts">
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

interface Student {
  id: number
  name: string
  subject: string
  cgpa: number
}


const showModal = ref(false)
const userData = ref<Student[]>(JSON.parse(localStorage.getItem('students') || '[]'))
const searchTerm = ref('')
const searchKey = ref('')

const formObject = ref<Student>({
  id: 0,
  name: '',
  subject: '',
  cgpa: 0,
})

const selectedId = ref<number | null>(null)


const filteredStudents = computed(() => {
  if (!searchKey.value) return userData.value
  return userData.value.filter(student =>
    student.name.toLowerCase().includes(searchKey.value)
  )
})


const handleSearch = () => {
  searchKey.value = searchTerm.value.trim().toLowerCase()
}

const handleDelete = (id: number) => {
  userData.value = userData.value.filter(student => student.id !== id)
  localStorage.setItem('students', JSON.stringify(userData.value))
  toast.success('Data Deleted Successfully!', {
    autoClose: 1000,
    position: 'bottom-center',
  })
}

const editStudent = (student: Student) => {
  formObject.value = { ...student }
  selectedId.value = student.id
  showModal.value = true
}

const submitForm = () => {
  if (selectedId.value !== null) {
    const index = userData.value.findIndex(s => s.id === selectedId.value)
    if (index !== -1) {
      userData.value[index] = { ...formObject.value }
      toast.success('Data Updated Successfully!', {
        autoClose: 1000,
        position: 'bottom-center',
      })
    }
  } else {
    const newStudent = {
      ...formObject.value,
      id: Date.now(),
    }
    userData.value.push(newStudent)
    toast.success('Data Added Successfully!', {
      autoClose: 1000,
      position: 'bottom-center',
    })
  }

  localStorage.setItem('students', JSON.stringify(userData.value))
  formObject.value = { id: 0, name: '', subject: '', cgpa: 0 }
  selectedId.value = null
  showModal.value = false
}

function getCgpaClass(cgpa: number): string {
  if (cgpa > 3.5) return 'high-cgpa'
  else if (cgpa > 3.0) return 'mid-cgpa'
  else return 'low-cgpa'
}
</script>

<template>
  <div class="table-container">
    
    <div class="search-bar">
      <input
        v-model="searchTerm"
        @keypress.enter="handleSearch"
        type="text"
        placeholder="Search by name..."
      />
      <button @click="handleSearch">Search</button>
    </div>

    
    <table class="student-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Subject</th>
          <th>CGPA</th>
          <th colspan="2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in filteredStudents" :key="data.id">
          <td>{{ data.id }}</td>
          <td>{{ data.name }}</td>
          <td>{{ data.subject }}</td>
          <td :class="getCgpaClass(data.cgpa)">{{ data.cgpa }}</td>
          <td>
            <button @click="editStudent(data)" class="edit-btn">Edit</button>
          </td>
          <td>
            <button @click="handleDelete(data.id)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    
    <div v-if="showModal" class="form-container">
      <form @submit.prevent="submitForm">
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

        <button type="submit" class="submit-btn">Save</button>
        <button type="button" class="delete-btn" @click="showModal = false">Cancel</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 10px;
}

.search-bar input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-bar button {
  padding: 8px 16px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.search-bar button:hover {
  background-color: #0056b3;
}

.student-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  overflow: hidden;
}

.student-table th,
.student-table td {
  text-align: center;
  padding: 12px 16px;
}

.student-table th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.student-table tr:hover {
  background-color: #fafafa;
}

.high-cgpa {
  background-color: rgb(76, 196, 76);
  color: white;
}
.mid-cgpa {
  background-color: rgb(231, 231, 14);
}
.low-cgpa {
  background-color: rgb(202, 81, 81);
  color: white;
}

.edit-btn,
.delete-btn {
  padding: 8px 10px;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 500;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #28a745;
}
.edit-btn:hover {
  background-color: #218838;
}
.delete-btn {
  background-color: #dc3545;
}
.delete-btn:hover {
  background-color: #c82333;
}

/* Modal/Form styling */
.form-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  width: 90%;
  background: #fff;
  padding: 20px 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 1000;
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
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #369870;
}
</style>
