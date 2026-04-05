export default function CloneTemplateSuccessSummary({ clonedEventSummary }) {
  return (
    <div className="w-full bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Generated!</h2>
          <p className="text-gray-500 mb-6">Redirecting you to the event dashboard...</p>
        </div>

        <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 text-lg">{clonedEventSummary.name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            Starts: <span className="font-medium text-gray-900">{clonedEventSummary.startDate}</span>
          </p>

          <div className="mt-5">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Auto-generated Sub-events</h4>
            <ul className="space-y-3">
              {(clonedEventSummary.subEvents || []).map((sub) => (
                <li
                  key={sub.subEventId ?? sub.id}
                  className="text-sm flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 pb-2 last:border-0 last:pb-0"
                >
                  <div>
                    <span className="block font-medium text-gray-800">{sub.name}</span>
                    <span className="block text-xs text-gray-500">{sub.description}</span>
                  </div>
                  <span className="mt-1 sm:mt-0 text-indigo-600 font-medium">{sub.startDate ?? sub.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}