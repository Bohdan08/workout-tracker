"use client";
import React from "react";
import MetricsPreferences from "../../components/metricsPreferences";
import PersonalInfo from "../../components/personalInfo";

export default function SuccessView() {
  return (
    <div className="max-w-lg">
      <h2 className="text-3xl font-medium">Settings</h2>
      <div className="mt-5">
        <MetricsPreferences />
      </div>
      <div className="mt-8">
        <PersonalInfo />
      </div>
    </div>
  );
}
