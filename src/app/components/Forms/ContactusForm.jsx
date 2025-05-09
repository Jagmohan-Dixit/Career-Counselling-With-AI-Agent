import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import CountryCode from "../../../data/countrycode.json";
import { apiConnector } from "../../../services/apiConnector";
import { contactusEndpoint } from "../../../services/apis";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    // subject: "",
    message: ""
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const submitContactForm = async () => {
    try {
      setLoading(true);
      const res = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, formData);
      console.log(res)
      toast.success("Form submitted successfully!");
      setLoading(false);
    } catch (error) {
      toast.error("Submission failed.");
      console.error("ERROR MESSAGE - ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setFormData({
        name: "",
        email: "",
        phoneNo: "",
        // subject: "",
        message: ""
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
      <Card className="bg-white shadow-[rgba(0,0,0,0.24)_0px_3px_8px] p-2 lg:ml-20 md:ml-20">
        <CardContent className="p-4">
          <h3 className="text-2xl font-semibold mb-4">Let's get in touch!</h3>
          <form className="space-y-4" onSubmit={handleSubmit(submitContactForm)}>
            <div>
              <label htmlFor="name" className="block text-sm font-bold mb-1">Full Name</label>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-1">Email</label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="phoneNo" className="block text-sm font-bold mb-1">Mobile Number</label>
              <Input
                type="tel"
                id="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Your Phone"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            {/* <div>
              <label htmlFor="subject" className="block text-sm font-bold mb-1">Subject</label>
              <Select onValueChange={handleSubjectChange} value={formData.subject}>
                <SelectTrigger className="w-full shadow-sm focus-visible:ring-2 focus-visible:ring-primary">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                  <SelectItem value="Technical Support">Technical Support</SelectItem>
                  <SelectItem value="Feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            <div>
              <label htmlFor="message" className="block text-sm font-bold mb-1">Message</label>
              <Textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full font-bold py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
  );
};

export default ContactUsForm;
