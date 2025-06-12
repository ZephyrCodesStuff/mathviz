"use client"

import { useState } from "react"
import QuestionCard from "./question-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Question } from "../structs"

interface QuestionListProps {
  questions: Question[]
}

export default function QuestionList({ questions }: QuestionListProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questionsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(questions.length / questionsPerPage)

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setCurrentQuestionIndex((page - 1) * questionsPerPage)
    }
  }

  const [pageInput, setPageInput] = useState("")

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value)
  }

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const pageNumber = Number.parseInt(pageInput, 10)
    if (!Number.isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      handlePageChange(pageNumber)
      setPageInput("")
    }
  }

  // Get page numbers to display (current +/- 2)
  const getVisiblePageNumbers = () => {
    const pages = []
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, currentPage + 2)

    // Ensure we always show 5 page numbers if available
    if (endPage - startPage + 1 < 5 && totalPages > 5) {
      if (currentPage < totalPages / 2) {
        endPage = Math.min(totalPages, startPage + 4)
      } else {
        startPage = Math.max(1, endPage - 4)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
      </div>

      <QuestionCard question={questions[currentQuestionIndex]} />

      <div className="flex justify-center mt-6 gap-x-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 mx-2"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <div className="flex gap-2">
          {getVisiblePageNumbers().map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
              className="px-3"
            >
              {page}
            </Button>
          ))}
          {totalPages > 5 && (
            <form onSubmit={handlePageInputSubmit} className="flex items-center">
              <Input
                type="number"
                value={pageInput}
                onChange={handlePageInputChange}
                placeholder={`Page ${currentPage}`}
                className="border rounded px-2 py-1 w-20"
                min={1}
                max={totalPages}
              />
              <Button type="submit" className="ml-2">Go</Button>
            </form>
          )}
        </div>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
          className="flex items-center gap-2"
        >
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
