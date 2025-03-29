import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/check-bok";
import { Input } from "@/components/ui/InputTag";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SquareCheck } from "lucide-react";
import React from "react";
import { BiIdCard } from "react-icons/bi";

const KYCForm = () => {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-1 items-center justify-center max-w-2xl mx-auto text-center">
        <CardTitle>Begin your ID-Verification</CardTitle>
        <CardDescription>
          To comply with regulation, each participant will have to go through
          indentity verification (KYC/AML) to prevent fraud causes.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Card className="max-w-4xl mx-auto p-4 md:p-10 ">
          <CardTitle className="text-sm">Personal Details</CardTitle>
          <CardDescription className="max-w-2xl">
            Your simple personal information required for identification
          </CardDescription>
          <hr className="my-4" />

          <CardContent className="p-0">
            <CardDescription>
              Please type carefully and fill out the form with your personal
              details. Your can’t edit these details once you submitted the
              form.
            </CardDescription>
            <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-6 mt-4">
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-muted-foreground">
                  First Name
                </label>
                <Input
                  name="fullName"
                  type="text"
                  className="w-full rounded-lg bg-background"
                />
              </div>
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-muted-foreground">
                  Last Name
                </label>
                <Input
                  name="lastName"
                  type="text"
                  className="w-full rounded-lg bg-background"
                />
              </div>
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  className="w-full rounded-lg bg-background"
                />
              </div>
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-muted-foreground">
                  Phone Number
                </label>
                <Input
                  name="phoneNumber"
                  type="number"
                  className="w-full rounded-lg bg-background"
                />
              </div>
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-muted-foreground">
                  Date of Birth
                </label>
                <Input
                  name="dob"
                  type="date"
                  className="!w-full rounded-lg bg-background"
                />
              </div>
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-muted-foreground">
                  Twitter or Facebook username
                </label>
                <Input
                  name="socialMedia"
                  type="text"
                  className="w-full rounded-lg bg-background"
                />
              </div>
              <div className="w-full col-span-2 ">
                <hr className="my-4" />
                <CardTitle className="text-sm">Your Address</CardTitle>
                <CardDescription className="max-w-2xl">
                  Your simple location information required for identification
                </CardDescription>
                <hr className="my-4" />
              </div>
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-muted-foreground">
                  Address line
                </label>
                <Input
                  name="address"
                  type="text"
                  className="w-full rounded-lg bg-background"
                />
              </div>
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-muted-foreground">
                  City
                </label>
                <Input
                  name="city"
                  type="text"
                  className="w-full rounded-lg bg-background"
                />
              </div>
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-muted-foreground">
                  State
                </label>
                <Input
                  name="state"
                  type="text"
                  className="w-full rounded-lg bg-background"
                />
              </div>
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-muted-foreground">
                  Nationality
                </label>
                <Input
                  name="nationality"
                  type="text"
                  className="w-full rounded-lg bg-background"
                />
              </div>
              <div className="w-full col-span-2 ">
                <hr className="my-4" />
                <CardTitle className="text-sm">Document Upload</CardTitle>
                <CardDescription className="max-w-2xl">
                  Your simple personal document required for identification
                </CardDescription>
                <hr className="my-4" />
              </div>
              <div className="col-span-2 w-full">
                <RadioGroup defaultValue="intPassport" className="flex gap-4">
                  <label className="flex items-center gap-4 cursor-pointer">
                    <RadioGroupItem value="intPassport" />
                    <span>Int&apos;l Passport</span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer">
                    <RadioGroupItem value="nationalID" />
                    <span>National ID</span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer">
                    <RadioGroupItem value="driversLicense" />
                    <span>Drivers License</span>
                  </label>
                </RadioGroup>

                <label className="mb-3 block text-sm font-medium">
                  To avoid delays when verifying account, Please make sure your
                  document meets the criteria below:
                </label>
                <div className="flex flex-col gap-4 mb-4">
                  <p className="flex items-center justify-start gap-1">
                    <SquareCheck className="w-5 h-5 text-green" />
                    <span>Chosen credential must not have expired.</span>
                  </p>
                  <p className="flex items-center justify-start gap-1">
                    <SquareCheck className="w-5 h-5 text-green" />
                    <span>
                      Document should be in good condition and clearly visible.
                    </span>
                  </p>
                  <p className="flex items-center justify-start gap-1">
                    <SquareCheck className="w-5 h-5 text-green" />
                    <span>
                      Make sure that there is no light glare on the document.
                    </span>
                  </p>
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium">
                    Upload Front Side
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      name="frontside"
                      type="file"
                      className="rounded-lg bg-background"
                    />
                    <BiIdCard className="w-10 h-10" />
                  </div>
                </div>

                <hr />

                <div className="mt-4">
                  <label className="mb-3 block text-sm font-medium">
                    Upload Back Side
                  </label>
                  <Input
                    name="frontside"
                    type="file"
                    className="rounded-lg bg-background"
                  />
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Checkbox className="mb-4" name="terms" id="terms" required />
                  <label
                    className="mb-3 block text-sm font-medium"
                    htmlFor="terms"
                  >
                    All The Information I Have Entered Is Correct.
                  </label>
                </div>
                <Button type="submit">Submit Application</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default KYCForm;
