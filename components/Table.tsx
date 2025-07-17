import { InterventionType } from "@/app/interventions/page";
import { useState } from "react";
import Popin from "./Popin";
import InterventionForm from "./InterventionForm";
import DeleteConfirmation from "./DeleteConfirmation";

export type TableProps = {
  tableHead: string[];
  tablelines: InterventionType[];
};

export default function Table({ tableHead, tablelines }: TableProps) {
  const [interventionToEdit, setInterventionToEdit] = useState<
    InterventionType | undefined
  >(undefined);
  const [interventionIdToDelete, setInterventionIdToDelete] = useState<
    number | undefined
  >(undefined);
  const [isEditPopinOpen, setIsEditPopinOpen] = useState(false);
  const [isDeletePopinOpen, setIsDeletePopinOpen] = useState(false);

  return (
    <>
      <table className="border-collapse">
        <caption>Interventions</caption>
        <thead>
          <tr>
            {tableHead.map((item, index) => (
              <th key={index} className="border-2 p-1">
                {item}
              </th>
            ))}
            <th className="border-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tablelines.map((line, index) => (
            <tr key={index}>
              {Object.values(line).map((value, index) =>
                index > 0 ? (
                  <td className="border-2 text-center p-1" key={index}>
                    {value}
                  </td>
                ) : undefined
              )}
              <td className="border-2  text-center p-1">
                <button
                  className="border p-0.5 hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setInterventionToEdit(line);
                    setIsEditPopinOpen(true);
                  }}
                >
                  Modifier
                </button>
                <button
                  className="border p-0.5 hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setInterventionIdToDelete(line.ID);
                    setIsDeletePopinOpen(true);
                  }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditPopinOpen && (
        <Popin
          onClose={() => {
            setIsEditPopinOpen(false);
          }}
        >
          <InterventionForm
            onClose={() => {
              setIsEditPopinOpen(false);
            }}
            interventionToEdit={interventionToEdit}
          />
        </Popin>
      )}
      {isDeletePopinOpen && interventionIdToDelete && (
        <Popin
          onClose={() => {
            setIsDeletePopinOpen(false);
          }}
        >
          <DeleteConfirmation
            onClose={() => {
              setIsDeletePopinOpen(false);
            }}
            idToDelete={interventionIdToDelete}
          />
        </Popin>
      )}
    </>
  );
}
