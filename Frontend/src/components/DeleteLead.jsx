import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import api from "../services/api";

// DeleteLead confirmation modal component
const DeleteLead = ({ lead, isOpen = true, onClose, onLeadDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && onClose) {
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

  // Do not render if closed or no lead is selected
  if (!isOpen || !lead) return null;

  // Handle lead deletion
  const handleDelete = async () => {
    setError("");
    setLoading(true);

    try {
      // Call backend DELETE endpoint
      await api.delete(`/leads/${lead._id}`);

      // Refresh leads list in Dashboard
      if (onLeadDeleted) {
        await onLeadDeleted();
      }

      // Close modal
      if (onClose) {
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Backdrop blur & dark overlay
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in"
    >
      {/* Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-7 border border-gray-100 relative"
      >
        {/* Header with Icon and Close Button */}
        <div className="flex items-start justify-between pb-2">
          {/* Trash Icon Badge */}
          <div className="bg-[#FCECED] text-[#9E0C2A] p-3 rounded-xl flex items-center justify-center">
            <Icon icon="ph:trash-bold" height="1.4em" />
          </div>

          {/* Close 'X' Button */}
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <Icon icon="ph:x-bold" height="1.1em" />
          </button>
        </div>

        {/* Title and Confirmation text */}
        <div className="mt-3">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Delete Lead
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Are you sure you want to delete this lead? This action cannot be undone.
          </p>
        </div>

        {/* Lead Details Preview Box */}
        <div className="my-4 p-3.5 bg-[#FCECED] rounded-xl flex flex-col gap-1 border border-[#9E0C2A]/10">
          <p className="text-sm font-bold text-gray-900">{lead.name}</p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>{lead.email}</span>
            {lead.company && <span>• {lead.company}</span>}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* Action Buttons: Cancel and Delete */}
        <div className="flex items-center justify-end gap-3 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="px-5 py-2.5 text-sm font-bold text-white bg-[#9E0C2A] hover:bg-[#850822] rounded-xl shadow-sm transition active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Lead"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLead;
