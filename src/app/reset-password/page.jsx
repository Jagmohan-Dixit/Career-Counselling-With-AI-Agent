import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ResetPasswordPage = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter your email to reset your password</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <label className='text-black font-bold' htmlFor="email">Email</label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
            />
          </div>
          <Button className="block mx-auto w-[80%] bg-black text-white hover:bg-black font-bold">
            Reset Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
