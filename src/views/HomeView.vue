<template>
  <div class="container">
    <div
      class="talon-list"
      v-for="(talon, id) in talons"
      :key="id"
      :talon="talon"
    >
      <div class="talon">
        <div class="talon-type">{{ talon.type }}</div>
        <div class="talon-id">{{ talon.id }}</div>
        <div class="talon-time">{{ talon.time }}</div>
      </div>
    </div>
    <button>Create</button>
  </div>
</template>

<script lang="ts" setup>
import { Vue } from "vue-class-component";
import { ITalon } from "@/models/talon.model";
import { ref } from "vue";
import { TALON } from "@/constants/talon.const";

const talons = ref(TALON);
console.log(talons.value);
</script>
