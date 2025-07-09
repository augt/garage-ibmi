import { InterventionType } from "@/app/interventions/page";

export type TableProps = {
  tableHead: string[];
  tablelines: InterventionType[];
};

export default function Table({ tableHead, tablelines }: TableProps) {
  return (
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
              <button>Modifier</button>
              <button>supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
