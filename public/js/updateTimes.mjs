function updateTimes() {
  const princetonElement = document.querySelector(
    '[data-time="princeton"]'
  );
  const losAngelosElement = document.querySelector(
    '[data-time="los_angeles"]'
  );

  const now = Date.now();

  princetonElement.replaceChildren(
    document.createTextNode(
      new Intl.DateTimeFormat("en-US", {
        timeStyle: "short",
        timeZone: "America/New_York",
      }).format(now) + " Princeton"
    )
  );

  losAngelosElement.replaceChildren(
    document.createTextNode(
      new Intl.DateTimeFormat("en-US", {
        timeStyle: "short",
        timeZone: "America/Los_Angeles",
      }).format(now) + " Los Angeles"
    )
  );
}

setInterval(updateTimes, 1000);
updateTimes();
