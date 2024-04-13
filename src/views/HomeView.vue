<template>
  <div class="container">
    <Modal v-model="isVisible" v-if="isVisible">
      <!-- <p>талон № {{ ticketsService.getTicketId }}</p> -->
    </Modal>
    <div class="ticket-list">
      <TicketItem
        v-for="(ticket, id) in ticketsService.getTickets"
        :key="id"
        :ticket="ticket"
        :ticket-count="tickets?.length + 1"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onMounted, provide, ref } from "vue";
import { ITicket } from "@/models/ticket.model";
import TicketItem from "@/components/TicketItem.vue";
import { Ticket } from "@/services/ticket.service";
import Modal from "@/components/modals/Modal.vue";

const ticketsService = new Ticket();

let isVisible = ref(false);
provide("ticketService", ticketsService);

function onDelete(id: number) {
  isVisible.value = true;

  const showModal = setTimeout(() => {
    isVisible.value = false;
    ticketsService.deleteTicket(id);
  }, 5000);
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
