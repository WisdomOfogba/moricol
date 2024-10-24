import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/textarea";
import ContentLayout from "@/app/dashboard/recruitment/_components/content-layout";

function CoverLetterClient({
    next_route,
}: {
    next_route: string
}) {
  return (
    <ContentLayout
      next_route={next_route}
      pageTitle="Cover Letter"
      step={5}
    >
      <div className="max-w-2xl">
        <div>
          <Label
            htmlFor="reasonForLeaving"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Write a cover letter.
          </Label>
          <Textarea
            rows={12}
            id="reasonForLeaving"
            name="reasonForLeaving"
            placeholder="Lorem ipsum dolor sit amet consectetur. Faucibus rutrum eget vel viverra eget etiam sit. Dictum vivamus amet diam sit nulla ut mattis pulvinar. Turpis in purus dui gravida risus massa. Sed tortor non diam non aenean gravida turpis."
          />
          <p className="mt-1 text-sm text-gray-500">Minimum 70 characters</p>
        </div>
      </div>
    </ContentLayout>
  );
}

export default CoverLetterClient;
