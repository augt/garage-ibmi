"use client";
import InterventionForm from "@/components/InterventionForm";
import Popin from "@/components/Popin";
import Table from "@/components/Table";
import { useEffect, useState } from "react";

export type InterventionType = {
  ID: number;
  DATE: string;
  TYPE: string;
  STATUT: string;
  VEHIM: string;
  MECID: number;
};

export default function InterventionsPage() {
  const [interventionsList, setInterventionsList] = useState<
    InterventionType[]
  >([]);
  const [interventionsFullList, setInterventionsFullList] = useState<
    InterventionType[]
  >([]);
  const [licensePlateFilter, setLicensePlateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isPopinOpen, setIsPopinOpen] = useState(false);
  async function fetchAllInterventions() {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_SCHEME}://${process.env.NEXT_PUBLIC_API_HOST}/TACQINTAPI`
    );
    const interventions = await data.json();
    setInterventionsList(interventions);
    setInterventionsFullList(interventions);
  }

  function filterInterventions() {
    let filteredInterventionsList = interventionsFullList.filter(
      (intervention) => intervention.VEHIM.includes(licensePlateFilter)
    );

    if (statusFilter !== "") {
      filteredInterventionsList = filteredInterventionsList.filter(
        (intervention) => intervention.STATUT === statusFilter
      );
    }
    setInterventionsList([...filteredInterventionsList]);
  }

  useEffect(() => {
    fetchAllInterventions();
  }, []);

  return (
    <main className="flex flex-col items-center mt-12 mb-12 gap-4">
      <form className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <label htmlFor="licencePlate">filtrer par immatriculation :</label>

          <input
            id="licencePlate"
            className="border"
            onChange={(event) => {
              setLicensePlateFilter(event.target.value);
            }}
          />

          <label htmlFor="status">filtrer par Statut :</label>

          <input
            id="status"
            className="border"
            onChange={(event) => {
              setStatusFilter(event.target.value.toUpperCase());
            }}
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            filterInterventions();
          }}
          className="border p-1 w-fit hover:cursor-pointer"
        >
          filtrer
        </button>
      </form>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsPopinOpen(true);
        }}
        className="border p-1 w-fit hover:cursor-pointer"
      >
        Ajouter intervention
      </button>
      <Table
        tableHead={[
          "Date",
          "Type",
          "Statut",
          "Immatriculation véhicule",
          "ID mécanicien",
        ]}
        tablelines={interventionsList}
      />
      {isPopinOpen && (
        <Popin
          onClose={() => {
            setIsPopinOpen(false);
          }}
        >
          <InterventionForm
            onClose={() => {
              setIsPopinOpen(false);
            }}
          />
        </Popin>
      )}
    </main>
  );
}
