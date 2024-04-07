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
import { addMinute, format, parse } from "@formkit/tempo";

const props = defineProps<{
  ticket: ITicket;
}>();
const date = new Date();

const tickets = ref<Array<ITicket>>([]);
const selectedType = ref<string>("");

function createTicket() {
  const newTime = addMinute(new Date(), 1);
  const ticketInstanse = new Ticket();
  ticketInstanse.createTicket(selectedType.value, newTime);
}

onBeforeMount(() => {
  tickets.value = JSON.parse(localStorage.getItem("tickets") || "[]");
});
</script>
