import ComingSoon from "../../components/ComingSoon";
import MainNavigation from "../../components/MainNavigation";

const pageTitle = "Monetize";

export default function Monetize() {
  return (
    <MainNavigation currentPage={pageTitle}>
      <ComingSoon />
    </MainNavigation>
  );
}
