import React, { Suspense, lazy } from "react";

const HackerWorkstation = lazy(() => import("./HackerWorkstation"));

const Experience3D: React.FC = () => {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-[#020205] -z-10" />}>
      <HackerWorkstation />
    </Suspense>
  );
};

export default Experience3D;

