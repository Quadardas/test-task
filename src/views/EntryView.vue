<template>
  <div class="container">
    <div class="new-ticket">
      <select v-model="selectedType" id="">
        <option v-for="opt in selectOptions" :key="key" :value="opt.shName">
          {{ opt.name }}
        </option>
      </select>
      <button @click="createTicket">Запись</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { ITicket } from "@/models/ticket.model";
import { IOption } from "@/models/option.model";
import { Ticket } from "@/services/ticket.service";
import { addMinute, addSecond, format, parse } from "@formkit/tempo";
let addTime;
const props = defineProps<{
  ticket: ITicket;
}>();
const date = new Date();

const tickets = ref<Array<ITicket>>([]);
const selectedType = ref<string>("");
const selectOptions = ref<Array<IOption>>();

function createTicket() {
  const ticketInstanse = new Ticket();

  if (tickets.value.length < 1) {
    addTime = addSecond(new Date(), 30);
  } else {
    // addTime = addSecond(new Date(), 30);
    addTime = addMinute(ticketInstanse.getLastTicketTime(), 1);
  }

  ticketInstanse.createTicket(selectedType.value, addTime);

  tickets.value = JSON.parse(localStorage.getItem("tickets") || "[]");
}

onBeforeMount(() => {
  tickets.value = JSON.parse(localStorage.getItem("tickets") || "[]");
  selectOptions.value = JSON.parse(localStorage.getItem("options") || "[]");
  // selectOptions.value = [
  //   {
  //     name: "Запись к врачу",
  //     shName: "doc",
  //   },
  //   { name: "Другое", shName: "other" },
  // ];
  // localStorage.setItem("options", JSON.stringify(selectOptions.value));
});
</script>
