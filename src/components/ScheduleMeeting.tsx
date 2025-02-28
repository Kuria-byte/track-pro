import React, { useState } from 'react';
import { Calendar, Clock, Video } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ScheduleMeeting: React.FC = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (meetingDate: string, meetingTime: string) => {
    const templateParams = {
      to_email: 'ianmwitumi@gmail.com',
      meeting_date: meetingDate,
      meeting_time: meetingTime,
      // Format the date and time nicely
      formatted_datetime: `${new Date(meetingDate).toLocaleDateString()} at ${
        meetingTime.split(':')[0] > '12' 
          ? `${parseInt(meetingTime.split(':')[0]) - 12}:00 PM` 
          : `${meetingTime} AM`
      }`
    };

    try {
      await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (date && time) {
      setIsLoading(true);
      try {
        await sendEmail(date, time);
        setIsScheduled(true);
        setTimeout(() => {
          setIsScheduled(false);
          setDate('');
          setTime('');
        }, 3000);
      } catch (error) {
        console.log(error);
        alert('Failed to schedule meeting. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <Video className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
        Schedule a Meeting
      </h2>

      {isScheduled ? (
        <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md text-center">
          Meeting scheduled successfully! A confirmation email has been sent.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Calendar className="h-4 w-4 inline mr-1" />
              Select Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Clock className="h-4 w-4 inline mr-1" />
              Select Time
            </label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            >
              <option value="">Select a time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Scheduling...' : 'Schedule Meeting'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ScheduleMeeting;