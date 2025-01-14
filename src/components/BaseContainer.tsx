import {
    Box,
    Grid,
    GridItem,
    IconButton,
    Link,
    Text,
} from "@chakra-ui/react";
import React from "react";
import useRS from "../hooks/useRS";
import {BsListCheck} from "react-icons/bs";

export default function BaseContainer({ children }: { children: React.ReactNode }) {
    const {openSentences, setOpenSentence, currentPracticeSeq} = useRS();

    return (
        <Box
            h="100vh"
            w="100vw"
        >
            <Grid
                h="100%"
                w="100%"
                templateRows="repeat(20, 1fr)"
                templateColumns="repeat(1, 1fr)"
            >
                <GridItem rowSpan={1} bg={'black'} justifyContent={'flex-start'} alignItems={'center'} display={'flex'} padding={'10px'}>
                    {currentPracticeSeq > -1 && <IconButton
                        variant={'solid'}
                        size={'md'}
                        color={'black'}
                        bg={'white'}
                        onClick={() => setOpenSentence(!openSentences)}
                        aria-label="Open sentences"
                    >
                        <BsListCheck/>
                    </IconButton>}
                </GridItem>
                <GridItem rowSpan={18}>
                    {children}
                </GridItem>
                <GridItem rowSpan={1} bg={'black'} justifyContent={'center'} alignItems={'center'} display={'flex'}>
                    <Text color={'white'} fontFamily={'Courier New, monospace'}>
                        ☕️ made by <Link
                        href="https://lorenz.fun"
                        target="_blank"
                        rel="noopener noreferrer"
                        color={'lightblue'}
                        textDecoration={'underline'}
                        fontFamily={'Courier New, monospace'}
                    >@lorenz</Link>
                    </Text>
                </GridItem>
            </Grid>
        </Box>
    )
}
