<script setup lang="ts">
import { ref } from 'vue'
import { students } from '../Compossible/Data'


const userData = ref(JSON.parse(localStorage.getItem('students') || '[]'));


function getCgpaClass(cgpa: number): string {
  if (cgpa > 3.5) {
    return 'high-cgpa';
  } else if (cgpa > 3.0) {
    return 'mid-cgpa';
  } else {
    return 'low-cgpa';
  }
}
</script>

<template>
  <div class="table-container">
    <table class="student-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Subject</th>
          <th>CGPA</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in userData" :key="data.id">
          <td>{{ data.id }}</td>
          <td>{{ data.name }}</td>
          <td>{{ data.subject }}</td>
          <td :class="getCgpaClass(data.cgpa)">{{ data.cgpa }}</td>
          <td>Edit</td>
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
