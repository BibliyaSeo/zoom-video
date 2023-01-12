import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { firebaseAuth } from "../utils/FirebaseConfig";
import { signOut } from "firebase/auth";
import { changeTheme } from "../app/slices/AuthSlice";
import {
  getCreateMeetingBreadCrumbs,
  getDashboardBreadCrumbs,
  getMeetingsBreadCrumbs,
  getMyMeetingsBreadCrumbs,
  getOneonOneMeetingBreadCrumbs,
  getVideoConferenceBreadCrumbs,
} from "../utils/breadCrumbs";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const username = useAppSelector((zoom) => zoom.auth.userInfo?.name);
  const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);
  const [breadCrumbs, setBreadCrumbs] = useState([{ text: "Dashboard" }]);
  const [isResponsive, setIsResponsive] = useState(false);

  const logout = () => {
    signOut(firebaseAuth);
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/") setBreadCrumbs(getDashboardBreadCrumbs(navigate));
    else if (pathname === "/create") setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
    else if (pathname === "/create1on1") setBreadCrumbs(getOneonOneMeetingBreadCrumbs(navigate));
    else if (pathname === "/videoconference")
      setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
    else if (pathname === "/mymeetings") setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate));
    else if (pathname === "/meetings") {
      setBreadCrumbs(getMeetingsBreadCrumbs(navigate));
    }
  }, [location, navigate]);

  const invertTheme = () => {
    const theme = localStorage.getItem("zoom-theme");
    localStorage.setItem("zoom-theme", theme === "light" ? "dark" : "light");
    dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
  };

  const section = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor color={"#0b5cff"}>Zoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <>
          {username ? (
            <EuiText>
              <h3>
                <EuiTextColor color={"white"}>Hello, </EuiTextColor>
                <EuiTextColor color={"#0b5cff"}>{username}</EuiTextColor>
              </h3>
            </EuiText>
          ) : null}
        </>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: "2vw" }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {isDarkTheme ? (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="sun"
                display="fill"
                color="warning"
                size="s"
                aria-labelledby="light"
              />
            ) : (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="moon"
                display="fill"
                color="ghost"
                size="s"
                aria-labelledby="dark"
              />
            )}
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            <EuiButtonIcon
              onClick={logout}
              iconType="lock"
              display="fill"
              size="s"
              aria-labelledby="logout"
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];
  const responsiveSection = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor color={"#0b5cff"}>Zoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: "2vw" }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {isDarkTheme ? (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="sun"
                display="fill"
                color="warning"
                size="s"
                aria-labelledby="light"
              />
            ) : (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="moon"
                display="fill"
                color="ghost"
                size="s"
                aria-labelledby="dark"
              />
            )}
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            <EuiButtonIcon
              onClick={logout}
              iconType="lock"
              display="fill"
              size="s"
              aria-labelledby="logout"
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];

  useEffect(() => {
    if (window.innerWidth < 480) setIsResponsive(true);
  }, []);

  return (
    <>
      <EuiHeader
        style={{ minHeight: "8vh" }}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />
      <EuiHeader style={{ minHeight: "8vh" }} sections={[{ breadcrumbs: breadCrumbs }]} />
    </>
  );
}
