import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PROBLEMS } from '../data/problems.js';
import Navbar from '../components/Navbar.jsx';
import toast from 'react-hot-toast';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import CodeEditorPanel from '../components/CodeEditorPanel.jsx';
import OutputPanel from '../components/OutputPanel.jsx';
import ProblemDescription from '../components/ProblemDescription.jsx';
import { executeCode } from '../lib/piston.js';
import confetti from 'canvas-confetti';

function ProblemDetail() {
    const { id } = useParams(); //this will get the id from the url parameters
    const navigate = useNavigate(); //this will allow us to navigate to different pages

    const [currentProblemId, setCurrentProblemId] = useState("two-sum"); //this will store the current problem id in the state
    const [selectedLanguage, setSelectedLanguage] = useState("javascript"); //this will store the selected programming language in the state
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript); //this will store the code snippet in the state
    const [output, setOutput] = useState(null); //this will store the output of the code execution in the state
    const [isRunning, setIsRunning] = useState(false); //this will store the loading state of the code execution in the state

    const currentProblem = PROBLEMS[currentProblemId]; //this will get the current problem details from the PROBLEMS object based on the currentProblemId

    useEffect(() => {
        if (id && PROBLEMS[id]) { //this will check if the id exists in the url parameters and if it is a valid problem id in the PROBLEMS object
            setCurrentProblemId(id);
            setCode(PROBLEMS[id].starterCode[selectedLanguage]); //this will set the code snippet based on the selected language for the current problem 
            setOutput(null);
        }
    }, [id, selectedLanguage]); //this will run the effect whenever the id in the url parameters changes

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        setSelectedLanguage(newLanguage);
        setCode(PROBLEMS[currentProblemId].starterCode[newLanguage]); //this will set the code snippet based on the new selected language for the current problem
        setOutput(null);
    };

    const handleProblemChange = (newProblemId) => navigate(`/problems/${newProblemId}`);

    const triggerConfetti = () => {
        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.2, y: 0.6 }
        });
        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.8, y: 0.6 }
        });
    };

    //this is necessary because the output from the code execution may contain extra whitespace or newlines, so we need to normalise it before comparing it with the expected output for the current problem
    const normaliseOutput = (output) => {
        return output
            .trim()
            .split("\n")
            .map((line) =>
                line
                    .trim()
                    // remove spaces after [ and before ]
                    .replace(/\[\s+/g, "[")
                    .replace(/\s+\]/g, "]")
                    // normalize spaces around commas to single space after comma
                    .replace(/\s*,\s*/g, ",")
            )
            .filter((line) => line.length > 0)
            .join("\n");

    };

    const checkIfTestsPassed = (actualOutput, expectedOutput) => {
        const normalisedActual = normaliseOutput(actualOutput);
        const normalisedExpected = normaliseOutput(expectedOutput);

        return normalisedActual === normalisedExpected;
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput(null);

        const result = await executeCode(selectedLanguage, code);
        setOutput(result);
        setIsRunning(false);

        //check if code executed successfully and if the output matches the expected output for the current problem
        if (result.success) {
            const expectedOutput = currentProblem.expectedOutput[selectedLanguage]; //this will get the expected output for the first test case of the current problem
            const testsPasses = checkIfTestsPassed(result.output, expectedOutput); //this will check if the output of the code execution matches the expected output for the current problem
            if (testsPasses) {
                triggerConfetti();
                toast.success("Congratulations! All test cases passed.");
            }
            else {
                toast.error("Some test cases failed. Please try again.");
            }
        }
        else {
            toast.error("Code execution failed!");
        }
    };

    return (
        <div className='h-screen bg-base-100 flex flex-col'>
            <Navbar />

            <div className='flex-1'>
                <PanelGroup direction="horizontal">

                    {/* left panel-problem description */}
                    <Panel defaultSize={40} minSize={30}>
                        <ProblemDescription
                            problem={currentProblem}
                            currentProblemId={currentProblemId}
                            onProblemChange={handleProblemChange}
                            allProblems={Object.values(PROBLEMS)} />
                    </Panel>

                    <PanelResizeHandle className="w-2 bg-gray-300 hover:bg-primary transition-colors cursor-col-resize" />

                    {/* right panel-code editor and output */}
                    <Panel defaultSize={60} minSize={30}>
                        <PanelGroup direction="vertical">

                            {/*Top Panel - code editor */}
                            <Panel defaultSize={70} minSize={30}>
                                <CodeEditorPanel
                                    selectedLanguage={selectedLanguage}
                                    code={code}
                                    isRunning={isRunning}
                                    onLanguageChange={handleLanguageChange}
                                    onCodeChange={setCode}
                                    onRunCode={handleRunCode}
                                />
                            </Panel>

                            <PanelResizeHandle className="h-2 bg-gray-300 hover:bg-primary transition-colors cursor-row-resize" />

                            {/*Bottom Panel - output */}
                            <Panel defaultSize={30} minSize={20}>
                                <OutputPanel 
                                output={output}
                                />
                            </Panel>

                        </PanelGroup>
                    </Panel>

                </PanelGroup>
            </div>
        </div>
    );
}

export default ProblemDetail;