// src/hooks/useProgress.ts
import { ScopeItem } from "../types";


export const useProgress = (scopeItems: ScopeItem[]) => {
    const completed = scopeItems.filter(item => item.completed).length;
    const total = scopeItems.length;
    
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      currentItems: scopeItems
        .filter(item => !item.completed)
        .slice(0, 2)
        .map(item => item.text)
    };
  };