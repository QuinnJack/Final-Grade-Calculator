import React, { useState } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Equal, X, Infinity } from "lucide-react";
import { Input } from "./components/Input";
import { Label } from "./components/Label";

export default function Component() {
  // State management for grades, weights, target, average, and needed grade
  const [grades, setGrades] = useState<string[]>(Array(5).fill(""));
  const [weights, setWeights] = useState<string[]>(Array(5).fill(""));
  const [target, setTarget] = useState<string>("");
  const [average, setAverage] = useState<string>("");
  const [needed, setNeeded] = useState<string>("");

  // Handle input change for grades and weights
  const handleGradeChange = (index: number, value: string) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  };

  const handleWeightChange = (index: number, value: string) => {
    const newWeights = [...weights];
    newWeights[index] = value;
    setWeights(newWeights);
  };

  // Calculate average and needed grade
  const calculateGrades = () => {
    let totalWeightedGrade = 0;
    let totalWeight = 0;
  
    for (let i = 0; i < grades.length; i++) {
      const grade = parseFloat(grades[i]);
      const weight = parseFloat(weights[i]);
      if (!isNaN(grade) && !isNaN(weight)) {
        totalWeightedGrade += grade * (weight / 100);
        totalWeight += weight;
      }
    }
  
    if (totalWeight === 0) {
      setAverage("");
      setNeeded("");
      return;
    }
  
    const avg = totalWeightedGrade / (totalWeight / 100);
    setAverage(avg.toFixed(2));
  
    if (target.trim() === "") {
      setNeeded("");
      return;
    }
  
    const targetValue = parseFloat(target);
    const remainingWeight = 100 - totalWeight;
    let neededGrade;
  
    if (remainingWeight <= 0) {
      neededGrade = "∞"; // infinity symbol
    } else {
      neededGrade = ((targetValue - avg * (totalWeight / 100)) / (remainingWeight / 100));
      neededGrade = neededGrade.toFixed(2);
    }
  
    setNeeded(neededGrade);
  };
  

  // Reset the form
  const resetForm = () => {
    setGrades(Array(5).fill(""));
    setWeights(Array(5).fill(""));
    setTarget("");
    setAverage("");
    setNeeded("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Grade Calculator</h1>
        <form className="grid grid-cols-2 gap-4">
          {grades.map((_, index) => (
            <React.Fragment key={index}>
              <div className="space-y-2">
                <Label htmlFor={`grade-${index + 1}`}>Grade %</Label>
                <Input
                  id={`grade-${index + 1}`}
                  max="100"
                  min="0"
                  type="number"
                  value={grades[index]}
                  onChange={(e) => handleGradeChange(index, e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`weight-${index + 1}`}>Weight %</Label>
                <Input
                  id={`weight-${index + 1}`}
                  max="100"
                  min="0"
                  type="number"
                  value={weights[index]}
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                />
              </div>
            </React.Fragment>
          ))}
          <div className="col-span-2 space-y-2">
            <Label htmlFor="target">Target Grade %</Label>
            <Input
              id="target"
              max="100"
              min="0"
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>
          <div className="col-span-1 flex items-end mt-4 space-x-4">
          <Button className="mt-100 button-shrink" type="button" size="lg" StartIcon={Equal} onClick={calculateGrades}>
  Calculate
</Button>
<Button className="mt-100 button-shrink" type="button" size="lg" StartIcon={X} onClick={resetForm}>
  Reset
</Button>
          </div>
          <div className="col-span-2 space-y-3">
            <Label htmlFor="average">Average Grade</Label>
            <Input
              id="average"
              max="100"
              min="0"
              readOnly
              className="appearance-none"
              value={average}
            />
          </div>
          <div className="col-span-2 space-y-3">
            <Label htmlFor="needed">Grade Needed</Label>
            <Input
              id="needed"
              max="100"
              min="0"
              readOnly
              className="appearance-none"
              value={needed}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
