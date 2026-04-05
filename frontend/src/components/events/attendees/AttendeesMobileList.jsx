import AttendanceActionCell from "./AttendanceActionCell";

export default function AttendeesMobileList({ attendees, eventStatus, actionStudentId, onMarkAttendance, formatDate }) {
  return (
    <div className="space-y-3 md:hidden">
      {attendees.map((person) => {
        const isRowPending = actionStudentId === person.studentId;

        return (
          <div key={person.registrationId} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">{person.name || "N/A"}</p>
              <span className="text-xs font-medium text-gray-500">ID: {person.studentId}</span>
            </div>

            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>Email: {person.email || "N/A"}</p>
              <p>Roll Number: {person.rollNumber || person.roll || "N/A"}</p>
              <p>Reg. Date: {person.registrationDate ? formatDate(person.registrationDate) : "N/A"}</p>
            </div>

            <div className="mt-3">
              <AttendanceActionCell
                eventStatus={eventStatus}
                attendanceStatus={person.attendanceStatus}
                isPending={isRowPending}
                onMarkPresent={() => onMarkAttendance(person.studentId, "Present")}
                onMarkAbsent={() => onMarkAttendance(person.studentId, "Absent")}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}