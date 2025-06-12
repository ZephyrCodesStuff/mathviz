"use client";

import QuestionList from "./components/question-list";
import { ThemeButton } from "./components/theme-button";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import questions from "@/app/questions.json";
import questionsAlt from "@/app/questions-2.json";

export default function Home() {
  const [useAlternateDataset, setUseAlternateDataset] = useState(false);
  const dataset = useAlternateDataset ? questionsAlt : questions;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="fixed top-5 right-5 z-10 flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="dataset-toggle"
            checked={useAlternateDataset}
            onCheckedChange={setUseAlternateDataset}
          />
          <Label htmlFor="dataset-toggle">
            {useAlternateDataset ? "Alternate Dataset" : "Normal Dataset"}
          </Label>
        </div>
        <ThemeButton />
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <QuestionList questions={dataset} />
      </main>
    </div>
  );
}
