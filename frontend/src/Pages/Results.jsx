import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import LeadModal from "../Components/LeadModal";
import Filter from "../Components/Filter";
import LoadingScreen from "../Components/LoadingScreen";

const Results = () => {
  const [leads, setLeads] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)
  const [loading, setLoading] = useState(false);
  const [isgenerating, setIsgenerating] = useState(null)
  const [qualityFilter, setQualityFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [search, setSearch] = useState("")

  const { token } = useAuth();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/leads/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setLeads(response.data.leads);
      }
    } catch (err) {
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const generateEmail = async (leadId) => {
    setIsgenerating(leadId);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/leads/generate/${leadId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        toast.success("Email Generated successfully!")
        fetchLeads();
      }
      if (response.success === false) {
        toast.error("Email Generate Failed")
        fetchLeads();
      }
    } catch (err) {
      toast.error("Email Generate Failed")
      fetchLeads();

    } finally {
      setIsgenerating(null);
    }
  };

  const openModal = (lead) => {
    setSelectedLead(lead)
    setIsOpen(true)
  }

  const closeModal = () => {
    setSelectedLead(null)
    setIsOpen(false)
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {

      const matchQuality =
        qualityFilter === "" || lead.quality === qualityFilter

      const matchStatus =
        statusFilter === "" || lead.status === statusFilter

      const matchSearch =
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.companyName?.toLowerCase().includes(search.toLowerCase())

      return matchQuality && matchStatus && matchSearch


    })

  }, [leads, qualityFilter, statusFilter, search])

  return (
    <div className="p-4 md:p-8">

      <div className="flex lg:flex-row flex-col items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Results</h1>

        <Filter qualityFilter={qualityFilter} setQualityFilter={setQualityFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} search={search} setSearch={setSearch} leads={leads} setLeads={setLeads} />
      </div>


      {/* Leads Table */}
      <div className="mt-8 overflow-x-auto  ">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Website</th>
              <th className="px-4 py-2 text-left">Industry</th>
              <th className="px-4 py-2 text-left">Quality</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                {
                  loading ? (
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                     Fetching Leads...
                    </td>
                  ) : (
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      No leads uploaded yet
                    </td>
                  )
                }
              </tr>
            ) : (
              Array.isArray(leads) && (
                filteredLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-800/50 border-b border-slate-800/50">
                    <td className="px-4 py-2 text-sm">{lead.companyName}</td>
                    <td className="px-4 py-2 text-sm">
                      <a
                        href={lead?.website}
                        target="_blank"
                        className="text-blue-500 hover:underline"
                      >
                        {lead.website}
                      </a>
                    </td>
                    <td className="px-4 py-2 text-sm">{lead.industry || "-"}</td>
                    <td className="px-4 py-2 text-sm">{lead.quality || "-"}</td>
                    <td className="px-4 py-2 text-sm">{lead.score || (lead.score <= 0 ? "0" : "-")}</td>
                    <td className="px-4 py-2 text-sm">{lead.contactName || lead.email}</td>
                    <td
                      className={`px-4 py-2 capitalize ${lead.status === "pending"
                        ? "text-orange-500"
                        : lead.status === "generated"
                          ? "text-green-500"
                          : "text-red-500"
                        }`}
                    >
                      {lead.status}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {
                        isgenerating == lead._id ? (
                          <button disabled
                            className="text-sm bg-orange-500 max-w-32 min-w-32 hover:bg-orange-600 cursor-pointer text-white px-3 py-1 rounded"
                          >
                            Generating...
                          </button>
                        ) : (
                          lead.status === "generated" ? (
                            <button
                              onClick={() => openModal(lead)}
                              className="text-sm bg-orange-500 max-w-32 min-w-32 hover:bg-orange-600 cursor-pointer text-white px-3 py-1 rounded"
                            >
                              View
                            </button>
                          ) : (
                            <button
                              onClick={() => generateEmail(lead._id)}
                              className="text-sm bg-orange-500 max-w-32 min-w-32 hover:bg-orange-600 cursor-pointer text-white px-3 py-1 rounded"
                            >
                              {
                                lead.status === "failed" ? (
                                  <span>
                                    Re-Generate
                                  </span>
                                ) : (

                                  <span>
                                    Generate
                                  </span>
                                )
                              }
                            </button>
                          )
                        )



                      }
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
        <LeadModal
          isOpen={isOpen}
          onClose={closeModal}
          lead={selectedLead}
        />
      </div>
    </div>
  );
}

export default Results