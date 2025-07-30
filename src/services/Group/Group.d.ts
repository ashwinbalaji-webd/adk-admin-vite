export interface Group {
  group_id: number;
  group_name: string;
  airline_code: string;
  group_alias_name: string;
  active_status: string;
  google_drive_folder_ids: string[];
  file_count: number | null;
  files: any | null;
}

export interface GroupFile {
  groupId: number;
  groupName: string;
  files: FileItem[];
}