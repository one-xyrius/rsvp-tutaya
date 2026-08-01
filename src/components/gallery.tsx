"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PHOTO_CATEGORIES = ["anak", "remaja", "dewasa"];

export function Gallery({ theme }: { theme: string }) {
  return (
    <Tabs defaultValue={theme} className="mt-8">
      <TabsList className="grid w-full grid-cols-3">
        {PHOTO_CATEGORIES.map((cat) => (
          <TabsTrigger key={cat} value={cat} className="capitalize">
            {cat}
          </TabsTrigger>
        ))}
      </TabsList>
      {PHOTO_CATEGORIES.map((cat) => (
        <TabsContent key={cat} value={cat} className="mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src={`/photos/${cat}/${i + 1}.jpg`}
                      alt={`${cat} gallery ${i + 1}`}
                      className="w-full h-40 object-cover"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
