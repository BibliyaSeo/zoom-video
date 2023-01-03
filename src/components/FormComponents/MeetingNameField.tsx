import { EuiFieldText, EuiFormRow } from "@elastic/eui";
import React from "react";

export default function MeetingNameField({
  label,
  placeholder,
  value,
  setMeetingName,
}: {
  label: string;
  placeholder: string;
  value: string;
  setMeetingName: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <EuiFormRow label={label}>
      <EuiFieldText
        placeholder={placeholder}
        value={value}
        onChange={(e) => setMeetingName(e.target.value)}
      />
    </EuiFormRow>
  );
}
