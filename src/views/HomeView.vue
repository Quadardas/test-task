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
        <div class="ticket-time">
          {{ ticket.time }}
        </div>
      </div>
    </div>
    <button>Create</button>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import { TICKET } from "@/constants/ticket.const";
import { format } from "@formkit/tempo";

const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");

const localTime = format(new Date(), { time: "short" });
let isActive = true;

function updateLS(arr: Array<[]>) {
  localStorage.setItem("tickets", JSON.stringify(arr));
  // tickets.value = JSON.parse(localStorage.getItem("tickets") || "[]");
}

onBeforeMount(() => {
  tickets.value = JSON.parse(localStorage.getItem("tickets") || "[]");
});

onMounted(() => {
  const interval = setInterval(() => {
    const updatedTickets = tickets.value.filter((ticket) => {
      return ticket.time == localTime;
    });

    updateLS(updatedTickets);
  }, 10000);

  // onBeforeUnmount(() => {
  //   clearInterval(interval);
  // });
});
</script>

<style lang="scss" scoped>
.ticket {
  margin: 10px;
  border: 1px solid black;
  padding: 5px;
}
</style>
