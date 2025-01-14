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
import {keyframes} from "@emotion/react";

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
                    <Box
                        cursor={'pointer'}
                        marginLeft={'10px'}
                        w={'160px'}
                        h={'25px'}
                        background={'orange'}
                        borderRadius={'4px'}
                        padding={'3px'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        display={'flex'}
                        animation={`${keyframes`
                            0% { transform: scale(0.95); }
                            50% { transform: scale(1); }
                            100% { transform: scale(0.95); }
                        `} 2s ease-in-out infinite`}
                        _hover={{ transform: 'scale(1.1)' }}
                        transition="all 0.2s"
                        onClick={() => {
                            window.open("https://buymeacoffee.com/llorenzll", "_blank", "noopener noreferrer");
                        }}
                    >
                        <Text
                            fontSize={'12px'}
                            color={'white'}
                            fontWeight={'bold'}
                            fontFamily={'Courier New, monospace'}
                        >
                            buy my cat a treat :)
                        </Text>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    )
}
