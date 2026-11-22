import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import api from "../services/api";

const AddLead = ({ isOpen = true, onClose, onLeadCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("Website");
  const [status, setStatus] = useState("New");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const newLeadData = {
        name,
        email,
        phone: phone || "N/A",
        company,
        source,
        status,
      };

      // Call backend API to create lead
      const res = await api.post("/leads", newLeadData);

      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setSource("Website");
      setStatus("New");

      // Notify parent to refresh leads
      if (onLeadCreated) {
        onLeadCreated(res.data.lead);
      }

      // Close modal
      if (onClose) {
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}//bubbling
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-7 border border-gray-100 relative max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between pb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Add New Lead
            </h2>
          </div>
{/* //close button */}
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <Icon icon="ph:x-bold" height="1.1em" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 mt-2">
          {/* Row 1: Full Name (Full Width) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Miller"
              className="w-full bg-[#FCECED] rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9E0C2A]/20 border border-transparent focus:border-[#9E0C2A]/30 transition"
            />
          </div>

          {/* Row 2: Work Email & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Work Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Work Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="j.miller@company.com"
                className="w-full bg-[#FCECED] rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9E0C2A]/20 border border-transparent focus:border-[#9E0C2A]/30 transition"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 981-4422"
                className="w-full bg-[#FCECED] rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9E0C2A]/20 border border-transparent focus:border-[#9E0C2A]/30 transition"
              />
            </div>
          </div>

          {/* Row 3: Company & Source */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Company */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Corp"
                className="w-full bg-[#FCECED] rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9E0C2A]/20 border border-transparent focus:border-[#9E0C2A]/30 transition"
              />
            </div>

            {/* Source Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Source
              </label>
              <div className="relative">
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-[#FCECED] rounded-xl px-3.5 py-2.5 text-sm text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#9E0C2A]/20 border border-transparent focus:border-[#9E0C2A]/30 transition cursor-pointer pr-9"
                >
                  <option value="Website">Website</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Referral">Referral</option>
                  <option value="ColdCall">ColdCall</option>
                  <option value="Other">Other</option>
                </select>
                <Icon
                  icon="ph:caret-down-bold"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  height="0.9em"
                />
              </div>
            </div>
          </div>

          {/* Row 4: Initial Status Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              Initial Status
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#FCECED] rounded-xl px-3.5 py-2.5 text-sm text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#9E0C2A]/20 border border-transparent focus:border-[#9E0C2A]/30 transition cursor-pointer pr-9"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
              <Icon
                icon="ph:caret-down-bold"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                height="0.9em"
              />
            </div>
          </div>

          {/* Footer Actions: Cancel and Create Lead */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-2">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>

            {/* Create Lead Primary Button */}
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm font-bold text-white bg-[#9E0C2A] hover:bg-[#850822] rounded-xl shadow-sm transition active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLead;
