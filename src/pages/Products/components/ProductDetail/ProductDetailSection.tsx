import { ReactNode } from 'react';

const ProductDetailSection = ({ children, label }: { children: ReactNode; label: string }) => {
  return (
    <div className="p-main w-full flex flex-col gap-3 bg-white">
      <h4 className="text-p font-medium">{label}</h4>
      <div className="w-full">{children}</div>
    </div>
  );
};
export default ProductDetailSection;
