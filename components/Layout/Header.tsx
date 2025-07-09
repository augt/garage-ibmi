import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center  h-24 border-b-1 border-gray-200">
      <nav>
        <ul className="flex items-center gap-4 h-full">
          <li className="hover:text-blue-600">
            <Link href="interventions">Interventions</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="clients">Clients</Link>
          </li>
          <li className="hover:text-blue-600">
            <Link href="factures">Factures</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
