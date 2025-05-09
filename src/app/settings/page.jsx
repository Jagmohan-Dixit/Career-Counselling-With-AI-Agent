'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from 'react';

export default function SettingsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container relative mx-auto mt-24 max-w-5xl p-8 rounded-lg shadow-xl overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-10 blur-2xl"></div>
      <Card className="relative z-10 bg-transparent text-foreground shadow-none">
        <CardHeader className="p-6 pb-0">
          <CardTitle className="text-3xl font-bold mb-4">Settings</CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Account</h3>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold mb-2">
                Change Password
              </label>
              <Input
                type="password"
                id="password"
                placeholder="New Password"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"/>
              <Button className="w-full font-bold py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-primary">
                Update Password
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Notifications</h3>
            <div className="space-y-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-primary rounded shadow-sm focus-visible:ring-2 focus-visible:ring-primary"/>
                <span className="ml-2 text-gray-700">Receive email notifications</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-primary rounded shadow-sm focus-visible:ring-2 focus-visible:ring-primary"/>
                <span className="ml-2 text-gray-700">Receive SMS notifications</span>
              </label>
            </div>
          </div>
          <div>
            <Button className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

