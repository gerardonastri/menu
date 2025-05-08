// app/privacy-policy/page.tsx

import React from "react";
import { Metadata } from "next";

export const metadata = {
  title: "Privacy Policy | Piscina le Terrazze",
  description: "Informativa sulla privacy per il sito ufficiale di Piscina le Terrazze, Ravello.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        La presente informativa è resa ai sensi dell’art. 13 del Regolamento UE 2016/679 (GDPR) a
        coloro che interagiscono con i servizi web di <strong>Piscina le Terrazze</strong>,
        accessibili per via telematica a partire dall’indirizzo: <strong>https://piscina-le-terrazze.vercel.app/</strong>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Titolare del trattamento</h2>
      <p className="mb-4">
        Il titolare del trattamento è Piscina le Terrazze – Ravello. Per qualsiasi richiesta
        relativa alla privacy, è possibile scrivere a:{" "}
        <a href="mailto:gerardonastri.dev@gmail.com" className="text-blue-600 underline">
          gerardonastri.dev@gmail.com
        </a>
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Dati trattati</h2>
      <p className="mb-4">
        I dati personali raccolti includono dati di navigazione (tramite cookie e strumenti di
        analisi), indirizzi IP, e in alcuni casi dati forniti volontariamente tramite moduli di
        contatto o prenotazione.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Finalità del trattamento</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Monitoraggio e analisi del traffico tramite Google Analytics</li>
        <li>Rispondere a richieste di informazioni inviate dagli utenti</li>
        <li>Gestione tecnica del sito e miglioramento dell’esperienza utente</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Cookie e strumenti di terze parti</h2>
      <p className="mb-4">
        Il sito utilizza Google Analytics per raccogliere dati in forma anonima e aggregata
        sull’utilizzo del sito. I cookie tecnici sono essenziali per il corretto funzionamento del
        sito. Puoi gestire le tue preferenze sui cookie tramite il banner dedicato al primo accesso.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Base giuridica</h2>
      <p className="mb-4">
        Il trattamento si basa sul consenso espresso dall’utente, nonché sull’interesse legittimo
        del titolare a garantire il corretto funzionamento del sito.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Diritti dell’interessato</h2>
      <p className="mb-4">
        Gli utenti possono esercitare i diritti previsti dal GDPR (accesso, rettifica, cancellazione,
        limitazione, opposizione, portabilità) scrivendo a:{" "}
        <a href="mailto:gerardonastri.dev@gmail.com" className="text-blue-600 underline">
          gerardonastri.dev@gmail.com
        </a>
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Modifiche alla presente informativa</h2>
      <p>
        Il Titolare si riserva il diritto di aggiornare questa informativa in qualsiasi momento.
        L’utente è invitato a consultare periodicamente questa pagina.
      </p>
    </main>
  );
}
