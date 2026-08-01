"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { rsvpSchema } from "@/types/schemas";
import { createClient } from "@/lib/supabase/client";
import { Gallery } from "@/components/gallery";
import { format } from "date-fns";

const THEME_CLASSES = {
  anak: "theme-anak",
  remaja: "theme-remaja",
  dewasa: "theme-dewasa",
};

export default function RSVPPage() {
  const params = useParams();
  const theme = params.slug as keyof typeof THEME_CLASSES;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    guests: 0,
    message: "",
  });
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch event details from API
    fetch(`/api/rsvp?theme=${theme}`)
      .then((res) => res.json())
      .then((data) => setEventDetails(data))
      .catch(console.error);
  }, [theme]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = rsvpSchema.safeParse(formData);
      if (!result.success) {
        toast({
          title: "Validation Error",
          description: result.error.errors[0].message,
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(`/api/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, theme }),
      });

      if (!response.ok) throw new Error("Failed to submit RSVP");

      toast({
        title: "Success!",
        description: "Your RSVP has been recorded. Thank you!",
      });
      setFormData({
        name: "",
        email: "",
        attending: "yes",
        guests: 0,
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${THEME_CLASSES[theme]}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              {eventDetails.title || "Birthday Invitation"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-8">
              <p className="text-lg">
                {eventDetails.date && format(new Date(eventDetails.date), "PPPP")}
              </p>
              <p className="text-muted-foreground">
                {eventDetails.time} | {eventDetails.location}
              </p>
              <p className="mt-4">{eventDetails.description}</p>
            </div>

            <Gallery theme={theme} />

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Will you attend?</Label>
                <div className="flex space-x-4 mt-2">
                  {["yes", "no"].map((option) => (
                    <Button
                      key={option}
                      type="button"
                      variant={formData.attending === option ? "default" : "outline"}
                      onClick={() => setFormData({ ...formData, attending: option })}
                      className="capitalize"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  min="0"
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData({ ...formData, guests: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Input
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit RSVP"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
