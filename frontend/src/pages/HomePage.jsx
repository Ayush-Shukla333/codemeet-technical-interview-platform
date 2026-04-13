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
              <span className="text-base-content">Learn Together</span>
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
            Everything you need for coding journey, <span className="text-primary font-mono">All In One Place</span>
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
              <h3 className="card-title">HD Video Call</h3>
              <p className="text-base-content/70">Communicate seamlessly with integrated video and chat during your coding sessions.</p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Code2Icon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Live Coding</h3>
              <p className="text-base-content/70">Collaborate in real-time on code snippets and projects with your team.</p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <UsersIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Easy Collaboration</h3>
              <p className="text-base-content/70">Work together seamlessly with your team in real-time, sharing ideas and solving problems instantly.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default HomePage