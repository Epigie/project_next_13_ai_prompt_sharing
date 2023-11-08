"use client";
import HospitalCard from "./HospitalCard";

interface HospitalCardListProps {
  hospitalsData: any;
}

const HospitalCardList = ({ hospitalsData }: HospitalCardListProps) => {
  const hospitals = hospitalsData?.data;

  return (
    <section className="hospital_layout">
      {hospitals?.map((hospital: any) => (
        <HospitalCard key={hospital?.id} hospital={hospital} />
      ))}
    </section>
  );
};

export default HospitalCardList;
