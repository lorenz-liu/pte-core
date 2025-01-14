import React from 'react';
import RSProvider from "./providers/RSProvider";
import ExercisePage from "./pages/ExercisePage";
import {ChakraProvider, defaultSystem} from "@chakra-ui/react";

function App() {
    return (
        <ChakraProvider value={defaultSystem}>
            <RSProvider>
                <ExercisePage />
            </RSProvider>
        </ChakraProvider>
    );
}

export default App;
