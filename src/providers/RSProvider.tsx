import {createContext, ReactNode, useEffect, useMemo, useState} from "react";
import RSRawDataReader from "../utils/RSRawDataReader";
import {RS_RAW_DATA_PATH} from "../config";

interface RSProviderContextType {
    currentSentence: string | undefined;
    setCurrentSentence: (currentSentence: string | undefined) => void;
    currentPracticeSeq: number;
    setCurrentPracticeSeq: (currentPracticeSeq: number) => void;
    getNextSentence: () => void;
    getPrevSentence: () => void;
    openSentences: boolean;
    setOpenSentence: (open: boolean) => void;
    practiced: string[];
}

export const RSProviderContext = createContext<RSProviderContextType | undefined>(undefined);

interface RSProviderType {
    children: ReactNode;
}

export default function RSProvider({children}: RSProviderType) {
    const [currentSentence, setCurrentSentence] = useState<string | undefined>();
    const [practiced, setPracticed] = useState<string[]>([]);
    const [currentPracticeSeq, setCurrentPracticeSeq] = useState<number>(-1);
    const [openSentences, setOpenSentences] = useState<boolean>(false);

    const reader = useMemo(() => {
        return new RSRawDataReader();
    }, []);

    useEffect(() => {
        const loadSentence = async () => {
            await reader.loadFile(RS_RAW_DATA_PATH);
        };

        loadSentence().then(() => {
            console.log("RS data loaded. ")
        });
    }, []);

    useEffect(() => {
        console.log(currentPracticeSeq, currentSentence, practiced)
    }, [practiced, currentPracticeSeq, currentSentence]);

    const getNextSentence = () => {
        if (currentPracticeSeq === practiced.length - 1) {
            const newSentence = reader.getRandomSentence();
            setPracticed((oldV) => [...oldV, newSentence]);
            setCurrentSentence(newSentence);
            setCurrentPracticeSeq(currentPracticeSeq + 1);
        } else {
            setCurrentSentence(practiced[currentPracticeSeq + 1]);
            setCurrentPracticeSeq(currentPracticeSeq + 1);
        }
    }

    const getPrevSentence = () => {
        if (currentPracticeSeq > 0) {
            setCurrentSentence(practiced[currentPracticeSeq - 1]);
            setCurrentPracticeSeq(currentPracticeSeq - 1);
        }
    }

    return (
        <RSProviderContext.Provider value={{
            currentSentence: currentSentence,
            setCurrentSentence: setCurrentSentence,
            currentPracticeSeq: currentPracticeSeq,
            setCurrentPracticeSeq: setCurrentPracticeSeq,
            getNextSentence: getNextSentence,
            getPrevSentence: getPrevSentence,
            openSentences: openSentences,
            setOpenSentence: setOpenSentences,
            practiced: practiced
        }}>
            {children}
        </RSProviderContext.Provider>
    )
}
