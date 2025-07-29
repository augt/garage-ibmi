export type DeleteConfirmationProps = {
  onClose: () => void;
  idToDelete: number;
};

export default function InterventionForm({
  onClose,
  idToDelete,
}: DeleteConfirmationProps) {
  async function deleteIntervention() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SCHEME}://${process.env.NEXT_PUBLIC_API_HOST}/TACQINTAPI/${idToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        console.log(errorMessage);
        throw new Error("Erreur HTTP :" + response.status);
      }
      onClose();
    } catch (err) {
      console.error("Erreur lors de la requête :", err);
    }
  }
  return (
    <div className="">
      <div className="mb-4">
        Confirmez-vous la suppression de cette intervention ?
      </div>
      <div className="flex justify-center gap-2">
        <button
          className="border p-1 hover:cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            deleteIntervention();
          }}
        >
          Oui
        </button>
        <button
          className="border p-1 hover:cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          Non
        </button>
      </div>
    </div>
  );
}
