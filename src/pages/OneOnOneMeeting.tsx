import { EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui";
import React, { useState } from "react";
import MeetingNameField from "../components/FormComponents/MeetingNameField";
import MeetingUsersField from "../components/FormComponents/MeetingUsersField";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useFetchUsers from "../hooks/useFetchUsers";
import moment from "moment";
import MeetingDateField from "../components/FormComponents/MeetingDateField";
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
import { FieldErrorType } from "../utils/Types";

export default function OneOnOneMeeting() {
  useAuth();
  const [users] = useFetchUsers();

  const [meetingName, setMeetingName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [startDate, setStartDate] = useState(moment());
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });

  const onUserChange = (selectedOptions: any) => {
    setSelectedUser(selectedOptions);
  };

  const validateForm = () => {
    const clonedShowErrors = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      clonedShowErrors.meetingName.show = true;
      clonedShowErrors.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      clonedShowErrors.meetingName.show = false;
      clonedShowErrors.meetingName.message = [];
    }
    if (!selectedUser.length) {
      clonedShowErrors.meetingUser.show = true;
      clonedShowErrors.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      clonedShowErrors.meetingUser.show = false;
      clonedShowErrors.meetingUser.message = [];
    }
    setShowErrors(clonedShowErrors);
    return errors;
  };

  const createMeeting = () => {
    if (!validateForm()) {
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <MeetingNameField
            label="Meeting Name"
            placeholder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />
          <MeetingUsersField
            label="Invite User"
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUser}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a user"
            isInvalid={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
          />
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}
