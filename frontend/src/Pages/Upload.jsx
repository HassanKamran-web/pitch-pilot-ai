import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import Filter from "../Components/Filter";
import LoadingScreen from "../Components/LoadingScreen";
const Upload = () => {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token, setUser, user } = useAuth();
  const [qualityFilter, setQualityFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [search, setSearch] = useState("")

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
        if (response.data.credits) {
          setUser(prev => ({
            ...prev,
            credits: response?.data?.credits
          }))
        }
      }
    } catch (err) {
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Handle file select
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    setFile(e.dataTransfer.files[0]);
  };

  // Upload file
  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file!");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/leads/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setFile(null);
      fetchLeads();
      toast.success("CSV uploaded successfully!");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Upload failed!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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

      <div className="flex flex-col lg:flex-row mb-2 items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Upload Leads CSV</h1>
        <Filter qualityFilter={qualityFilter} setQualityFilter={setQualityFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} search={search} setSearch={setSearch} leads={leads} setLeads={setLeads} />
      </div>

      <div className='w-full flex items-center justify-center mb-4'>
        <p className="text-yellow-500/80 text-center mt-4 bg-yellow-500/20 py-2 px-2 rounded-md ">
          "Important: Ensure your CSV includes <span className="font-bold">company_name</span> and <span className="font-bold">website</span>; uploaded data is automatically cleared every 24 hours for privacy."
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed p-6 flex flex-col items-center justify-center rounded-lg mb-6 cursor-pointer text-center transition-colors ${dragOver ? "border-orange-500 bg-slate-800" : "border-gray-300 bg-slate-900/50"
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="mb-2">Drag & Drop your CSV here</p>
        <p className="mb-4 text-sm text-gray-500">or</p>
        <input
          id="file-upload"
          name="file-uplooad"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden mx-auto"
        />

        <label htmlFor="file-upload" className="rounded-md px-6 py-2 bg-orange-500 hover:bg-orange-600 transition disabled:opacity-50 cursor-pointer">
          Add CSV File
        </label>
        {file && <p className="mt-2 text-green-600">{file.name}</p>}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-6 py-2 rounded-md transition disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload CSV"}
      </button>

      {/* Leads Table */}
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="px-4 py-2 text-left text-sm">Company</th>
              <th className="px-4 py-2 text-left text-sm">Website</th>
              <th className="px-4 py-2 text-left text-sm">Industry</th>
              <th className="px-4 py-2 text-left text-sm">Contact</th>
              <th className="px-4 py-2 text-left text-sm">Status</th>
              <th className="px-4 py-2 text-left text-sm">Uploaded At</th>
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
                      {new Date(lead.createdAt).toLocaleString().slice(0, 8)}
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Upload;