<template>
  <div class="ticket">
    <div class="ticket-type">{{ ticket.type }}</div>
    <div class="ticket-id">{{ ticket.id }}</div>
    <div class="ticket-time">
      {{ format(ticket.time, { time: "medium" }) }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ITicket } from "@/models/ticket.model";
import { addMinute, format, isEqual, parse } from "@formkit/tempo";
import { onMounted } from "vue";

const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
const localTime = parse(format(new Date(), { time: "medium" }), "HH:mm:ss");
let time = 0;
function updateLS(arr: Array<[]>) {
  console.log("aboba");

  localStorage.setItem("tickets", JSON.stringify(arr));
}

const props = defineProps<{
  ticket: ITicket;
}>();
onMounted(() => {
  if (tickets.length < 1) {
    time = 10000;
  } else {
    time = 30000;
  }

  const aboba = setTimeout(() => {
    const updatedTickets = tickets.value?.filter(() => {});
  }, time);

  //   const interval = setTimeout(() => {
  //   const updatedTickets = tickets.value?.filter((ticket: ITicket) => {
  //     return isEqual(ticket.time, localTime);
  //   });

  //     if (tickets.value?.length > updatedTickets?.length) {
  //       updateLS(updatedTickets);
  //     }
  //   }, 10000);

  // onBeforeUnmount(() => {
  //   clearInterval(interval);
  // });
});
</script>
