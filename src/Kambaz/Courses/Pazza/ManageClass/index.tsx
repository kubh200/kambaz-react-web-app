"use client"

import { useState } from "react"
import { Nav } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import ManageFolders from "./ManageFolders"

export default function ManageClass() {
  const [activeTab, setActiveTab] = useState("folders")
  const { currentUser } = useSelector((state: any) => state.accountReducer)
  const { cid } = useParams()

  // Redirect non-instructors
  if (currentUser?.role !== "FACULTY") {
    return <Navigate to={`/Kambaz/Courses/${cid}/Pazza`} />
  }

  return (
    <div className="pazza-manage-class">
      <h2>Manage Class</h2>

      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link active={activeTab === "folders"} onClick={() => setActiveTab("folders")}>
            Manage Folders
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled>Users</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled>Settings</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled>Grading</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled>Moderation</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled>Statistics</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled>Duplicate</Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "folders" && <ManageFolders />}
    </div>
  )
}
