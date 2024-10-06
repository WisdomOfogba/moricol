import LoanFilterClient from "../_components/loan-filter-client";

export default function Loanfilter() {
  const categories = [
    {
      title: "Dental",
      image: "https://picsum.photos/150/150?random=2",
    },
    {
      title: "Vision",
      image: "https://picsum.photos/150/150?random=2",
    },
    {
      title: "Cosmetics",
      image: "https://picsum.photos/150/150?random=2",
    },
    {
      title: "Surgical Procedures",
      image: "https://picsum.photos/150/150?random=2",
    },
    {
      title: "Telemedicine",
      image: "https://picsum.photos/150/150?random=2",
    },
    {
      title: "Maternity",
      image: "https://picsum.photos/150/150?random=2",
    },
    {
      title: "Mental Health",
      image: "https://picsum.photos/150/150?random=2",
    },
    {
      title: "Home Health",
      image: "https://picsum.photos/150/150?random=2",
    },
    {
      title: "Others",
      image: "https://picsum.photos/150/150?random=2",
    },
  ];

  return <LoanFilterClient categories={categories} />;
}
