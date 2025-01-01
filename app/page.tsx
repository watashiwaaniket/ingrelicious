"use client"

import * as React from "react"
import ReactMarkdown from 'react-markdown';
import Header from "@/components/Header";

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
import Footer from "@/components/Footer";




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
    <Header/>

    {/* <div className="h-[80vh]"> */}
      <div className="flex justify-center pt-16 ">
        <Card className="w-[380px] bg-[#F39E60] border-[#9F5255] border-4">
          <CardHeader>
            <CardTitle className="text-[#7C444F]">Turn Ingredients to Delicacies!</CardTitle>
            <CardDescription className="text-[#FFEEAD]">Delicious recepies just a click away.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title" className="text-[#7C444F] ">Type your Ingredients</Label>
                  <Input id="ingredients" value={ingredients} onChange={handleIngredientsChange} className="bg-[#F39E60] border-2 border-[#9F5255] text-[#FFEEAD]"/>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="bg-[#9F5255] text-[#FFEEAD]" onClick={apiConnection}>Generate!</Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        {hasResult && (
          <div className="flex justify-center pt-16 p-8">
            <div className="prose"> {/* Apply Tailwind prose class for styling */}
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    {/* </div> */}

    <Footer />
    </>
  )
}
