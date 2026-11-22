import React from "react";
import { Icon } from "@iconify/react";

const calculatePercentage = (count, total) => {
  if (!total || total === 0) return 0;
  return Math.round((count / total) * 100);
};


const StatsCards = (props) => {

  const totalLeads = props.leads.length;
  const newLeads = props.leads.filter((l) => l.status === "New").length;
  const contactedLeads = props.leads.filter((l) => l.status === "Contacted").length;
  const qualifiedLeads = props.leads.filter((l) => l.status === "Qualified").length;
  const lostLeads = props.leads.filter((l) => l.status === "Lost").length;


  const newPercent = calculatePercentage(newLeads, totalLeads);
  const contactedPercent = calculatePercentage(contactedLeads, totalLeads);
  const qualifiedPercent = calculatePercentage(qualifiedLeads, totalLeads);
  const lostPercent = calculatePercentage(lostLeads, totalLeads);

  // Cards configuration
  const statsData = [
    {
      title: "TOTAL LEADS",
      value: totalLeads.toLocaleString(),
      icon: "solar:card-2-bold",
      iconBg: "bg-red-50 text-red-600",
      footerText: "Across all statuses",
    },
    {
      title: "NEW",
      value: newLeads.toLocaleString(),
      icon: "solar:bolt-bold",
      iconBg: "bg-pink-50 text-pink-500",
      footerText: `${newPercent}% of all leads`,
    },
    {
      title: "CONTACTED",
      value: contactedLeads.toLocaleString(),
      icon: "solar:headphones-round-sound-bold",
      iconBg: "bg-cyan-50 text-cyan-600",
      footerText: `${contactedPercent}% of all leads`,
    },
    {
      title: "QUALIFIED",
      value: qualifiedLeads.toLocaleString(),
      icon: "solar:verified-check-bold",
      iconBg: "bg-emerald-50 text-emerald-600",
      footerText: `${qualifiedPercent}% of all leads`,
    },
    {
      title: "LOST",
      value: lostLeads.toLocaleString(),
      icon: "solar:box-minimalistic-bold",
      iconBg: "bg-orange-50 text-orange-500",
      footerText: `${lostPercent}% of all leads`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-5 border border-gray-200/60 shadow-xs flex flex-col justify-between transition-transform duration-300 ease-in-out hover:scale-105"
        >
          {/* Card Top: Title and Icon */}
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold text-gray-500 tracking-wider">
              {stat.title}
            </span>
            <div className={`p-2 rounded-xl ${stat.iconBg}`}>
              <Icon icon={stat.icon} height="1.2em" />
            </div>
          </div>

          {/* Card Middle: Big Value */}
          <div className="my-2">
            <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {stat.value}
            </span>
          </div>

          {/* Card Bottom: Clean computable subtext */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <span>{stat.footerText}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
