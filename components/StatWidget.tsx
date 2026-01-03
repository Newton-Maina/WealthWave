import React, { JSX } from 'react'
import { formatAmount, cn } from '@/lib/utils'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatWidgetProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'info';
  trend?: {
    value: string;
    direction?: 'up' | 'down' | 'neutral';
  };
  subtext?: string;
  loading?: boolean;
}

const StatWidget = ({ 
  title, 
  amount, 
  icon: Icon, 
  variant = 'default', 
  trend, 
  subtext,
  loading = false 
}: StatWidgetProps) => {
  const variantStyles = {
    default: "bg-blue-50 text-blue-600",
    success: "bg-green-50 text-green-600",
    warning: "bg-orange-50 text-orange-600",
    info: "bg-purple-50 text-purple-600",
  };

  const trendStyles = {
    up: "text-green-600 bg-green-50",
    down: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50",
  };

  const trendDirection = trend?.direction || 'up';

  if (loading) {
    return (
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div 
          className={cn("p-2 rounded-lg transition-colors", variantStyles[variant])}
          aria-hidden="true"
        >
          <Icon className="size-6" />
        </div>
        {trend && (
          <span 
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1",
              trendStyles[trendDirection]
            )}
            aria-label={`Trend ${trendDirection} by ${trend.value}`}
          >
            {trendDirection === 'up' && <TrendingUp className="size-3" />}
            {trendDirection === 'down' && <TrendingDown className="size-3" />}
            {trend.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 tabular-nums">
          {formatAmount(amount)}
        </h3>
        {subtext && (
          <p className="text-xs text-gray-400 mt-1">{subtext}</p>
        )}
      </div>
    </div>
  )
}

export default StatWidget