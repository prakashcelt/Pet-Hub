import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import useClinicsStore from "./zustand/clinics";
import ClinicDetailsView from "./components/ClinicDetailsView";

export default function ClinicDetailsPage() {
  const { id, name, address, description } = useLocalSearchParams();
  
  // Get state and actions from Zustand store
  const { 
    clinicDetails, 
    isLoadingDetails, 
    detailsError, 
    fetchClinicDetails,
    clearClinicDetails 
  } = useClinicsStore();

  useEffect(() => {
    if (id) {
      // Prepare fallback data from route params
      const fallbackData = {
        name,
        address,
        description
      };
      
      // Fetch clinic details using Zustand store
      fetchClinicDetails(id, fallbackData);
    }

    // Cleanup on unmount
    return () => {
      clearClinicDetails();
    };
  }, [id, fetchClinicDetails, clearClinicDetails, name, address, description]);

  const handleBookAppointment = () => {
    // TODO: Implement booking logic
    console.log("Book appointment for clinic:", id);
  };

  const handleCall = () => {
    // TODO: Implement call logic
    console.log("Call clinic:", id);
  };

  return (
    <ClinicDetailsView
      clinicId={id}
      clinicName={name}
      clinicAddress={address}
      clinicDescription={description}
      clinicDetails={clinicDetails}
      isLoading={isLoadingDetails}
      error={detailsError}
      onBookAppointment={handleBookAppointment}
      onCall={handleCall}
    />
  );
}
