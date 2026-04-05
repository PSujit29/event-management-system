import CreateEventForm from "../../components/events/CreateEventForm";

export default function CreateEventPage() {
  return (

    <div className="max-w-3xl bg-white mx-auto p-10 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-5">Create New Event</h1>
      <CreateEventForm />
    </div>
  );
}
