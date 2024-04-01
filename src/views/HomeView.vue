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
          {{ format(ticket.time, { time: "medium" }) }}
        </div>
      </div>
    </div>
    <button>Create</button>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import { TICKET } from "@/constants/ticket.const";
import { format, isEqual, parse } from "@formkit/tempo";
import { ITicket } from "@/models/ticket.model";

const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");

const localTime = parse(format(new Date(), { time: "medium" }), "HH:mm:ss");
let isActive = true;

function updateLS(arr: Array<[]>) {
  console.log(arr);

  localStorage.setItem("tickets", JSON.stringify(arr));
  // console.log("aboba");

  // tickets.value = JSON.parse(localStorage.getItem("tickets") || "[]");
}

// onBeforeMount(() => {
//   tickets.value = JSON.parse(localStorage.getItem("tickets") || "[]");
// });

onMounted(() => {
  const interval = setInterval(() => {
    // console.log(tickets, "aboba");
    const updatedTickets = tickets.value.filter((ticket) => {
      return isEqual(ticket.time, localTime);
    });

    // localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    if (tickets.length > updatedTickets.length) {
      updateLS(updatedTickets);
    }
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
