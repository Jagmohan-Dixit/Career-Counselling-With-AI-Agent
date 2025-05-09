'use client'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getUserDetails } from '@/services/operations/profileAPI';

export default function LayoutInitializer() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useRouter();

  useEffect(() => {
    if (token) {
      console.log("Token from Redux Store: ", token);
      dispatch(getUserDetails(token, navigate));
    }
  }, [token]);

  return null;
}
