import { routes } from "./routes";

const routes_names = [
  { path: routes.LOANDASHBOARDHOME, name: "Loan Dashboard" },
  { path: routes.LOANFILTER, name: "Filter/Search Loans" },
  { path: routes.LOANPOLICY, name: "Loan Policy" },
  { path: routes.LOANOFFER, name: "Loan Offer" },
  { path: routes.LOANAPPLY, name: "Loan Application" },
  { path: routes.LOANVERIFICATION, name: "Loan Verification" },
  { path: routes.LOANAPPROVED, name: "Loan Approved" },
  { path: routes.LOANDECLINED, name: "Loan Declined" },
  { path: routes.LOANACCOUNTS, name: "My Accounts" },
  { path: routes.LOANACCOUNTSNEW, name: "New Loan Account" },
  { path: routes.LOANHISTORY, name: "Loan History" },
  { path: routes.LOANPAYBACK, name: "Payback Loan" },
];

export default routes_names;
