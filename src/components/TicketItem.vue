<template>
  <div class="ticket">
    <div class="ticket-type">{{ ticket.type + ticket.id }}</div>
    <!-- <div class="ticket-id">{{ ticket.id }}</div> -->
    <div class="ticket-time">
      {{ format(ticket.time, { time: "medium" }) }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ITicket } from "@/models/ticket.model";
import { Ticket } from "@/services/ticket.service";
import { format } from "@formkit/tempo";
import { inject, onMounted, onUpdated, ref, watch } from "vue";

const ticketService = inject<Ticket>("ticketService");
const timerId = ref<number>();
//деструктуризация пропсов ниже)
const { ticket } = defineProps<{
  ticket: ITicket;
  ticketCount: number;
}>();

const emits = defineEmits<{
  (e: "delete", value: number): void;
}>();

onMounted(() => {
  timerId.value = setTimeout(() => {
    emits("delete", ticket.id);
  }, ticketService?.getTicketTime(ticket));
});

onUpdated(() => {
  clearTimeout(timerId.value);
  timerId.value = setTimeout(() => {
    emits("delete", ticket.id);
  }, ticketService?.getTicketTime(ticket));
});
</script>
