// Piston API is a service for code execution
const PISTON_API = "https://emkc.org/api/v2/piston/";

const LANGUAGE_VERSIONS = {
    javascript: { language: "javascript", version: "15.10.0" },
    python:     { language: "python",     version: "3.10.0"  },
    java:       { language: "java",       version: "15.0.2"  },
    cplusplus:  { language: "c++",        version: "10.0.0"  }, // ✅ added
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to execute
 * @returns {Promise<{success:boolean, output?:string, error?:string}>}
 */
export async function executeCode(language, code) {
    try {
        const languageConfig = LANGUAGE_VERSIONS[language];

        if (!languageConfig) {
            return {
                success: false,
                error: `Unsupported language: ${language}`,
            };
        }

        const response = await fetch(`${PISTON_API}/execute`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                language: languageConfig.language,
                version:  languageConfig.version,
                files: [{
                    name:    `main.${getFileExtension(language)}`,
                    content: code,
                }],
            }),
        });

        if (!response.ok) {
            return {
                success: false,
                error: `HTTP error! status: ${response.status}`,
            };
        }

        const data     = await response.json();
        const output   = data.run?.output || "";
        const stderr   = data.run?.stderr || "";
        const exitCode = data.run?.code;

        // ✅ use exit code instead of stderr to determine failure
        // stderr alone is not a failure — compilers write warnings there
        if (exitCode !== 0) {
            return {
                success: false,
                output:  output,
                error:   stderr || "Runtime error occurred",
            };
        }

        return {
            success: true,
            output: output || "No output",
        };

    } catch (error) {
        return {
            success: false,
            error: `Failed to execute code: ${error.message}`,
        };
    }
}

function getFileExtension(language) {
    const extensions = {
        javascript: "js",
        python:     "py",
        java:       "java",
        cplusplus:  "cpp", // ✅ added
    };
    return extensions[language] || "txt";
}