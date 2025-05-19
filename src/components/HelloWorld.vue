<script setup lang="ts">
import { ref, computed } from 'vue'
import { students } from '../Compossible/Data'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

interface Student {
  id: number
  name: string
  subject: string
  cgpa: number
}

const userData = ref<Student[]>(JSON.parse(localStorage.getItem('students') || '[]'))

const deleteMessage = ref('');

// search start here
const searchTerm = ref('')
const searchKey = ref('')

const handleSearch = () => {
  searchKey.value = searchTerm.value.trim().toLowerCase()
}

const filteredStudents = computed(() => {
  if (!searchKey.value) return userData.value

  return userData.value.filter(student =>
    student.name.toLowerCase().includes(searchKey.value)
    
  )
})

// search end here 

// delete start here 

const handleDelete = (id: number) => {
  userData.value = userData.value.filter(student => student.id !== id)
localStorage.setItem('students', JSON.stringify(userData.value))


// delete end here 

// delete toast message start
toast.success('Data Deleted Successfully!', {
  autoClose: 100,
  position: 'bottom-center',
 
  
  
});
}
// delete toast message end

function getCgpaClass(cgpa: number): string {
  if (cgpa > 3.5) {
    return 'high-cgpa'
  } else if (cgpa > 3.0) {
    return 'mid-cgpa'
  } else {
    return 'low-cgpa'
  }
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
          <button class="edit-btn">Edit</button>
          <button @click="handleDelete(data.id)" class="delete-btn">Delete</button>
        </tr>
      </tbody>
    </table>
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
  cursor: pointer;
}

.student-table th {
  background-color: #f5f5f5;
  text-align: center;
  padding: 12px 16px;
  font-weight: 600;
}

.student-table td {
  padding: 12px 16px;
  border-top: 1px solid #eee;
  text-align: center;
}
.edit-btn,
.delete-btn {
  padding: 6px 14px;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 500;
  margin-left: 10px;
  margin-top: 10px;
  padding: 8px 10px;
  cursor: pointer;
  gap: 5px;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #28a745; /* Green */
}

.edit-btn:hover {
  background-color: #218838;
}

.delete-btn {
  background-color: #dc3545; /* Red */
}

.delete-btn:hover {
  background-color: #c82333;
}


.student-table tr:hover {
  background-color: #fafafa;
}

.high-cgpa {
  background-color: rgb(76, 196, 76);
}

.mid-cgpa {
  background-color: rgb(231, 231, 14);
}

.low-cgpa {
  background-color: rgb(202, 81, 81);
}
</style>
