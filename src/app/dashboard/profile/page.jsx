'use client';

import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useRouter } from 'next/navigation';
import { formatDate } from "@/utils/formatDate"
import IconBtn from "../../components/Common/IconBtn"


export default function MyProfile() {
  const user1  = useSelector((state) => state?.auth);
  console.log("User1 : ", user1);
  const user  = useSelector((state) => state?.profile?.user);
  console.log("User : ", user);
  const navigate = useRouter();

  return (
    <div className="px-6 py-4 pt-16 flex justify-center max-w-full rounded-lg overflow-hidden animate-fade-in align-items">
      <div className="w-full md:w-3/4 lg:w-3/4 sm:w-full">
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-6 text-black">
          My <span className="text-green-600">Profile</span>
        </h2>
      

        <div className="flex bg-sky-50 items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 gap-4">
          <div className="flex items-center gap-x-4">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div className="space-y-1">
              <p className="text-lg font-semibold text-richblack-5">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-sm text-richblack-300">{user?.email}</p>
            </div>
          </div>
        </div>
        
        <div className="my-4 bg-sky-50 flex flex-col gap-y-4 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">About</p>
          </div>
          <p
            className={`${
              user?.additionalDetails?.about
                ? "text-richblack-5"
                : "text-richblack-400"
            } text-sm font-medium`}
          >
            {user?.additionalDetails?.about ?? "Write Something About Yourself"}
          </p>
        </div>
        
        <div className="my-4 bg-sky-50 flex flex-col gap-y-4 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">
              Personal Details
            </p>
            <IconBtn
              text="Edit"
              onclick={() => navigate.push("/dashboard/settings")}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>
          <div className="flex max-w-[500px] justify-between gap-6">
            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-richblack-600 font-bold">First Name</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.firstName}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-richblack-600 font-bold">Email</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.email}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-richblack-600 font-bold">Gender</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.additionalDetails?.gender ?? "Add Gender"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-richblack-600 font-bold">Last Name</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.lastName}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-richblack-600 font-bold">Phone Number</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-richblack-600 font-bold">Date Of Birth</p>
                <p className="text-sm font-medium text-richblack-5">
                  {formatDate(user?.additionalDetails?.dateOfBirth)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}