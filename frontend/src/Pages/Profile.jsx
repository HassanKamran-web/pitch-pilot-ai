import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {

  const {user} = useAuth()

  if(!user){
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Profile
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

        
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

            <h2 className="text-xl font-semibold mb-4">
              User Info
            </h2>

            <div className="space-y-3">

              <p>
                <span className="text-slate-400">Name:</span>{" "}
                {user.name}
              </p>

              <p>
                <span className="text-slate-400">Email:</span>{" "}
                {user.email}
              </p>

            </div>

          </div>

        
          <div className="bg-slate-900 p-6 flex flex-col rounded-xl border border-slate-800">

            <h2 className="text-xl font-semibold mb-4">
              Subscription
            </h2>

            <div className="space-y-3">

              <p>
                <span className="text-slate-400">Plan:</span>{" "}
                {user?.plans || "Free"}
              </p>

              <p>
                <span className="text-slate-400">Credits:</span>{" "}
                {user?.credits}
              </p>

            </div>

            <Link to={'/dashboard/pricing'}
              className="mt-5 bg-orange-700 w-fit hover:bg-orange-600 px-4 py-2 rounded-lg cursor-pointer transition"
            >
              Upgrade Plan
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;
