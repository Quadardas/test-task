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
import { Ticket } from "@/services/ticket.service";
import { format } from "@formkit/tempo";
import { inject, onMounted, ref } from "vue";

const ticketService = inject<Ticket>("ticketService");
//деструктуризация пропсов ниже)
const { ticket, ticketCount = 0 } = defineProps<{
  ticket: ITicket;
  ticketCount: number;
}>();
const emits = defineEmits<{
  (e: "delete", value: number): void;
}>();
onMounted(() => {
  const timerId = setTimeout(() => {
    emits("delete", ticket.id);
  }, ticketService?.getTicketTime(ticketService.getTickets.length));
});
</script>
