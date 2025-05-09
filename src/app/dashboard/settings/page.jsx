'use client'

import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <div className="px-6 py-4 pt-16 flex justify-center max-w-full rounded-lg overflow-hidden animate-fade-in align-items">
      <div>
        {/* <h1 className="mb-14 text-3xl font-medium text-richblack-5">
          Edit Profile
        </h1> */}
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-6 text-black">
          Edit <span className="text-green-600">Profile</span>
        </h2>
        {/* Change Profile Picture */}
        <ChangeProfilePicture />
        {/* Profile */}
        <EditProfile />
        {/* Password */}
        <UpdatePassword />
        {/* Delete Account */}
        <DeleteAccount />
      </div>
    </div>
  )
}
