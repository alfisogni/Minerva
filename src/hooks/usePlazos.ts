import { useState, useEffect } from "react";
import { PlazoObject } from "../services/sharepoint/plazos/plazos.types";
import { getPlazos, createPlazoFromObject } from "../services/sharepoint/plazos/plazos.service";
import { updateListItem, deleteListItem } from "../services/sharepoint/list.repository";
import { mapObjectToSPPayload } from "../services/sharepoint/plazos/plazos.mapper";

const LIST_NAME = "Plazos";

export default function usePlazos(): {
  plazos: PlazoObject[];
  loading: boolean;
  save: (item: Partial<PlazoObject> | Partial<PlazoObject>[]) => Promise<void>;
  remove: (id: number) => Promise<void>;
} {
  const [plazos, setPlazos] = useState<PlazoObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Carga inicial
  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await getPlazos();
      setPlazos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData().catch(console.error); }, []);

  const save = async (itemOrItems: Partial<PlazoObject> | Partial<PlazoObject>[]): Promise<void> => {
    setLoading(true);
    try {
      const items = Array.isArray(itemOrItems) ? itemOrItems : [itemOrItems];

      // Process updates first, then creates. This avoids creating duplicates when callers
      // send both an update and a create for the same jurisdiccion/tipo combo.
      const updates = items.filter(i => typeof i.id === 'number' && i.id > 0);
      const creates = items.filter(i => !i.id);

      // Handle updates
      for (const u of updates) {
        const payload = mapObjectToSPPayload(u as PlazoObject);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await updateListItem(LIST_NAME, u.id as number, payload as any);
        setPlazos(prev => prev.map(p => p.id === u.id ? { ...p, ...u } as PlazoObject : p));
      }

      // Handle creates. Before appending to state, deduplicate by jurisdiccionId+tipoJuicioId
      for (const c of creates) {
        // If already exists in current state (same jurisdiccion & tipo), skip or update instead
        const exists = plazos.find(p => p.jurisdiccionId === c.jurisdiccionId && p.tipoJuicioId === c.tipoJuicioId);
        if (exists) {
          // If the existing one has different plazo, treat as update
          if (exists.plazo !== c.plazo) {
            const payload = mapObjectToSPPayload({ ...exists, ...c } as PlazoObject);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await updateListItem(LIST_NAME, exists.id as number, payload as any);
            setPlazos(prev => prev.map(p => p.id === exists.id ? { ...p, ...c } as PlazoObject : p));
          }
          // skip creating duplicate
          continue;
        }

        const id = await createPlazoFromObject(c as PlazoObject);
        setPlazos(prev => [...prev, { ...c, id } as PlazoObject]);
      }
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await deleteListItem(LIST_NAME, id);
      setPlazos(prev => prev.filter(p => p.id !== id));
    } finally {
      setLoading(false);
    }
  };

  return { plazos, loading, save, remove };
}
