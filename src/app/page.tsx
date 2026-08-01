"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-6">RSVP Tutaya</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Modern minimalist birthday invitations for every age.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {THEMES.map((theme) => (
            <Card key={theme.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="capitalize">{theme.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{theme.description}</p>
                <Link href={`/rsvp/${theme.id}`} passHref>
                  <Button className="w-full">Create Invitation</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </main>
  );
}

const THEMES = [
  {
    id: "anak",
    label: "Kids",
    description: "Bright, playful, and full of joy for little ones.",
  },
  {
    id: "remaja",
    label: "Teens",
    description: "Cool, stylish, and perfect for the young at heart.",
  },
  {
    id: "dewasa",
    label: "Adults",
    description: "Elegant, sophisticated, and timeless for grown-ups.",
  },
];
