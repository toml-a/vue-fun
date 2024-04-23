<template>
  <div>
    <form :class="'form'" @submit.prevent="handleSubmit">
      <label for="numberOfDogs" :class="'form-label'"
        >Please enter the desired numbers of dogs</label
      >
      <input
        type="text"
        id="numberOfDogs"
        v-model="numberOfDogs"
        @input="handleInputChange"
      />
      <button type="submit">Let the fun begin!</button>
    </form>
    <div v-for="(current, index) in displayedDogs" :key="index">
      <img :src="current" alt="Cat Image" :class="'dogImg'" />
    </div>
    <div v-if="isNotNumber" class="error-message">This is not a number!</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";

const displayedDogs = ref<Array<string>>([]);
const numberOfDogs = ref<string>("");
const isNotNumber = ref(false);

const handleSubmit = async () => {
  isNotNumber.value = false;
  try {
    if (isNaN(+numberOfDogs.value)) {
      isNotNumber.value = true;
      return;
    }
    const limit = +numberOfDogs.value;
    const response = await axios.get(
      `http://shibe.online/api/shibes?count=${limit}`
    );
    const selectedDogs = response.data;
    const selectedCats = [];
    displayedDogs.value = selectedDogs;
  } catch (error) {
    console.error("Failed to fetch image URLs:", error);
  }
};

const handleInputChange = () => {
  displayedDogs.value = [];
  isNotNumber.value = false;
};
</script>

<style>
.dogImg {
  margin-top: 10px;
  margin-left: 10px;
  width: 50%;
  height: 50%;
}

.form {
  margin-left: 10px;
  margin-top: 10px;
}

.form-label {
  margin-right: 5px;
}

button {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
