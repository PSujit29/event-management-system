export default function CloneTemplateFormActions({ isSubmitting, onCancel }) {
  return (
    <div className="pt-6 flex flex-col-reverse gap-3 border-t border-gray-200 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        className="w-full rounded-md border border-gray-300 bg-white py-2 px-5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors sm:w-auto"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors sm:w-auto"
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating...
          </span>
        ) : (
          "Clone Template"
        )}
      </button>
    </div>
  );
}