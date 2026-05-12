import { PROBLEMS } from "../data/problems";

function CreateSessionModal({ isOpen, onClose, roomConfig, setRoomConfig, onCreateRoom, isCreating }) {
    const problems = Object.values(PROBLEMS);

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-2xl">
                <h3 className="font-bold text-2xl mb-4">Create New Session</h3>
                
                <div className="space-y-8">
                    {/* PROBLEM SELECTION */}
                    <div className="space-y-2">
                        <label className="label">
                            <span className="label-text font-semibold">Select Problem</span>
                        </label>
                        <select 
                            className="select w-full"
                            value={roomConfig.problem}
                            onChange={(e) => {
                                const selectedProblem = problems.find(p => p.title === e.target.value);
                                setRoomConfig({
                                    difficulty: selectedProblem.difficulty,
                                    problem: e.target.value,
                                });
                            }}
                        >
                            <option value="" disabled>Select a problem</option>
                            {problems.map((problem) => (
                                <option key={problem.id} value={problem.title}>
                                    {problem.title} ({problem.difficulty})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* ROOM SUMMARY */}
                    {roomConfig.problem && (
                        <div className="alert alert-success">
                            {/* Assumed Code2Icon import here */}
                            <div>
                                <p className="font-semibold">Room Summary:</p>
                                <p> Problem: <span className="font-medium">{roomConfig.problem}</span> </p>
                                <p> Max Participants: <span className="font-medium">2 (1-on-1 session)</span> </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose}>
                        Cancel
                    </button>
                    <button 
                        className="btn btn-primary gap-2" 
                        onClick={onCreateRoom} 
                        disabled={isCreating || !roomConfig.problem}
                    >
                        {isCreating ? "Creating..." : "Create Session"}
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
}

export default CreateSessionModal;
