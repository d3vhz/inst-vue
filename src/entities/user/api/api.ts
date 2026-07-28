import { api, formatPath, storageApi, useAuthStore } from '~/shared/api';
import { isImageItemSchema } from '~/shared/lib';
import { type IFileItem } from '~/shared/model';

import type { IUser, IUserEdit } from '../model';

const userApi = {
  getUser(id: string) {
    return api.get<IUser>({
      url: `/users/${id}`,
    });
  },
  updateUser({ id, data }: { id: string; data: IUserEdit }) {
    return api.patch<IUserEdit, IUser>({
      url: `/users/${id}`,
      data,
    });
  },
  deleteUser(id: string) {
    return api.delete<IUser>({
      url: `/users/${id}`,
    });
  },
  async uploadAvatar(asset: IFileItem): Promise<string> {
    const authStore = useAuthStore();
    const userId = authStore.user.id;
    if (!userId) throw new Error('userId is not defined');

    if (!isImageItemSchema(asset))
      throw new Error('The file type must be an image (image/*)');

    const path = `${userId}/avatars`;
    const fullPath = `${path}/${asset.name}`;

    const fileList = await storageApi.getFileList(path);

    if (fileList && fileList.length > 0) {
      await storageApi.deleteFiles(
        fileList.map((file) => `${path}/${file.name}`)
      );
    }

    await storageApi.uploadFile({
      path: fullPath,
      file: asset.file,
      contentType: asset.type,
    });

    return storageApi.getPublicUrl(fullPath);
  },
  deleteAvatar(path: string) {
    return storageApi.deleteFiles([formatPath(path)]);
  },
};

export { userApi };
