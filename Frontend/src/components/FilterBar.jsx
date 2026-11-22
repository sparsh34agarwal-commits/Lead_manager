import React, { useState } from "react";
import { Icon } from "@iconify/react";

// FilterBar component provides search, filter dropdowns, and status pills
const FilterBar = (props) => {
  const totalLeads = props.leads.length;
  const newLeads = props.leads.filter((l) => l.status === "New").length;
  const contactedLeads = props.leads.filter((l) => l.status === "Contacted").length;
  const qualifiedLeads = props.leads.filter((l) => l.status === "Qualified").length;
  const lostLeads = props.leads.filter((l) => l.status === "Lost").length;


  const statusPills = [
    { id: "all", label: "All Statuses", count: totalLeads },
    { id: "new", label: "New", count: newLeads, badgeColor: "bg-red-100 text-red-600" },
    { id: "contacted", label: "Contacted", count: contactedLeads, badgeColor: "bg-cyan-100 text-cyan-700" },
    { id: "qualified", label: "Qualified", count: qualifiedLeads, badgeColor: "bg-emerald-100 text-emerald-700" },
    { id: "lost", label: "Lost", count: lostLeads, badgeColor: "bg-rose-100 text-rose-600" },
  ];

  return (
    <div className="p-5 pb-3 flex flex-col gap-4 border-b border-gray-100">
      {/* Top Filter Row: Search & Dropdowns */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search input with shortcut badge */}
        <div className="relative flex-1 max-w-lg">
          <Icon
            icon="ph:magnifying-glass-bold"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            height="1.1em"
          />
          <input
            type="text"
            value={props.SearchQuery}
            onChange={(e) => props.setSearchQuery(e.target.value)}
            placeholder="Search leads by name"
            className="w-full bg-[#F5F8F6] border border-gray-200/80 rounded-xl py-2 pl-10 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9E0C2A]/20 focus:border-[#9E0C2A] transition"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Source Dropdown */}
          <Icon icon="ph:funnel-bold" className="text-gray-500" height="1.1em" />
          <label className="text-[14px] font-semibold text-gray-700">Sources</label>
          <select
          value={props.ActiveSource}
          onChange={(e)=>{props.setActiveSource(e.target.value)}}
           className="border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700"
          >
            <option className="text-xs font-semibold text-gray-700" value="all">All</option>
            <option className="text-xs font-semibold text-gray-700" value="Website">Website</option>
            <option className="text-xs font-semibold text-gray-700" value="LinkedIn">LinkedIn</option>
            <option className="text-xs font-semibold text-gray-700" value="Referral">Referral</option>
            <option className="text-xs font-semibold text-gray-700" value="ColdCall">ColdCall</option>
            <option className="text-xs font-semibold text-gray-700" value="Other">Other</option>
          </select>

          {/* Date Range Dropdown */}
          <button
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition shadow-2xs"
          >
            <Icon icon="ph:calendar-blank-bold" className="text-gray-500" height="1.1em" />
            <span>Last 30 Days</span>
            <Icon icon="ph:caret-down-bold" className="text-gray-400" height="0.9em" />
          </button>

          {/* Sort Dropdown */}
          <button
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition shadow-2xs"
          >
            <Icon icon="ph:arrows-down-up-bold" className="text-gray-500" height="1.1em" />
            <span>Sort: Recent Activity</span>
            <Icon icon="ph:caret-down-bold" className="text-gray-400" height="0.9em" />
          </button>
        </div>
      </div>

      {/* Bottom Filter Row: Status buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
        {/* Status buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#F2F5F3] p-1 rounded-xl">
          {statusPills.map((pill) => {
            const isActive = props.ActiveStatus === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => props.setActiveStatus(pill.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer transition ${
                  isActive
                    ? "bg-white text-gray-900 shadow-xs border border-gray-200/60"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                }`}
              >
                <span>{pill.label}</span>
                {pill.badgeColor ? (
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[11px] font-bold ${pill.badgeColor}`}
                  >
                    {pill.count}
                  </span>
                ) : (
                  <span className="text-gray-500 font-normal">{pill.count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
