import { SmallSpinner } from '@/Animation';

type BrandInformationProps = {
  loading: boolean;
  brandName?: string;
  brandLogo?: string;
};
const BrandInformation = ({ loading, brandName, brandLogo }: BrandInformationProps) => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-16">
        {(loading || brandLogo) && (
          <div className="w-16 h-16 flex items-center justify-center rounded border-primary-brighter border overflow-hidden p-1.5">
            {brandLogo && (
              <img
                src={brandLogo}
                alt="brand logo"
                className="rounded border-primary-bright w-12"
              />
            )}
            {loading && <SmallSpinner />}
          </div>
        )}
      </div>
      {loading ? (
        <div className="text-label">
          <SmallSpinner />
        </div>
      ) : (
        <p className="text-primary text-label">{brandName ?? 'No Brand'}</p>
      )}
    </>
  );
};
export default BrandInformation;
