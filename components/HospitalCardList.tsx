import HospitalCard from "./HospitalCard";

interface HospitalCardListProps {
  hospitals: any;
}

const HospitalCardList = ({ hospitals }: HospitalCardListProps) => {
  return (
    <div className="hospital_layout">
      {hospitals?.map((hospital: any) => (
        <HospitalCard key={hospital?.id} hospital={hospital} />
      ))}
    </div>
  );
};

export default HospitalCardList;
