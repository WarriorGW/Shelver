import AuthGuardian from "@/components/AuthGuardian";
import BodyWrapper from "@/components/BodyWrapper";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuardian>
      <BodyWrapper>{children}</BodyWrapper>
    </AuthGuardian>
  );
}

export default DashboardLayout;
