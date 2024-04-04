<template>
  <div class="container">
    <div class="ticket-list">
      <TicketItem v-for="(ticket, id) in tickets" :key="id" :ticket="ticket" />
    </div>
    <button>Create</button>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import { TICKET } from "@/constants/ticket.const";
import { format, isEqual, parse } from "@formkit/tempo";
import { ITicket } from "@/models/ticket.model";
import TicketItem from "@/components/TicketItem.vue";

// onBeforeMount(() => {
//   tickets.value = JSON.parse(localStorage.getItem("tickets") || "[]");
// });
</script>

<style lang="scss" scoped>
.ticket {
  margin: 10px;
  border: 1px solid black;
  padding: 5px;
}
</style>
