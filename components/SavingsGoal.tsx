"use client";

import React from 'react';
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target } from "lucide-react";
import { formatAmount } from "@/lib/utils";

interface SavingsGoalProps {
  title: string;
  targetAmount: number;
  currentAmount: number;
  color?: string;
}

const SavingsGoal = ({ title, targetAmount, currentAmount, color = "bg-blue-600" }: SavingsGoalProps) => {
  const percentage = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);

  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-soft border border-gray-100/50 relative overflow-hidden group hover:shadow-soft-xl transition-all duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Target className="w-24 h-24 text-blue-600" />
        </div>
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            <span>On Track</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 z-10">
        <div className="flex justify-between text-sm">
            <span className="text-gray-500 font-medium">Progress</span>
            <span className="text-gray-900 font-bold">{percentage}%</span>
        </div>
        <Progress value={percentage} className="h-3 bg-gray-100" indicatorClassName={color} />
        <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-900 font-semibold">{formatAmount(currentAmount)}</span>
            <span className="text-gray-500">Target: {formatAmount(targetAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoal;
