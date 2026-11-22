import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import FilterBar from "../components/FilterBar";
import LeadsTable from "../components/LeadsTable";
import Footer from "../components/Footer";
import AddLead from "../components/AddLead";
import EditLead from "../components/EditLead";
import DeleteLead from "../components/DeleteLead";
import api from "../services/api";

const Dashboard = () => {
  const [Leads, setLeads] = useState([]);
  const [ActiveStatus, setActiveStatus] = useState("all");
  const [SearchQuery, setSearchQuery] = useState("");
  const [ActiveSource, setActiveSource] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);

  const FetchLeads = async () => {
    try {
      const res = await api.get("/leads");
      console.log(res.data);
      setLeads(res.data.leads);
    } catch (err) {
      setError(err.response.data.message || "Failed to Fetch Leads");
    } finally {
      setLoading(false);
    }
  };

  const FilteredLeads = Leads.filter((lead) => {
    const NameMatch = lead.name
      .toLowerCase()
      .includes(SearchQuery.toLowerCase());

    let StatusMatch = false;

    if (ActiveStatus === "all") {
      StatusMatch = true;
    } else if (lead.status === ActiveStatus) {
      StatusMatch = true;
    }
    let SourceMatch = false;

    if (ActiveSource === "all") {
      SourceMatch = true;
    } else if (lead.source === ActiveSource) {
      SourceMatch = true;
    }

    return StatusMatch && NameMatch && SourceMatch;
  });

  const handleEditClick = (lead) => {
    setSelectedLead(lead);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (lead) => {
    setLeadToDelete(lead);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    FetchLeads();
  }, []);

  return (
    <div className="min-h-screen bg-[#cbead4] text-gray-800 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 font-sans">
      {/* 1. Top Navigation Bar */}
      <Navbar />

      {/* 2. Main Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-2">
        {/* Left: Title & Subtitle */}
        <div className="flex flex-col gap-1.5">
          {/* Heading */}
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Leads Management
          </h1>

          {/* Description */}
          <p className="text-sm text-gray-500 max-w-2xl">
            Manage, filter, track or delete incoming leads across your company
            with ease.
          </p>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Add Lead Primary Button */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-red-700 rounded-xl cursor-pointer transition shadow-sm active:scale-95 transition-transform duration-400 ease-in-out hover:scale-104"
          >
            <Icon icon="ph:plus-bold" height="1.1em" className="-ml-1" />
            <span className="text-lg">Add Lead</span>
          </button>
        </div>
      </div>

      {/* 3. Stats Overview Cards */}
      <StatsCards leads={Leads} />

      {/* 4. Leads Management Data Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-xs overflow-hidden">
        {/* Search & Filter Toolbar */}
        <FilterBar
          leads={Leads}
          ActiveStatus={ActiveStatus}
          setActiveStatus={setActiveStatus}
          SearchQuery={SearchQuery}
          setSearchQuery={setSearchQuery}
          ActiveSource={ActiveSource}
          setActiveSource={setActiveSource}
        />

        {/* Leads Table */}
        <LeadsTable
          leads={FilteredLeads}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </div>

      {/* 5. Footer */}
      <Footer />

      {/* 6. Add Lead Modal Popup */}
      <AddLead
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onLeadCreated={FetchLeads}
      />

      <EditLead
        lead={selectedLead}
        setlead={setSelectedLead}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedLead(null);
        }}
        onLeadEdited={FetchLeads}
      />

      {/* 7. Delete Lead Confirmation Modal */}
      <DeleteLead
        lead={leadToDelete}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setLeadToDelete(null);
        }}
        onLeadDeleted={FetchLeads}
      />
    </div>
  );
};

export default Dashboard;
