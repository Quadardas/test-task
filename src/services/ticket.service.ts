import { ITicket } from "@/models/ticket.model";
import { ref } from "vue";

export class Ticket {
  private tickets = ref<Array<ITicket>>([]);

  public get getTickets(): Array<ITicket> {
    return this.tickets.value;
  }
  constructor() {
    this.initTickets();
  }

  public initTickets(): void {
    const ticketsFromLS = localStorage.getItem("tickets");
    if (ticketsFromLS) {
      this.tickets.value = JSON.parse(ticketsFromLS);
    }
  }

  public createTicket(selectedType: string, newTime: Date): void {
    const newTicket: ITicket = {
      id: this.tickets.value?.length
        ? this.tickets.value?.[this.tickets.value?.length - 1].id + 1
        : 0,
      type: selectedType,
      time: newTime,
    };
    this.tickets.value?.push(newTicket);
    localStorage.setItem("tickets", JSON.stringify(this.tickets.value));
  }

  public deleteTicket(id: number): void {
    // console.log(id, this.tickets.value);

    this.tickets.value = this.tickets.value?.filter(
      (ticket: ITicket) => ticket.id != id
    );
    // console.log(this.tickets.value);

    localStorage.setItem("tickets", JSON.stringify(this.tickets.value));
  }
  // public getTicketId(id: number) {
  //   return (this.tickets.value = this.tickets.value?.filter(
  //     (ticket: ITicket) => ticket.id == id
  //   ));
  // }
  public getLastTicketTime() {
    const lastTicket = this.tickets.value[this.tickets.value.length - 1];
    return lastTicket.time;
  }

  public getTicketTime(ticket: ITicket): number {
    const aboba = new Date();
    const ticketDate = new Date(ticket.time);
    // console.log(ticket.time);
    console.log(ticketDate.getTime(), aboba.getTime());

    return ticketDate.getTime() - aboba.getTime();
  }
}
