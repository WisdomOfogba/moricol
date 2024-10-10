import { routes } from "@/constants/routes";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/input";
import ContentLayout from "../../../_components/content-layout";

export default function Contact() {
  return (
    <ContentLayout
      next_route={routes.RECRUITMENT_FOREIGN_PROFILE_PICTURE}
      pageTitle="How can we contact you? "
      step={7}
    >
      <form className="space-y-4">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email address
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Phone number
            </Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="linkedin"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              LinkedIn Profile
            </Label>
            <Input
              type="url"
              id="linkedin"
              name="linkedin"
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Enter LinkedIn URL"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="twitter"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Twitter Handle
            </Label>
            <Input
              type="text"
              id="twitter"
              name="twitter"
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Enter Twitter handle"
              required
            />
          </div>
        </div>
      </form>
    </ContentLayout>
  );
}
