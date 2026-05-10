import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { MdOutlineCloudUpload, MdOutlineDocumentScanner, MdInsights, MdCheck, MdOutlineHandshake  } from "react-icons/md";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">

                <div>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        AI Powered
                        <span className="text-orange-500"> Lead Analyzer </span>
                        &
                        <span className="text-orange-500"> Outreach Engine</span>
                    </h1>

                    <p className="text-slate-400 mt-6">
                        Score leads and generate personalized emails instantly.
                    </p>

                    <div className="flex gap-4 mt-8">

                        <Link to={'/register'} className="bg-orange-500 hover:bg-orange-600 transition-alll duration-200 cursor-pointer px-6 py-3 rounded-lg">
                            Start Free
                        </Link>

                    </div>

                </div>



                <div className="relative h-125 md:h-112.5 w-full max-w-lg mx-auto">
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute top-0 left-2 md:-left-10 bg-slate-900 p-4 rounded-xl shadow-2xl border border-slate-800 w-40 md:w-56 z-10"
                    >
                        <h3 className="text-[10px] md:text-xs text-slate-400 font-medium">Lead Score</h3>
                        <p className="text-xl md:text-2xl font-extrabold text-green-400">92</p>
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ repeat: Infinity, duration: 5 }}
                        className="absolute top-20 right-2 md:top-12 md:-right-10 bg-slate-900 p-4 rounded-xl shadow-2xl border border-slate-800 w-40 md:w-56 z-10"
                    >
                        <h3 className="text-[10px] md:text-xs text-slate-400 font-medium">Quality</h3>
                        <p className="text-base md:text-lg font-semibold text-indigo-400">High Potential</p>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 6 }}
                        className="absolute top-48 left-2 md:top-40 md:left-0 bg-slate-900 p-4 rounded-xl shadow-2xl border border-slate-800 w-48 md:w-60 z-20"
                    >
                        <h3 className="text-[10px] md:text-xs text-slate-400 font-medium">AI Insight</h3>
                        <p className="text-[10px] md:text-xs text-slate-200 leading-relaxed mt-1">
                            This company shows strong buying signals.
                        </p>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ repeat: Infinity, duration: 7 }}
                        className="absolute bottom-10 right-2 md:right-0 bg-slate-900 p-4 md:p-5 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-orange-500/30 w-56 md:w-72 z-30"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-[9px] md:text-xs text-orange-400 font-bold uppercase tracking-wider">AI Outreach</h3>
                            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></div>
                        </div>
                        <h4 className="text-[10px] md:text-xs text-slate-100 font-semibold">To: John Doe</h4>
                        <p className="text-[9px] md:text-[11px] text-slate-400 mt-2 leading-relaxed italic">
                            "Hi John, I saw your post about SaaS architecture. PitchPilot could automate your qualification workflow..."
                        </p>
                    </motion.div>
                </div>

            </section>



            <section id="feature" className="max-w-7xl mx-auto px-6 py-20">

                <h2 className="text-3xl font-bold text-center">
                    Powerful AI Features
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

                    <div className="bg-slate-900 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold">Upload Leads</h3>
                        <p className="text-slate-400 mt-2">
                            Upload CSV files and instantly process thousands of leads.
                        </p>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold">AI Scoring</h3>
                        <p className="text-slate-400 mt-2">
                            Our AI ranks leads by quality and buying intent.
                        </p>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold">AI Personalized Outreach</h3>
                        <p className="text-slate-400 mt-2">
                            Generate high-converting emails for every lead with a single click
                        </p>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold">Insights Dashboard</h3>
                        <p className="text-slate-400 mt-2">
                            See analytics and discover high value prospects.
                        </p>
                    </div>

                </div>

            </section>



            <section id="pricing" className="max-w-7xl mx-auto px-6 py-24">

                <h2 className="text-3xl md:text-4xl font-bold text-center">
                    Simple Pricing
                </h2>

                <p className="text-slate-400 text-center mt-4">
                    Choose a plan that fits your lead generation needs
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-14">



                    <div className="bg-slate-900 p-8 rounded-2xl flex flex-col border border-slate-800">

                        <h3 className="text-xl font-semibold">Free</h3>

                        <p className="text-slate-400 mt-2">
                            Perfect for getting started
                        </p>

                        <h4 className="text-4xl font-bold mt-6">$0</h4>

                        <ul className="mt-6 space-y-3 text-slate-400">

                            <li className="flex items-center gap-2 "><span className="text-orange-500 font-semibold"><MdCheck /></span> 100 Lead Analysis + AI Email Drafts</li>
                            <li className="flex items-center gap-2 "><span className="text-orange-500 font-semibold"><MdCheck /></span> AI Lead Scoring</li>
                            <li className="flex items-center gap-2 "><span className="text-orange-500 font-semibold"><MdCheck /></span> Dashboard Insights</li>
                            <li className="flex items-center gap-2 "><span className="text-orange-500 font-semibold"><MdCheck /></span> Smart Filtering</li>

                        </ul>

                        <Link to={'/register'} className="mt-8  bg-slate-800 py-3 px-4  w-fit rounded-lg">
                            Start Free
                        </Link>

                    </div>

                    <div className="bg-slate-900 p-8 rounded-2xl border flex flex-col border-orange-500 relative">

                        <span className="absolute top-4 right-4 text-xs bg-orange-600 px-3 py-1 rounded-full">
                            Popular
                        </span>

                        <h3 className="text-xl font-semibold">Pro</h3>

                        <p className="text-slate-400 mt-2">
                            Best for growing teams
                        </p>

                        <h4 className="text-4xl font-bold mt-6">$10</h4>

                        <ul className="mt-6 space-y-3 text-slate-400">

                            <li className="flex items-center gap-2"><span className="text-orange-500 font-bsemibold"><MdCheck /></span> 500 Lead Analysis + AI Email Drafts</li>
                            <li className="flex items-center gap-2 "><span className="text-orange-500 font-semibold"><MdCheck /></span> AI Lead Scoring</li>
                            <li className="flex items-center gap-2 "><span className="text-orange-500 font-semibold"><MdCheck /></span> Advanced Insights</li>
                            <li className="flex items-center gap-2 "><span className="text-orange-500 font-semibold"><MdCheck /></span> Smart Filtering</li>

                        </ul>

                        <Link to={'/register'} className="mt-8 w-fit bg-orange-500 hover:bg-orange-600  py-3 px-4 cursor-pointer transition-all duration-200 ease-in rounded-lg">
                            Upgrade
                        </Link>

                    </div>

                    <div className="bg-slate-900 p-8 rounded-2xl border flex flex-col border-slate-800">

                        <h3 className="text-xl font-semibold">Premium</h3>

                        <p className="text-slate-400 mt-2">
                            For power users
                        </p>

                        <h4 className="text-4xl font-bold mt-6">$20</h4>

                        <ul className="mt-6 space-y-3 text-slate-400">

                            <li className="flex items-center gap-2"><span className="text-orange-500"><MdCheck /></span> 1000 Lead Analysis + AI Email Drafts</li>
                            <li className="flex items-center gap-2"><span className="text-orange-500"><MdCheck /></span> AI Lead Scoring</li>
                            <li className="flex items-center gap-2"><span className="text-orange-500"><MdCheck /></span> Advanced Insights</li>
                            <li className="flex items-center gap-2"><span className="text-orange-500"><MdCheck /></span> Smart Filtering</li>

                        </ul>

                        <Link to={'/register'} className="mt-8  bg-slate-800 py-3 px-4  w-fit rounded-lg cursor-pointer">
                            Upgrade
                        </Link>

                    </div>

                </div>

            </section>



            <section id="howitsworks" className="bg-slate-900/40 py-20">

                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold">How It Works</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">

                        <div className="flex flex-col gap-2 items-center rounded-lg  bg-slate-950 shadow-md shadow-slate-800/40   py-12 px-6">
                            <MdOutlineCloudUpload size={50} />
                            <h3 className="text-xl font-semibold">1. Upload CSV</h3>
                            <p className="text-slate-400 mt-2">
                                Upload your lead data in seconds.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 items-center rounded-lg bg-slate-950 shadow-md shadow-slate-800/40  py-12 px-6">
                            <MdOutlineDocumentScanner size={50} />
                            <h3 className="text-xl font-semibold">2. AI Analysis</h3>
                            <p className="text-slate-400 mt-2">
                                Our AI analyzes every lead.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 items-center rounded-lg bg-slate-950 shadow-md shadow-slate-800/40  py-12 px-6">
                            <MdInsights size={50} />
                            <h3 className="text-xl font-semibold">3. Get Insights</h3>
                            <p className="text-slate-400 mt-2">
                                Discover high converting prospects.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 items-center rounded-lg bg-slate-950 shadow-md shadow-slate-800/40  py-12 px-6">
                            <MdOutlineHandshake size={50} />
                            <h3 className="text-xl font-semibold">4. Close the Deal.</h3>
                            <p className="text-slate-400 mt-2">
                                Use AI-generated personalized emails to turn leads into customers.
                            </p>
                        </div>

                    </div>

                </div>

            </section>



            <section className="py-20 text-center flex flex-col items-center gap-3">

                <h2 className="text-3xl font-bold">
                    Start finding better leads today
                </h2>

                <Link to={'/register'} className="bg-orange-500 w-fit mt-6 px-8 py-3 cursor-pointer hover:bg-orange-600 transition-all duration-200 rounded-lg">
                    Get Started Free
                </Link>

            </section>



            <footer className="border-t border-slate-800 py-6 text-center text-slate-500">
                © 2025 Pitch Pilot. All rights reserved.
            </footer>

        </div>
    )
}

export default LandingPage