"use client"

import * as React from "react"
import ReactMarkdown from 'react-markdown';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"




export default function Home() {
  const [ingredients, setIngredients] = React.useState("");
  const [result, setResult] = React.useState("");
  const [hasResult, setHasResult] = React.useState(false);

  //@ts-ignore
  const handleIngredientsChange = (event) => {
    setIngredients(event.target.value);
  };

  let ifResult = false;

  const apiConnection = async () => {
    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");

      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Use the ingredients which I'm giving to generate me a recipe out of it, here are the ingredients: ${ingredients}`;

      const response = await model.generateContent(prompt);

      // Correctly access the text from the response object
      const generatedText = response?.response?.text || "No content generated.";
      setResult(generatedText);
      setHasResult(true);

      console.log(result)
    } catch (error) {
      console.error("Error generating recipe:", error);
      setResult("Failed to generate recipe. Please try again.");
      setHasResult(true);
    }
  };

  return (
    <>
    <div className="flex justify-center w-full p-6 bg-gradient-to-br from-cyan-400 to-violet-700" >
      <h2 className="font-bold text-2xl text-white">Ingrelicious!</h2>
    </div>

    <div className="flex justify-center pt-16">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-blue-800">Type Ingredients</CardTitle>
          <CardDescription>Delicious recepies just a click away.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Ingredients</Label>
                <Input id="ingredients" placeholder="Type your Ingredients" value={ingredients} onChange={handleIngredientsChange}/>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="bg-gradient-to-br from-cyan-400 to-violet-700" onClick={apiConnection}>Generate!</Button>
        </CardFooter>
      </Card>
    </div>

    <div>
      {hasResult && (
        <div className="flex justify-center pt-16">
        <div className="prose"> {/* Apply Tailwind prose class for styling */}
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      </div>
      )}
    </div>
    </>
  )
}
