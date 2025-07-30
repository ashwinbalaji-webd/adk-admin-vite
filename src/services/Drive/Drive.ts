import { AdminApiService } from "../service";

const drive = AdminApiService.enhanceEndpoints({}).injectEndpoints({
  endpoints: (build) => ({
    getFilesByFolderId: build.query({
      query: (params: { folderId: string }) => ({
        url: `/drive/folders/${params.folderId}/files`,
        method: "GET",
      }),
    }),
    getFolderInfo: build.query({
      query: (params: { folderId: string }) => ({
        url: `/drive/folders/${params.folderId}`,
        method: "GET",
      }),
    }),
    uploadFile: build.mutation({
      query: (payload) => ({
        url: "/drive/upload",
        method: "POST",
        params: payload,
      }),
    }),
  }),
});

export const {
  useLazyGetFolderInfoQuery,
  useLazyGetFilesByFolderIdQuery,
  useUploadFileMutation,
} = drive;
