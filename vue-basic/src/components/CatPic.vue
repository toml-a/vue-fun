<template>
  <div>
    <form :class="'form'" @submit.prevent="handleSubmit">
      <label for="numberOfCats" :class="'form-label'"
        >Please enter the desired numbers of cats</label
      >
      <input
        type="text"
        id="numberOfCats"
        v-model="numberOfCats"
        @input="handleInputChange"
      />
      <button type="submit">Let the fun begin!</button>
    </form>
    <div v-for="(current, index) in displayedCats" :key="index">
      <img :src="current" alt="Cat Image" :class="'CatImg'" />
    </div>
    <div v-if="isNotNumber" class="error-message">This is not a number!</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";

const displayedCats = ref<Array<string>>([]);
const numberOfCats = ref<string>("");
const isNotNumber = ref(false);

const handleSubmit = async () => {
  isNotNumber.value = false;
  try {
    if (isNaN(+numberOfCats.value)) {
      isNotNumber.value = true;
      return;
    }
    const limit = +numberOfCats.value;
    const response = await axios.get(
      `http://shibe.online/api/cats?count=${limit}`
    );
    const selectedCats = response.data;
    displayedCats.value = selectedCats;
  } catch (error) {
    console.error("Failed to fetch image URLs:", error);
  }
};

const handleInputChange = () => {
  displayedCats.value = [];
  isNotNumber.value = false;
};
</script>

<style>
.catImg {
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
