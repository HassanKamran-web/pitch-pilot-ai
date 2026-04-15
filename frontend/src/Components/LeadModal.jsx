import React from "react";
import toast from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";
import axios from "axios"
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const LeadModal = ({ isOpen, onClose, lead }) => {
  if (!isOpen) return null;
  const [isgenerating, setIsgenerating] = useState(false)
  const [relaodedlead, setRelaodedlead] = useState([])
  const {token} = useAuth()

  const copyText = (text) => {
    const textcopied = navigator.clipboard.writeText(text);
    if (textcopied) {
      toast.success("Copied to clipboard!");
    }
    else {
      toast.error("Failed to copy!");
    }
  };

  const generateEmail = async (leadId) => {
    setIsgenerating(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/leads/generate/${leadId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if(response.status === 200){
        toast.success("Email Re-generated successfully!")
        setRelaodedlead(response?.data?.lead)
      }
      if(response.status === 400){
        toast.error(response?.error)
      }
    } catch (err) {
      toast.error(err?.message)
    } finally {
      setIsgenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

      
      <div className="w-full max-w-2xl rounded-xl bg-slate-950 border overflow-hidden scroll-none border-slate-800 shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">

        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
        >
          ✕
        </button>

  
        <h2 className="text-xl font-semibold text-white mb-6">
          Lead Details
        </h2>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <div>
            <p className="text-slate-400 text-sm">Company</p>
            <p className="text-white">{relaodedlead?.companyName || lead?.companyName}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Website</p>
            <p className="text-white">{relaodedlead?.website || lead?.website}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Industry</p>
            <p className="text-white">{relaodedlead?.industry || lead?.industry}</p>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Contact</p>
            <p className="text-white">{relaodedlead?.email || lead?.email}</p>
          </div>

        </div>

      
        <div className="mb-6">
          <p className="text-slate-400 text-sm mb-2">Email Subject</p>

          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg p-3">
            <p className="text-white text-sm">
              {relaodedlead?.subject || lead?.subject}
            </p>

            <button
              onClick={() => copyText("AI Generated Subject Placeholder")}
              className="text-xs bg-slate-800 hover:bg-slate-700 flex cursor-pointer items-center gap-2 justify-center text-white px-3 py-1 rounded"
            >
              <MdContentCopy size={16} />
              Copy
            </button>
          </div>
        </div>

        
        <div>
          <p className="text-slate-400 text-sm mb-2">Email Content</p>

          <div className="bg-slate-900 border max-h-52 overflow-y-scroll border-slate-800 rounded-lg p-4 text-sm text-slate-200 whitespace-pre-line">
            <div className="flex justify-end mb-3">
              <button
                onClick={() =>
                  copyText(`Hi there,

This is a placeholder email generated for preview.

Best regards`)
                }
                className="text-xs bg-slate-800 hover:bg-slate-700 cursor-pointer flex items-center gap-2 justify-center text-white px-3 py-1 rounded"
              >
                <MdContentCopy size={16} />

                Copy
              </button>
            </div>
            {relaodedlead?.emailBody || lead?.emailBody}
          </div>

        </div>

        {
          isgenerating ? (

            <button disabled className="w-full py-2 rounded-md bg-orange-500 mt-3 cursor-pointer hover:bg-orange-600 transition ">Generating...</button>
          ) : (

            <button 
            onClick={() => generateEmail(lead?._id)}
            className="w-full py-2 rounded-md bg-orange-500 mt-3 cursor-pointer hover:bg-orange-600 transition ">Re-generate</button>
          )
        }


      </div>
    </div>
  );
};

export default LeadModal;