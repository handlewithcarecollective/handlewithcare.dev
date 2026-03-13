export function StayConnectedForm() {
  return (
    <form className="mr-4 flex items-center gap-4 md:mr-8">
      <span>Stay connected on our progress</span>
      <input
        type="email"
        name="email"
        placeholder="email address"
        required
        className="rounded px-4 py-2 text-sm"
      />
      <button type="submit" className="text-underline">
        Get updates
      </button>
    </form>
  );
}
