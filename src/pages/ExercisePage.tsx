import useRS from "../hooks/useRS";
import React, {useMemo, useState, useEffect} from "react";
import TextReader from "../utils/TextReader";
import BaseContainer from "../components/BaseContainer";
import {Box, Button, IconButton, Text, Collapsible, Separator, Badge, Heading, VStack} from "@chakra-ui/react";
import {HiSpeakerphone} from "react-icons/hi";
import Drawer from "react-modern-drawer";
import 'react-modern-drawer/dist/index.css';

export default function ExercisePage() {
    const textReader = useMemo(() => {
        return new TextReader();
    }, []);

    const {
        currentSentence,
        setCurrentSentence,
        currentPracticeSeq,
        setCurrentPracticeSeq,
        getNextSentence,
        getPrevSentence,
        openSentences,
        setOpenSentence,
        practiced
    } = useRS();
    const [showSentence, setShowSentence] = useState<boolean>(false);
    const [isReading, setIsReading] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(0);

    const SentenceItem = ({sentence, index}: {sentence: string, index: number}) => {
        return (
            <Box
                bg={currentPracticeSeq === index ? 'black' : '#fafafa'}
                borderRadius={'4px'} cursor={'pointer'} padding={'5px'}
                onClick={() => {
                    setCurrentPracticeSeq(index);
                    setCurrentSentence(practiced[index]);
                    setOpenSentence(false);
                }}
            >
                <Text fontSize={'12px'} color={currentPracticeSeq === index ? 'white' : 'black'}>
                    {sentence}
                </Text>
            </Box>
        )
    }

    useEffect(() => {
        let countdownTimer: NodeJS.Timeout;
        let readTimer: NodeJS.Timeout;

        if (currentSentence) {
            setIsReading(true);
            setCountdown(2);

            countdownTimer = setInterval(() => {
                setCountdown(prev => Math.max(0, prev - 1));
            }, 1000);

            readTimer = setTimeout(() => {
                textReader.read(currentSentence);
                setIsReading(false);
            }, 2000);
        }

        return () => {
            clearInterval(countdownTimer);
            clearTimeout(readTimer);
        };
    }, [currentSentence, textReader]);

    return (
        <BaseContainer>
            {currentPracticeSeq > -1 && <Box justifyContent="flex-start" alignItems="center" display="flex" w={'100%'} padding={'10px'}>
              <Badge>
                  <Text color={'gray'}>
                      {practiced.length} Practiced
                  </Text>
                <Text color={'darkgrey'}>
                    {currentPracticeSeq + 1} of {practiced.length}
                </Text>
              </Badge>
            </Box>}

            <Box justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'} width='100%' height={'100%'}>
                {currentPracticeSeq > -1 && currentSentence && <Box
                  justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}
                  width='100%' height={'50%'}
                  position="relative"
                >
                    {isReading && (
                        <Text
                            position="absolute"
                            top="-8"
                            color="gray.500"
                            fontSize="sm"
                        >
                            Reading in {countdown}s...
                        </Text>
                    )}

                  <IconButton
                    variant={'solid'}
                    size={'lg'}
                    onClick={() => textReader.read(currentSentence)}
                    disabled={isReading}
                    aria-label="Read text"
                  >
                    <HiSpeakerphone />
                  </IconButton>
                </Box>}

                {currentPracticeSeq < 0 && (
                    <>
                        <Button
                            onClick={getNextSentence}
                            disabled={isReading}
                        >
                            Start
                        </Button>
                        <Box bg={'#fafafa'} marginTop={'10px'} borderRadius={'4px'} padding={'6px'} justifyContent={'center'} alignItems={'center'} display={'flex'}>
                            <Text fontSize={'12px'} color={'gray'}>
                                This is a minimal platform to practice PTE Core Repeat Sentences.
                            </Text>
                        </Box>
                    </>
                )}

                {currentPracticeSeq > -1 && <>
                  <Box width={'60%'} justifyContent={'space-between'} alignItems={'center'} display={'flex'}>
                    <Button
                      variant={'subtle'}
                      onClick={getPrevSentence}
                      disabled={currentPracticeSeq < 1 || isReading}
                    >
                      Previous
                    </Button>
                    <Button
                      variant={'subtle'}
                      onClick={getNextSentence}
                      disabled={isReading}
                    >
                      Next
                    </Button>
                  </Box>

                  <Separator marginTop={'30px'}/>

                  <Box width={'60%'} height={'auto'} borderRadius={'4px'} padding={'10px'}>
                    <Collapsible.Root>
                      <Collapsible.Trigger
                        paddingY="3"
                        cursor={isReading ? 'not-allowed' : 'pointer'}
                        onClick={() => {
                            if (!isReading) {
                                setShowSentence(!showSentence);
                            }
                        }}
                      >
                        <Text color={isReading ? 'gray.400' : 'gray'}>
                            {showSentence ? 'Hide' : 'Show'} Sentence
                        </Text>
                      </Collapsible.Trigger>
                      <Collapsible.Content>
                        <Box padding="4" borderWidth="1px">
                          <Text>{currentSentence}</Text>
                        </Box>
                      </Collapsible.Content>
                    </Collapsible.Root>
                  </Box>
                </>}
            </Box>

            <Drawer
                open={openSentences}
                onClose={() => setOpenSentence(false)}
                direction='left'
            >
                <Box w={'100%'} h={'100%'} padding={'10px'}>
                    <Box justifyContent="space-between" alignItems="center" display="flex" w={'100%'}>
                        <Heading>
                            Practiced
                        </Heading>
                        <Badge color={'gray'}>
                            {practiced.length} Practiced
                        </Badge>
                    </Box>
                    <Separator marginTop={'12px'} marginBottom={'12px'} />
                    <VStack>
                        {practiced.map((value, index) => <SentenceItem sentence={value} index={index} key={index + value} />)}
                    </VStack>
                </Box>
            </Drawer>
        </BaseContainer>
    );
}
