import React, { FC, ReactNode } from "react";
interface IChildren {
  children: ReactNode;
}
const SellerDashLayout: FC<IChildren> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default SellerDashLayout;
