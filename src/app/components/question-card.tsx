"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

type Question = {
  question: string
  answers: string[]
  correct: string
}

interface QuestionCardProps {
  question: Question
}

// Helper function to render LaTeX in both inline and block formats
const RenderLatex = ({ className, text }: { className?: string; text: string }) => {
  // Function to parse text and render LaTeX for both inline ($...$) and block ($$...$$) formats
  const renderWithLatex = (text: string) => {
    const blockRegex = /\$\$(.*?)\$\$/g;
    const inlineRegex = /\$(.*?)\$/g;

    // First split by block math
    const blockParts = text.split(blockRegex);
    const blockMatches = text.match(blockRegex)?.map(m => m.slice(2, -2)) || [];

    return blockParts.map((part, i) => {
      // For parts that don't contain block math
      if (i % 2 === 0) {
        // Handle inline math within this part
        const inlineParts = part.split(inlineRegex);
        const inlineMatches = part.match(inlineRegex)?.map(m => m.slice(1, -1)) || [];

        return inlineParts.map((inlinePart, j) => {
          if (j % 2 === 0) {
            // biome-ignore lint/suspicious/noArrayIndexKey: we don't have IDs for inline parts
            return <span key={`inline-text-${i}-${j}`}>{inlinePart}</span>;
          }

          // biome-ignore lint/suspicious/noArrayIndexKey: we don't have IDs for inline math
          return <InlineMath key={`inline-math-${i}-${j}`}>{inlineMatches[(j - 1) / 2]}</InlineMath>;
        });
      }

      // We are rendering inline math for blocks, because of errors in the source data
      // biome-ignore lint/suspicious/noArrayIndexKey: we don't have IDs for block math
      return <InlineMath key={`block-math-${i}`}>{blockMatches[(i - 1) / 2]}</InlineMath>;
    });
  };

  return <div className={className}>{renderWithLatex(text)}</div>;
};

export default function QuestionCard({ question }: QuestionCardProps) {
  const [showCorrect, setShowCorrect] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  return (
    <Card className="shadow-md md:min-w-4xl">
      <CardHeader>
        <CardTitle className="text-xl"><RenderLatex text={question.question} /></CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer} className="space-y-3">
          {question.answers.map((answer, index) => {
            // Determine if this answer should be highlighted as incorrect
            const isSelected = answer === selectedAnswer;
            const isCorrect = answer === question.correct;
            const showAsIncorrect = showCorrect && isSelected && !isCorrect;

            return (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: we don't have IDs for answers
                key={index}
                className={`flex items-center space-x-2 rounded-md border p-3 ${showCorrect && isCorrect
                  ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                  : showAsIncorrect
                    ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                    : "hover:bg-accent"
                  }`}
              >
                <RadioGroupItem value={answer} id={`answer-${index}`} />
                <Label htmlFor={`answer-${index}`} className="flex-grow cursor-pointer">
                  <RenderLatex text={answer} />
                </Label>
                {showCorrect && isCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex items-center justify-between w-full">
          <span className="text-sm font-medium">Show correct answer</span>
          <Switch checked={showCorrect} onCheckedChange={setShowCorrect} />
        </div>

        {showCorrect && (
          <div className="w-full">
            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">Correct Answer:</p>
                  <RenderLatex className="text-lg font-bold text-green-700 dark:text-green-400" text={question.correct} />
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-300 dark:border-green-700"
                >
                  Correct
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}
      </CardFooter >
    </Card >
  )
}
