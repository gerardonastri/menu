"use client";

import { translateMenuItem, translateFieldLabel } from "./menu-translations";

export default function MenuItemDisplay({ item, language, category }) {
  // Traduci l'elemento del menu
  const translatedItem = translateMenuItem(item, language);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100">
      <div>
        <h4 className="text-lg font-semibold">{translatedItem.name}</h4>

        {/* Sottocategoria per food */}
        {item.subcategory && (
          <p className="text-sm text-amber-600 font-medium">
            {item.subcategory}
          </p>
        )}

        <div className="mt-2 space-y-1 text-sm">
          {/* Campi dinamici tradotti */}
          {translatedItem.provenienza && (
            <p className="text-neutral-600">
              <span className="font-medium">
                {translateFieldLabel("Provenienza", language)}:
              </span>{" "}
              {translatedItem.provenienza}
            </p>
          )}

          {translatedItem.tipologia && (
            <p className="text-neutral-600">
              <span className="font-medium">
                {translateFieldLabel("Tipologia", language)}:
              </span>{" "}
              {translatedItem.tipologia}
            </p>
          )}

          {translatedItem.gradazione && (
            <p className="text-neutral-600">
              <span className="font-medium">
                {translateFieldLabel("Gradazione", language)}:
              </span>{" "}
              {translatedItem.gradazione}
            </p>
          )}

          {translatedItem.colore && (
            <p className="text-neutral-600">
              <span className="font-medium">
                {translateFieldLabel("Colore", language)}:
              </span>{" "}
              {translatedItem.colore}
            </p>
          )}

          {translatedItem.aroma && (
            <p className="text-neutral-600">
              <span className="font-medium">
                {translateFieldLabel("Aroma", language)}:
              </span>{" "}
              {translatedItem.aroma}
            </p>
          )}

          {translatedItem.metodo && (
            <p className="text-neutral-600">
              <span className="font-medium">
                {translateFieldLabel("Metodo di produzione", language)}:
              </span>{" "}
              {translatedItem.metodo}
            </p>
          )}

          {translatedItem.description && (
            <p className="text-neutral-600">{translatedItem.description}</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="mt-3 text-lg font-bold text-amber-600">
            {translatedItem.price ? `${translatedItem.price.toFixed(2)} €` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
