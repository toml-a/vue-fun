<template>
  <div>
    <form :class="'form'" @submit.prevent="handleSubmit">
      <label for="activites-search" :class="'form-label'"
        >Please enter type of activity here</label
      >
      <input
        type="text"
        id="activities-search"
        v-model="activities"
        @input="handleInputChange"
      />
      <button type="submit">Let the fun begin!</button>
    </form>
    <div>
      <p>Available activities</p>
      <ul>
        <li v-for="activity in typesActivities" :key="activity">
          {{ activity }}
        </li>
      </ul>
      <div v-if="fetchedActivity">
        <p>{{ fetchedActivity }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const displayedCats = ref<Array<string>>([]);
const activities = ref<string>("");
const fetchedActivity = ref<string | null>(null);
const typesActivities = [
  "education",
  "recreational",
  "social",
  "diy",
  "charity",
  "cooking",
  "relaxation",
  "music",
  "busywork",
];

const handleSubmit = async () => {
  const searchedActivity = activities.value;
  const response = await axios.get(
    `http://www.boredapi.com/api/activity?type=${searchedActivity}`
  );
  const activity = response.data.activity;
  fetchedActivity.value = activity;
};
</script>

<style>
.grid {
  border: 1px solid black;
}
</style>
