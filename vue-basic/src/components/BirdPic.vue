<template>
  <div>
    <form :class="'form'" @submit.prevent="handleSubmit">
      <label for="numberOfBirds" :class="'form-label'"
        >Please enter the desired numbers of birds</label
      >
      <input
        type="text"
        id="numberOfBirds"
        v-model="numberOfBirds"
        @input="handleInputChange"
      />
      <button type="submit">Let the fun begin!</button>
    </form>
    <div v-for="(current, index) in displayedBirds" :key="index">
      <img :src="current" alt="Bird Image" :class="'BirdImg'" />
    </div>
    <div v-if="isNotNumber" class="error-message">This is not a number!</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";

const displayedBirds = ref<Array<string>>([]);
const numberOfBirds = ref<string>("");
const isNotNumber = ref(false);

const handleSubmit = async () => {
  isNotNumber.value = false;
  try {
    if (isNaN(+numberOfBirds.value)) {
      isNotNumber.value = true;
      return;
    }
    const limit = +numberOfBirds.value;
    const response = await axios.get(
      `http://shibe.online/api/birds?count=${limit}`
    );
    const selectedBirds = response.data;
    displayedBirds.value = selectedBirds;
  } catch (error) {
    console.error("Failed to fetch image URLs:", error);
  }
};

const handleInputChange = () => {
  displayedBirds.value = [];
  isNotNumber.value = false;
};
</script>

<style>
.birdImg {
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
