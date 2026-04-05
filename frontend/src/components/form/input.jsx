import { Controller, useController } from "react-hook-form";

export const LabeledInput = ({ label, type, name, placeholder = "", errMsg = "", className = "", handler }) => {
  const { field } = useController({ name: name, control: handler });
  const isNumberInput = type === "number";

  return (
    <div className="w-full flex flex-col md:flex-row gap-1 md:gap-2 md:items-start">
      <label htmlFor={name} className="text-[13px] sm:text-sm font-semibold text-slate-700 w-full md:w-1/3 cursor-pointer md:mt-1.5">
        {label} :
      </label>

      <div className="w-full md:w-2/3 flex flex-col gap-0.5">
        <input
          type={type}
          id={name}
          {...field}
          min={isNumberInput ? 1 : undefined}
          step={isNumberInput ? "any" : undefined}
          inputMode={isNumberInput ? "decimal" : undefined}
          onWheel={
            isNumberInput
              ? (event) => {
                  // Avoid accidental value changes while page scrolling.
                  event.currentTarget.blur();
                }
              : undefined
          }
          placeholder={placeholder}
          className={`w-full border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-700 focus:border-blue-700 outline-none py-1 px-2 bg-white text-[13px] sm:text-sm transition-all shadow-sm ${className}`}
        />
        {errMsg && <span className="text-[11px] sm:text-xs text-red-600 italic leading-tight transition-all">{errMsg}</span>}
      </div>
    </div>
  );
};

export const SelectInput = ({ label, name, handler, errMsg, options }) => {
  const { field } = useController({ name, control: handler }); // consistent with LabeledInput

  return (
    <div className="w-full flex flex-col md:flex-row gap-1 md:gap-2 md:items-start">
      <label htmlFor={name} className="text-[13px] sm:text-sm font-semibold text-slate-700 w-full md:w-1/3 cursor-pointer md:mt-1.5">
        {label} :
      </label>

      <div className="w-full md:w-2/3 flex flex-col gap-0.5">
        <select
          {...field}
          id={name}
          className={`w-full border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-700 focus:border-blue-700 outline-none py-1.5 px-2 bg-white text-[13px] sm:text-sm transition-all shadow-sm cursor-pointer ${errMsg ? "border-red-500" : ""}`}
        >
          <option value="" disabled>
            -- Select {label} --
          </option>
          {options?.map((val, idx) => (
            <option key={idx} value={val.value}>
              {val.label}
            </option>
          ))}
        </select>
        {errMsg && <span className="text-[11px] sm:text-xs text-red-600 italic mt-0.5">{errMsg}</span>}
      </div>
    </div>
  );
};

export const LabeledDateInput = ({ label, name, placeholder = "", errMsg = "", className = "", handler }) => {
  const { field } = useController({ name: name, control: handler });
  return (
    <div className="w-full flex flex-col md:flex-row gap-1 md:gap-2 md:items-start">
      <label htmlFor={name} className="text-[13px] sm:text-sm font-semibold text-slate-700 w-full md:w-1/3 cursor-pointer md:mt-1.5">
        {label} :
      </label>

      <div className="w-full md:w-2/3 flex flex-col gap-0.5">
        <input
          type="date"
          id={name}
          {...field}
          placeholder={placeholder}
          className={`w-full border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-700 focus:border-blue-700 outline-none py-1 px-2 bg-white text-[13px] sm:text-sm transition-all shadow-sm ${className}`}
        />
        {errMsg && <span className="text-[11px] sm:text-xs text-red-600 italic leading-tight transition-all">{errMsg}</span>}
      </div>
    </div>
  );
};

export const LabeledTextArea = ({ label, name, placeholder = "", errMsg = "", className = "", handler }) => {
  const { field } = useController({ name: name, control: handler });
  return (
    <div className="w-full flex flex-col md:flex-row gap-1 md:gap-2 md:items-start">
      <label htmlFor={name} className="text-[13px] sm:text-sm font-semibold text-slate-700 w-full md:w-1/3 cursor-pointer md:mt-1.5">
        {label} :
      </label>
      <div className="w-full md:w-2/3 flex flex-col gap-0.5">
        <textarea
          id={name}
          {...field}
          placeholder={placeholder}
          className={`w-full border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-700 focus:border-blue-700 outline-none py-1 px-2 bg-white text-[13px] sm:text-sm transition-all shadow-sm ${className}`}
          rows={4}
        />
        {errMsg && <span className="text-[11px] sm:text-xs text-red-600 italic leading-tight transition-all">{errMsg}</span>}
      </div>
    </div>
  );
};
