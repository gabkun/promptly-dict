import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs()); // Current month
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // Selected date

  const daysOfWeek: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Get the start and end of the current month
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");

  // Calculate the range of dates for the calendar view
  const startCalendar = startOfMonth.startOf("week");
  const endCalendar = endOfMonth.endOf("week");

  // Generate an array of dates to fill the calendar grid
  const days: Dayjs[] = [];
  let day = startCalendar;

  while (day.isBefore(endCalendar, "day") || day.isSame(endCalendar, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  // Handlers for month navigation
  const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  // Handler for selecting a date
  const handleDateClick = (date: Dayjs) => setSelectedDate(date);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handlePrevMonth}
        >
          Prev
        </button>
        <h2 className="text-2xl font-bold text-center">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleNextMonth}
        >
          Next
        </button>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-4 text-center font-semibold text-gray-700">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4 text-center mt-4">
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg cursor-pointer ${
              day.isSame(currentDate, "month") ? "bg-white" : "bg-gray-100"
            } ${
              day.isSame(selectedDate, "day") ? "border-blue-500" : ""
            }`}
            onClick={() => handleDateClick(day)}
          >
            <span
              className={`block ${
                day.isSame(dayjs(), "day") ? "text-blue-500 font-bold" : ""
              }`}
            >
              {day.date()}
            </span>
          </div>
        ))}
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Selected Date</h3>
          <p className="text-gray-700 mt-2">
            {selectedDate.format("dddd, MMMM D, YYYY")}
          </p>
          {/* Placeholder for additional functionality */}
          <div className="mt-4">
            <p className="text-gray-600">No events for this date.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;