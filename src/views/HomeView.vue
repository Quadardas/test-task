<template>
  <div class="container">
    <div
      class="ticket-list"
      v-for="(ticket, id) in tickets"
      :key="id"
      :ticket="ticket"
    >
      <div class="ticket">
        <div class="ticket-type">{{ ticket.type }}</div>
        <div class="ticket-id">{{ ticket.id }}</div>
        <div class="ticket-time">{{ ticket.time }}</div>
      </div>
    </div>
    <button>Create</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TICKET } from "@/constants/ticket.const";

const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");

console.log(tickets);
</script>

<style lang="scss" scoped>
.ticket {
  margin: 10px;
  border: 1px solid black;
  padding: 5px;
}
</style>
