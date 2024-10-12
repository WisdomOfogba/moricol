import { routes } from "@/constants/routes";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/input";
import ContentLayout from "../../../_components/content-layout";

export default function Reference() {
  return (
    <ContentLayout
      next_route={routes.RECRUITMENT_FOREIGN_COVER_LETTER}
      pageTitle="Provide Reference"
      step={4}
    >
      <form className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Name of Referee
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              className="w-full rounded border border-gray-300 p-2"
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email address of Referee
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Enter email"
            />
          </div>
        </div>
        <div>
          <Label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Phone number of Referee
          </Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Enter email"
          />
        </div>
      </form>
    </ContentLayout>
  );
}
