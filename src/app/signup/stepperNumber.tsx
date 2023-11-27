import { StepperNumberType } from "@/types/StepperNumberType";

export function StepperNumber({
  stepId,
  StepperNumberData,
}: {
  stepId: number;
  StepperNumberData: StepperNumberType[];
}) {
  return (
    <div className="flex md:gap-20 gap-12 md:py-10 py-4 justify-center">
    {StepperNumberData.map((e: StepperNumberType, index) => (
      <div key={e.id}>
        <div className={`text-center font-bold ${index < stepId ? 'text-primary-6000' : 'text-gray-400'}`}>
          <div className={`box-border border-[1px] py-2 rounded-full md:w-28 w-10
          ${index < stepId ? 'border-primary-6000' : 'border-gray-400'}`}>
          {index < stepId -1 ? "✔" : (stepId === 4 ? "✔" : e.id)}
          </div>
          <div className="hidden md:block md:text-[10px]">
            {e.title}
          </div>
        </div>
      </div>
    ))}
  </div>
  );
}