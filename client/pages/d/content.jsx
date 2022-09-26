import { useEffect, useContext, useState } from "react";
import ContentTable from "../../components/content/ContentTable";
import SortDropDown from "../../components/SortDropDown";
import Link from "next/link";
import MainNavigation from "../../components/MainNavigation";
import { v4 as uuidv4 } from "uuid";
import { draftStore } from "../../stores/peers";

const pageTitle = "Live Docs";

const pages = [{ name: pageTitle, href: "/d/content", current: false }];

const timeFilter = [{ title: "Newest" }, { title: "Oldest" }];
const typeFilter = [
  { title: "All Posts" },
  { title: "Draft" },
  { title: "Scheduled" },
  { title: "Published" },
];

export default function Content() {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    let d = [];
    draftStore
      .iterate((v, k, i) => {
        d.push({
          id: k,
          delta: v.content,
          title: v.title,
          lastUpdated: v.lastUpdated,
        });
      })
      .then(() => setDrafts(d));
  });

  return (
    <MainNavigation currentPage={pageTitle}>
      {/* BODY GOES HERE  */}
      {/* Contents table (small breakpoint and up) */}

      <div className="px-8">
        <div className="pt-8 pb-12">
          <Link href={`/d/content/${uuidv4()}`} passHref={true}>
            <button
              type="button"
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:order-1 sm:ml-3"
            >
              New Doc
            </button>
          </Link>
        </div>
        <ContentTable drafts={drafts} />
      </div>
    </MainNavigation>
  );
}
