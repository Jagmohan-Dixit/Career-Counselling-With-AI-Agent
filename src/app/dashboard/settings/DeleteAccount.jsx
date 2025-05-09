
'use client'

import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ConfirmationModal from "../../components/Common/ConfirmationModal"
import { deleteProfile } from "../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useRouter()
  const [confirmationModal, setConfirmationModal] = useState(null)

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  const handleOpenConfirmationModal = () => {
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "Your account will be deleted forever.",
      btn1Text: "Delete",
      btn2Text: "Cancel",
      btn1Handler: () => handleDeleteAccount(),
      btn2Handler: () => setConfirmationModal(null),
    });
  };
  
  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-sky-100 bg-sky-100 p-8 px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-sky-100 cursor-pointer"
          onClick={() => handleOpenConfirmationModal()}
        >
          <FiTrash2 className="text-3xl text-black"/>
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="w-3/5 text-black">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit bg-primary p-2 px-4 cursor-pointer italic text-white font-bold rounded-lg"
            onClick={() => handleOpenConfirmationModal()}
          >
            I want to delete my account
          </button>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </div>
    </>
  )
}
