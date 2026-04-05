import AttendanceActionCell from "./AttendanceActionCell";

export default function AttendeesDesktopTable({ attendees, eventStatus, actionStudentId, onMarkAttendance, formatDate }) {
  return (
    <div className="hidden overflow-x-auto shadow-md sm:rounded-lg md:block">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Student ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Roll Number</th>
            <th className="px-6 py-3">Reg. Date</th>
            <th className="px-6 py-3">Attendance Check</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((person) => {
            const isRowPending = actionStudentId === person.studentId;

            return (
              <tr key={person.registrationId} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{person.studentId}</td>
                <td className="px-6 py-4">{person.name || "N/A"}</td>
                <td className="px-6 py-4">{person.email || "N/A"}</td>
                <td className="px-6 py-4">{person.rollNumber || person.roll || "N/A"}</td>
                <td className="px-6 py-4">{person.registrationDate ? formatDate(person.registrationDate) : "N/A"}</td>
                <td className="px-6 py-4">
                  <AttendanceActionCell
                    eventStatus={eventStatus}
                    attendanceStatus={person.attendanceStatus}
                    isPending={isRowPending}
                    onMarkPresent={() => onMarkAttendance(person.studentId, "Present")}
                    onMarkAbsent={() => onMarkAttendance(person.studentId, "Absent")}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}