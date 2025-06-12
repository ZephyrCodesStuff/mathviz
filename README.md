# MathViz 🧮 [![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=flat-square&logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19.x-blue?style=flat-square&logo=react)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

<div align="center">

🔢 **Interactive Math Quiz Visualizer** 📊

</div>

## 🌟 Overview

MathViz is an elegant and interactive math quiz application built with Next.js and React. The application renders beautiful math expressions using **LaTeX** formatting and allows users to practice with mathematics problems across various topics.

## ✨ Features

- 🧮 **LaTeX Support**: Beautifully rendered mathematical expressions using KaTeX
- 🌙 **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- 📱 **Responsive Design**: Works on devices of all sizes
- 🔄 **Multiple Datasets**: Switch between different question sets (`questions.json` and `questions-2.json`)
- ✅ **Immediate Feedback**: Check your answers instantly
- 🎯 **Progress Tracking**: Track your progress through question sets

## 📋 Question Format

The application works with JSON files containing questions in the following format:
```json
{
   "question": "Calculate the derivative of the function $ f(x) = \\sin(x^2) $ at $ x = \\pi $.",
   "answers": [
      "$ 2\\pi\\cos(\\pi^2) $",
      "$ \\cos(\\pi^2) $",
      "$ 2\\pi\\sin(\\pi^2) $",
      "$ -2\\pi\\cos(\\pi^2) $",
      "$ 0 $"
   ],
   "correct": "$ 2\\pi\\cos(\\pi^2) $"
}
```

Each question consists of:
- A question prompt
- Multiple possible answers
- The correct answer that matches one of the provided options

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ZephyrCodesStuff/mathviz.git
   cd mathviz
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   pnpm dev
   ```

4. **Open in your browser**:
   Open [http://localhost:3000](http://localhost:3000) to see the application in action.

## 🔧 Technologies

- **Next.js 15**: React framework with app router
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS 4**: Utility-first CSS framework
- **KaTeX**: LaTeX math rendering
- **next-themes**: Dark mode support

## 📊 Dataset Structure

The application supports two dataset files:
- `questions.json`: Primary question set
- `questions-2.json`: Alternative question set

## 🎨 Customization

You can customize the application by:

1. Adding new question to the sets in the same JSON format
2. Modifying the UI components in the `components` directory (it's shadcn/ui based)
3. Adjusting the theme in `theme-provider.tsx`

## 📄 License

MIT © [ZephyrCodesStuff](https://github.com/ZephyrCodesStuff)

---

<div align="center">
  Made with ❤️
</div>