'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface QuickMatchContextType {
    progress: number;
    setProgress: (progress: number) => void;
}

const QuickMatchContext = createContext<QuickMatchContextType | undefined>(undefined);

export function QuickMatchProvider({ children }: { children: ReactNode }) {
    const [progress, setProgress] = useState(0);

    return (
        <QuickMatchContext.Provider value={{ progress, setProgress }}>
            {children}
        </QuickMatchContext.Provider>
    );
}

export function useQuickMatch() {
    const context = useContext(QuickMatchContext);
    if (context === undefined) {
        throw new Error('useQuickMatch must be used within a QuickMatchProvider');
    }
    return context;
}