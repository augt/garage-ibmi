import { InterventionType } from "@/app/interventions/page";
import { useState } from "react";

export type InterventionFormProps = {
  onClose: () => void;
  interventionToEdit?: InterventionType;
};

export default function InterventionForm({
  onClose,
  interventionToEdit,
}: InterventionFormProps) {
  const [date, setDate] = useState(interventionToEdit?.DATE);
  const [type, setType] = useState(interventionToEdit?.TYPE);
  const [status, setStatus] = useState(interventionToEdit?.STATUT);
  const [licensePlate, setLicensePlate] = useState(interventionToEdit?.VEHIM);
  const [mecId, setMecId] = useState(interventionToEdit?.MECID);

  async function saveNewIntervention() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SCHEME}://${process.env.NEXT_PUBLIC_API_HOST}/TACQINTAPI`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            DATE: date,
            TYPE: type,
            STATUT: status,
            VEHIM: licensePlate,
            MECID: mecId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Erreur HTTP :" + response.status);
      }
      onClose();
    } catch (err) {
      console.error("Erreur lors de la requête :", err);
    }
  }

  async function saveModifiedIntervention() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SCHEME}://${process.env.NEXT_PUBLIC_API_HOST}/TACQINTAPI/${interventionToEdit?.ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            DATE: date,
            TYPE: type,
            STATUT: status,
            VEHIM: licensePlate,
            MECID: mecId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Erreur HTTP :" + response.status);
      }
      onClose();
    } catch (err) {
      console.error("Erreur lors de la requête :", err);
    }
  }
  return (
    <form className="flex flex-col">
      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        className="border"
        defaultValue={interventionToEdit?.DATE}
        onChange={(event) => {
          setDate(event.target.value);
        }}
      />
      <label htmlFor="type">Type</label>
      <input
        id="type"
        className="border"
        defaultValue={interventionToEdit?.TYPE}
        onChange={(event) => {
          setType(event.target.value);
        }}
      />
      <label htmlFor="status">Statut</label>
      <input
        id="status"
        className="border"
        defaultValue={interventionToEdit?.STATUT}
        onChange={(event) => {
          setStatus(event.target.value);
        }}
      />
      <label htmlFor="licensePlate">Immatriculation</label>
      <input
        id="licensePlate"
        className="border"
        defaultValue={interventionToEdit?.VEHIM}
        onChange={(event) => {
          setLicensePlate(event.target.value);
        }}
      />
      <label htmlFor="mecId">ID mécanicien</label>
      <input
        id="mecId"
        type="number"
        min="1"
        className="border"
        defaultValue={interventionToEdit?.MECID}
        onChange={(event) => {
          setMecId(parseInt(event.target.value));
        }}
      />
      <button
        type="submit"
        className="border mt-4 hover:cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          if (interventionToEdit) {
            saveModifiedIntervention();
          } else {
            saveNewIntervention();
          }
        }}
      >
        Enregistrer
      </button>
    </form>
  );
}
