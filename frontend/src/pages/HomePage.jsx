import { Link } from "react-router-dom"
import { SignInButton } from "@clerk/clerk-react"
import { ArrowRightIcon, CheckIcon, Code2Icon, Users2Icon, UsersIcon, VideoIcon, ZapIcon } from "lucide-react"
import { CodeBracketIcon } from '@heroicons/react/24/outline'
function HomePage() {

  return (
    <div className="bg-linear-to-br from-base-100 via-base-200 to-base-300"> {/*page background gradient*/}
      {/* NAVBAR */}
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto p-2 flex items-center justify-between">
          {/* LOGO */}
          <Link to={"/"} className="flex items-center gap-3 hover:scale-105 cursor-pointer transition-transform duration-200">
            <img
              src="/logo.svg"
              alt="Logo"
              className="size-14 shrink-0 object-contain ml-9"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">CodeMeet</span>
              <span className="text-xs text-base-content/60 font-medium">Connect. Code. Collaborate.</span>
            </div>
          </Link>

          {/* AUTH  BUTTON */}
          <SignInButton mode="modal">
            <button className="group px-6 py-3 bg-linear-to-r from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 mr-9">
              <span>Get Started</span>
              <ArrowRightIcon className="size-4 transform group-hover:translate-x-2 transition-transform duration-200" />
            </button>
          </SignInButton>
        </div>
      </nav>
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-15">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT*/}
          <div className="space-y-6">
            <div className="badge badge-primary badge-lg">
              <ZapIcon className="size-4" />
              Real Time Code Collaboration
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className=" bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Code Together</span>
              <br />
              <span className="text-base-content">Hire Smarter</span>
            </h1>

            <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
              An ultimate platform for developers to connect, code and collaborate together in real-time. Ace your interview preparation with our interactive coding environment, mock interviews and a vibrant community of like-minded coders.
            </p>

            {/* FEATURE PILLS  */}
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Live Video Call and Chat
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Code Editing
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Multi-Language
              </div>
            </div>
            {/* CTA Button */}
            <div className="flex flex-wrap gap-4">
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-lg flex items-center gap-2">
                  Start Coding
                  <CodeBracketIcon className="size-6" />
                </button>
              </SignInButton>

              <button className="btn btn-outline btn-lg">
                <VideoIcon className="size-6" />
                Watch Demo
              </button>
            </div>

            {/* STATS */}
            <div className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg">
              <div className="stat">
                <div className="stat-value text-primary">10K+</div>
                <div className="stat-title">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-value text-secondary">50K+</div>
                <div className="stat-title">Sessions</div>
              </div>
              <div className="stat">
                <div className="stat-value text-accent">99.9%</div>
                <div className="stat-title">Uptime</div>
              </div>
            </div>
          </div>
          {/* RIGHT IMAGE */}
          <img
            src="/hero.png"
            alt="CodeCollab"
            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-15">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything you need, <span className="text-primary font-mono">All In One Place</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding sessions seamless and productive.
          </p>

        </div>

        {/* FEATURES GRID  */}
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <VideoIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">HD Video Interviews</h3>
              <p className="text-base-content/70">Crystal-clear video and audio powered by WebRTC. Screen sharing, reactions and participant controls built right in.</p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Code2Icon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Collaborative Code Editor</h3>
              <p className="text-base-content/70">VS Code grade Monaco Editor with syntax highlighting and real-time collaborative synchronization.</p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <UsersIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Instant Code Execution</h3>
              <p className="text-base-content/70">Run Javascript, Python, Java and more in a sandboxed environment with results delivered in under 2 seconds.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <UsersIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Session Management</h3>
              <p className="text-base-content/70">Create , schedule and manage interview sessions end-to-end with role based access for interviewers and candidates.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <UsersIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Real-Time Chat</h3>
              <p className="text-base-content/70">Persistent in-session messaging powered by Stream.io. Share links, code snippets, and feedback without platform change.</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <UsersIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Secure</h3>
              <p className="text-base-content/70">Clerk authentication with JWT, role-based route protection, and webhook-driven data sync keep every session secure.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="max-w-7xl mx-auto px-4 py-15">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Up and running in <span className="text-primary font-mono">3 simple steps</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            No setup headaches. Start your first interview session in under a minute.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* connector line desktop */}
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-linear-to-r from-primary/30 via-secondary/30 to-accent/30" />

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="relative">
              <div className="size-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shadow-lg shadow-primary/10">
                <span className="text-3xl font-black text-primary font-mono">1</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-base-content">Create an Account</h3>
            <p className="text-base-content/60 max-w-xs">
              Sign up in seconds using your email or Google account powered by Clerk. Choose your role — interviewer or candidate.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="size-20 rounded-full bg-secondary/10 border-2 border-secondary/30 flex items-center justify-center shadow-lg shadow-secondary/10">
              <span className="text-3xl font-black text-secondary font-mono">2</span>
            </div>
            <h3 className="text-xl font-bold text-base-content">Create or Join a Session</h3>
            <p className="text-base-content/60 max-w-xs">
              Interviewers create a session and share the invite link. Candidates join instantly — no downloads, no plugins required.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="size-20 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center shadow-lg shadow-accent/10">
              <span className="text-3xl font-black text-accent font-mono">3</span>
            </div>
            <h3 className="text-xl font-bold text-base-content">Code, Interview, Decide</h3>
            <p className="text-base-content/60 max-w-xs">
              Collaborate on code in real time, run it live, chat, and conduct the full interview — all inside one unified workspace.
            </p>
          </div>
        </div>
      </div>

      
      {/* ── TESTIMONIALS ── */}
      <div className="max-w-7xl mx-auto px-4 py-15">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Loved by <span className="text-primary font-mono">developers</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Here's what engineers and hiring managers are saying about CodeMeet.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Priya Sharma",
              role: "Senior Engineer @ Google",
              avatar: "PS",
              color: "bg-primary text-primary-content",
              text: "CodeMeet completely replaced our fragmented interview setup. Video, code, and execution in one tab — our candidates actually enjoy the experience now.",
            },
            {
              name: "Rahul Mehta",
              role: "Tech Lead @ Razorpay",
              avatar: "RM",
              color: "bg-secondary text-secondary-content",
              text: "The Monaco editor feels exactly like VS Code. Candidates are comfortable immediately, which means we see their real skills — not their stress.",
            },
            {
              name: "Aisha Khan",
              role: "CS Student, IIT Delhi",
              avatar: "AK",
              color: "bg-accent text-accent-content",
              text: "I used CodeMeet to practice mock interviews with friends. The live code execution feedback is instant and the video quality is flawless.",
            },
          ].map(({ name, role, avatar, color, text }) => (
            <div key={name} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body gap-4">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-warning text-lg">★</span>
                  ))}
                </div>
                <p className="text-base-content/70 leading-relaxed">"{text}"</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className={`avatar placeholder`}>
                    <div className={`size-10 rounded-full ${color} font-bold text-sm flex items-center justify-center`}>
                      <span>{avatar}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-base-content text-sm">{name}</p>
                    <p className="text-xs text-base-content/50">{role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      {/* <div className="max-w-3xl mx-auto px-4 py-15">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Frequently asked <span className="text-primary font-mono">questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Is CodeMeet free to use?",
              a: "Yes — CodeMeet is free to get started. Create an account, set up sessions, and run interviews at no cost.",
            },
            {
              q: "What programming languages are supported?",
              a: "CodeMeet supports JavaScript, Python, Java, C++, TypeScript, Go, Rust, Ruby, and many more via the Piston API sandboxed execution engine.",
            },
            {
              q: "Do candidates need to install anything?",
              a: "No. CodeMeet runs entirely in the browser. Candidates join via a link — no downloads, no plugins, no setup required.",
            },
            {
              q: "How is the code execution sandboxed?",
              a: "Code runs through the Piston API, an isolated multi-language execution engine. Candidate code never runs on CodeMeet's servers directly, keeping everything safe.",
            },
            {
              q: "How is authentication handled?",
              a: "CodeMeet uses Clerk for authentication, supporting email/password and Google sign-in with JWT-based route protection on both frontend and backend.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="collapse collapse-plus bg-base-100 shadow-md border border-base-content/5">
              <input type="checkbox" />
              <div className="collapse-title text-base font-semibold text-base-content">
                {q}
              </div>
              <div className="collapse-content text-base-content/70 text-sm leading-relaxed">
                <p>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* ── CTA BANNER ── */}
      <div className="max-w-7xl mx-auto px-4 py-15">
        <div className="rounded-3xl bg-linear-to-br from-primary/20 via-secondary/10 to-accent/20 border border-primary/20 shadow-2xl px-8 py-16 text-center space-y-6">
          <div className="badge badge-primary badge-lg mx-auto">
            <ZapIcon className="size-4" />
            Get started for free
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-base-content leading-tight">
            Ready to run your first <br />
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              CodeMeet session?
            </span>
          </h2>
          <p className="text-lg text-base-content/60 max-w-xl mx-auto">
            Join thousands of engineers already using CodeMeet for technical interviews, mock sessions, and collaborative coding.
          </p>
          <SignInButton mode="modal">
            <button className="group btn btn-primary btn-lg gap-2 shadow-lg hover:scale-105 transition-transform duration-200">
              Start for Free
              <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  )
}

export default HomePage