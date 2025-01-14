import {useContext} from "react";
import {RSProviderContext} from "../providers/RSProvider";

export default function useRS() {
    const context = useContext(RSProviderContext);
    if (!context) {
        throw new Error('useRS should only be used in a RSProvider. ');
    }
    return context;
}
