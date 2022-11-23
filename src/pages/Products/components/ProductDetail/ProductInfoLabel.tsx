import React, { ReactNode } from 'react';

type ProductInfoLabelProps = {
  icon?: string;
  label?: string;
  labelColor?: string;
  children: ReactNode;
};
const ProductInfoLabel = ({ children }: ProductInfoLabelProps) => (
  <div className="flex items-center gap-1 h-full">{children}</div>
);
const Icon = ({ icon }: { icon: string }) => {
  return <img src={icon} alt="연령 아이콘" className="h-5" />;
};
const Label = ({ label, labelColor }: { label?: string | ReactNode; labelColor?: string }) => (
  <div className={`text-[${labelColor ?? '#222'}] font-medium whitespace-nowrap`}>{label}</div>
);

ProductInfoLabel.Icon = Icon;
ProductInfoLabel.Label = Label;

export default ProductInfoLabel;
