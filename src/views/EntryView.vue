<template>
  <div class="container">
    <div class="new-ticket">
      <select v-model="selectedType" id="">
        <option value="doctor">запись к врачу</option>
        <option value="other">запись туда-сюда</option>
      </select>
      <button @click="createTicket">Запись</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { ITicket } from "@/models/ticket.model";
import { Ticket } from "@/services/ticket.service";
import { addMinute, addSecond, format, parse } from "@formkit/tempo";
let addTime;
const props = defineProps<{
  ticket: ITicket;
}>();
const date = new Date();

const tickets = ref<Array<ITicket>>([]);
const selectedType = ref<string>("");

function createTicket() {
  const ticketInstanse = new Ticket();

  if (tickets.value.length < 1) {
    addTime = addSecond(new Date(), 5);
  } else {
    addTime = addSecond(new Date(), 30);
    // addTime = addMinute(ticketInstanse.getLastTicketTime(), 1);
  }

  ticketInstanse.createTicket(selectedType.value, addTime);

  tickets.value = JSON.parse(localStorage.getItem("tickets") || "[]");
}

onBeforeMount(() => {
  tickets.value = JSON.parse(localStorage.getItem("tickets") || "[]");
});
</script>
