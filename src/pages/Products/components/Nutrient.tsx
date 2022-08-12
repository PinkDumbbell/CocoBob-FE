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
      <div className="mr-[-20px]">
        <div className="w-[29px] h-[13px] bg-[#D9D9D9] rounded-[5px]" />
        <div className="w-[29px] h-[13px] bg-[#999999] rounded-[5px] mt-[-3px]" />
        <div className="w-[29px] h-[13px] bg-[#333333] rounded-[5px] mt-[-3px]" />
      </div>
      <div className="">
        <p className="text-[#1A70D2] font-bold text-[13px]">{parseFloat(amount).toFixed(2)}</p>
        <p className="text-[#999999] text-[11px] font-normal mt-[-8px]">{unit}</p>
      </div>
    </div>
  );
}
