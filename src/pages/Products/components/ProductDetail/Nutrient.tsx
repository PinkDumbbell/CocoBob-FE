interface INutrient {
  name: string;
  amount: any;
  unit: string;
}

export default function Nutrient(props: INutrient) {
  const { name, amount, unit } = props;
  return (
    <div className="text-center h-14 flex items-center align-middle w-[50%] justify-around">
      <p className="font-normal">{name}</p>
      <div className="">
        <p className="text-[#1A70D2] font-bold text-[13px]">{parseFloat(amount).toFixed(2)}</p>
        <p className="text-[#999999] text-[11px] font-normal mt-[-8px]">{unit}</p>
      </div>
    </div>
  );
}
