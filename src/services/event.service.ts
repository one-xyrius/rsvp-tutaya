// src/services/event.service.ts
import { eventRepository } from "@/repositories/event.repository";
import { Event } from "@/types/schemas";

export const eventService = {
  async createEvent(data: Event) {
    return await eventRepository.create(data);
  },

  async getEventByTheme(theme: string) {
    return await eventRepository.findByTheme(theme);
  },
};
