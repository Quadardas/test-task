<template>
  <div class="container">
    <div class="ticket-list">
      <TicketItem
        v-for="(ticket, id) in ticketsService.getTickets"
        :key="id"
        :ticket="ticket"
        :ticket-count="tickets?.length + 1"
        @delete="onDelete"
      />
    </div>
    <button>Create</button>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onMounted, provide, ref } from "vue";
import { ITicket } from "@/models/ticket.model";
import TicketItem from "@/components/TicketItem.vue";
import { Ticket } from "@/services/ticket.service";

const ticketsService = new Ticket();
provide("ticketService", ticketsService);

function onDelete(id: number) {
  ticketsService.deleteTicket(id);
}
const tickets = ref();
onBeforeMount(() => {
  ticketsService.initTickets();
});
</script>

<style lang="scss" scoped>
.ticket {
  margin: 10px;
  border: 1px solid black;
  padding: 5px;
}
</style>
