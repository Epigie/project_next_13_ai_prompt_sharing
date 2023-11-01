"use client";
import HospitalCard from "./HospitalCard";

interface HospitalCardListProps {
  hospitals: any;
}

const HospitalCardList = ({ hospitals }: HospitalCardListProps) => {
  return (
    <section className="hospital_layout">
      {hospitals?.map((hospital: any) => (
        <HospitalCard key={hospital?.id} hospital={hospital} />
      ))}
    </section>
  );
};

export default HospitalCardList;
