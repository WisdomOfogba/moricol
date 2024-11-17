"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Switch } from "@/components/switch";
import { Label } from "@/components/label";
import { Card, CardContent } from "@/components/card";
import Link from "next/link";
import { routes } from "@/constants/routes";
import FileInput from "@/components/file-input";
import { ProfileData } from "@/definition";
import uploadToCloudinary from "@/util/upload-to-cloudinary";
import Button from "@/components/button";
import { profileApi } from "@/api/profile";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useSnackbar } from "notistack";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileClient({ profileData }: { profileData: ProfileData }) {
  const [isAcctEditable, setIsAcctEditable] = useState(false);
  const [isRecordEditable, setIsRecordEditable] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState<ProfileData>({ ...profileData, demographic: { ...profileData.demographic, allergy: Array.isArray(profileData.demographic.allergy) ? profileData.demographic.allergy.join(", ") : profileData.demographic.allergy } });
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const readonlyClass = "bg-gray-50 border-gray-200 readonly:bg-gray-50 readonly:border-gray-200 readonly:cursor-not-allowed";

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setEditedProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDemographicChange = (field: keyof typeof editedProfileData.demographic, value: any) => {
    setEditedProfileData(prev => ({
      ...prev,
      demographic: {
        ...prev.demographic,
        [field]: value
      }
    }));
  };


  const handleUpload = async (file: File, field: keyof ProfileData, setLoading?: (loading: boolean) => void) => {
    const formData = new FormData();
    formData.append('file', file);
    setLoading && setLoading(true);
    try {
      const url = await uploadToCloudinary(file);
      setEditedProfileData(prev => ({
        ...prev,
        demographic: {
          ...prev.demographic,
          reports: [...prev.demographic.reports, url]
        }
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading && setLoading(false);
    }
  }

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { mail_on: _mailOn, ...profileDataWithoutMailOn } = editedProfileData;
      const data = {
        ...profileDataWithoutMailOn,
        demographic: {
          allergy: !Array.isArray(editedProfileData.demographic.allergy) ? editedProfileData.demographic.allergy.split(", ") : editedProfileData.demographic.allergy,
          bloodgroup: editedProfileData.demographic.bloodgroup,
          genetype: editedProfileData.demographic.genotype,
          reports: editedProfileData.demographic.reports
        },
        userid: session?.user.id as string
      }
      const toSend = {
        userid: data.userid,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        gender: data.gender,
        maritalstatus: data.maritalstatus,
        occupation: data.occupation,
        dob: data.dob,
        religion: data.religion,
        country: data.country,
        state: data.state,
        photo: data.photo,
        language: data.language,
        demographic: {
          bloodgroup: data.demographic.bloodgroup,
          genetype: data.demographic.genetype,
          reports: data.demographic.reports,
          allergy: data.demographic.allergy
        }
      }
      // @ts-expect-error not a problem
      await profileApi.updateProfile(toSend, session as Session);
      router.refresh();
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsRecordEditable(false);
      setIsAcctEditable(false);
    }
  }

  console.log(editedProfileData);
  return (
    <div className="mx-auto xl:container">
      <h1 className="mb-4 text-2xl font-bold">My Profile</h1>
      <Tabs defaultValue="medical">
        <TabsList>
          <TabsTrigger
            className="data-[state=active]:text-primary-500"
            value="medical"
          >
            Electronic Medical Record
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:text-primary-500"
            value="account"
          >
            Account Profile
          </TabsTrigger>
        </TabsList>
        <div className="relative top-[-2px] border border-primary-50" />
        <TabsContent value="medical">
          <Card className="border-0 bg-transparent px-0 py-4 shadow-none">
            <CardContent className="space-y-4 px-0">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="edit-mode">Edit</Label>
                  <Switch
                    id="edit-mode"
                    checked={isRecordEditable}
                    onCheckedChange={setIsRecordEditable}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="genotype">Genotype</Label>
                  <Input
                    id="genotype"
                    placeholder="Enter genotype"
                    className={!isRecordEditable ? readonlyClass : ""}
                    readOnly={!isRecordEditable}
                    value={editedProfileData.demographic.genotype}
                    onChange={(e) => handleDemographicChange('genotype', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Input
                    id="bloodGroup"
                    placeholder="Enter blood group"
                    className={!isRecordEditable ? readonlyClass : ""}
                    readOnly={!isRecordEditable}
                    value={editedProfileData.demographic.bloodgroup}
                    onChange={(e) => handleDemographicChange('bloodgroup', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                {isRecordEditable && <small className="text-sm text-gray-500 mb-2 block">List any allergies, separated by commas</small>}
                <Textarea
                  id="allergies"
                  placeholder="List any allergies (separate with commas)"
                  className={!isRecordEditable ? readonlyClass : ""}
                  readOnly={!isRecordEditable}
                  value={editedProfileData.demographic.allergy}
                  onChange={(e) => handleDemographicChange('allergy', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="uploadMedical">
                  {isRecordEditable ? "Upload Scans or Medical Report" : "Scans & Medical Report"}
                </Label>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {editedProfileData.demographic.reports?.map((report, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={report}
                        alt={`Medical report ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <a href={report} target="_blank" rel="noopener noreferrer" className="text-white text-sm">View</a>
                      </div>
                    </div>
                  ))}
                  {/* empty state */}
                  {editedProfileData.demographic.reports?.length === 0 && <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">No reports uploaded</p>
                  </div>}
                </div>

                {isRecordEditable && <FileInput caption="upload document" title=""
                  onUpload={handleUpload}
                  field="reports"
                />}
              </div>

              {/* save changes button */}
              {isRecordEditable && <Button className="flex items-center justify-center" onClick={() => {
                handleSaveChanges();
              }} disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
              </Button>}


            </CardContent>
          </Card>
        </TabsContent>

        {/* second tab */}
        <TabsContent value="account">
          <Card className="border-0 bg-transparent py-4 shadow-none">
            <CardContent className="px-0">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="edit-mode">Edit</Label>
                  <Switch
                    id="edit-mode"
                    checked={isAcctEditable}
                    onCheckedChange={setIsAcctEditable}
                  />
                </div>
                <Link
                  href={routes.TELEMEDICINE_PROFILE + "/change-password"}
                  className="md:text-md text-sm text-primary-600"
                >
                  Change Password?
                </Link>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={editedProfileData.firstname}
                      className={!isAcctEditable ? readonlyClass : ""}
                      readOnly={!isAcctEditable}
                      onChange={(e) => handleInputChange('firstname', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={editedProfileData.lastname}
                      className={!isAcctEditable ? readonlyClass : ""}
                      readOnly={!isAcctEditable}
                      onChange={(e) => handleInputChange('lastname', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedProfileData.email}
                      className={!isAcctEditable ? readonlyClass : ""}
                      readOnly={!isAcctEditable}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={editedProfileData.phone}
                      className={!isAcctEditable ? readonlyClass : ""}
                      readOnly={!isAcctEditable}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={editedProfileData.dob}
                      className={!isAcctEditable ? readonlyClass : ""}
                      readOnly={!isAcctEditable}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      disabled={!isAcctEditable}
                      value={editedProfileData.gender}
                      onValueChange={(value) => handleInputChange('gender', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="religion">Religion</Label>
                    <Input
                      id="religion"
                      value={editedProfileData.religion}
                      className={!isAcctEditable ? readonlyClass : ""}
                      readOnly={!isAcctEditable}
                      onChange={(e) => handleInputChange('religion', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      value={editedProfileData.occupation}
                      className={!isAcctEditable ? readonlyClass : ""}
                      readOnly={!isAcctEditable}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select
                      disabled={!isAcctEditable}
                      value={editedProfileData.maritalstatus}
                      onValueChange={(value) => handleInputChange('maritalstatus', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={editedProfileData.country}
                      className={!isAcctEditable ? readonlyClass : ""}
                      readOnly={!isAcctEditable}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={editedProfileData.state}
                      className={!isAcctEditable ? readonlyClass : ""}
                      readOnly={!isAcctEditable}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <br />
              {isAcctEditable && <Button className="flex items-center justify-center" onClick={() => {
                handleSaveChanges();
              }} disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
              </Button>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
