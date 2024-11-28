import { CourseApi } from "@/api/training";
import { Spinner, StarSVG } from "@/components/svgs";
import { ReviewData } from "@/definition";
import { formatRelativeTime } from "@/util/formatTime";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

const Review = ({ initialReview, coursetype, courseid }: { initialReview: ReviewData[], coursetype: string, courseid: string }) => {
  const [review, setReview] = useState<ReviewData[]>(initialReview);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newRating === 0) {
      alert("Please select a rating");
      return;
    }

    setIsLoading(true);

    try {
      setIsLoading(true);
      await CourseApi.sendReview({
        userid: session?.user.id as string,
        review: newReview,
        coursetype,
        rating: newRating,
        courseid,
        session: session as Session,
      });
        const updatedReviews = await getCoursesData({ type: coursetype, id: courseid });
        setReview(updatedReviews);
        setNewReview("");
        setNewRating(0); // Reset rating
        console.error("Failed to add review");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  async function getCoursesData({ type, id }: { type: string; id: string }) {
    try {
      const {
        data: { review: courseDetailsReview },
      }: { data: { review: ReviewData[] } } =
        await CourseApi.getSingleCourseData({ type, id });
      return courseDetailsReview;
    } catch (error) {
      console.error("Error fetching course data:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to get courses data",
      );
    }
  }

  return (
    <section className="grid gap-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-[#1D2026]">
          Students Feedback
        </h3>
      </div>

      <div>
        {review.map((review, i) => (
          <article key={i} className="flex items-start gap-x-4">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image
                src={review.userid.photo ||"/images/client.jpg"}
                alt=""
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div>
              <div className="mb-2 flex items-center gap-x-2">
                <h4 className="text-sm font-medium text-[#1D2026]">{`${review.userid.firstname} ${review.userid.lastname}`}</h4>
                <div className="h-1 w-1 rounded-full bg-[#6E7485]" />
                <p className="text-xs">
                  {formatRelativeTime(review.createdAt)}
                </p>
              </div>
              <ul className="mb-3 flex">
                {Array(review.rating)
                  .fill("")
                  .map((_, i) => (
                    <li key={i}>
                      <StarSVG fill="#FD8E1F" />
                    </li>
                  ))}
              </ul>
              <p className="text-sm text-[#4E5566]">{review.review}</p>
            </div>
          </article>
        ))}
        <hr className="my-5 h-[1px] border-none bg-[#E9EAF0] last:hidden" />
      </div>

      <div className="space-y-4">
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write a review..."
          className="w-full rounded border border-gray-300 p-3 text-sm focus:p-3"
        />
        <div className="flex items-center gap-x-2">
          <label className="text-sm font-medium">Rating:</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`text-lg ${newRating >= star ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => setNewRating(star)}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <button
        className="group flex w-fit items-center gap-x-3 bg-primary-100 px-6 py-3 font-semibold text-primary-500 disabled:opacity-50"
        onClick={handleAddReview}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            Submitting...{" "}
            <Spinner className="duration-700 group-hover:motion-safe:animate-spin" />
          </>
        ) : (
          "Submit Review"
        )}
      </button>
    </section>
  );
};

export default Review;
