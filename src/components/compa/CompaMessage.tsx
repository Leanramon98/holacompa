"use client";

import { motion } from "framer-motion";

interface CompaMessageProps {
  message: string;
}

export function CompaMessage({ message }: CompaMessageProps) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-crema relative mb-6">
      <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-2xl animate-bounce shadow-md">
        🐾
      </div>
      <div className="relative bg-crema/30 p-3 rounded-xl border border-crema/50 flex-grow">
        <div className="absolute -left-2 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-r-[10px] border-r-crema/50 border-b-[8px] border-b-transparent" />
        <p className="text-marron font-medium leading-tight italic">
          "{message}"
        </p>
      </div>
    </div>
  );
}
