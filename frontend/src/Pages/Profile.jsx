import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Account <span className="text-orange-500">Settings</span>
          </h1>
          <p className="text-slate-400 mt-2">Manage your lead generation profile and subscription.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="md:col-span-1 bg-slate-900/50 p-8 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-linear-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-lg shadow-orange-500/20">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-slate-400 text-sm mb-6">{user.email}</p>
            <div className="w-full pt-6 border-t border-slate-800">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Account Status</span>
                <p className="text-green-400 font-medium mt-1">● Active</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            
            <div className="grid sm:grid-cols-2 gap-6">
              
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
                <p className="text-slate-400 text-sm font-medium mb-1">Current Plan</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold text-white uppercase">{user?.plans || "Free"}</h3>
                  <Link to='/dashboard/pricing' className="text-orange-500 hover:text-orange-400 text-sm font-semibold transition">
                    Change
                  </Link>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
                <p className="text-slate-400 text-sm font-medium mb-1">Available Credits</p>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-white">{user?.credits || 0}</h3>
                  <span className="bg-slate-800 text-[10px] px-2 py-1 rounded text-slate-300 uppercase">Leads left</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-semibold mb-6">Personal Details</h3>
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-xs text-slate-500 font-bold uppercase">Full Name</label>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300">
                    {user.name}
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-xs text-slate-500 font-bold uppercase">Email Address</label>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300">
                    {user.email}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                 <Link 
                    to={'/dashboard/pricing'}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl text-center transition shadow-lg shadow-orange-600/20"
                 >
                   Upgrade Plan
                 </Link>
              
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;