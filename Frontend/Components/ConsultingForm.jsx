import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
    service: "",
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9, 1)); 

  const timeSlots = [
    "10:30 PM - 11:00 PM",
    "11:00 PM - 11:30 PM",
    "11:30 PM - 12:00 AM",
  ];

  const services = [
    "Business Strategy",
    "Digital Marketing",
    "Web Design",
    "Consulting Services",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("⚠️ Please select a date and time for your appointment");
      return;
    }
    console.log("Form Submitted:", { ...formData, date: selectedDate, time: selectedTime });
    alert("✅ Your consultation request has been submitted!");
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const formatMonth = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isDateAvailable = (day) => {
    return day >= 14 && day <= 17;
  };

  const days = getDaysInMonth(currentMonth);
  const today = 13;

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-normal text-center mb-8 text-white tracking-wide">
          GET A FREE CONSULTATION
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-xs mb-1 font-light">First name *</label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/40 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
              />
            </div>
            <div>
              <label className="block text-white text-xs mb-1 font-light">Last name *</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/40 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* Email & Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-xs mb-1 font-light">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/40 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
              />
            </div>
            <div>
              <label className="block text-white text-xs mb-1 font-light">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/40 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-white text-xs mb-1 font-light">Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/40 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white resize-none"
            ></textarea>
          </div>

          {/* Service Dropdown */}
          <div>
            <label className="block text-white text-xs mb-1 font-light">Services</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/40 px-0 py-2 text-white focus:outline-none focus:border-white appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
              }}
            >
              <option value=""></option>
              {services.map((service) => (
                <option key={service} value={service} className="bg-blue-900 text-white">
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Calendar & Time Picker */}
          <div>
            <label className="block text-white text-xs mb-3 font-light">Schedule an appointment</label>
            <div className="bg-transparent border-b border-white/40 pb-6">
              {/* Calendar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <button onClick={() => navigateMonth(-1)} type="button" className="text-white/70 hover:text-white">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-white text-sm">
                    {formatMonth(currentMonth)}
                  </span>
                  <button onClick={() => navigateMonth(1)} type="button" className="text-white/70 hover:text-white">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-xs text-center">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="text-white/60 font-light">{d}</div>
                  ))}
                  {days.map((day, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={!day || day < today}
                      onClick={() => setSelectedDate(day)}
                      className={`
                        aspect-square rounded text-white text-xs flex items-center justify-center
                        ${!day ? 'invisible' : ''}
                        ${day < today ? 'text-white/30 cursor-not-allowed' : 'hover:bg-white/10'}
                        ${day === selectedDate ? 'bg-blue-600 text-white' : ''}
                      `}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Info */}
              <p className="text-white/70 text-xs mb-1 font-light">Time zone: India Standard Time (GMT+5:30)</p>
              <p className="text-white/70 text-xs mb-4 font-light">Phone call</p>

              {/* Selected Date Display */}
              {selectedDate && (
                <p className="text-white text-sm mb-3">
                  {currentMonth.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </p>
              )}

              {/* Time Slots */}
              {selectedDate && (
                <div className="space-y-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`
                        w-full md:w-auto px-6 py-2 rounded text-sm transition border
                        ${selectedTime === slot
                          ? 'bg-transparent border-white text-white'
                          : 'bg-transparent border-white/40 text-white hover:border-white'}
                      `}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="relative w-full h-64 rounded overflow-hidden">
            <iframe
              title="JAMES CONSULTING Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.6891234567!2d70.7833!3d22.3039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzE0LjAiTiA3MMKwNDcnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-3 left-3 bg-white px-3 py-1.5 rounded shadow-lg flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <span className="font-medium text-gray-800 text-sm">JAMES CONSULTING</span>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-12 py-2.5 bg-white text-blue-900 font-normal text-sm rounded hover:bg-gray-100 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ConsultationForm;