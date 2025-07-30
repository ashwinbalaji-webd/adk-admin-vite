import React, { useEffect, useMemo, useState } from "react";
import { useLazyGetFolderInfoQuery } from "../services/Drive/Drive"; // adjust this import path

type PersonaGroup = {
  group_id: number;
  group_name: string;
  google_drive_folder_ids: string[];
};

type Folder = {
  id: string;
  name: string;
};

type Props = {
  groups: PersonaGroup[];
};

const UploadFileModal: React.FC<Props> = ({ groups }) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<number | "">("");
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");
  const [personaFolders, setPersonaFolders] = useState<Folder[] | null>(null);

  const [getFolderInfoService] = useLazyGetFolderInfoQuery()

  const selectedPersona = useMemo(
    () => groups.find((g) => g.group_id === selectedPersonaId) || null,
    [groups, selectedPersonaId]
  );

  useEffect(() => {
    if (!selectedPersona?.google_drive_folder_ids?.length) {
      setPersonaFolders(null);
      return;
    }

    const controller = new AbortController();

    const getFolderInfo = async () => {
      try {
        const fs = await Promise.all(
          selectedPersona.google_drive_folder_ids.map(async (id) => {
            const folderInfo = await getFolderInfoService({ folderId: id });
            return {
              id,
              name: folderInfo?.name || "Unnamed Folder",
            };
          })
        );

        if (!controller.signal.aborted) {
          setPersonaFolders(fs);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Failed to fetch folder info:", err);
          setPersonaFolders(null);
        }
      }
    };

    getFolderInfo();

    return () => controller.abort();
  }, [selectedPersona]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Persona
        </label>
        <select
          className="w-full border rounded-md px-3 py-2"
          value={selectedPersonaId}
          onChange={(e) => {
            const id = Number(e.target.value);
            setSelectedPersonaId(id || "");
            setSelectedFolderId("");
            setPersonaFolders(null);
          }}
        >
          <option value="">Select a persona</option>
          {groups.map((g) => (
            <option key={g.group_id} value={g.group_id}>
              {g.group_name}
            </option>
          ))}
        </select>
      </div>

      {personaFolders && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Folder
          </label>
          <select
            className="w-full border rounded-md px-3 py-2"
            value={selectedFolderId}
            onChange={(e) => setSelectedFolderId(e.target.value)}
          >
            <option value="">Select a folder</option>
            {personaFolders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default UploadFileModal;
