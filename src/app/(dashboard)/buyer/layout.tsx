import React, { FC, ReactNode } from "react";
interface IChildren {
  children: ReactNode;
}
const BuyerDashLayout: FC<IChildren> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default BuyerDashLayout;
