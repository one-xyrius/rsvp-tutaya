// src/services/rsvp.service.ts
import { rsvpRepository } from "@/repositories/rsvp.repository";
import { RSVP } from "@/types/schemas";

export const rsvpService = {
  async createRSVP(data: RSVP) {
    return await rsvpRepository.create(data);
  },

  async getRSVPsByTheme(theme: string) {
    return await rsvpRepository.findByTheme(theme);
  },
};
