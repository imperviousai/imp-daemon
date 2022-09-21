import ComingSoon from "../../components/ComingSoon";
import MainNavigation from "../../components/MainNavigation";

const pageTitle = "Integrations";

export default function Integrations() {
  return (
    <MainNavigation currentPage={pageTitle}>
      <ComingSoon />
    </MainNavigation>
  );
}
