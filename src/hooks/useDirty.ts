import { useState } from "react";

export function useDirty<T>(initialState: T):[value: T, handleSetValue: (newValue: T) => void, isDirty: boolean] {
    const [value, setValue] = useState(initialState);
    const [isDirty, setIsDirty] = useState(false);
    const handleSetValue = (newValue: T) => {
        setValue(newValue);
        setIsDirty(true);
    }
    return [value, handleSetValue, isDirty]

}