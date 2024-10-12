import ContentLayout from "./content-layout";

export default function Bio({ next_route }: { next_route: string }) {
  return (
    <ContentLayout next_route={next_route} pageTitle="Brief Bio" step={1}>
      <div className="flex justify-between">
        <p className="mb-4">Tell us about yourself</p>
        <p className="mt-1 hidden text-sm text-gray-500 md:block">
          Minimum 70 characters
        </p>
      </div>
      <div className="mb-4">
        <textarea
          className="w-full rounded border border-primary-300 p-2"
          rows={6}
          placeholder="I'm motivated and a team player"
        ></textarea>
        <p className="mt-1 text-sm text-gray-500 md:hidden">
          Minimum 70 characters
        </p>
      </div>
    </ContentLayout>
  );
}
