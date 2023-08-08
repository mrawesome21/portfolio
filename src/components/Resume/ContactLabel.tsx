"use client";

import { ReactNode } from "react";

type ContactLabelProps = {
  label: string;
  icon: ReactNode;
  special?: boolean;
};

const ContactLabel = ({ label, icon, special = false }: ContactLabelProps) => (
  <div className={`flex ${!special ? "items-center" : "items-start"} dark:text-white space-x-2`}>
    <span className="bg-zinc-200/75 dark:bg-zinc-700/75 rounded-full p-2">{icon}</span>
    <p className={`text-sm lg:text-lg ${special ? "italic" : ""}`}>{label}</p>
  </div>
);

export default ContactLabel;
