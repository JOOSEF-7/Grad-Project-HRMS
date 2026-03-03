function PayrollStep({ data, onChange }) {
    const handleChange = (field, value) => {
    onChange(field, value);
  };
  return (
    <div className="space-y-5">

      {/* Payment Frequency
      <div>
        <label className="text-xs text-gray-400">Payment Frequency</label>
        <select
          value={data?.frequency || ""}
          onChange={(e) => onChange("frequency", e.target.value)}
          className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
        >
          <option value="" className="bg-[#1A1D24] text-white">Select frequency</option>
          <option value="Monthly" className="bg-[#1A1D24] text-white">Monthly</option>
          <option value="Bi-weekly" className="bg-[#1A1D24] text-white">Bi-weekly</option>
          <option value="Weekly" className="bg-[#1A1D24] text-white">Weekly</option>
        </select>
      </div> */}

      {/* Payment Method */}
      <div>
        <label className="text-xs text-gray-400">Payment Method</label>
        <select
          value={data?.method || ""}
          onChange={(e) => onChange("method", e.target.value)}
          className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
        >
          <option value="" className="bg-[#1A1D24] text-white">Select method</option>
          <option value="Bank" className="bg-[#1A1D24] text-white">Bank transfer</option>
          <option value="Cash" className="bg-[#1A1D24] text-white">Cash</option>
          <option value="Wallet" className="bg-[#1A1D24] text-white">Wallet</option>
        </select>
      </div>

      {/* Bank Details */}
      {data?.method === "Bank" && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Bank name"
            value={data?.bankName || ""}
            onChange={(e) => onChange("bankName", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
          />

          <input
            type="text"
            placeholder="Account number"
            value={data?.accountNumber || ""}
            onChange={(e) => onChange("accountNumber", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
          />
        </div>
      )}
    {/* Compensation */}

    <div>
      <label className="text-xs text-gray-400">Compensation</label>

      <div className="grid grid-cols-2 gap-4 mt-2">
        {['Hourly', 'Annual'].map((g) => (
          <label
            key={g}
            className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 border transition
              ${
                data.Compensation === g
                  ? 'border-blue-500 bg-white/5 text-blue-500'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
              }`}
          >
            <input
              type="radio"
              name="Compensation"
              value={g}
              checked={data.Compensation === g}
              onChange={() => handleChange('Compensation', g)}
              className="hidden"
            />

            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border
                ${
                  data.Compensation === g
                    ? 'border-blue-500'
                    : 'border-gray-500'
                }`}
            >
              {data.Compensation === g && (
                <span className="h-2 w-2 rounded-full bg-blue-500" />
              )}
            </span>

            <span className="text-sm">{g}</span>
          </label>
        ))}
      </div>
    </div>

    </div>
  )
}

export default PayrollStep;

