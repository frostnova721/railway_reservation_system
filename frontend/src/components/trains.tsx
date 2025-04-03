import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../statics";

interface Seat {
  id: number;
  seatNumber: number;
  available: boolean;
  bookedBy: number | null;
}

interface Compartment {
  id: number;
  name: string;
  seats: Seat[];
}

interface Train {
  id: number;
  name: string;
  compartments: Compartment[];
}

interface User {
  name: string;
  userId: number;
  email: string;
}

const TrainSelectionPopup: React.FC = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [selectedCompartment, setSelectedCompartment] =
    useState<Compartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get user from session storage
  const user: User = JSON.parse(sessionStorage.getItem("user") || "{}");

  const api = API

  // Fetch trains on component mount
  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      setLoading(true);
      const res = await axios.get(api + "/train/get");
      setTrains(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load trains. Please try again.");
      console.error("Error fetching trains:", err);
    } finally {
      setLoading(false);
    }
  };

  const bookSeat = async (seatNo: number, compId: number, seatId: number) => {
    try {
      await axios.post(api + "/book/", {
        compartmentId: compId,
        seatNumber: seatNo,
        userId: user.userId,
      });

      // Refresh data after booking
      if (selectedCompartment) {
        const updatedSeats = selectedCompartment.seats.map((seat) =>
          seat.id === seatId
            ? { ...seat, available: false, bookedBy: user.userId }
            : seat
        );

        setSelectedCompartment({
          ...selectedCompartment,
          seats: updatedSeats,
        });
      }

      // Refresh all trains to keep data consistent
      fetchTrains();
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Failed to book seat. Please try again.");
    }
  };

  const cancelBooking = async (seatId: number) => {
    try {
      // Implement your cancel booking logic here
      alert("Cancel booking functionality not implemented yet");
      console.log(seatId);

      // Refresh data after cancellation
      fetchTrains();
    } catch (err) {
      console.error("Cancellation failed:", err);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  const handleBackNavigation = () => {
    if (selectedCompartment) {
      setSelectedCompartment(null);
    } else if (selectedTrain) {
      setSelectedTrain(null);
    }
  };

  // Render seat status with appropriate color and text
  const renderSeatButton = (seat: Seat) => {
    let buttonClass =
      "flex flex-col items-center justify-center p-2 rounded-lg transition-colors";
    let buttonText = "Book";
    let isClickable = true;

    if (!seat.available) {
      if (seat.bookedBy === user.userId) {
        buttonClass += " bg-blue-600 hover:bg-blue-500 text-white";
        buttonText = "Cancel";
      } else {
        buttonClass += " bg-gray-600 text-gray-300 cursor-not-allowed";
        buttonText = "Booked";
        isClickable = false;
      }
    } else {
      buttonClass += " bg-green-600 hover:bg-green-500 text-white";
    }

    return (
      <button
        key={seat.id}
        className={buttonClass}
        onClick={() => {
          if (!isClickable) return;

          if (seat.available) {
            bookSeat(seat.seatNumber, selectedCompartment!.id, seat.id);
          } else if (seat.bookedBy === user.userId) {
            cancelBooking(seat.id);
          }
        }}
        disabled={!isClickable && seat.bookedBy !== user.userId}
      >
        <span className="text-lg font-bold">{seat.seatNumber}</span>
        <span className="text-xs">{buttonText}</span>
      </button>
    );
  };

  return (
    <div className="p-4 md:p-6 flex flex-col w-full h-full relative">
      {/* Back button */}
      {(selectedTrain || selectedCompartment) && (
        <button
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-700 transition-colors"
          onClick={handleBackNavigation}
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Main content based on selection state */}
      <div className="flex-1 flex flex-col items-center justify-center mt-8">
        {selectedCompartment ? (
          // Seat selection view
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-white text-2xl font-bold text-center">
              Select a Seat
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
              {selectedCompartment.seats.map((seat) => renderSeatButton(seat))}
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-600 rounded mr-2"></div>
                <span className="text-sm text-white">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
                <span className="text-sm text-white">Your Booking</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-600 rounded mr-2"></div>
                <span className="text-sm text-white">Booked</span>
              </div>
            </div>
          </div>
        ) : selectedTrain ? (
          // Compartment selection view
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-white text-2xl font-bold text-center">
              Select a Compartment
            </h2>
            <div className="grid gap-3">
              {selectedTrain.compartments.map((comp, index) => (
                <button
                  key={comp.id}
                  className="w-full p-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={() => setSelectedCompartment(comp)}
                >
                  Compartment {index + 1}
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Train selection view
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-white text-2xl font-bold text-center">
              Select a Train
            </h2>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="bg-red-500 bg-opacity-20 p-4 rounded-lg">
                <p className="text-red-500 text-center">{error}</p>
                <button
                  className="mt-2 w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  onClick={fetchTrains}
                >
                  Try Again
                </button>
              </div>
            ) : trains.length === 0 ? (
              <p className="text-white text-center py-6">
                No trains available at the moment.
              </p>
            ) : (
              <div className="grid gap-3">
                {trains.map((train) => (
                  <button
                    key={train.id}
                    className="w-full p-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex justify-between items-center"
                    onClick={() => setSelectedTrain(train)}
                  >
                    <span>{train.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainSelectionPopup;
