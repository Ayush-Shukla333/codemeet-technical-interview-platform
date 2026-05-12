import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions"
import Navbar from "../components/Navbar"
import WelcomeSection from "../components/WelcomeSection"
import CreateSessionModal from "../components/CreateSessionModal"
import StatsCards from "../components/StatsCards"
import ActiveSessions from "../components/ActiveSessions"
import RecentSessions from "../components/RecentSessions"
function DashboardPage() {
  const navigate = useNavigate()
  const {user} = useUser()
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({problem: "", difficulty: ""});

  const createSessionMutation = useCreateSession();
  const {data: activeSessionsData, isLoading: activeSessionsLoading} = useActiveSessions();
  const {data: recentSessionsData, isLoading: recentSessionsLoading} = useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;
    createSessionMutation.mutate({
      problem: roomConfig.problem, 
      difficulty: roomConfig.difficulty
    },
    {
      onSuccess: (data) => {
        setShowCreateModal(false); // Close the modal after successful creation
        navigate(`/session/${data.session._id}`); // Navigate to the newly created session
      },
    }
  );
  };

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if(!user.id) return false;
    return session.host?.clerkId ===user.id || session.participant?.clerkId === user.id;
  }

  return (
    <>
  <div className = "min-h-screen bg-base-300">
    <Navbar/>
    <WelcomeSection onCreateSession = {() => setShowCreateModal(true)}/> 
      {/* Grid Layout */}
      <div className = "container mx-auto px-4 pb-16">
        <div className = "grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StatsCards
          activeSessionsCount={activeSessions.length}
          recentSessionsCount={recentSessions.length}
          />
          <ActiveSessions
          sessions={activeSessions}
          isLoading={activeSessionsLoading}
          isUserInSession={isUserInSession}
          />
      </div>
      <RecentSessions
      sessions={recentSessions}
      isLoading={recentSessionsLoading}
      />
  </div>
  </div>
  <CreateSessionModal 
  isOpen={showCreateModal}
  onClose={() => setShowCreateModal(false)}
  roomConfig={roomConfig}
  setRoomConfig={setRoomConfig}
  onCreateRoom={handleCreateRoom}
  isCreating = {createSessionMutation.isPending}
  />
  </>
  )
}

export default DashboardPage;
