import React from "react";
import { Icon } from "@iconify/react";

// Beginner-friendly helper function to format timestamps into readable text
// used ai for this function
export const formatLastActivity = (createdAt, updatedAt) => {
  if (!createdAt && !updatedAt) return "No activity";

  const createdTime = new Date(createdAt).getTime();
  const updatedTime = updatedAt ? new Date(updatedAt).getTime() : createdTime;

  // If updated time is more than 60 seconds after created time, mark as "Updated"
  const isUpdated = updatedTime - createdTime > 60 * 1000;
  const targetTime = isUpdated ? updatedTime : createdTime;
  const actionPrefix = isUpdated ? "Updated" : "Created";

  // Calculate elapsed time from now
  const diffInMs = Math.max(0, Date.now() - targetTime);
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return `${actionPrefix} just now`;
  if (diffInMinutes < 60) {
    return `${actionPrefix} ${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }
  if (diffInHours < 24) {
    return `${actionPrefix} ${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }
  if (diffInDays === 1) {
    return `${actionPrefix} yesterday`;
  }
  return `${actionPrefix} ${diffInDays} days ago`;
};

// Mock data matching the Mongoose schema with timestamps (createdAt and updatedAt)
const now = Date.now();

const SourceData = {
  Other: {
    sourceIcon: "ph:globe-bold",
    sourceStyle: "bg-stone-100 text-stone-700 border-stone-200",
  },
  LinkedIn: {
    sourceIcon: "ph:linkedin-logo-bold",
    sourceStyle: "bg-blue-50 text-blue-600 border-blue-100",
  },
  Referral: {
    sourceIcon: "ph:handshake-bold",
    sourceStyle: "bg-amber-50 text-amber-700 border-amber-200",
  },
  ColdCall: {
    sourceIcon: "ph:paper-plane-tilt-bold",
    sourceStyle: "bg-rose-50 text-rose-600 border-rose-100",
  },
  Website: {
    sourceIcon: "ph:presentation-chart-bold",
    sourceStyle: "bg-pink-50 text-pink-600 border-pink-100",
  },
};
const StatusData = {
  // "New", "Contacted", "Qualified", "Lost"
  New: {
    statusStyle: "bg-amber-50 text-amber-700 border-amber-200",
    statusDot: "bg-amber-500",
  },
  Contacted: {
    statusStyle: "bg-cyan-50 text-cyan-700 border-cyan-200",
    statusDot: "bg-cyan-500",
  },
  Qualified: {
    statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    statusDot: "bg-emerald-500",
  },
  Lost: {
    statusStyle: "bg-rose-50 text-rose-600 border-rose-200",
    statusDot: "bg-rose-500",
  },
};

// LeadsTable component displays the table of leads with pagination
const LeadsTable = (props) => {
  const ld = props.leads.map((lead) => {
    return {
      _id: lead._id,
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      sourceIcon: SourceData[lead.source].sourceIcon,
      sourceStyle: SourceData[lead.source].sourceStyle,
      status: lead.status,
      statusStyle: StatusData[lead.status].statusStyle,
      statusDot: StatusData[lead.status].statusDot,
      createdAt: lead.createdAt, // 3 days ago
      updatedAt: lead.updatedAt, // 15 mins ago
    };
  });
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-white">
            <th className="py-3.5 pl-6 pr-3 w-10">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-[#9E0C2A] focus:ring-[#9E0C2A] cursor-pointer"
              />
            </th>
            <th className="py-3.5 px-15 font-bold">Lead</th>
            <th className="py-3.5 px-4 font-bold">Company</th>
            <th className="py-3.5 px-4 font-bold">Email & Phone</th>
            <th className="py-3.5 px-4 font-bold">Source</th>
            <th className="py-3.5 px-4 font-bold">Status</th>
            <th className="py-3.5 px-4 font-bold">Last Activity</th>
            <th className="py-3.5 pr-6 pl-4 font-bold text-right">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-100 text-sm">
          
          {ld.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-16 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#FCECED] text-[#9E0C2A] flex items-center justify-center">
                    <Icon icon="ph:magnifying-glass-bold" height="1.6em" />
                  </div>
                  <p className="text-base font-bold text-gray-800">
                    No Leads Found
                  </p>
                  <p className="text-xs text-gray-400 max-w-sm">
                    We couldn't find any leads matching your filters. Try adjusting your search query or source filter.
                  </p>
                </div>
              </td>
            </tr>
          ) : ld.map((lead) => (
            <tr
              key={lead.id}
              className="hover:bg-[#F9FAF9] transition-colors group"
            >
              {/* Checkbox */}
              <td className="py-4 pl-6 pr-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#9E0C2A] focus:ring-[#9E0C2A] cursor-pointer"
                />
              </td>

              {/* Lead & Title */}
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`bg-amber-300 w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0`}
                  >
                    <img
                      src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(lead._id)}`}
                      loading="lazy"
                      className="w-9 h-9 rounded-xl object-cover bg-amber-100 shrink-0 border border-gray-200"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 leading-tight">
                      {lead.name}
                    </p>
                  </div>
                </div>
              </td>

              {/* Company */}
              <td className="py-4 px-4">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-gray-800">
                    {lead.company}
                  </span>
                </div>
              </td>

              {/* Email & Phone */}
              <td className="py-4 px-4">
                <p className="text-xs font-medium text-gray-700">
                  {lead.email}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{lead.phone}</p>
              </td>

              {/* Source Tag */}
              <td className="py-4 px-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${lead.sourceStyle}`}
                >
                  <Icon icon={lead.sourceIcon} height="1.1em" />
                  {lead.source}
                </span>
              </td>

              {/* Status Badge */}
              <td className="py-4 px-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${lead.statusStyle}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${lead.statusDot}`}
                  />
                  {lead.status}
                </span>
              </td>

              {/* Last Activity */}
              <td className="py-4 px-4">
                <div className="flex items-center gap-1.5">
                  <Icon
                    icon="ph:clock-bold"
                    className="text-gray-400 shrink-0 text-xs"
                    height="1.1em"
                  />
                  <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                    {formatLastActivity(lead.createdAt, lead.updatedAt)}
                  </span>
                </div>
              </td>

              {/* Actions */}
              <td className="py-4 pr-6 pl-4 text-right">
                <div className="flex items-center justify-end gap-2 text-gray-400">
                  <button
                  onClick={()=>props.onEdit(lead)}
                    type="button"
                    title="Edit Lead"
                    className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition"
                  >
                    <Icon icon="ph:pencil-simple-line-bold" height="1.1em" />
                  </button>
                  <button
                    onClick={() => props.onDelete && props.onDelete(lead)}
                    type="button"
                    title="Delete Lead"
                    className="p-1 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer transition"
                  >
                    <Icon icon="ph:trash-bold" height="1.1em" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default LeadsTable;
