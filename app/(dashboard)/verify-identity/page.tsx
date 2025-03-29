import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { BsEnvelopePaperHeartFill } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";

const KYC = () => {
  return (
    <Card className="p-6 flex flex-col gap-4">
      <CardHeader className="flex flex-col gap-1 items-center justify-center max-w-2xl mx-auto text-center">
        <CardTitle>KYC Verification</CardTitle>
        <CardDescription>
          To comply with regulation, each participant will have to go through
          indentity verification (KYC/AML) to prevent fraud causes.
        </CardDescription>
      </CardHeader>
      <Card className="max-w-6xl mx-auto p-4 md:p-10 flex flex-col items-center justify-center text-center gap-4">
        <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center">
          <FaCopy className="h-10 w-10" />
        </div>
        <CardDescription className="max-w-2xl">
          You have not submitted your necessary documents to verify your
          identity. In order to enjoy our investment system, please verify your
          identity.
        </CardDescription>
        <Link href="/verify-identity/kyc-form">
          {" "}
          <Button className="mt-4">click to complete your KYC</Button>
        </Link>
      </Card>

      <Card className="max-w-6xl mx-auto p-4 md:p-10 flex flex-col md:flex-row items-center md:items-center justify-center text-center gap-4">
        <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center">
          <BsEnvelopePaperHeartFill className="h-10 w-10" />
        </div>
        <CardDescription className="max-w-2xl flex flex-col md:items-start items-center">
          <h1 className="font-bold text-black">We’re here to help you!</h1>
          <p>
            Ask a question, manage request, report an issue. Our support team
            will get back to you by email.
          </p>
        </CardDescription>
        <Button className="mt-4" variant={"outline"}>
          Get support now
        </Button>
      </Card>
    </Card>
  );
};

export default KYC;
