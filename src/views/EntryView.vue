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
import { addMinute, format, parse } from "@formkit/tempo";

const props = defineProps<{
  ticket: ITicket;
}>();
const date = new Date();

const tickets = ref<Array<ITicket>>([]);
const selectedType = ref<string>("");

function createTicket() {
  const newTime = addMinute(new Date(), 1);

  const newTicket: ITicket = {
    id: tickets.value?.length
      ? tickets.value?.[tickets.value?.length - 1].id + 1
      : 0,
    type: selectedType.value,
    time: newTime,
  };

  tickets.value.push(newTicket);
  localStorage.setItem("tickets", JSON.stringify(tickets.value));
}
// console.log(addMinute(parse(talonTime, "HH:mm"), 5));

onBeforeMount(() => {
  tickets.value = JSON.parse(localStorage.getItem("tickets") || "[]");
});
</script>
