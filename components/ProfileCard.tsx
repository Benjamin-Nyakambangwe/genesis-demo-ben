"use client";
import { Phone, Mail, User, BadgeCheck, Check, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import LandlordProfileImageUploadButton from "./LandloadProfileImageUploadButton";
import ProofOfResidenceUploadButton from "./ProofOfResidenceUploadButton";
import LandlordIdUploadButton from "./LandlordIdUploadButton";
import AddNewPropertyButton from "./AddNewPropertyButton";
import EditProfileButton from "./EditProfileButton";
import Image from "next/image";
import IdUploadButton from "./IdUploadButton";
import ProofOfEmploymentUploadButton from "./ProofOfEmploymentUploadButton";
import TenantProfileImageUploadButton from "./TenantProfileImageUploadButton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { sendVerificationCode } from "@/lib/sendVerificationCode";
import { submitVerificationCode } from "@/lib/submitVerificationCode";

const ProfileCard = ({
  data,
  userType,
  token,
}: {
  data: any;
  userType: string;
  token: string;
}) => {
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSendVerificationCode = async () => {
    setIsLoading(true);
    try {
      const result = await sendVerificationCode();
      if (result.success) {
        setShowVerification(true);
        toast.success("Verification code sent");
      } else {
        toast.error(result.error || "Failed to send verification code");
      }
    } catch (error) {
      toast.error("Failed to send verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitVerificationCode = async () => {
    setIsSubmitting(true);
    try {
      const result = await submitVerificationCode(verificationCode);
      if (result.success) {
        toast.success("Verification code successfull");
        setIsSubmitting(false);
        setShowVerification(false);
      } else {
        toast.error(result.error || "Failed to submit verification code");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("Failed to submit verification code");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-4">
      <CardContent>
        <div className=" mt-7 flex flex-col justify-center items-center">
          <Image
            src={data?.profile_image || "/img/avatar.png"}
            alt="@shadcn"
            width={150}
            height={150}
            className="rounded-3xl"
          />

          <div className="flex flex-col items-start mt-4">
            <div className="flex justify-between">
              <User className="h-4 w-4 text-[#344E41] mr-2" />
              <h2>
                {data?.user.first_name} {data?.user.last_name}
              </h2>
            </div>

            <div className="flex justify-between">
              <Mail className="h-4 w-4 text-[#344E41] mr-2" />

              <h3>{data?.user.email}</h3>
            </div>
            <div className="flex justify-between">
              <Phone className="h-4 w-4 text-[#344E41] mr-2" />
              <h3>{data?.phone}</h3>
              {data?.is_phone_verified ? (
                <div className="flex items-center text-green-600">
                  <BadgeCheck className="h-4 w-4 ml-1 mr-1" />
                  <span className="text-sm">Phone Verified</span>
                </div>
              ) : (
                <Badge
                  variant="outline"
                  className="cursor-pointer bg-[#344E41] text-white ml-4"
                  onClick={handleSendVerificationCode}
                >
                  Verify
                </Badge>
              )}
            </div>
          </div>

          {showVerification && !data?.isPhoneVerified && (
            <div className="mt-2">
              <div className="flex gap-2">
                <div className="flex-grow relative">
                  <Input
                    type="text"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="focus-visible:ring-[#344E41] focus:border-0"
                  />
                </div>
                <Button
                  size="icon"
                  className="bg-[#344E41] hover:bg-[#A3B18A] h-10 w-10"
                  onClick={handleSubmitVerificationCode}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 mt-4 ">
            <EditProfileButton />
            {userType?.includes("landlord") ? (
              <>
                <AddNewPropertyButton />
                <LandlordIdUploadButton idImage={data?.id_image} />
                <ProofOfResidenceUploadButton
                  proof_of_residence={data?.proof_of_residence}
                />
                <LandlordProfileImageUploadButton />
              </>
            ) : (
              <>
                <IdUploadButton idImage={data?.id_image} />
                <ProofOfEmploymentUploadButton
                  proof_of_employment={data?.proof_of_employment}
                />
                <TenantProfileImageUploadButton />
              </>
            )}
          </div>

          <div className="space-y-4">
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-[#344E41] mr-2" />
                <h3>{data?.phone}</h3>
              </div>
              {data?.isPhoneVerified ? (
                <div className="flex items-center text-green-600">
                  <BadgeCheck className="h-4 w-4 mr-1" />
                  <span className="text-sm">Phone Verified</span>
                </div>
              ) : (
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-[#344E41] hover:text-white"
                  onClick={() => setShowVerification(!showVerification)}
                >
                  Verify
                </Badge>
              )}
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
