import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const downloadTimetableAsPDF = (timetable) => {
    const doc = new jsPDF();

    if (!timetable || !timetable.weekdays) {
        alert("No timetable data available to download.");
        return;
    }

    doc.setFont("montserrat", "normal");


    doc.text("Student Timetable", 20, 10);

    // Table header
    const header = ["Day", "08:00 - 09:30", "09:30 - 11:00", "11:00 - 13:00"];

    // Days of the week in the correct order
    const daysOfWeekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    // Sort weekdays to match the correct order
    const sortedWeekdays = timetable.weekdays.sort((a, b) => {
        return daysOfWeekOrder.indexOf(a.day) - daysOfWeekOrder.indexOf(b.day);
    });

    // Prepare table body
    const body = sortedWeekdays.map((day) => {
        // Extract the course names for the relevant time slots (08:00, 09:30, 11:00)
        const courseNames = ["08:00", "09:30", "11:00"].map((time) => {
            const slot = day.timeslots.find((slot) => {
                // Format the start time (HH:MM)
                const slotStart = slot.startTime.substring(0, 5); // Extract HH:MM from HH:MM:SS
                const timeFormatted = time; // HH:MM format
                return slotStart === timeFormatted;
            });
            return slot ? `${slot.coursename} (Room: ${slot.roomNo})` : "No Class";
        });

        return [day.day, ...courseNames];
    });

    // Create the table
    doc.autoTable({
        head: [header],
        body: body,
        startY: 20,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] }, // Custom header color
        margin: { top: 30, left: 20, right: 20 },
        didParseCell: function (data) {
            if (data.section === 'body' && data.column.index > 0) {
                const text = data.cell.raw;
                if (text === "No Class") {
                    data.cell.styles.fillColor = [255, 253, 231]; // Yellow 
                } else {
                    data.cell.styles.fillColor = [225, 245, 254]; // Light Blue 
                }
            }
        }
    });

    // Download PDF
    doc.save("timetable.pdf");
};
